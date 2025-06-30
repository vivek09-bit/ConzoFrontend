import React from 'react';
import { FiCheck, FiDownload, FiFileText, FiLock, FiSliders, FiGlobe, FiAward, FiSmartphone, FiUser } from 'react-icons/fi';

const PdfToJpgGuide = () => {
    // Data arrays for modular content
    const globalUses = [
        { country: "India", use: "Educators extracting PDF slides as JPGs for online teaching" },
        { country: "USA", use: "Marketers converting brochures to images for social media" },
        { country: "Japan", use: "Designers pulling visuals from PDF portfolios for editing" },
        { country: "Australia", use: "Students saving PDF notes as JPGs for quick sharing" }
    ];

    const formatComparison = [
        { feature: "File Size", pdf: "Larger for multi-page documents", jpg: "Smaller, optimized for images" },
        { feature: "Content Structure", pdf: "Multi-page, text-heavy", jpg: "Single, visual-focused images" },
        { feature: "Compatibility", pdf: "Requires PDF reader", jpg: "Universal across image viewers" },
        { feature: "Use Cases", pdf: "Reports, eBooks, forms", jpg: "Photos, web graphics, thumbnails" }
    ];

    const conversionSteps = [
        "Upload your PDF file - drag and drop or browse your device",
        "Select specific pages or convert all to JPG images",
        "Click 'Convert to JPG' to process the PDF",
        "Download your high-quality JPG files instantly"
    ];

    const faqs = [
        {
            question: "Can I convert specific pages of a PDF to JPG?",
            answer: "Yes, our tool allows you to choose individual pages or convert the entire PDF, supporting up to 20 pages (max 50MB)."
        },
        {
            question: "Will the JPG images retain the PDF’s quality?",
            answer: "Absolutely, our converter ensures high-resolution JPGs that preserve the original PDF’s clarity."
        },
        {
            question: "Is it safe to upload my PDF files?",
            answer: "Yes, files are processed locally in your browser and automatically deleted after conversion for maximum security."
        },
        {
            question: "Can I convert multiple PDFs at once?",
            answer: "Our tool processes one PDF at a time, but you can convert multiple pages into separate JPGs in a single session."
        }
    ];

    const proTips = [
        "Use 300 DPI for high-quality JPGs suitable for printing or editing",
        "Select only necessary pages to keep file sizes manageable",
        "Preview JPGs to ensure text and visuals are clear",
        "Optimize JPGs for web use with 72-150 DPI to reduce file size"
    ];

    const whyChooseUs = [
        "Free, no registration or watermarks",
        "Fast conversion with progress tracking",
        "Secure, browser-based processing",
        "User-friendly with customizable page selection"
    ];

    const pdfFeatures = [
        "Universal format for documents and reports",
        "Supports multiple pages in a single file",
        "Secure and widely compatible"
    ];

    const jpgFeatures = [
        "Ideal for photos, graphics, and web content",
        "Compact file size for quick sharing",
        "Editable in image editing software"
    ];

    const conversionScenarios = [
        "Extracting PDF pages as JPGs for social media posts",
        "Creating thumbnails from PDF documents for websites",
        "Converting presentation slides to images for sharing",
        "Pulling visuals from PDFs for design projects",
        "Archiving PDF content as JPGs for quick reference"
    ];

    const toolFeatures = [
        {
            icon: <FiSliders className="text-2xl text-indigo-500" />,
            title: "Custom Page Selection",
            points: [
                "Choose specific pages or convert all",
                "Adjust quality settings for optimal output"
            ]
        },
        {
            icon: <FiFileText className="text-2xl text-indigo-500" />,
            title: "High-Quality JPGs",
            points: [
                "Retains original PDF clarity",
                "Perfect for professional and personal use"
            ]
        },
        {
            icon: <FiDownload className="text-2xl text-indigo-500" />,
            title: "Instant Conversion",
            points: [
                "Processes PDFs in seconds",
                "Download JPGs individually or as a ZIP"
            ]
        },
        {
            icon: <FiLock className="text-2xl text-indigo-500" />,
            title: "Secure Processing",
            points: [
                "Local processing, no server storage",
                "Files auto-deleted after conversion"
            ]
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
            <article className="prose prose-lg max-w-none">
                {/* Header Section */}
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        The Ultimate Guide to Converting PDF to JPG Online
                    </h1>
                    <div className="w-20 h-1 bg-indigo-500 mb-6"></div>
                </header>

                {/* File Types Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                        <FiFileText className="mr-2 text-indigo-500" />
                        Understanding PDF and JPG Formats
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* PDF Card */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <h3 className="text-xl font-medium text-gray-800 mb-4">PDF Files</h3>
                            <p className="text-gray-700 mb-4">
                                PDFs are ideal for professional, multi-page documents:
                            </p>
                            <ul className="space-y-2">
                                {pdfFeatures.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* JPG Card */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <h3 className="text-xl font-medium text-gray-800 mb-4">JPG Files</h3>
                            <p className="text-gray-700 mb-4">
                                JPGs are perfect for visuals and web content:
                            </p>
                            <ul className="space-y-2">
                                {jpgFeatures.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Conversion Scenarios Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        When to Convert PDF to JPG
                    </h2>
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <ul className="space-y-4">
                            {conversionScenarios.map((scenario, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                                        {index + 1}
                                    </span>
                                    <span className="text-gray-700">{scenario}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Tool Features Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        Why Our PDF to JPG Converter Excels
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {toolFeatures.map((feature, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center mb-4">
                                    <div className="bg-indigo-100 p-2 rounded-full mr-3">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-medium text-gray-800">
                                        {feature.title}
                                    </h3>
                                </div>
                                <ul className="space-y-2 pl-2">
                                    {feature.points.map((point, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className="text-indigo-500 mr-2">•</span>
                                            <span className="text-gray-700">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Global Uses Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                        <FiGlobe className="mr-2 text-indigo-500" />
                        Global Use Cases for PDF to JPG Conversion
                    </h2>
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <p className="text-gray-700 mb-4">
                            Our tool is used worldwide to:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {globalUses.map((item, index) => (
                                <div key={index} className="flex items-start">
                                    <span className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                                        {index + 1}
                                    </span>
                                    <div>
                                        <span className="font-medium text-gray-800 block">{item.country}:</span>
                                        <span className="text-gray-700">{item.use}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Format Comparison Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        PDF vs JPG: A Comprehensive Comparison
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PDF Format</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">JPG Format</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {formatComparison.map((row, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.feature}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.pdf}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.jpg}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Conversion Steps Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        How to Convert PDF to JPG in 4 Simple Steps
                    </h2>
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <ol className="space-y-4">
                            {conversionSteps.map((step, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                                        {index + 1}
                                    </span>
                                    <span className="text-gray-700">{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        Frequently Asked Questions About PDF to JPG Conversion
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">{item.question}</h3>
                                <p className="text-gray-700">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Pro Tips Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        Expert Tips for Converting PDF to JPG
                    </h2>
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <ul className="space-y-3">
                            {proTips.map((tip, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                                        <FiCheck className="text-green-500" />
                                    </span>
                                    <span className="text-gray-700">{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                        <FiAward className="mr-2 text-indigo-500" />
                        Why Choose Our PDF to JPG Converter
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {whyChooseUs.map((reason, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center">
                                    {index === 0 && <FiSmartphone className="text-2xl text-indigo-500 mr-3" />}
                                    {index === 1 && <FiUser className="text-2xl text-indigo-500 mr-3" />}
                                    {index === 2 && <FiAward className="text-2xl text-indigo-500 mr-3" />}
                                    {index === 3 && <FiDownload className="text-2xl text-indigo-500 mr-3" />}
                                    <h3 className="text-lg font-medium text-gray-900">{reason}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </article>
        </div>
    );
};

export default PdfToJpgGuide;