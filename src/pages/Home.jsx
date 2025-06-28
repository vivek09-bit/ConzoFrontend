import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { DOMAIN } from "../constants";

// Optimized icon imports (only using available icons)
import {
  FaFilePdf,
  FaFileImage,
  FaFileArchive,
  FaFileWord,
  FaFileContract,
  FaCompressAlt,
  FaObjectGroup,
  FaCut,
  FaMobileAlt,
  FaCamera,
  FaGlobe,
  FaRobot,
  FaApple,
  FaWindows,
  FaImage
} from "react-icons/fa";
import {
  MdPhotoCamera,
  MdPhotoLibrary,
  MdOutlinePictureAsPdf
} from "react-icons/md";
import {
  BsFiletypePng,
  BsFiletypeJpg,
  BsFiletypeBmp,
  BsFiletypeTiff,
  BsFiletypeSvg,
  BsImage
} from "react-icons/bs";

// Custom icon components for consistency
const ScreenshotIcon = () => <FaCamera className="text-blue-400" />;
const PhotoIcon = () => <MdPhotoCamera className="text-pink-500" />;
const WebPIcon = () => <FaFileImage className="text-orange-500" />;

// Enhanced tool categories with better organization
const toolCategories = [
  {
    name: "Image to PDF Converters",
    tools: [
      { to: "/jpg-to-pdf", label: "JPG to PDF", desc: "Convert JPG images to PDF", icon: <BsFiletypeJpg className="text-blue-500" /> },
      { to: "/png-to-pdf", label: "PNG to PDF", desc: "Convert PNG images to PDF", icon: <BsFiletypePng className="text-green-500" /> },
      { to: "/heic-to-pdf", label: "HEIC to PDF", desc: "Convert HEIC images to PDF", icon: <FaMobileAlt className="text-purple-500" /> },
      { to: "/webp-to-pdf", label: "WEBP to PDF", desc: "Convert WEBP images to PDF", icon: <WebPIcon /> },
      { to: "/image-to-pdf", label: "Image to PDF", desc: "Convert any image to PDF", icon: <FaImage className="text-indigo-500" /> },
    ]
  },
  {
    name: "PDF to Image Converters",
    tools: [
      { to: "/pdf-to-jpg", label: "PDF to JPG", desc: "Convert PDF pages to JPG images", icon: <BsFiletypeJpg className="text-blue-500" /> },
      { to: "/pdf-to-png", label: "PDF to PNG", desc: "Convert PDF pages to PNG images", icon: <BsFiletypePng className="text-green-500" /> },
      { to: "/pdf-to-webp", label: "PDF to WEBP", desc: "Convert PDF pages to WEBP images", icon: <WebPIcon /> },
      { to: "/pdf-to-bmp", label: "PDF to BMP", desc: "Convert PDF pages to BMP images", icon: <BsFiletypeBmp className="text-gray-500" /> },
      { to: "/pdf-to-tiff", label: "PDF to TIFF", desc: "Convert PDF pages to TIFF images", icon: <BsFiletypeTiff className="text-teal-500" /> },
    ]
  },
  {
    name: "Image Format Converters",
    tools: [
      { to: "/png-to-jpg", label: "PNG to JPG", desc: "Convert PNG images to JPG", icon: <BsFiletypePng className="text-green-500" /> },
      { to: "/jpg-to-png", label: "JPG to PNG", desc: "Convert JPG images to PNG", icon: <BsFiletypeJpg className="text-blue-500" /> },
      { to: "/webp-to-jpg", label: "WEBP to JPG", desc: "Convert WEBP images to JPG", icon: <WebPIcon /> },
      { to: "/jpg-to-webp", label: "JPG to WEBP", desc: "Convert JPG images to WEBP", icon: <BsFiletypeJpg className="text-blue-500" /> },
      { to: "/png-to-webp", label: "PNG to WEBP", desc: "Convert PNG images to WEBP", icon: <BsFiletypePng className="text-green-500" /> },
      { to: "/webp-to-png", label: "WEBP to PNG", desc: "Convert WEBP images to PNG", icon: <WebPIcon /> },
      { to: "/heic-to-jpg", label: "HEIC to JPG", desc: "Convert HEIC images to JPG", icon: <FaMobileAlt className="text-purple-500" /> },
      { to: "/bmp-to-jpg", label: "BMP to JPG", desc: "Convert BMP images to JPG", icon: <BsFiletypeBmp className="text-gray-500" /> },
      { to: "/tiff-to-jpg", label: "TIFF to JPG", desc: "Convert TIFF images to JPG", icon: <BsFiletypeTiff className="text-teal-500" /> },
      { to: "/svg-to-png", label: "SVG to PNG", desc: "Convert SVG images to PNG", icon: <BsFiletypeSvg className="text-pink-500" /> },
    ]
  },
  {
    name: "PDF Utilities",
    tools: [
      { to: "/compress-pdf", label: "Compress PDF", desc: "Reduce PDF file size", icon: <FaCompressAlt className="text-red-500" /> },
      { to: "/merge-pdf", label: "Merge PDF", desc: "Combine multiple PDFs", icon: <FaObjectGroup className="text-yellow-500" /> },
      { to: "/split-pdf", label: "Split PDF", desc: "Split a PDF into parts", icon: <FaCut className="text-green-600" /> },
      { to: "/pdf-to-word", label: "PDF to Word", desc: "Convert PDF to Word document", icon: <FaFileWord className="text-blue-600" /> },
      { to: "/word-to-pdf", label: "Word to PDF", desc: "Convert Word document to PDF", icon: <FaFilePdf className="text-red-600" /> },
    ]
  },
  {
    name: "Advanced Image Tools",
    tools: [
      { to: "/compress-image", label: "Compress Image", desc: "Reduce JPG, PNG, WEBP Image size", icon: <FaCompressAlt className="text-red-500" /> },
      { to: "/multiple-images-to-pdf", label: "Multiple Images to PDF", desc: "Combine multiple images into a PDF", icon: <FaFileArchive className="text-indigo-500" /> },
      { to: "/combine-images-to-pdf", label: "Combine Images to PDF", desc: "Merge images into a single PDF", icon: <FaFileContract className="text-purple-500" /> },
      { to: "/screenshot-to-pdf", label: "Screenshot to PDF", desc: "Convert screenshots to PDF", icon: <ScreenshotIcon /> },
      { to: "/photo-to-pdf", label: "Photo to PDF", desc: "Convert photos to PDF", icon: <PhotoIcon /> },
      { to: "/online-image-to-pdf", label: "Online Image to PDF", desc: "Convert online images to PDF", icon: <FaGlobe className="text-blue-500" /> },
      { to: "/iphone-image-to-pdf", label: "iPhone Image to PDF", desc: "Convert iPhone images to PDF", icon: <FaApple className="text-gray-700" /> },
      { to: "/android-image-to-pdf", label: "Android Image to PDF", desc: "Convert Android images to PDF", icon: <FaRobot className="text-green-500" /> },
      { to: "/windows-image-to-pdf", label: "Windows Image to PDF", desc: "Convert Windows images to PDF", icon: <FaWindows className="text-blue-600" /> },
      { to: "/mac-image-to-pdf", label: "Mac Image to PDF", desc: "Convert Mac images to PDF", icon: <FaApple className="text-gray-900" /> },
    ]
  }
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>ImgPdfHub | Convert Images to PDF Online Free – JPG, PNG, HEIC & More</title>
        <meta
          name="description"
          content="Easily convert JPG, PNG, HEIC, WEBP, PDF and other images to different files online for free with ImgPdfHub. Merge, compress, and manage your PDFs effortlessly on any device – fast, secure, and 100% free."
        />
        <meta
          name="keywords"
          content="image to pdf, jpg to pdf, png to pdf, heic to jpg, webp to pdf, free pdf converter, online image to pdf, merge images to pdf, compress jpg, photo to pdf, screenshot to pdf - ImgPdfHub"
        />
        <meta property="og:title" content="ImgPdfHub | Convert Images to PDF Online Free – JPG, PNG, WEBP & More" />
        <meta property="og:description" content="Convert images to PDF instantly with ImgPdfHub. Merge, compress, and manage PDFs for free — fast, easy, and secure." />
        <meta property="og:url" content={DOMAIN} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${DOMAIN}assets/og-image.png`} />
        <meta property="og:image:alt" content="ImgPdfHub – Convert images to PDF online for free" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ImgPdfHub | Convert Images to PDF Online Free – JPG, PNG, HEIC & More" />
        <meta name="twitter:description" content="Convert and manage PDFs online with ImgPdfHub. Simple tools for image-to-PDF, merge, compress, and more." />
        <meta name="twitter:image" content={`${DOMAIN}assets/og-image.png`} />
        <meta name="twitter:image:alt" content="Convert JPG, PNG to PDF - ImgPdfHub" />
        <link rel="canonical" href={DOMAIN} />
        <link rel="icon" href={`${DOMAIN}favicon.ico`} />
        {/* Schema.org markup for Google */}

        <script>{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WCGGQC7F');
`}
</script>

