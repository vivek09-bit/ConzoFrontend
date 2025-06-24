import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FaSpinner, FaCheckCircle, FaLock, FaRegTrashAlt, FaArrowUp, FaArrowDown } from "react-icons/fa";

const VITE_BACKEND_DOMAIN = import.meta.env.VITE_BACKEND_DOMAIN;

function JpgToPdf() {
  const [files, setFiles] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState(8); // seconds
  const fileInputRef = useRef(null);
  const progressRef = useRef(null);
  const timerRef = useRef(null);

  // Drag and drop handlers
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (file) => file.type === "image/jpeg"
    );
    if (droppedFiles.length) {
      setFiles(droppedFiles);
      setFeedback("");
    } else {
      setFeedback("Please drop only JPG files.");
    }
  };
  const handleDragOver = (e) => e.preventDefault();

  // File input handler
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).filter(
      (file) => file.type === "image/jpeg"
    );
    if (selectedFiles.length) {
      setFiles(selectedFiles);
      setFeedback("");
    } else {
      setFeedback("Please select only JPG files.");
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Remove individual file
  const removeFile = (idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  // Reorder files (up/down)
  const moveFile = (idx, dir) => {
    setFiles((prev) => {
      const arr = [...prev];
      const swapIdx = dir === "up" ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= arr.length) return arr;
      [arr[idx], arr[swapIdx]] = [arr[swapIdx], arr[idx]];
      return arr;
    });
  };

  // Simulate progress and steps
  const stepMessages = [
    "Reading your images...",
    "Optimizing quality...",
    "Merging into a single PDF...",
    "Almost done...",
  ];

  const startProgressSimulation = () => {
    setProgress(0);
    setStep(0);
    setEstimatedTime(8);
    setShowSuccess(false);

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + 8;
      });
      setStep((prev) => (prev < stepMessages.length - 1 ? prev + 1 : prev));
    }, 1200);

    timerRef.current = setInterval(() => {
      setEstimatedTime((prev) => (prev > 1 ? prev - 1 : 1));
    }, 1000);
  };

  const stopProgressSimulation = () => {
    clearInterval(progressRef.current);
    clearInterval(timerRef.current);
    setProgress(100);
    setEstimatedTime(0);
    setStep(stepMessages.length - 1);
    setTimeout(() => setShowSuccess(true), 400);
  };

  // Main convert handler
  const handleConvert = async () => {
    if (!files.length) {
      setFeedback("Please select at least one JPG file.");
      return;
    }
    setIsConverting(true);
    setFeedback("Starting conversion...");
    setPdfUrl(null);
    setShowSuccess(false);
    startProgressSimulation();

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    try {
      const response = await axios.post(
        `${VITE_BACKEND_DOMAIN}/api/jpg-to-pdf`,
        formData,
        { responseType: "blob" }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setFeedback("PDF is ready to download!");
    } catch (error) {
      setFeedback("Conversion failed. Please try again.");
    } finally {
      stopProgressSimulation();
      setIsConverting(false);
    }
  };

  // Remove all files
  const removeFiles = () => {
    setFiles([]);
    setPdfUrl(null);
    setFeedback("");
    setShowSuccess(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Accessibility: focus on download link after conversion
  const downloadLinkRef = useRef(null);
  useEffect(() => {
    if (pdfUrl && downloadLinkRef.current) {
      downloadLinkRef.current.focus();
    }
  }, [pdfUrl]);

  // Clean up intervals on unmount
  useEffect(() => {
    return () => {
      clearInterval(progressRef.current);
      clearInterval(timerRef.current);
    };
  }, []);

  const totalSize = files.reduce((acc, f) => acc + f.size, 0);

  return (
    <main>
      <Helmet>
        <title>JPG to PDF Converter | Free, Fast & Secure Online Tool</title>
        <meta
          name="description"
          content="Convert JPG to PDF online free – no registration, no watermark. Fast and secure JPG to PDF tool to merge images into a single high-quality PDF."
        />
        <meta
          name="keywords"
          content="jpg to pdf, convert jpg to pdf, image to pdf, merge jpg to pdf, online jpg to pdf converter, free jpg to pdf"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourdomain.com/jpg-to-pdf" />
        {/* Open Graph for Facebook & LinkedIn */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="JPG to PDF Converter – Free & Secure" />
        <meta
          property="og:description"
          content="Easily convert JPG images into a single PDF file online. 100% free, fast and secure. No email required!"
        />
        <meta property="og:url" content="https://yourdomain.com/jpg-to-pdf" />
        <meta
          property="og:image"
          content="https://yourdomain.com/assets/og-jpg-to-pdf.png"
        />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="JPG to PDF – Free Online Converter" />
        <meta
          name="twitter:description"
          content="Convert JPG to PDF online for free. Fast, easy, and secure. No watermark. No signup."
        />
        <meta
          name="twitter:image"
          content="https://yourdomain.com/assets/og-jpg-to-pdf.png"
        />
        <meta name="theme-color" content="#4F46E5" />  
        <link rel="manifest" href="/manifest.json" />
      
      </Helmet>

      <section className="py-8 px-4 flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            JPG to PDF Converter
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Convert JPG images to PDF online for free. No registration, no watermark. Instant results.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <span className="flex items-center gap-1 text-green-700 text-sm bg-green-100 px-2 py-1 rounded"><FaLock /> Secure</span>
            <span className="flex items-center gap-1 text-blue-700 text-sm bg-blue-100 px-2 py-1 rounded">No watermark</span>
            <span className="flex items-center gap-1 text-purple-700 text-sm bg-purple-100 px-2 py-1 rounded">Files auto-deleted</span>
            <span className="flex items-center gap-1 text-yellow-700 text-sm bg-yellow-100 px-2 py-1 rounded">Free forever</span>
          </div>
        </div>

        {/* Drag & Drop Zone */}
        <div
          className={`w-full max-w-xl bg-white border-2 border-dashed border-indigo-400 rounded-xl p-8 flex flex-col items-center mb-6 shadow-md ${isConverting ? "opacity-60 pointer-events-none" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          aria-disabled={isConverting}
        >
          <label className="cursor-pointer bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition mb-4 shadow">
            Select JPG Files
            <input
              type="file"
              multiple
              accept="image/jpeg"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
              disabled={isConverting}
              aria-disabled={isConverting}
            />
          </label>
          <p className="text-gray-400 text-sm mb-2">
            or drag & drop JPG files here
          </p>
          <p className="text-gray-400 text-xs">
            Supported: JPG only, up to 20 files, max 50MB total
          </p>
        </div>

        {/* File Info */}
        {files.length > 0 && (
          <div className="w-full max-w-xl bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-700">
                {files.length} file{files.length > 1 ? "s" : ""} selected (
                {(totalSize / 1024 / 1024).toFixed(2)} MB)
              </span>
              <button
                onClick={removeFiles}
                className="text-red-500 hover:underline text-sm"
                disabled={isConverting}
                aria-disabled={isConverting}
              >
                Remove all
              </button>
            </div>
            <ul className="max-h-32 overflow-y-auto text-gray-600 text-sm mb-2">
              {files.map((file, idx) => (
                <li key={idx} className="truncate flex items-center gap-2">
                  <span>{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
                  <button
                    className="ml-2 text-gray-400 hover:text-red-600"
                    onClick={() => removeFile(idx)}
                    disabled={isConverting}
                    aria-label={`Remove ${file.name}`}
                  >
                    <FaRegTrashAlt />
                  </button>
                  <button
                    className="ml-1 text-gray-400 hover:text-indigo-600"
                    onClick={() => moveFile(idx, "up")}
                    disabled={isConverting || idx === 0}
                    aria-label={`Move ${file.name} up`}
                  >
                    <FaArrowUp />
                  </button>
                  <button
                    className="ml-1 text-gray-400 hover:text-indigo-600"
                    onClick={() => moveFile(idx, "down")}
                    disabled={isConverting || idx === files.length - 1}
                    aria-label={`Move ${file.name} down`}
                  >
                    <FaArrowDown />
                  </button>
                </li>
              ))}
            </ul>
            {/* Image Previews */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
              {files.slice(0, 4).map((file, idx) => (
                <img
                  loading="lazy"
                  key={idx}
                  src={URL.createObjectURL(file)}
                  alt={`preview of ${idx}`}
                  className="w-full h-24 object-cover rounded shadow-sm border"
                />
              ))}
            </div>
          </div>
        )}

        {/* Feedback and Progress */}
        {isConverting && (
          <div className="flex flex-col items-center my-4 w-full max-w-xs">
            <FaSpinner className="animate-spin text-indigo-600 text-3xl mb-2" aria-label="Loading" />
            <div className="w-full">
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-green-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  role="progressbar"
                ></div>
              </div>
              <p className="text-center text-sm text-gray-500 mt-2" aria-live="polite">
                {stepMessages[step]}<br />
                <span className="text-xs text-gray-400">Estimated time left: {estimatedTime}s</span>
              </p>
            </div>
          </div>
        )}

        {/* Success Animation */}
        {showSuccess && (
          <div className="flex flex-col items-center my-4">
            <FaCheckCircle className="text-green-500 text-4xl animate-bounce mb-2" />
            <span className="text-green-700 font-semibold">Conversion complete!</span>
          </div>
        )}

        {/* Feedback */}
        {feedback && !isConverting && !showSuccess && (
          <div className="text-center text-base font-medium text-gray-700 mb-4" aria-live="polite">
            {feedback}
          </div>
        )}

        {/* Convert Button */}
        <button
          className="bg-green-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-md transform hover:scale-105 focus:outline-none mb-4"
          onClick={handleConvert}
          disabled={isConverting || files.length === 0}
          aria-disabled={isConverting || files.length === 0}
        >
          {isConverting ? (
            <span className="flex items-center gap-2"><FaSpinner className="animate-spin" /> Processing...</span>
          ) : "Convert to PDF"}
        </button>

        {/* Download PDF */}
        {pdfUrl && (
          <div className="mt-2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300">
            <a
              href={pdfUrl}
              download="converted.pdf"
              className="underline font-semibold text-lg"
              ref={downloadLinkRef}
              tabIndex={0}
            >
              Download PDF
            </a>
          </div>
        )}
      </section>
    </main>
  );
}

export default JpgToPdf;
