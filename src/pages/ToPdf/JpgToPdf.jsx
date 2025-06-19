import React, { useState, useRef } from "react";
import axios from "axios";
import { DOMAIN } from "../../constants";
import { Helmet } from "react-helmet";

function JpgToPdf() {
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
    const jpgFiles = selectedFiles.filter((file) =>
      file.type === "image/jpeg"
    );

    if (jpgFiles.length > 0) {
      setFiles(jpgFiles);
      setShowFileDetailsPopup(true);
    } else {
      showToastMessage("Please select only JPG files.");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleConvert = async () => {
    if (!files.length) {
      showToastMessage("Please select at least one JPG file.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    setIsConverting(true);
    showToastMessage("Converting...");
    setShowFileDetailsPopup(false);

    try {
      const response = await axios.post(
        `${DOMAIN}/api/jpg-to-pdf`,
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
      {/* Meta Tags for SEO */}
      <Helmet>
        <title>JPG to PDF Converter | Free Online Tool</title>
        <meta
          name="description"
          content="Convert your JPG images to PDF quickly and easily with our free online tool. No registration required."
        />
        <meta
          name="keywords"
          content="jpg to pdf, convert jpg to pdf, free jpg to pdf converter, online jpg to pdf, photo to pdf"
        />
      </Helmet>

      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold mb-4">JPG to PDF Converter</h1>
        <p className="text-lg text-gray-400">
          Convert your JPG images to PDF quickly and easily. No registration or
          software installation required.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mt-4">
        {/* JPG to PDF Card */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center border border-gray-700">
          <h1 className="text-4xl font-bold text-white mb-6">JPG to PDF</h1>

          <div>
            <label className="cursor-pointer bg-indigo-600 text-white px-10 py-4 rounded-xl text-xl font-semibold hover:bg-indigo-700 transition-colors duration-300 inline-block mb-4 shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75">
              Choose JPG Files
              <input
                type="file"
                multiple
                accept="image/jpeg"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
              />
            </label>
            <p className="text-gray-400 text-sm mt-4">
              Supported: JPG only
            </p>
          </div>
        </div>
      </div>

      {/* Conversion Section */}
      <div className="mt-10 text-center">
        <button
          className="bg-green-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
          onClick={handleConvert}
          disabled={isConverting || files.length === 0}
        >
          {isConverting ? "Converting..." : "Convert to PDF"}
        </button>
      </div>

      {/* Download Section */}
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
              Selected JPG Files:
            </h3>
            <ul className="list-disc list-inside mb-4 text-gray-300 max-h-40 overflow-y-auto pr-2">
              {files.map((file, index) => (
                <li key={index} className="truncate mb-1 text-center">
                  {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Other Converters Section */}
      <div className="mt-16 bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-3xl text-center">
        <h2 className="text-3xl font-semibold mb-6">
          Looking for Other Conversions?
        </h2>
        <p className="text-gray-400 text-lg mb-4">
          If you want to convert other file types to PDF, check out our other
          tools:
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/pdf-to-png"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition-all duration-300 shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
          >
            PDF to PNG
          </a>
          <a
            href="/pdf-to-webp"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition-all duration-300 shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
          >
            PDF to WebP
          </a>
          <a
            href="/pdf-to-bmp"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition-all duration-300 shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
          >
            PDF to BMP
          </a>
          <a
            href="/pdf-to-tiff"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition-all duration-300 shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
          >
            PDF to TIFF
          </a>
        </div>
      </div>
    </section>
  );
}

export default JpgToPdf;