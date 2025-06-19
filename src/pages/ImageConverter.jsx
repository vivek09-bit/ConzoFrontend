import React, { useState, useRef } from "react";
import axios from "axios";

const DOMAIN = import.meta.env.VITE_BACKEND_DOMAIN || "http://localhost:5000";

const ImageConverter = () => {
  const [file, setFile] = useState(null);
  const [convertedUrl, setConvertedUrl] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [message, setMessage] = useState("");
  const [format, setFormat] = useState("png"); // <-- Add format state
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setConvertedUrl(null);
    if (selected && selected.type.startsWith("image/")) {
      setFile(selected);
      setMessage("");
    } else {
      setFile(null);
      setMessage("Please select a valid image file.");
    }
  };

  const handleConvert = async () => {
  if (!file) {
    setMessage("Please select an image to convert.");
    return;
  }
  setIsConverting(true);
  setMessage("Converting...");
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

    // Auto-download
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `converted-${file.name.split(".")[0]}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Also show preview
    setConvertedUrl(downloadUrl);
    setMessage("Conversion complete!");
  } catch (err) {
    console.error("Conversion error:", err);
    setMessage("Conversion failed. Please try again.");
  } finally {
    setIsConverting(false);
  }
};


  const handleReset = () => {
    setFile(null);
    setConvertedUrl(null);
    setMessage("");
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center py-10 px-4 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">
          Image Converter
        </h1>
        <p className="text-gray-300 mb-6">
          Convert your images to another format quickly and easily.
        </p>
        <label className="cursor-pointer bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-all duration-300 inline-block mb-4 shadow-md">
          Choose Image
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
          />
        </label>
        {/* Format selection */}
        <div className="mb-4">
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white"
          >
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="jpg">JPG</option>
            <option value="webp">WEBP</option>
            <option value="avif">AVIF</option>
            <option value="tiff">TIFF</option>
          </select>
        </div>
        <div className="flex gap-3 mb-4">
          <button
            onClick={handleConvert}
            disabled={isConverting || !file}
            className="flex-1 px-8 py-3 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-md disabled:opacity-50"
          >
            {isConverting ? "Converting..." : "Convert"}
          </button>
          <button
            onClick={handleReset}
            disabled={isConverting && !file}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg text-lg font-semibold hover:bg-red-700 transition-all duration-300 shadow-md disabled:opacity-50"
          >
            Reset
          </button>
        </div>
        {message && <div className="mt-2 text-indigo-300">{message}</div>}
        {convertedUrl && (
          <div className="mt-6">
            <a
              href={convertedUrl}
              download={`converted-${file.name.split(".")[0]}.${format}`}
              className="underline text-blue-400"
            >
              Download Converted Image
            </a>
            <div className="mt-4">
              <img
                src={convertedUrl}
                alt="Converted Preview"
                className="mx-auto rounded shadow max-h-64"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageConverter;
