import React, { useState, useRef } from "react";
import axios from "axios";
import PdfToJpgGuide from "../../components/blog/PdfToJpgGuide";

const DOMAIN = import.meta.env.VITE_BACKEND_DOMAIN || "http://localhost:5000";

const PdfToJpg = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [images, setImages] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setPdfFile(selected);
    setImages([]);
    setMessage("");
  };

  const handleConvert = async () => {
    if (!pdfFile) {
      setMessage("Please select a PDF file first.");
      return;
    }

    setIsConverting(true);
    setMessage("Converting PDF to images...");

    try {
      const formData = new FormData();
      formData.append("pdf", pdfFile);

      const res = await axios.post(`${DOMAIN}/api/pdf-to-img/converter`, formData);

      if (res.data?.images?.length > 0) {
        setImages(res.data.images);
        setMessage("Conversion complete! See below.");
      } else {
        setMessage("No images returned from server.");
      }
    } catch (err) {
      console.error("Conversion failed:", err);
      setMessage("Conversion failed. Try again.");
    } finally {
      setIsConverting(false);
    }
  };

  const handleReset = () => {
    setPdfFile(null);
    setImages([]);
    setMessage("");
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  return (
    <section className="py-10 px-4 flex flex-col items-center min-h-screen bg-white text-black">
      <h1 className="text-4xl font-bold mb-4">PDF to JPG</h1>
      <p className="mb-6 text-black">Convert PDF pages to high-quality JPG images.</p>

      <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-xl border border-gray-700 text-center">
        <label className="cursor-pointer bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition inline-block mb-4">
          Select PDF
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
          />
        </label>

        <div className="flex gap-3 justify-center">
          <button
            onClick={handleConvert}
            disabled={!pdfFile || isConverting}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 transition rounded-lg font-semibold shadow disabled:opacity-50"
          >
            {isConverting ? "Converting..." : "Convert to JPG"}
          </button>
          <button
            onClick={handleReset}
            disabled={isConverting}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 transition rounded-lg font-semibold shadow disabled:opacity-50"
          >
            Reset
          </button>
        </div>

        {message && <p className="mt-4 text-indigo-300">{message}</p>}

        {images.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Download Images</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {images.map((imgPath, idx) => (
                <div key={idx} className="bg-gray-700 p-2 rounded shadow">
                  <img
                    src={`${DOMAIN}/${imgPath.replace(/\\/g, "/")}`}
                    alt={`Page ${idx + 1}`}
                    className="w-full h-auto mb-2 rounded"
                  />
                  <a
                    href={`${DOMAIN}/${imgPath.replace(/\\/g, "/")}`}
                    download
                    className="text-blue-400 underline text-sm"
                  >
                    Download Page {idx + 1}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <PdfToJpgGuide />
    </section>
  );
};

export default PdfToJpg;
