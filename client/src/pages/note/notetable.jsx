import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaArrowLeft } from "react-icons/fa";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default function notetable() {
  const [Info, setInfo] = useState([]);
  const [DId, setformId] = useState("");
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState("");

  // Function to remove HTML tags
  const stripHtmlTags = (htmlContent) => {
    const doc = new DOMParser().parseFromString(htmlContent, "text/html");
    return doc.body.textContent || "";
  };

  useEffect(() => {
    const fetchinfo = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/note/nget`);
        const data = await res.json();
        if (res.ok) {
          setInfo(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchinfo();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Title of the PDF
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Note Report", 14, 20);
  
    let yOffset = 30; // Starting position for the first note
  
    // Loop through the filtered notes (filter) and generate the layout
    filter.forEach((note, index) => {
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
  
      // Add note title
      doc.text(`Note ${index + 1}: ${note.title}`, 14, yOffset);
      yOffset += 8;
  
      // Add note content (stripped HTML tags)
      const content = stripHtmlTags(note.content);
      const contentLines = doc.splitTextToSize(content, 180); // Split content into lines to fit within the page width
  
      // Add content to the PDF
      doc.text(contentLines, 14, yOffset);
      yOffset += contentLines.length * 8; // Adjust yOffset based on content lines
  
      // Add space between notes
      if (yOffset > 250) {
        doc.addPage();
        yOffset = 20; // Reset position after a new page
      }
    });
  
    // Save the document with the file name
    doc.save("NoteReport.pdf");
  };
  

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/note/ddelete/${DId}`,
        {
          method: "DELETE"
        }
      );
      if (res.ok) {
        setInfo((prev) => prev.filter((course) => course._id !== DId));
        alert("Deleted");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (query.trim() === "") {
      setfilter([...Info]);
    } else {
      const filteredData = Info.filter(
        (course) =>
          course.title &&
          course.title.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, Info]);

  return (
    <div
      className="h-[800px] relative bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://firebasestorage.googleapis.com/v0/b/fir-8506f.appspot.com/o/top-view-agenda-glasses-pencil.jpg?alt=media&token=6d98d4f5-3af6-4783-8899-9d27ba93abdc)"
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="items-center justify-center flex relative z-10">
        <div className="items-center mt-10">
          {/* Search Input */}
          <div className="flex justify-center mt-4">
            <input
              type="text"
              placeholder="Search Note..."
              className="w-[400px] h-12 rounded-full bg-black shadow-xl border border-slate-400 bg-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={generatePDF}
              className="mt-4 bg-blue-600 font-serif text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Note Report
            </button>
            <Link to={`/dashboard/note`}>
              <button className="mt-4 bg-blue-600 font-serif text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
                New Note
              </button>
            </Link>
          </div>

         

          {/* Orders Section */}
          <div className="overflow-x-auto scrollbar-none lg:h-[500px] ">
            <div className="lg:w-[1200px] mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filter && filter.length > 0 ? (
                filter.map((order) => (
                  <div
                    key={order._id}
                    className="bg-gray-800 bg-opacity-80 text-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 flex flex-col"
                  >
                    <div className="text-xl font-semibold break-words">{order.title}</div>
                    <div className="mt-2 text-sm text-gray-400 break-words  ">
                      {stripHtmlTags(order.content)}{" "}
                      {/* Stripping out HTML tags */}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex mt-4 gap-4 justify-center">
                      <Link to={`/dashboard/iupdate/${order._id}`}>
                        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-2 rounded-lg shadow-md transition duration-300">
                          <FaEdit className="text-lg mr-2" /> {/* Edit Icon */}
                        </button>
                      </Link>

                      <button
                        onClick={() => {
                          setformId(order._id);
                          handleDeleteUser();
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
                      >
                        <FaTrashAlt className="text-lg mr-2" />{" "}
                        {/* Delete Icon */}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center text-gray-500 py-4">
                  No Note found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
