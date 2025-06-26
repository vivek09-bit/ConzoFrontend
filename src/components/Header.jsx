import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  FiFile, FiImage, FiDownload, FiUpload, FiSettings,
  FiSmartphone, FiGlobe, FiCamera, FiUsers, FiLayers,
  FiChevronDown, FiChevronUp, FiX, FiMenu
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const premiumIcons = {
  "Image to PDF": <FiFile className="text-indigo-400" />,
  "PDF to Image": <FiImage className="text-blue-400" />,
  "Compress PDF": <FiDownload className="text-emerald-400" />,
  "Merge PDF": <FiLayers className="text-amber-400" />,
  "Split PDF": <FiSettings className="text-rose-400" />,
  "JPG to PDF": <FiFile className="text-indigo-400" />,
  "PNG to PDF": <FiFile className="text-indigo-400" />,
  "HEIC to JPG": <FiSmartphone className="text-violet-400" />,
  "WEBP to PNG": <FiGlobe className="text-sky-400" />,
  "Screenshot to PDF": <FiCamera className="text-pink-400" />
};

const menuSections = [
  {
    title: "Convert",
    items: [
      { path: "/jpg-to-pdf", name: "JPG to PDF" },
      { path: "/png-to-pdf", name: "PNG to PDF" },
      { path: "/heic-to-jpg", name: "HEIC to JPG" },
      { path: "/webp-to-png", name: "WEBP to PNG" }
    ]
  },
  {
    title: "Compress",
    items: [
      { path: "/compress-pdf", name: "Compress PDF" },
      { path: "/compress-image", name: "Compress Image" }
    ]
  },
  {
    title: "PDF Tools",
    items: [
      { path: "/merge-pdf", name: "Merge PDF" },
      { path: "/split-pdf", name: "Split PDF" }
    ]
  }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();
  const headerRef = useRef();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveMenu(null);
  }, [location]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setIsMenuOpen(false);
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header 
      ref={headerRef}
      className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <NavLink 
              to="/" 
              className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center"
            >
              <FiLayers className="mr-2 text-indigo-500" />
              ImgPDF<span className="font-light">Hub</span>
            </NavLink>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {menuSections.map((section, idx) => (
              <div key={section.title} className="relative">
                <motion.button
                  whileHover={{ color: '#6366f1' }}
                  onClick={() => setActiveMenu(activeMenu === idx ? null : idx)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-indigo-500 flex items-center transition-colors"
                >
                  {section.title}
                  <motion.span
                    animate={{ rotate: activeMenu === idx ? 180 : 0 }}
                    className="ml-1"
                  >
                    <FiChevronDown size={14} />
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {activeMenu === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ type: 'spring', damping: 20 }}
                      className="absolute left-0 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-black/5 z-50 overflow-hidden"
                    >
                      {section.items.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                          onClick={() => setActiveMenu(null)}
                        >
                          <span className="mr-3">
                            {premiumIcons[item.name] || <FiFile className="text-gray-400" />}
                          </span>
                          {item.name}
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-indigo-500 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
              {menuSections.map((section) => (
                <div key={section.title} className="mb-2">
                  <button
                    onClick={() => setActiveMenu(activeMenu === section.title ? null : section.title)}
                    className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                  >
                    {section.title}
                    {activeMenu === section.title ? (
                      <FiChevronUp className="text-indigo-500" />
                    ) : (
                      <FiChevronDown className="text-gray-400" />
                    )}
                  </button>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: activeMenu === section.title ? 'auto' : 0 }}
                    className="overflow-hidden pl-4"
                  >
                    {section.items.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 flex items-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="mr-3">
                          {premiumIcons[item.name] || <FiFile className="text-gray-400" />}
                        </span>
                        {item.name}
                      </NavLink>
                    ))}
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;