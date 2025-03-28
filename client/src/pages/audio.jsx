import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function ReactAudio() {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Initialize SpeechRecognition
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  // Check if browser supports SpeechRecognition
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  // Start the speech recognition
  const startListening = () => {
    if (recognition) {
      console.log('Starting recognition...');
      recognition.start();
      setIsListening(true);

      // When speech is recognized
      recognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        console.log('Recognized text: ', speechToText);
        setText(speechToText);
      };

      // If there's an error
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
      };

      // When recognition stops (on voice pause)
      recognition.onend = () => {
        console.log('Recognition ended');
        setIsListening(false);
      };
    } else {
      console.error('Speech recognition not supported in this browser');
    }
  };

  // Stop the speech recognition
  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  // Generate and download PDF with the recognized text
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('Recognized Speech:', 10, 10);
    doc.text(text || 'No text recognized yet.', 10, 20);
    doc.save('recognized_speech.pdf');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-gray-900 via-slate-800 to-slate-900">
      <div className="bg-slate-200 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">Speech to Text</h1>

        <div className="flex justify-center gap-6 mb-6">
          <button
            onClick={startListening}
            disabled={isListening}
            className={`px-6 py-3 text-white font-semibold rounded-lg shadow-lg transition duration-300 ${
              isListening
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none'
            }`}
          >
            {isListening ? 'Listening...' : 'Start Listening'}
          </button>
          <button
            onClick={stopListening}
            disabled={!isListening}
            className={`px-6 py-3 text-white font-semibold rounded-lg shadow-lg transition duration-300 ${
              !isListening
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 focus:outline-none'
            }`}
          >
            Stop Listening
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Recognized Text:</h2>
          <div
            className="border border-gray-300 p-4 rounded-lg bg-gray-50 text-lg text-gray-700 whitespace-pre-wrap"
            style={{ minHeight: '150px' }}
          >
            {text ? text : 'Your speech will appear here...'}
          </div>
        </div>

        {/* PDF Download Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={generatePDF}
            disabled={!text}
            className={`px-6 py-3 text-white font-semibold rounded-lg shadow-lg transition duration-300 ${
              !text
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 focus:outline-none'
            }`}
          >
            Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
}
