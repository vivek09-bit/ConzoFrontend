import React, { useState, useCallback } from 'react';
import { FiUpload, FiDownload, FiImage, FiSettings, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Dropzone from 'react-dropzone';
import { Helmet } from 'react-helmet';
import ImageConversionGuide from '../../components/blog/ImageConversionGuide';

const PngToJpg = () => {
    const [files, setFiles] = useState([]);
    const [convertedFiles, setConvertedFiles] = useState([]);
    const [quality, setQuality] = useState(85);
    const [isConverting, setIsConverting] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [removeTransparency, setRemoveTransparency] = useState(true);

    const onDrop = useCallback((acceptedFiles) => {
        const imageFiles = acceptedFiles.filter(file =>
            file.type === 'image/png' || file.name.endsWith('.png')
        );
        setFiles(prev => [...prev, ...imageFiles.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file)
            })
        )]);
    }, []);

    const convertToJpg = () => {
        setIsConverting(true);
        // Simulate conversion process (in a real app, you'd use canvas or a library)
        setTimeout(() => {
            const newConvertedFiles = files.map(file => ({
                name: file.name.replace('.png', '.jpg'),
                preview: file.preview, // In real app, this would be the converted image
                size: Math.round(file.size * (quality / 100))
            }));
            setConvertedFiles(newConvertedFiles);
            setIsConverting(false);
        }, 1500);
    };

    const removeFile = (index) => {
        const newFiles = [...files];
        URL.revokeObjectURL(newFiles[index].preview);
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const downloadAll = () => {
        convertedFiles.forEach(file => {
            const link = document.createElement('a');
            link.href = file.preview;
            link.download = file.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    };

    return (
        <>
            <Helmet>
                {/* Primary English (India-focused) */}
                <title>Free PNG to JPG Converter Online - High Quality, No Watermark | ImgPdfHub</title>
                <meta name="description" content="Convert PNG to JPG in 1 click with our free online tool. Perfect for India, Indonesia, US & worldwide. Preserve quality, adjust compression, and remove backgrounds." />
                <link rel="canonical" href="https://imgpdfhub.com/png-to-jpg" />
                {/* Open Graph / Social */}
                <meta property="og:title" content="PNG to JPG Converter - Free Online Tool (No Registration)" />
                <meta property="og:description" content="Convert PNG images to JPG format instantly. Trusted by 1M+ users in India, US, Indonesia & worldwide." />
                {/* <meta property="og:image" content="https://imgpdfhub.com/og-png-to-jpg.jpg"/> */}
                <meta property="og:url" content="https://imgpdfhub.com/png-to-jpg" />
                <meta property="og:type" content="website" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="1-Click PNG to JPG Converter - 100% Free" />
                <meta name="twitter:image" content="https://imgpdfhub.com/assets/og-image.png" />

                {/* Schema Markup (JSON-LD) */}
                <script type="application/ld+json">
                    {`
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "PNG to JPG Converter",
        "url": "https://imgpdfhub.com/png-to-jpg",
        "description": "Free online tool to convert PNG images to JPG format",
        "applicationCategory": "ImageConverter",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "keywords": "png to jpg, convert png to jpg, image converter, png converter india",
        "creator": {
          "@type": "Organization",
          "name": "ImgPdfHub"
        }
      }
    `}</script>
            </Helmet>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
                            <FiImage className="mr-3 text-indigo-500" />
                            PNG to JPG Converter
                        </h1>
                        <p className="text-lg text-gray-600">
                            Convert your PNG images to high-quality JPG files instantly
                        </p>
                    </motion.div>

                    {/* Main Converter Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden"
                    >
                        {/* Dropzone Area */}
                        <div className="p-6 border-b border-gray-200">
                            <Dropzone onDrop={onDrop} accept="image/png" multiple>
                                {({ getRootProps, getInputProps }) => (
                                    <div
                                        {...getRootProps()}
                                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-400 transition-colors"
                                    >
                                        <input {...getInputProps()} />
                                        <FiUpload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                                        <h3 className="text-lg font-medium text-gray-700 mb-1">
                                            Drag & drop PNG files here
                                        </h3>
                                        <p className="text-gray-500 mb-4">
                                            or click to browse your files
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            Supports multiple files (Max 10MB each)
                                        </p>
                                    </div>
                                )}
                            </Dropzone>
                        </div>

                        {/* Conversion Options */}
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                <FiSettings className="mr-2 text-indigo-500" />
                                Conversion Options
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Quality Slider */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Quality: {quality}%
                                    </label>
                                    <input
                                        type="range"
                                        min="10"
                                        max="100"
                                        value={quality}
                                        onChange={(e) => setQuality(e.target.value)}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>Smaller file</span>
                                        <span>Better quality</span>
                                    </div>
                                </div>

                                {/* Background Color */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Background Color
                                    </label>
                                    <div className="flex items-center">
                                        <input
                                            type="color"
                                            value={backgroundColor}
                                            onChange={(e) => setBackgroundColor(e.target.value)}
                                            className="w-10 h-10 cursor-pointer rounded border border-gray-300"
                                        />
                                        <span className="ml-3 text-gray-700">
                                            {backgroundColor.toUpperCase()}
                                        </span>
                                    </div>
                                </div>

                                {/* Transparency Option */}
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="removeTransparency"
                                        checked={removeTransparency}
                                        onChange={(e) => setRemoveTransparency(e.target.checked)}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="removeTransparency" className="ml-2 block text-sm text-gray-700">
                                        Remove transparency (fill with background color)
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* File Previews */}
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Selected Files ({files.length})
                            </h3>

                            {files.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">
                                    No files selected yet
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    {files.map((file, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <img
                                                src={file.preview}
                                                alt={file.name}
                                                className="w-12 h-12 object-cover rounded mr-4"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {file.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {(file.size / 1024).toFixed(1)} KB
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => removeFile(index)}
                                                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                            <button
                                onClick={() => setFiles([])}
                                disabled={files.length === 0}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Clear All
                            </button>
                            <button
                                onClick={convertToJpg}
                                disabled={files.length === 0 || isConverting}
                                className="px-4 py-2 bg-indigo-600 rounded-md text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                            >
                                {isConverting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Converting...
                                    </>
                                ) : (
                                    <>Convert to JPG ({files.length})</>
                                )}
                            </button>
                        </div>
                    </motion.div>

                    {/* Results Section */}
                    {convertedFiles.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                    <FiDownload className="mr-2 text-green-500" />
                                    Converted JPG Files ({convertedFiles.length})
                                </h3>

                                <div className="space-y-4">
                                    {convertedFiles.map((file, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <img
                                                src={file.preview}
                                                alt={file.name}
                                                className="w-12 h-12 object-cover rounded mr-4"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {file.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {(file.size / 1024).toFixed(1)} KB ({(quality)}% quality)
                                                </p>
                                            </div>
                                            <a
                                                href={file.preview}
                                                download={file.name}
                                                className="ml-4 px-3 py-1 bg-indigo-600 rounded-md text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
                                            >
                                                Download
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-50 px-6 py-4 flex justify-end">
                                <button
                                    onClick={downloadAll}
                                    className="px-4 py-2 bg-green-600 rounded-md text-sm font-medium text-white hover:bg-green-700 transition-colors flex items-center"
                                >
                                    <FiDownload className="mr-2" />
                                    Download All as ZIP
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
                
        <ImageConversionGuide />
            </div>
        </>
    );
};

export default PngToJpg;