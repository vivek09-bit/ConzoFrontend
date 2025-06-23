import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const VITE_BACKEND_DOMAIN = import.meta.env.VITE_BACKEND_DOMAIN;

function JpgToPdf() {
  const [files, setFiles] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);
  const progressRef = useRef(null);

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

  const startProgressSimulation = () => {
    setProgress(0);
    const messages = [
      "Reading your images...",
      "Optimizing quality...",
      "Merging into a single PDF...",
      "Almost done...",
    ];
    let i = 0;

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + 10;
      });

      setFeedback(messages[i]);
      i++;
      if (i >= messages.length) i = messages.length - 1;
    }, 1200);
  };

  const stopProgressSimulation = () => {
    clearInterval(progressRef.current);
    setProgress(100);
  };

  const handleConvert = async () => {
    if (!files.length) {
      setFeedback("Please select at least one JPG file.");
      return;
    }

    setIsConverting(true);
    setFeedback("Starting conversion...");
    setPdfUrl(null);
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

  const removeFiles = () => {
    setFiles([]);
    setPdfUrl(null);
    setFeedback("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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
</Helmet>


      <section className="py-8 px-4 flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            JPG to PDF Converter
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Convert JPG images to PDF online for free. No registration, no watermark. Instant results.
          </p>
        </div>

        {/* Drag & Drop Zone */}
        <div
          className="w-full max-w-xl bg-white border-2 border-dashed border-indigo-400 rounded-xl p-8 flex flex-col items-center mb-6 shadow-md"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
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
              >
                Remove all
              </button>
            </div>
            <ul className="max-h-32 overflow-y-auto text-gray-600 text-sm mb-2">
              {files.map((file, idx) => (
                <li key={idx} className="truncate">
                  {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </li>
              ))}
            </ul>
            {/* Image Previews */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
              {files.slice(0, 4).map((file, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(file)}
                  alt={`preview-${idx}`}
                  className="w-full h-24 object-cover rounded shadow-sm border"
                />
              ))}
            </div>
          </div>
        )}

        {/* Feedback and Progress */}
        {feedback && (
          <div className="text-center text-base font-medium text-gray-700 mb-4">
            {feedback}
          </div>
        )}

        {isConverting && (
          <div className="w-full max-w-xs mt-2">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">
              Converting... {progress}%
            </p>
          </div>
        )}

        {/* Convert Button */}
        <button
          className="bg-green-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-md transform hover:scale-105 focus:outline-none mb-4"
          onClick={handleConvert}
          disabled={isConverting || files.length === 0}
        >
          {isConverting ? "Processing..." : "Convert to PDF"}
        </button>

        {/* Download PDF */}
        {pdfUrl && (
          <div className="mt-2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300">
            <a href={pdfUrl} download="converted.pdf" className="underline font-semibold text-lg">
              Download PDF
            </a>
          </div>
        )}

        
        {/* Conversion Tips & FAQ for SEO */}
        <section className="mt-12 w-full max-w-2xl bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-3">
            How to Convert JPG to PDF Online
          </h2>
          <ol className="list-decimal list-inside text-gray-700 mb-4">
            <li>
              Click <b>Select JPG Files</b> or drag and drop your images.
            </li>
            <li>Arrange your files if needed (coming soon).</li>
            <li>
              Click <b>Convert to PDF</b> and download your PDF instantly.
            </li>
          </ol>
          <h3 className="font-semibold mb-1">Frequently Asked Questions</h3>
          <dl className="mb-2">
            <dt className="font-medium">Is this JPG to PDF converter free?</dt>
            <dd className="mb-2 text-gray-600">
              Yes, it’s 100% free and always will be.
            </dd>
            <dt className="font-medium">Are my files secure?</dt>
            <dd className="mb-2 text-gray-600">
              All conversions are processed securely and files are deleted
              automatically.
            </dd>
            <dt className="font-medium">Can I convert multiple JPGs at once?</dt>
            <dd className="mb-2 text-gray-600">
              Yes, you can batch convert up to 20 JPG files at a time.
            </dd>
          </dl>
        </section>

        {/* Other Converters Section */}
        <section className="mt-10 w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-3 text-center">
            Other Popular Tools
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/pdf-to-jpg"
              className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition"
            >
              PDF to JPG
            </Link>
            <Link
              to="/pdf-to-png"
              className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition"
            >
              PDF to PNG
            </Link>
            <Link
              to="/pdf-to-webp"
              className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition"
            >
              PDF to WebP
            </Link>
            <Link
              to="/jpg-to-png"
              className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition"
            >
              JPG to PNG
            </Link>
            <Link
              to="/jpg-to-jpeg"
              className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition"
            >
              JPG to JPEG
            </Link>
            <Link
              to="/jpg-to-webp"
              className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition"
            >
              JPG to WebP
            </Link>
            <Link
              to="/webp-to-png"
              className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition"
            >
              WebP to PNG
            </Link>
            <Link
              to="/avif-to-jpg"
              className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition"
            >
              AVIF to JPG
            </Link>
            <Link
              to="/image-to-pdf"
              className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition"
            >
              Image to PDF
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}

export default JpgToPdf;
