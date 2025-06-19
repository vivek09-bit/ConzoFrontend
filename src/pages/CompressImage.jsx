import React, { useState, useRef } from "react";
import axios from "axios";

const DOMAIN = import.meta.env.VITE_BACKEND_DOMAIN || "http://localhost:5000";

const CompressImage = () => {
  const [files, setFiles] = useState([]);
  const [compressedUrl, setCompressedUrl] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setCompressedUrl(null);

    const validFiles = selectedFiles.filter(file =>
      ["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type)
    );

    if (validFiles.length > 0) {
      setFiles(validFiles);
      setMessage("");
    } else {
      setFiles([]);
      setMessage("Please select valid images (JPG, PNG, WebP, AVIF).");
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCompress = async () => {
    if (files.length === 0) {
      setMessage("Please select image(s) to compress.");
      return;
    }

    setIsCompressing(true);
    setMessage("Compressing...");

    try {
      const formData = new FormData();
      files.forEach(file => formData.append("images", file)); // Important!

      const response = await axios.post(
        `${DOMAIN}/api/compressor/image`,
        formData,
        { responseType: "blob" }
      );

      const url = URL.createObjectURL(response.data);
      setCompressedUrl(url);
      setMessage("Compression complete! Download the ZIP below.");
    } catch (err) {
      console.error("Compression failed:", err);
      setMessage("Compression failed. Please try again.");
    } finally {
      setIsCompressing(false);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setCompressedUrl(null);
    setMessage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <section className="py-10 px-4 flex flex-col items-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Image Compressor</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center border border-gray-700 w-full max-w-md">
        <label className="cursor-pointer bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 inline-block mb-4 shadow-md">
          Choose Image(s)
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
          />
        </label>

        <p className="text-gray-400 text-sm mb-4">
          Supported: JPG, PNG, WebP, AVIF
        </p>

        <div className="flex gap-3">
          <button
            onClick={handleCompress}
            disabled={isCompressing || files.length === 0}
            className="flex-1 px-8 py-3 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors duration-300 shadow-md disabled:opacity-50"
          >
            {isCompressing ? "Compressing..." : "Compress"}
          </button>
          <button
            onClick={handleReset}
            disabled={isCompressing && files.length === 0}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors duration-300 shadow-md disabled:opacity-50"
          >
            Reset
          </button>
        </div>

        {message && <div className="mt-4 text-indigo-300">{message}</div>}

        {compressedUrl && (
          <div className="mt-6">
            <a
              href={compressedUrl}
              download="compressed_images.zip"
              className="underline text-blue-400"
            >
              Download Compressed ZIP
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default CompressImage;
