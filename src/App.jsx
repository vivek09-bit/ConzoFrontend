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
import WebpToJpg from "./pages/WebpToJpg";
import BmpToJpg from "./pages/ToJpg/BmpToJpg";
import TiffToJpg from "./pages/ToJpg/TiffToJpg";
import JpgToWebp from "./pages/JpgToWebp";
import SvgToPng from "./pages/SvgToPng";
import CompressPdf from "./pages/ToPdf/CompressPdf";
import CompressImage from "./pages/CompressImage";
import MergePdf from "./pages/MergePdf";
import SplitPdf from "./pages/SplitPdf";
import PdfToWord from "./pages/PdfToWord";
// import WordToPdf from "./pages/Topdf/WordToPdf";
import JpgToJpeg from "./pages/JpgToJpeg";
import JpegToJpg from "./pages/JpegToJpg";
import ImageConverter from "./pages/ImageConverter";
import AvifToJpg from './pages/AvifToJpg';
import AvifToPng from './pages/AvifToPng'
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-[#E0F2FE] text-[#1F2937]">
        <Header />
        {/* <main className="flex-1 w-full max-w-screen-xl mx-auto px-2 sm:px-4 md:px-8 py-4 md:py-8 bg-white rounded-xl shadow-sm"> */}
          <Routes>
            {/* PDF to Image Converters */}
            <Route path="/pdf-to-jpg" element={<PdfToJpg />} />
            <Route path="/pdf-to-png" element={<PdfToPng />} />
            <Route path="/pdf-to-webp" element={<PdfToWebp />} />
            <Route path="/pdf-to-bmp" element={<PdfToBmp />} />
            <Route path="/pdf-to-tiff" element={<PdfToTiff />} />

            {/* Image Format Converters */}
            <Route path="/jpg-to-pdf" element={<JpgToPdf />} />
            <Route path="/jpg-to-png" element={<JpgToPng />} />
            <Route path="/jpg-to-jpeg" element={<JpgToJpeg />} />
            <Route path="/jpeg-to-jpg" element={<JpegToJpg />} />
            <Route path="/jpg-to-webp" element={<JpgToWebp />} />
            <Route path="/png-to-jpg" element={<PngToJpg />} />
            <Route path="/heic-to-jpg" element={<HeicToJpg />} />
            <Route path="/webp-to-png" element={<WebpToPng />} />
            <Route path="/bmp-to-jpg" element={<BmpToJpg />} />
            <Route path="/tiff-to-jpg" element={<TiffToJpg />} />
            <Route path="/avif-to-jpg" element={<AvifToJpg />} />
            <Route path="/png-to-webp" element={<PngToWebp />} />
            <Route path="/avif-to-png" element={<AvifToPng />} />
            <Route path="/image-convert" element={<ImageConverter />} />
            <Route path="/webp-to-jpg" element={<WebpToJpg />} />
            <Route path="/avif-to-jpg" element={<AvifToJpg />} />
            
            {/* PDF Utilities */}
            <Route path="/compress-pdf" element={<CompressPdf />} />
            <Route path="/merge-pdf" element={<MergePdf />} />
            <Route path="/split-pdf" element={<SplitPdf />} />
            <Route path="/pdf-to-word" element={<PdfToWord />} />
            {/* <Route path="/word-to-pdf" element={<WordToPdf />} /> */}

            {/* Existing routes */}
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
        {/* </main> */}
      </div>
    </Router>
  );
}

export default App;

