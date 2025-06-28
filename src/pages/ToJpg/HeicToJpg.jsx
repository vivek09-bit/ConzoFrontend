import React, { useState, useCallback } from 'react';
import { FiUpload, FiDownload, FiImage, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import HeicToJpgContent from '../../components/blog/HeicToJpgContent';

const HeicToJpg = () => {
  const [files, setFiles] = useState([]);
  const [convertedFiles, setConvertedFiles] = useState([]);
  const [isConverting, setIsConverting] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const previews = acceptedFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
    setFiles(previews);
  }, []);

  const removeFile = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  const convertImages = async () => {
    setIsConverting(true);
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    formData.append('format', 'jpg');

    try {
      const response = await axios.post('http://localhost:5000/api/heic-to-jpg', formData, {
        responseType: 'blob',
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const blob = new Blob([response.data], { type: 'image/jpeg' });
      const url = URL.createObjectURL(blob);
      setConvertedFiles([{ name: 'converted.jpg', url }]);
    } catch (error) {
      console.error('Conversion failed:', error);
      alert('Failed to convert image.');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
            <FiImage className="mr-3 text-indigo-500" />
            HEIC to JPG Converter
          </h1>
          <p className="text-lg text-gray-600">
            Convert your HEIC images to high-quality JPG files instantly
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Dropzone */}
          <div className="p-6 border-b border-gray-200">
            <Dropzone onDrop={onDrop} accept={{ 'image/heic': ['.heic'] }} multiple>
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-400 transition-colors"
                >
                  <input {...getInputProps()} />
                  <FiUpload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium text-gray-700 mb-1">
                    Drag & drop HEIC files here
                  </h3>
                  <p className="text-gray-500 mb-4">or click to browse your files</p>
                  <p className="text-sm text-gray-400">Supports multiple files (Max 10MB each)</p>
                </div>
              )}
            </Dropzone>
          </div>

          {/* File Previews */}
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Selected Files ({files.length})
            </h3>

            {files.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No files selected yet</p>
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
                      <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
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

          {/* Convert Button */}
          <div className="p-6 border-t border-gray-200 text-center">
            <button
              onClick={convertImages}
              disabled={isConverting || files.length === 0}
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {isConverting ? 'Converting...' : 'Convert to JPG'}
            </button>
          </div>

          {/* Download Link */}
          {convertedFiles.length > 0 && (
            <div className="p-6 border-t border-gray-200 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Download Converted File</h3>
              {convertedFiles.map((file, index) => (
                <a
                  key={index}
                  href={file.url}
                  download={file.name}
                  className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  <FiDownload className="mr-2" />
                  {file.name}
                </a>
              ))}
            </div>
          )}
        </motion.div>
      </div>
      <section>
        <HeicToJpgContent />
      </section>
    </div>
    
  );
};

export default HeicToJpg;
