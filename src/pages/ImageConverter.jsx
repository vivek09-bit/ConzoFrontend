import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { FaSpinner, FaCheckCircle, FaLock } from "react-icons/fa";

const DOMAIN = import.meta.env.VITE_BACKEND_DOMAIN || "http://localhost:5000";

const stepMessages = [
  "Reading your image...",
  "Optimizing quality...",
  "Converting format...",
  "Almost done...",
];

const ImageConverter = () => {
  const [file, setFile] = useState(null);
  const [convertedUrl, setConvertedUrl] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [message, setMessage] = useState("");
  const [format, setFormat] = useState("png");
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState(8);
  const fileInputRef = useRef(null);
  const progressRef = useRef(null);
  const timerRef = useRef(null);
  const downloadLinkRef = useRef(null);

  // Progress simulation
  const startProgressSimulation = () => {
    setProgress(0);
    setStep(0);
    setEstimatedTime(8);
    setShowSuccess(false);

    progressRef.current = setInterval(() => {
      setProgress((prev) => (prev >= 90 ? prev : prev + 8));
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

  useEffect(() => {
    return () => {
      clearInterval(progressRef.current);
      clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (convertedUrl && downloadLinkRef.current) {
      downloadLinkRef.current.focus();
    }
  }, [convertedUrl]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setConvertedUrl(null);
    setShowSuccess(false);
    if (selected && selected.type.startsWith("image/")) {
      setFile(selected);
      setMessage("");
    } else {
      setFile(null);
      setMessage("Please select a valid image file.");
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleConvert = async () => {
    if (!file) {
      setMessage("Please select an image to convert.");
      return;
    }
    setIsConverting(true);
    setMessage("Starting conversion...");
    setConvertedUrl(null);
    setShowSuccess(false);
    startProgressSimulation();

    try {
      const formData = new FormData();
      formData.append("images", file);
      formData.append("format", format);

      const response = await axios.post(
        `${DOMAIN}/api/image/convert`,
        formData,
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], { type: `image/${format}` });
      const downloadUrl = URL.createObjectURL(blob);

      setConvertedUrl(downloadUrl);
      setMessage("Conversion complete!");
      stopProgressSimulation();
    } catch (err) {
      setMessage("Conversion failed. Please try again.");
      stopProgressSimulation();
      setShowSuccess(false);
    } finally {
      setIsConverting(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setConvertedUrl(null);
    setMessage("");
    setShowSuccess(false);
    setProgress(0);
    setStep(0);
    setEstimatedTime(8);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <main>
      <Helmet>
        <title>Image Converter | Free, Fast & Secure Online Tool</title>
        <meta
          name="description"
          content="Convert images to PNG, JPG, JPEG, WEBP, AVIF, or TIFF online for free. No watermark, no registration. Fast and secure image converter."
        />
        <meta
          name="keywords"
          content="image converter, convert image, png to jpg, jpg to png, webp to jpg, free image converter"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourdomain.com/image-converter" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Image Converter – Free & Secure" />
        <meta
          property="og:description"
          content="Easily convert images to PNG, JPG, JPEG, WEBP, AVIF, or TIFF online. 100% free, fast and secure."
        />
        <meta property="og:url" content="https://yourdomain.com/image-converter" />
        <meta
          property="og:image"
          content="https://yourdomain.com/assets/og-image-converter.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Image Converter – Free Online Tool" />
        <meta
          name="twitter:description"
          content="Convert images online for free. Fast, easy, and secure. No watermark. No signup."
        />
        <meta
          name="twitter:image"
          content="https://yourdomain.com/assets/og-image-converter.png"
        />
        <meta name="theme-color" content="#4F46E5" />
        <link rel="manifest" href="/manifest.json" />
      </Helmet>

      <section className="py-8 px-4 flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Image Converter
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Convert images to PNG, JPG, JPEG, WEBP, AVIF, or TIFF online for free. No watermark, no registration. Instant results.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <span className="flex items-center gap-1 text-green-700 text-sm bg-green-100 px-2 py-1 rounded"><FaLock /> Secure</span>
            <span className="flex items-center gap-1 text-blue-700 text-sm bg-blue-100 px-2 py-1 rounded">No watermark</span>
            <span className="flex items-center gap-1 text-purple-700 text-sm bg-purple-100 px-2 py-1 rounded">Files auto-deleted</span>
            <span className="flex items-center gap-1 text-yellow-700 text-sm bg-yellow-100 px-2 py-1 rounded">Free forever</span>
          </div>
        </div>

        {/* Upload Zone */}
        <div
          className={`w-full max-w-xl bg-gradient-to-br from-indigo-50 via-white to-blue-100 border-4 border-dashed border-indigo-300 rounded-2xl p-10 flex flex-col items-center mb-8 shadow-2xl transition-all duration-300 ${isConverting ? "opacity-60 pointer-events-none" : ""}`}
          aria-disabled={isConverting}
        >
          <label className="cursor-pointer bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-10 py-4 rounded-xl text-xl font-bold hover:from-indigo-700 hover:to-blue-600 transition mb-6 shadow-lg flex items-center gap-3">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 4v12" />
            </svg>
            <span>Select Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
              disabled={isConverting}
              aria-disabled={isConverting}
            />
          </label>
          <div className="mb-4 w-full relative">
  <select
    value={format}
    onChange={(e) => setFormat(e.target.value)}
    className="appearance-none p-3 pr-10 rounded-xl bg-white text-gray-700 w-full border-2 border-indigo-200 font-semibold text-lg shadow focus:ring-2 focus:ring-indigo-400 transition"
    disabled={isConverting}
    aria-label="Select output format"
  >
    <option value="png">PNG</option>
    <option value="jpeg">JPEG</option>
    <option value="jpg">JPG</option>
    <option value="webp">WEBP</option>
    <option value="avif">AVIF</option>
    <option value="tiff">TIFF</option>
  </select>
  {/* Custom arrow */}
  <span className="pointer-events-none absolute top-1/2 right-4 transform -translate-y-1/2 text-indigo-400 text-xl">
    ▼
  </span>
</div>
          <p className="text-gray-500 text-base mb-4 font-medium">
            Supported: <span className="font-semibold text-indigo-600">PNG, JPG, JPEG, WEBP, AVIF, TIFF</span>. Max 1 file, up to 20MB.
          </p>
          {file && (
            <div className="w-full bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-xl p-4 mb-2 shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700 truncate">{file.name} <span className="text-gray-400">({(file.size / 1024).toFixed(1)} KB)</span></span>
                <button
                  onClick={handleReset}
                  className="text-red-500 hover:underline text-sm font-semibold"
                  disabled={isConverting}
                  aria-disabled={isConverting}
                >
                  Remove
                </button>
              </div>
              <img
                loading="lazy"
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-full h-36 object-contain rounded shadow border bg-white"
              />
            </div>
          )}
        </div>

        {/* Progress */}
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
        {message && !isConverting && !showSuccess && (
          <div className="text-center text-base font-medium text-gray-700 mb-4" aria-live="polite">
            {message}
          </div>
        )}

        {/* Convert Button */}
        <button
          className="bg-green-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-md transform hover:scale-105 focus:outline-none mb-4"
          onClick={handleConvert}
          disabled={isConverting || !file}
          aria-disabled={isConverting || !file}
        >
          {isConverting ? (
            <span className="flex items-center gap-2"><FaSpinner className="animate-spin" /> Processing...</span>
          ) : "Convert"}
        </button>

        {/* Download & Reset */}
        {convertedUrl && (
          <div className="mt-2 flex flex-row items-center justify-center gap-4">
            <a
              href={convertedUrl}
              download={`converted-${file.name.split(".")[0]}.${format}`}
              className="underline font-semibold text-lg bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
              ref={downloadLinkRef}
              tabIndex={0}
            >
              Download {format.toUpperCase()}
            </a>
            <button
              className="bg-red-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 hover:text-gray-800 transition"
              onClick={handleReset}
            >
              Convert More
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default ImageConverter;
