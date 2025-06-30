// src/pages/Convert.jsx
import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { DOMAIN } from "../../constants";
import ImageToPdfGuide from "../../components/blog/ImageToPdfGuide";


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
        { responseType: "blob" }
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
    <>
      <Helmet>
        <title>Free Online Image to PDF Converter | Fast &amp; Secure</title>
        <meta
          name="description"
          content="Instantly convert JPG, PNG, and GIF images to PDF files online. No registration required. Secure, fast, and easy-to-use image to PDF converter."
        />
        <meta
          name="keywords"
          content="image to pdf, jpg to pdf, png to pdf, gif to pdf, online converter, free pdf tool, secure pdf conversion"
        />
        <meta property="og:title" content="Free Online Image to PDF Converter" />
        <meta property="og:description" content="Convert images to PDF online for free. Fast, secure, and easy-to-use tool supporting JPG, PNG, and GIF." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://imgpdfhub.com/convert" />
        <meta property="og:image" content="https://imgpdfhub.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Online Image to PDF Converter" />
        <meta name="twitter:description" content="Convert images to PDF online for free. Fast, secure, and easy-to-use tool supporting JPG, PNG, and GIF." />
        <meta name="twitter:image" content="https://imgpdfhub.com/og-image.jpg" />
      </Helmet>
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-4 tracking-tight">
            IMG to PDF
          </h1>
          <p className="text-gray-500 mb-8 text-center">
            Convert your images (JPG, PNG, GIF) to a single PDF file in seconds.
          </p>
          <label className="cursor-pointer bg-indigo-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition-all duration-200 shadow-md mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75">
            Choose Images
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
            />
          </label>
          <span className="text-gray-400 text-xs mb-2">
            Supported: JPG, PNG, GIF
          </span>
          {pdfUrl && (
            <div className="mt-6 w-full flex justify-center">
              <a
                href={pdfUrl}
                download="converted.pdf"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg font-semibold text-lg transition-all duration-200"
              >
                Download PDF
              </a>
            </div>
          )}
        </div>

        {/* Toast */}
        {showToast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50 text-lg font-medium animate-fade-in">
            {toastMessage}
          </div>
        )}

        {/* File Details Modal */}
        {showFileDetailsPopup && files.length > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl relative max-w-xl w-full border border-gray-200">
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold"
                aria-label="Close"
              >
                &times;
              </button>
              <h3 className="font-bold mb-4 text-2xl text-indigo-700 text-center">
                Selected Files
              </h3>
              <ul className="list-disc list-inside mb-4 text-gray-700 max-h-32 overflow-y-auto pr-2 text-center">
                {files.map((file, index) => (
                  <li key={index} className="truncate mb-1">
                    {file.name}{" "}
                    <span className="text-gray-400">
                      ({(file.size / 1024).toFixed(2)} KB)
                    </span>
                  </li>
                ))}
              </ul>
              <h3 className="font-bold mb-4 text-xl text-indigo-600 text-center">
                Image Previews
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-40 overflow-y-auto mb-4">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="object-cover w-20 h-20"
                      onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={handleConvert}
                className="mt-4 w-full px-8 py-3 bg-indigo-600 text-white rounded-xl text-lg font-semibold hover:bg-indigo-700 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
                disabled={isConverting || files.length === 0}
              >
                {isConverting ? "Converting..." : "Convert to PDF"}
              </button>
            </div>
          </div>
        )}
      </section>
      <ImageToPdfGuide />
    </>
  );
}

export default ImageToPdf;
