import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { FaSpinner, FaCheckCircle, FaLock, FaRegTrashAlt, FaArrowUp, FaArrowDown } from "react-icons/fa";
import WTJBlog from "./WTJBlog";
const VITE_BACKEND_DOMAIN = import.meta.env.VITE_BACKEND_DOMAIN;

const WebpToJpg = memo(() => {
    const [files, setFiles] = useState([]);
    const [jpgUrls, setJpgUrls] = useState([]);
    const [isConverting, setIsConverting] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [progress, setProgress] = useState(0);
    const [step, setStep] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [estimatedTime, setEstimatedTime] = useState(8);
    const fileInputRef = useRef(null);
    const progressRef = useRef(null);
    const timerRef = useRef(null);

    // Drag and drop handlers
    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files).filter(
            (file) => file.type === "image/webp"
        );
        if (droppedFiles.length) {
            setFiles(droppedFiles);
            setFeedback("");
        } else {
            setFeedback("Please drop only WEBP files.");
        }
    };

    const handleDragOver = (e) => e.preventDefault();

    // File input handler
    const handleFileChange = useCallback((e) => {
        const selectedFiles = Array.from(e.target.files).filter(
            (file) => file.type === "image/webp"
        );
        if (selectedFiles.length) {
            setFiles(selectedFiles);
            setFeedback("");
        } else {
            setFeedback("Please select only WEBP files.");
        }
        if (fileInputRef.current) fileInputRef.current.value = "";
    }, []);

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
        "Reading your WEBP images...",
        "Optimizing quality...",
        "Converting to JPG...",
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
            setFeedback("Please select at least one WEBP file.");
            return;
        }
        setIsConverting(true);
        setFeedback("Starting conversion...");
        setJpgUrls([]);
        setShowSuccess(false);
        startProgressSimulation();

        const formData = new FormData();
        files.forEach((file) => formData.append("images", file));

        try {
            const response = await axios.post(
                `${VITE_BACKEND_DOMAIN}/api/image/webp-to-jpg`,
                formData,
                { responseType: "arraybuffer" }
            );
            // Assume backend returns a zip if multiple files, or a single jpg if one file
            let urls = [];
            if (files.length === 1) {
                const blob = new Blob([response.data], { type: "image/jpeg" });
                urls = [URL.createObjectURL(blob)];
            } else {
                // If zip, let user download zip
                const blob = new Blob([response.data], { type: "application/zip" });
                urls = [URL.createObjectURL(blob)];
            }
            setJpgUrls(urls);
            setFeedback("JPG file(s) ready to download!");
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
        setJpgUrls([]);
        setFeedback("");
        setShowSuccess(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // Accessibility: focus on download link after conversion
    const downloadLinkRef = useRef(null);
    useEffect(() => {
        if (jpgUrls.length && downloadLinkRef.current) {
            downloadLinkRef.current.focus();
        }
    }, [jpgUrls]);

    // Clean up intervals on unmount
    useEffect(() => {
        return () => {
            clearInterval(progressRef.current);
            clearInterval(timerRef.current);
        };
    }, []);

    const totalSize = files.reduce((acc, f) => acc + f.size, 0);

    return (
        <main className="bg-gray-100 min-h-screen flex flex-col items-center">
            <Helmet>
                <title>WEBP to JPG Converter | Free, Fast & Secure Online Tool</title>
                <meta
                    name="description"
                    content="Convert WEBP to JPG online free – no registration, no watermark. Fast and secure WEBP to JPG tool to convert images to high-quality JPG."
                />
                <meta
                    name="keywords"
                    content="webp to jpg, convert webp to jpg, image to jpg, online webp to jpg converter, free webp to jpg"
                />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://imgpdfhub.com/webp-to-jpg" />
                {/* Open Graph for Facebook & LinkedIn */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="WebP to JPG Converter – Free & Secure" />
                <meta
                    property="og:description"
                    content="Easily convert WEBP images into JPG files online. 100% free, fast and secure. No email required!"
                />
                <meta property="og:url" content="https://imgpdfhub.com/webp-to-jpg" />
                {/* <meta
                    property="og:image"
                    content="https://imgpdfhub.com/assets/og-webp-to-jpg.png"
                /> */}
                {/* Twitter Card */}
                {/* <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="WebP to JPG – Free Online Converter" />
                <meta
                    name="twitter:description"
                    content="Convert WEBP to JPG online for free. Fast, easy, and secure. No watermark. No signup."
                />
                <meta
                    name="twitter:image"
                    content="https://imgpdfhub.com/assets/og-webp-to-jpg.png"
                /> */}
                <meta name="theme-color" content="#4F46E5" />
                <link rel="manifest" href="/manifest.json" />
            </Helmet>

            <section className="py-8 px-4 flex flex-col items-center">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-3">
                        WEBP to JPG Converter
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Convert WEBP images to JPG online for free. No registration, no watermark. Instant results.
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
                        Select WEBP Files
                        <input
                            type="file"
                            multiple
                            accept="image/webp"
                            onChange={handleFileChange}
                            className="hidden"
                            ref={fileInputRef}
                            disabled={isConverting}
                            aria-disabled={isConverting}
                        />
                    </label>
                    <p className="text-gray-400 text-sm mb-2">
                        or drag & drop WEBP files here
                    </p>
                    <p className="text-gray-400 text-xs">
                        Supported: WEBP only, up to 20 files, max 50MB total
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
                    ) : "Convert to JPG"}
                </button>

                {/* Download JPG or ZIP */}
                {jpgUrls.length > 0 && (
                    <div className="mt-2 flex flex-row items-center justify-center gap-4">
                        <a
                            href={jpgUrls[0]}
                            download={files.length === 1 ? "converted.jpg" : "converted.zip"}
                            className="underline font-semibold text-lg bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
                            ref={downloadLinkRef}
                            tabIndex={0}
                        >
                            Download {files.length === 1 ? "JPG" : "ZIP"}
                        </a>
                        <button
                            className="bg-red-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 hover:text-gray-800 transition"
                            onClick={removeFiles}
                        >
                            Convert More
                        </button>
                    </div>
                )}
            </section>
            <WTJBlog />
        </main>
    );
});

export default WebpToJpg;