<script async src="https://www.googletagmanager.com/gtag/js?id=G-C3YH56WD5N"></script>
<script>
{`  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-C3YH56WD5N');
`}</script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "ImgPdfHub",
            "url": DOMAIN,
            "description": "Free online tools for converting images to PDF and other formats",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Web"
          })}
        </script>
      </Helmet>

      <main className="min-h-screen bg-gray-50">
        <section className="py-12 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-indigo-600">
              Welcome to <span className="text-indigo-800">IMG PDF HUB</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Convert your files quickly and easily with our fast, free online tools. Perfect for all your image and PDF conversion needs.
            </p>
          </div>

          {toolCategories.map((category) => (
            <div key={category.name} className="mb-16">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2 flex items-center">
                <MdOutlinePictureAsPdf className="mr-2 text-indigo-600" />
                {category.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {category.tools.map((tool) => (
                  <article
                    key={tool.to}
                    onClick={() => navigate(tool.to)}
                    className="cursor-pointer p-6 rounded-xl shadow-md hover:shadow-lg text-center transition-all duration-200 transform bg-white border border-gray-100 hover:scale-[1.02] hover:border-indigo-300 group"
                    aria-label={`Go to ${tool.label} tool`}
                  >
                    <div className="text-4xl mb-3 flex justify-center">
                      {React.cloneElement(tool.icon, { className: `${tool.icon.props.className} group-hover:scale-110 transition-transform` })}
                    </div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-800 group-hover:text-indigo-600">{tool.label}</h3>
                    <p className="text-gray-500 text-sm">{tool.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WCGGQC7F"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

    </>
  );
};

export default HomePage;