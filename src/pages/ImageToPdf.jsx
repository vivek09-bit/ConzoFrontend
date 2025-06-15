// src/pages/Convert.jsx
import React, { useState, useRef } from "react";
import axios from "axios";
import { DOMAIN } from "../constants";

// const BACKEND = import.meta.env.VITE_BACKEND_DOMAIN;

function ImageToPdf() {
  const [files, setFiles] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showFileDetailsPopup, setShowFileDetailsPopup] = useState(false);

  const fileInputRef = useRef(null);

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleFileChange = (e) => {
    const selectedFiles = [...e.target.files];
    if (selectedFiles.length > 0) {
      setFiles(selectedFiles);
      setShowFileDetailsPopup(true);
    } else {
      showToastMessage("No files selected");
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleConvert = async () => {
    if (!files.length) {
      showToastMessage("Please select at least one image file");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    setIsConverting(true);
    showToastMessage("Converting...");
    setShowFileDetailsPopup(false);

    try {
      const response = await axios.post(
        
        `${DOMAIN}/api/imagetopdf`,
        formData,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      showToastMessage("PDF is ready to download!");
    } catch (error) {
      console.error("Conversion error:", error);
      showToastMessage("Conversion failed. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  const closePopup = () => {
    setShowFileDetailsPopup(false);
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section className="py-8 px-4 flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mt-4">
        {/* IMG to PDF Card */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center border border-gray-700">
          <h1 className="text-4xl font-bold text-white mb-6">IMG to PDF</h1>

          <div>
            <label className="cursor-pointer bg-indigo-600 text-white px-10 py-4 rounded-xl text-xl font-semibold hover:bg-indigo-700 transition-colors duration-300 inline-block mb-4 shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75">
              Choose Files
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
              />
            </label>
            <p className="text-gray-400 text-sm mt-4">
              Supported: JPG, PNG, GIF
            </p>
          </div>
        </div>

        {/* Word to PDF Card (Coming Soon) */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center border border-gray-700 opacity-60 cursor-not-allowed">
          <h2 className="text-4xl font-bold text-gray-500 mb-6">Word to PDF</h2>
          <p className="text-gray-400 text-2xl font-bold">Coming Soon</p>
          <p className="text-gray-500 text-sm mt-4">
            Stay tuned for this feature!
          </p>
        </div>
      </div>

      {pdfUrl && (
        <div className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 cursor-pointer hover:bg-blue-700 transition-colors duration-300">
          <a
            href={pdfUrl}
            download="converted.pdf"
            className="underline font-semibold text-lg"
          >
            Download PDF
          </a>
        </div>
      )}

      {showToast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50 text-lg font-medium">
          {toastMessage}
        </div>
      )}

      {/* File Details Pop-up Modal */}
      {showFileDetailsPopup && files.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 p-8 rounded-lg shadow-2xl relative max-w-xl w-full border border-gray-700">
            {/* Close button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
            >
              &times;
            </button>

            <h3 className="font-bold mb-4 text-2xl text-white text-center">
              Selected Files:
            </h3>
            <ul className="list-disc list-inside mb-4 text-gray-300 max-h-40 overflow-y-auto pr-2">
              {files.map((file, index) => (
                <li key={index} className="truncate mb-1 text-center">
                  {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </li>
              ))}
            </ul>

            <h3 className="font-bold mb-4 text-2xl text-white text-center">
              Image Previews:
            </h3>
            {/* Grid container: Removed place-items-center to avoid conflicts */}
            <div className="grid grid-cols-1 w-full gap-2 max-h-60 overflow-y-auto pr-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="relative w-full border-gray-600 rounded overflow-hidden flex item-center justify-center col-span-full"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="object-cover w-24 h-24"
                    onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                  />
                </div>
              ))}
            </div>

            {/* Convert to PDF button in the popup */}
            <button
              onClick={handleConvert}
              className="mt-6 block w-full px-10 py-4 bg-green-600 text-white rounded-xl text-xl font-semibold hover:bg-green-700 transition-colors duration-300 shadow-md transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
              disabled={isConverting || files.length === 0}
            >
              {isConverting ? "Converting..." : "Convert to PDF"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default ImageToPdf;
