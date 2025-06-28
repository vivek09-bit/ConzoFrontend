import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { FiUpload, FiDownload, FiImage, FiSettings, FiTrash2, FiAlertCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const MAX_FILE_SIZE_MB = 10;
const MAX_PARALLEL_UPLOADS = 3;

const PngToJpg = () => {
  const [files, setFiles] = useState([]);
  const [convertedFiles, setConvertedFiles] = useState([]);
  const [conversionProgress, setConversionProgress] = useState({});
  const [quality, setQuality] = useState(85);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [removeTransparency, setRemoveTransparency] = useState(true);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  // Custom drag and drop implementation
  useEffect(() => {
    const dropZone = dropZoneRef.current;

    const handleDragEnter = (e) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragOver = (e) => {
      e.preventDefault();
    };

    const handleDragLeave = () => {
      setIsDragging(false);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    };

    dropZone.addEventListener('dragenter', handleDragEnter);
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);

    return () => {
      dropZone.removeEventListener('dragenter', handleDragEnter);
      dropZone.removeEventListener('dragover', handleDragOver);
      dropZone.removeEventListener('dragleave', handleDragLeave);
      dropZone.removeEventListener('drop', handleDrop);
    };
  }, []);

  const handleFiles = (fileList) => {
    setError(null);
    const newFiles = Array.from(fileList).filter(file => {
      const isPng = file.type === 'image/png' || file.name.toLowerCase().endsWith('.png');
      const isWithinSizeLimit = file.size <= MAX_FILE_SIZE_MB * 1024 * 1024;

      if (!isPng) {
        setError(prev => `${prev ? prev + '\n' : ''}${file.name} is not a PNG file`);
      }

      if (!isWithinSizeLimit) {
        setError(prev => `${prev ? prev + '\n' : ''}${file.name} exceeds ${MAX_FILE_SIZE_MB}MB limit`);
      }

      return isPng && isWithinSizeLimit;
    });

    setFiles(prev => [
      ...prev,
      ...newFiles.map(file => ({
        file,
        id: crypto.randomUUID(),
        preview: URL.createObjectURL(file),
        status: 'pending'
      }))
    ]);
  };

  const convertToJpg = async () => {
    if (files.length === 0) return;

    setError(null);
    setConversionProgress({});

    try {
      // Process files in batches
      const batches = [];
      for (let i = 0; i < files.length; i += MAX_PARALLEL_UPLOADS) {
        batches.push(files.slice(i, i + MAX_PARALLEL_UPLOADS));
      }

      for (const batch of batches) {
        await Promise.all(batch.map(async (fileObj) => {
          const { id, file } = fileObj;

          try {
            setConversionProgress(prev => ({ ...prev, [id]: 0 }));

            const formData = new FormData();
            formData.append('image', file);
            formData.append('quality', quality);
            formData.append('backgroundColor', backgroundColor);
            formData.append('removeTransparency', removeTransparency);

            const response = await axios.post(
              `${import.meta.env.VITE_BACKEND_DOMAIN}/png-to-jpg`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'X-Request-ID': id
                },
                onUploadProgress: (progressEvent) => {
                  const progress = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                  );
                  setConversionProgress(prev => ({ ...prev, [id]: progress }));
                }
              }
            );

            setConvertedFiles(prev => [...prev, {
              id,
              name: file.name.replace('.png', '.jpg'),
              url: response.data.downloadUrl,
              size: response.data.fileSize,
              originalFile: fileObj
            }]);

          } catch (err) {
            setError(prev => `${prev ? prev + '\n' : ''}Failed to convert ${file.name}: ${err.response?.data?.message || err.message}`);
          } finally {
            setConversionProgress(prev => {
              const newProgress = { ...prev };
              delete newProgress[id];
              return newProgress;
            });
          }
        }));
      }
    } catch (err) {
      setError(err.message || 'Batch conversion failed');
    }
  };

  const removeFile = (id) => {
    const fileToRemove = files.find(f => f.id === id);
    if (fileToRemove) {
      URL.revokeObjectURL(fileToRemove.preview);
      setFiles(prev => prev.filter(f => f.id !== id));
      setConversionProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[id];
        return newProgress;
      });
    }
  };

  const downloadFile = (file) => {
    axios.get(file.url, { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file.name);
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch(err => {
        setError(`Failed to download ${file.name}: ${err.message}`);
      });
  };

  const downloadAll = async () => {
    try {
      const zip = new JSZip();
      const imgFolder = zip.folder("converted_images");
      
      // Add files to zip
      await Promise.all(convertedFiles.map(async file => {
        const response = await axios.get(file.url, { responseType: 'blob' });
        imgFolder.file(file.name, response.data);
      }));
      
      // Generate zip file
      const content = await zip.generateAsync({ type: "blob" });
      const url = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', "converted_images.zip");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('Failed to create ZIP file: ' + err.message);
    }
  };

  // Calculate overall progress
  const overallProgress = files.length > 0 
    ? (Object.values(conversionProgress).reduce((a, b) => a + b, 0) / files.length) || 0
    : 0;

  return (
    <>
      <Helmet>
        <title>Advanced PNG to JPG Converter | High Quality Conversion</title>
        <meta name="description" content="Convert PNG to JPG with adjustable quality, background color, and transparency options. Fast and secure conversion." />
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
              Advanced PNG to JPG Converter
            </h1>
            <p className="text-lg text-gray-600">
              Professional-grade image conversion with complete control
            </p>
          </motion.div>

          {/* Main Converter Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Progress Bar */}
            {Object.keys(conversionProgress).length > 0 && (
              <div className="h-2 bg-gray-200 w-full">
                <motion.div 
                  className="h-full bg-indigo-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${overallProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}

            {/* Error Display */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 border-l-4 border-red-500 p-4"
                >
                  <div className="flex items-center">
                    <FiAlertCircle className="text-red-500 mr-2" />
                    <p className="text-red-700 whitespace-pre-line">{error}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dropzone Area */}
            <div 
              ref={dropZoneRef}
              className={`p-6 border-b border-gray-200 ${isDragging ? 'bg-indigo-50 border-indigo-300' : ''}`}
            >
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                  isDragging 
                    ? 'border-indigo-400 bg-indigo-25' 
                    : 'border-gray-300 hover:border-indigo-400'
                }`}
                onClick={() => fileInputRef.current.click()}
              >
                <FiUpload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-700 mb-1">
                  {isDragging ? 'Drop your PNG files here' : 'Drag & drop PNG files here'}
                </h3>
                <p className="text-gray-500 mb-4">
                  or click to browse your files
                </p>
                <p className="text-sm text-gray-400">
                  Supports multiple files (Max {MAX_FILE_SIZE_MB}MB each)
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => handleFiles(e.target.files)}
                  accept="image/png"
                  multiple
                  className="hidden"
                />
              </div>
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
                  {files.map((fileObj) => (
                    <div 
                      key={fileObj.id}
                      className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <img 
                        src={fileObj.preview} 
                        alt={fileObj.file.name} 
                        className="w-12 h-12 object-cover rounded mr-4"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {fileObj.file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(fileObj.file.size / 1024).toFixed(1)} KB
                          {conversionProgress[fileObj.id] !== undefined && (
                            <span className="ml-2 text-indigo-600">
                              ({conversionProgress[fileObj.id]}% uploaded)
                            </span>
                          )}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFile(fileObj.id)}
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
                onClick={() => {
                  files.forEach(file => URL.revokeObjectURL(file.preview));
                  setFiles([]);
                  setError(null);
                }}
                disabled={files.length === 0}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={convertToJpg}
                disabled={files.length === 0 || Object.keys(conversionProgress).length > 0}
                className="px-4 py-2 bg-indigo-600 rounded-md text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {Object.keys(conversionProgress).length > 0 ? (
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
                  {convertedFiles.map((file) => (
                    <div 
                      key={file.id}
                      className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <img 
                        src={file.originalFile.preview} 
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
                      <button
                        onClick={() => downloadFile(file)}
                        className="ml-4 px-3 py-1 bg-indigo-600 rounded-md text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
                      >
                        Download
                      </button>
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
      </div>
    </>
  );
};

export default PngToJpg;