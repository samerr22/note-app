import { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [extractedText, setExtractedText] = useState(null);

  // Handle image change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Upload image to Firebase
  const handleImageUpload = async () => {
    if (!image) {
      alert('Please select an image first!');
      return;
    }

    try {
      // Prepare Firebase storage reference
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            // Now send the image URL to the backend for OCR processing
            processOCR(downloadURL);
          });
        }
      );
    } catch (error) {
      console.error('Image upload failed:', error);
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
    }
  };

  // Process OCR using the uploaded image URL
  const processOCR = async (imageUrl) => {
    console.log(imageUrl);
    try {
      const response = await fetch('http://localhost:3000/api/reco/ocr', { // Update with your backend API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }), // Sending the image URL to the backend
      });

      if (!response.ok) {
        throw new Error('Failed to process image');
      }

      const data = await response.json();
      setExtractedText(data.text);  // Display extracted text
    } catch (error) {
      console.error('OCR processing failed:', error);
      alert('OCR processing failed');
    }
  };

  // Function to download extracted text as PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add a title to the PDF
    doc.setFontSize(18);
    doc.text('Extracted Text from Image', 14, 20);

    // Add the extracted text
    doc.setFontSize(12);
    doc.text(extractedText || 'No text extracted.', 14, 30);

    // Save the PDF with a name
    doc.save('extracted-text.pdf');
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-gray-900 via-slate-800 to-slate-900">
      <div className="bg-blue-100 p-8 rounded-xl shadow-xl max-w-md w-full space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Image to Text</h2>

        {/* Image Input */}
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full text-sm text-gray-500 file:border file:border-gray-300 file:py-2 file:px-4 file:rounded-lg file:bg-blue-50 hover:file:bg-blue-100 transition-colors"
        />

        {/* Upload Button */}
        <button
          onClick={handleImageUpload}
          className="w-full bg-blue-950 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        >
          {imageUploadProgress ? (
            <div className="flex justify-center items-center">
              <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
            </div>
          ) : (
            'Upload Image'
          )}
        </button>

        {/* Error message */}
        {imageUploadError && <p className="text-red-600 text-center">{imageUploadError}</p>}

        {/* Extracted Text */}
        {extractedText && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">Extracted Text:</h3>
            <p className="text-gray-700">{extractedText}</p>
          </div>
        )}

        {/* Download PDF Button */}
        {extractedText && (
          <button
            onClick={downloadPDF}
            className="w-full bg-green-600 text-white p-3 rounded-lg shadow-lg hover:bg-green-700 transition-colors mt-4"
          >
            Download PDF
          </button>
        )}
      </div>
    </div>
  );
}
