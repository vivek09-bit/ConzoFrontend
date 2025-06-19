// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

import HomePage from "./pages/Home";
import ImageToPdf from "./pages/ToPdf/ImageToPdf";
import JpgToPdf from "./pages/ToPdf/JpgToPdf";
import PngToPdf from "./pages/ToPdf/PngToPdf";
import HeicTooPdf from "./pages/ToPdf/HeicToPdf";
import WebpToPdf from "./pages/ToPdf/WebpToPdf";
import MultipleImagesToPdf from "./pages/ToPdf/MultipleImagesToPdf";
import CombineImagesToPdf from "./pages/ToPdf/CombineImagesToPdf";
import ScreenshotToPdf from "./pages/ToPdf/ScreenshotToPdf";
import PhotoToPdf from "./pages/ToPdf/PhotoToPdf";
import OnlineImageToPdf from "./pages/ToPdf/OnlineImageToPdf";
import IPhoneImageToPdf from "./pages/ToPdf/IPhoneImageToPdf";
import AndroidImageToPdf from "./pages/ToPdf/AndroidImageToPdf";
import WindowsImageToPdf from "./pages/ToPdf/WindowsImageToPdf";
import MacImageToPdf from "./pages/ToPdf/MacImageToPdf";
import NotFound404 from "./pages/NotFound404";
import Header from "./components/Header";
import PdfToJpg from "./pages/ToJpg/PdfToJpg";
import PdfToPng from "./pages/PdfToPng";
import PngToWebp from "./pages/PngToWebp";
import WebpToPng from "./pages/WebpToPng";
import PdfToWebp from "./pages/PdfToWebp";
import PdfToBmp from "./pages/PdfToBmp";
import PdfToTiff from "./pages/PdfToTiff";
import JpgToPng from "./pages/JpgToPng";
import PngToJpg from "./pages/ToJpg/PngToJpg";
import HeicToJpg from "./pages/ToJpg/HeicToJpg";
import WebpToJpg from "./pages/ToJpg/WebpToJpg";
import BmpToJpg from "./pages/ToJpg/BmpToJpg";
import TiffToJpg from "./pages/ToJpg/TiffToJpg";
import JpgToWebp from "./pages/JpgToWebp";
import SvgToPng from "./pages/SvgToPng";
import CompressPdf from "./pages/ToPdf/CompressPdf";
import CompressImage from "./pages/CompressImage";
import MergePdf from "./pages/MergePdf";
import SplitPdf from "./pages/SplitPdf";
import PdfToWord from "./pages/PdfToWord";
import WordToPdf from "./pages/Topdf/WordToPdf";
import JpgToJpeg from "./pages/JpgToJpeg";
import ImageConverter from "./pages/ImageConverter";

function App() {
  return (
    <Router>
      <Helmet>
        <title>All-in-One PDF & Image Converter Tools | Asthica</title>
        <meta name="description" content="Free online tools to convert images to PDF, compress PDFs, merge/split files, and convert between image formats like JPG, PNG, WebP, HEIC, and more." />
        <meta name="keywords" content="image to pdf, jpg to pdf, pdf to jpg, png to pdf, compress pdf, merge pdf, split pdf, pdf to word, word to pdf, online image converter, heic to jpg, webp to png, convert images to pdf, asthica tools" />
        <meta name="author" content="Asthica" />
        <link rel="canonical" href="https://www.asthica.com/" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="All-in-One PDF & Image Converter Tools | Asthica" />
        <meta property="og:description" content="Convert images to PDF and handle all your file format needs online. Free, fast, secure tools by Asthica." />
        <meta property="og:url" content="https://www.asthica.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.asthica.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Online PDF & Image Tools | Asthica" />
        <meta name="twitter:description" content="Convert and edit PDFs and images with Asthica's free tools." />
        <meta name="twitter:image" content="https://www.asthica.com/og-image.jpg" />
        {/* Minimal Soft Theme Colors */}
        <meta name="theme-color" content="#6366F1" />
      </Helmet>
      <div className="min-h-screen flex flex-col font-sans bg-[#E0F2FE] text-[#1F2937]">
        <Header />
        <main className="flex-1 w-full max-w-screen-xl mx-auto px-2 sm:px-4 md:px-8 py-4 md:py-8 bg-white rounded-xl shadow-sm">
          <Routes>
            {/* PDF to Image Converters */}
            <Route path="/pdf-to-jpg" element={<PdfToJpg />} /> {/* pdf to jpg */}
            <Route path="/pdf-to-png" element={<PdfToPng />} />
            <Route path="/pdf-to-webp" element={<PdfToWebp />} />
            <Route path="/pdf-to-bmp" element={<PdfToBmp />} />
            <Route path="/pdf-to-tiff" element={<PdfToTiff />} />

            {/* Image Format Converters */}
            <Route path="/jpg-to-png" element={<JpgToPng />} />
            <Route path="/jpg-to-jpeg" element={<JpgToJpeg />} />
            <Route path="/png-to-jpg" element={<PngToJpg />} />
            <Route path="/heic-to-jpg" element={<HeicToJpg />} />
            <Route path="/webp-to-jpg" element={<WebpToJpg />} />
            <Route path="/bmp-to-jpg" element={<BmpToJpg />} />
            <Route path="/tiff-to-jpg" element={<TiffToJpg />} />
            <Route path="/jpg-to-webp" element={<JpgToWebp />} />
            <Route path="/png-to-webp" element={<PngToWebp />} />
            <Route path="/svg-to-png" element={<SvgToPng />} />
            <Route path="/image-convert" element={<ImageConverter />} />
            {/* PDF Utilities */}
            <Route path="/compress-pdf" element={<CompressPdf />} />
            <Route path="/merge-pdf" element={<MergePdf />} />
            <Route path="/split-pdf" element={<SplitPdf />} />
            <Route path="/pdf-to-word" element={<PdfToWord />} />
            <Route path="/word-to-pdf" element={<WordToPdf />} />

            {/* Existing routes */}
            <Route path="/jpg-to-pdf" element={<JpgToPdf />} /> {/* important */}
            <Route path="/image-to-pdf" element={<ImageToPdf />} />
            <Route path="/png-to-pdf" element={<PngToPdf />} />
            <Route path="/heic-to-pdf" element={<HeicTooPdf />} />
            <Route path="/webp-to-pdf" element={<WebpToPdf />} />
            <Route path="/multiple-images-to-pdf" element={<MultipleImagesToPdf />} />
            <Route path="/combine-images-to-pdf" element={<CombineImagesToPdf />} />
            <Route path="/screenshot-to-pdf" element={<ScreenshotToPdf />} />
            <Route path="/photo-to-pdf" element={<PhotoToPdf />} />
            <Route path="/online-image-to-pdf" element={<OnlineImageToPdf />} />
            <Route path="/iphone-image-to-pdf" element={<IPhoneImageToPdf />} />
            <Route path="/android-image-to-pdf" element={<AndroidImageToPdf />} />
            <Route path="/windows-image-to-pdf" element={<WindowsImageToPdf />} />
            <Route path="/mac-image-to-pdf" element={<MacImageToPdf />} />
            
            <Route path="/compress-image" element={<CompressImage />} />
            
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

