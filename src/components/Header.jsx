import React, { useState, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

// Define icons for each tool
const icons = {
  "Image to PDF": <span role="img" aria-label="image-pdf">🖼️</span>,
  "JPEG to JPG": <span role="img" aria-label="jpeg-to-jpg">🖼️</span>,
  "JPG to JPEG": <span role="img" aria-label="jpg-to-jpeg">🖼️</span>,
  "AVIF to JPG": <span role="img" aria-label="avif-to-jpg">🖼️</span>,
  "AVIF to PNG": <span role="img" aria-label="avif-to-png">🖼️</span>,
  "JPG to PDF": <span role="img" aria-label="jpg-pdf">🟦</span>, 
  "PNG to PDF": <span role="img" aria-label="png-pdf">🟩</span>,
  "HEIC to PDF": <span role="img" aria-label="heic-pdf">📱</span>,
  "WEBP to PDF": <span role="img" aria-label="webp-pdf">🌐</span>,
  "Multiple Images to PDF": <span role="img" aria-label="multi-img-pdf">🗂️</span>,
  "Combine Images to PDF": <span role="img" aria-label="combine-img-pdf">➕</span>,
  "Screenshot to PDF": <span role="img" aria-label="screenshot-pdf">📸</span>,
  "Photo to PDF": <span role="img" aria-label="photo-pdf">📷</span>,
  "Online Image to PDF": <span role="img" aria-label="online-img-pdf">🌍</span>,
  "iPhone Image to PDF": <span role="img" aria-label="iphone-img-pdf">📱</span>,
  "Android Image to PDF": <span role="img" aria-label="android-img-pdf">🤖</span>,
  "Windows Image to PDF": <span role="img" aria-label="windows-img-pdf">🪟</span>,
  "Mac Image to PDF": <span role="img" aria-label="mac-img-pdf">🍏</span>,
  "PDF to JPG": <span role="img" aria-label="pdf-jpg">🖼️</span>,
  "PDF to PNG": <span role="img" aria-label="pdf-png">🖼️</span>,
  "PDF to WEBP": <span role="img" aria-label="pdf-webp">🖼️</span>,
  "PDF to BMP": <span role="img" aria-label="pdf-bmp">🖼️</span>,
  "PDF to TIFF": <span role="img" aria-label="pdf-tiff">🖼️</span>,
  "JPG to PNG": <span role="img" aria-label="jpg-png">🟦</span>,
  "PNG to JPG": <span role="img" aria-label="png-jpg">🟩</span>,
  "HEIC to JPG": <span role="img" aria-label="heic-jpg">📱</span>,
  "WEBP to JPG": <span role="img" aria-label="webp-jpg">🌐</span>,
  "BMP to JPG": <span role="img" aria-label="bmp-jpg">🖼️</span>,
  "TIFF to JPG": <span role="img" aria-label="tiff-jpg">🖼️</span>,
  "JPG to WEBP": <span role="img" aria-label="jpg-webp">🟦</span>,
  "PNG to WEBP": <span role="img" aria-label="png-webp">🟩</span>,
  "WEBP to PNG": <span role="img" aria-label="webp-png">🌐</span>,
  "SVG to PNG": <span role="img" aria-label="svg-png">🔳</span>,
  "Compress PDF": <span role="img" aria-label="compress-pdf">🗜️</span>,
  "Merge PDF": <span role="img" aria-label="merge-pdf">📎</span>,
  "Split PDF": <span role="img" aria-label="split-pdf">✂️</span>,
  "PDF to Word": <span role="img" aria-label="pdf-word">📝</span>,
  "Word to PDF": <span role="img" aria-label="word-pdf">📄</span>,
};

// Define your mega menu categories
const megaMenuCategories = [
  {
    label: "Image Converters",
    links: [

      { to: "/png-to-jpg", label: "PNG to JPG" },
      { to: "/jpeg-to-jpg", label: "JPEG to JPG" },
      { to: "/webp-to-jpg", label: "WEBP to JPG" },
      { to: "/avif-to-jpg", label: "AVIF to JPG" },
      { to: "/jpg-to-webp", label: "JPG to WEBP" },
      { to: "/jpg-to-png", label: "JPG to PNG" },
      { to: "/png-to-webp", label: "PNG to WEBP" },
      { to: "/jpg-to-jpeg", label: "JPG to JPEG" },
      { to: "/avif-to-png", label: "AVIF to PNG" },
      { to: "/svg-to-png", label: "SVG to PNG" },
    ],
  },
  {
    label: "Document Converters",
    links: [
      { to: "/pdf-to-word", label: "PDF to Word" },
      { to: "/word-to-pdf", label: "Word to PDF" },
      { to: "/jpg-to-pdf", label: "JPG to PDF" },
      { to: "/png-to-pdf", label: "PNG to PDF" },
      { to: "/heic-to-pdf", label: "HEIC to PDF" },
      { to: "/webp-to-pdf", label: "WEBP to PDF" },
      { to: "/image-to-pdf", label: "Image to PDF" },
      { to: "/combine-images-to-pdf", label: "Combine Images to PDF" },
      { to: "/screenshot-to-pdf", label: "Screenshot to PDF" },
    ],
  },
  {
    label: "PDF Tools",
    links: [
      { to: "/compress-pdf", label: "Compress PDF" },
      { to: "/merge-pdf", label: "Merge PDF" },
      { to: "/split-pdf", label: "Split PDF" },
      { to: "/pdf-to-jpg", label: "PDF to JPG" },
      { to: "/pdf-to-png", label: "PDF to PNG" },
      { to: "/pdf-to-webp", label: "PDF to WEBP" },
      { to: "/pdf-to-bmp", label: "PDF to BMP" },
      { to: "/pdf-to-tiff", label: "PDF to TIFF" },
    ],
  },
  {
    label: "Device-Specific Tools",
    links: [
      { to: "/iphone-image-to-pdf", label: "iPhone Image to PDF" },
      { to: "/android-image-to-pdf", label: "Android Image to PDF" },
      { to: "/windows-image-to-pdf", label: "Windows Image to PDF" },
      { to: "/mac-image-to-pdf", label: "Mac Image to PDF" },
      { to: "/online-image-to-pdf", label: "Online Image to PDF" },
    ],
  },
];

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const location = useLocation();
  const menuRefs = useRef([]);

  // Responsive: close sidebar on route change
  React.useEffect(() => {
    setSidebarOpen(false);
    setOpenCategory(null);
  }, [location.pathname]);

  // Improved: Keep dropdown open when mouse is over button or dropdown
  const handleMouseEnter = (idx) => setOpenCategory(idx);
  const handleMouseLeave = (idx) => {
    // Use a timeout to allow moving between button and dropdown
    setTimeout(() => {
      if (
        menuRefs.current[idx] &&
        !menuRefs.current[idx].matches(":hover")
      ) {
        setOpenCategory(null);
      }
    }, 100);
  };

  return (
    <header className="bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-extrabold text-white tracking-tight">
            <a href="/">ImgPdfHub</a>
          </span>
        </div>

        {/* Desktop Mega Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {megaMenuCategories.map((cat, idx) => (
            <div
              key={cat.label}
              className="relative"
              ref={el => (menuRefs.current[idx] = el)}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
            >
              <button
                className="px-4 py-2 rounded-lg font-medium text-gray-200 hover:bg-gray-700 transition-colors duration-200 focus:outline-none flex items-center"
                onClick={() => setOpenCategory(openCategory === idx ? null : idx)}
                type="button"
                aria-expanded={openCategory === idx}
                aria-controls={`mega-menu-${idx}`}
              >
                {cat.label}
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {/* Mega Menu Dropdown */}
              <div
                id={`mega-menu-${idx}`}
                className={`absolute left-0 mt-2 bg-white text-gray-900 shadow-2xl rounded-xl p-4 min-w-[260px] transform transition-all duration-200 origin-top ${
                  openCategory === idx ? "block scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
                }`}
                style={{ zIndex: 100 }}
              >
                <ul>
                  {cat.links.map((link) => (
                    <li key={link.to}>
                      <NavLink
                        to={link.to}
                        className={({ isActive }) =>
                          `flex items-center px-2 py-2 rounded-lg font-medium transition-colors duration-200 mb-1
                          ${
                            isActive
                              ? "bg-blue-100 text-blue-700"
                              : "hover:bg-indigo-600 hover:text-white hover:shadow"
                          }`
                        }
                      >
                        <span className="mr-2">{icons[link.label]}</span>
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-200 focus:outline-none"
          onClick={() => setSidebarOpen((open) => !open)}
          aria-label="Toggle sidebar"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                sidebarOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Sticky Sidebar for Mobile */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <span className="text-xl font-extrabold">Menu</span>
          <button
            className="text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="overflow-y-auto h-[calc(100%-64px)] px-4 py-4">
          {megaMenuCategories.map((cat, idx) => (
            <div key={cat.label} className="mb-4">
              <button
                className="flex items-center w-full px-3 py-2 rounded-lg font-medium text-gray-200 hover:bg-gray-800 transition-colors duration-200 focus:outline-none"
                onClick={() => setOpenCategory(openCategory === idx ? null : idx)}
                type="button"
              >
                {cat.label}
                <svg
                  className={`ml-auto w-4 h-4 transform transition-transform duration-200 ${
                    openCategory === idx ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className={`${openCategory === idx ? "block" : "hidden"} pl-4 mt-2`}>
                <ul>
                  {cat.links.map((link) => (
                    <li key={link.to}>
                      <NavLink
                        to={link.to}
                        className={({ isActive }) =>
                          `flex items-center px-2 py-2 rounded-lg font-medium transition-colors duration-200 mb-1 ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : "hover:bg-gray-800"
                          }`
                        }
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="mr-2">{icons[link.label]}</span>
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </nav>
      </aside>
      {/* Overlay for sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </header>
  );
}

export default Header;
