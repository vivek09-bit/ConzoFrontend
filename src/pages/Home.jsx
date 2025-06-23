// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { DOMAIN } from "../constants";

// List of all tools with route, label, description, and emoji/icon
const tools = [
  // PDF to Image Converters
  { to: "/pdf-to-jpg", label: "PDF to JPG", desc: "Convert PDF pages to JPG images", icon: "🖼️" },
  { to: "/pdf-to-png", label: "PDF to PNG", desc: "Convert PDF pages to PNG images", icon: "🖼️" },
  { to: "/pdf-to-webp", label: "PDF to WEBP", desc: "Convert PDF pages to WEBP images", icon: "🖼️" },
  { to: "/pdf-to-bmp", label: "PDF to BMP", desc: "Convert PDF pages to BMP images", icon: "🖼️" },
  { to: "/pdf-to-tiff", label: "PDF to TIFF", desc: "Convert PDF pages to TIFF images", icon: "🖼️" },

  // Image Format Converters
  { to: "/jpg-to-png", label: "JPG to PNG", desc: "Convert JPG images to PNG", icon: "🟦" },
  { to: "/png-to-jpg", label: "PNG to JPG", desc: "Convert PNG images to JPG", icon: "🟩" },
  { to: "/heic-to-jpg", label: "HEIC to JPG", desc: "Convert HEIC images to JPG", icon: "📱" },
  { to: "/webp-to-jpg", label: "WEBP to JPG", desc: "Convert WEBP images to JPG", icon: "🌐" },
  { to: "/bmp-to-jpg", label: "BMP to JPG", desc: "Convert BMP images to JPG", icon: "🖼️" },
  { to: "/tiff-to-jpg", label: "TIFF to JPG", desc: "Convert TIFF images to JPG", icon: "🖼️" },
  { to: "/jpg-to-webp", label: "JPG to WEBP", desc: "Convert JPG images to WEBP", icon: "🟦" },
  { to: "/png-to-webp", label: "PNG to WEBP", desc: "Convert PNG images to WEBP", icon: "🟩" },
  { to: "/webp-to-png", label: "WEBP to PNG", desc: "Convert WEBP images to PNG", icon: "🌐" },
  { to: "/svg-to-png", label: "SVG to PNG", desc: "Convert SVG images to PNG", icon: "🔳" },

  // PDF Utilities
  { to: "/compress-pdf", label: "Compress PDF", desc: "Reduce PDF file size", icon: "🗜️" },
  { to: "/merge-pdf", label: "Merge PDF", desc: "Combine multiple PDFs", icon: "📎" },
  { to: "/split-pdf", label: "Split PDF", desc: "Split a PDF into parts", icon: "✂️" },
  { to: "/pdf-to-word", label: "PDF to Word", desc: "Convert PDF to Word document", icon: "📝" },
  { to: "/word-to-pdf", label: "Word to PDF", desc: "Convert Word document to PDF", icon: "📄" },

  // Image to PDF and related
  { to: "/jpg-to-pdf", label: "JPG to PDF", desc: "Convert JPG images to PDF", icon: "🟦" },
  { to: "/image-to-pdf", label: "Image to PDF", desc: "Convert images to PDF", icon: "🖼️" },
  { to: "/png-to-pdf", label: "PNG to PDF", desc: "Convert PNG images to PDF", icon: "🟩" },
  { to: "/heic-to-pdf", label: "HEIC to PDF", desc: "Convert HEIC images to PDF", icon: "📱" },
  { to: "/webp-to-pdf", label: "WEBP to PDF", desc: "Convert WEBP images to PDF", icon: "🌐" },
  { to: "/multiple-images-to-pdf", label: "Multiple Images to PDF", desc: "Combine multiple images into a PDF", icon: "🗂️" },
  { to: "/combine-images-to-pdf", label: "Combine Images to PDF", desc: "Merge images into a single PDF", icon: "➕" },
  { to: "/screenshot-to-pdf", label: "Screenshot to PDF", desc: "Convert screenshots to PDF", icon: "📸" },
  { to: "/photo-to-pdf", label: "Photo to PDF", desc: "Convert photos to PDF", icon: "📷" },
  { to: "/online-image-to-pdf", label: "Online Image to PDF", desc: "Convert online images to PDF", icon: "🌍" },
  { to: "/iphone-image-to-pdf", label: "iPhone Image to PDF", desc: "Convert iPhone images to PDF", icon: "📱" },
  { to: "/android-image-to-pdf", label: "Android Image to PDF", desc: "Convert Android images to PDF", icon: "🤖" },
  { to: "/windows-image-to-pdf", label: "Windows Image to PDF", desc: "Convert Windows images to PDF", icon: "🪟" },
  { to: "/mac-image-to-pdf", label: "Mac Image to PDF", desc: "Convert Mac images to PDF", icon: "🍏" },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>

    
      <Helmet>
        <title>ConvertIgnite | Free Online Image to PDF Converter & File Tools</title>
        <meta
          name="description"
          content="ConvertIgnite offers free online tools to convert JPG, PNG, HEIC, WEBP, and screenshots to PDF. Merge images, compress files, and convert documents easily on any device."
        />
        <meta
          name="keywords"
          content="image to pdf, jpg to pdf, png to pdf, heic to pdf, webp to pdf, screenshot to pdf, merge images, combine images, compress files, online converter, convertignite"
        />
        <meta property="og:title" content="ConvertIgnite | Free Online Image to PDF Converter & File Tools" />
        <meta property="og:description" content="Convert images and documents to PDF, merge files, and compress documents online for free. Fast, secure, and easy to use on any device." />
        <meta property="og:url" content={DOMAIN} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${DOMAIN}og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ConvertIgnite | Free Online Image to PDF Converter & File Tools" />
        <meta name="twitter:description" content="Convert images and documents to PDF, merge files, and compress documents online for free. Fast, secure, and easy to use on any device." />
        <meta name="twitter:image" content={`${DOMAIN}og-image.png`} />
        <link rel="canonical" href={DOMAIN} />
      </Helmet>

      <section className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-indigo-500">Welcome to ConvertIgnite</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10">
          Convert your files quickly and easily with our free online tools.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto">
          {tools.map((tool) => (
            <div
              key={tool.to}
              onClick={() => navigate(tool.to)}
              className="cursor-pointer p-6 rounded-xl shadow-lg text-center transition-all duration-200 transform bg-white border border-gray-200 hover:scale-105 hover:border-indigo-400 group"
            >
              <div className="text-4xl mb-3">{tool.icon}</div>
              <h2 className="text-xl font-semibold mb-1 text-indigo-600 group-hover:text-indigo-700">{tool.label}</h2>
              <p className="text-gray-500 text-sm">{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;
