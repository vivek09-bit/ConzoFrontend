import React from 'react';
import { FiCheck, FiDownload, FiFileText, FiLock, FiSliders, FiGlobe, FiAward, FiSmartphone, FiUser } from 'react-icons/fi';

const JpgToPdfGuide = () => {
    // Data arrays for modular content
    const globalUses = [
        { country: "India", use: "Students merging scanned assignments into a single PDF" },
        { country: "USA", use: "Businesses creating professional reports from images" },
        { country: "Indonesia", use: "E-commerce sellers compiling product photos into catalogs" },
        { country: "UK", use: "Freelancers preparing image-based portfolios" }
    ];

    const formatComparison = [
        { feature: "File Size", jpg: "Smaller, compressed", pdf: "Optimized for multiple images" },
        { feature: "Document Sharing", jpg: "Single images, less professional", pdf: "Unified, multi-page document" },
        { feature: "Compatibility", jpg: "Image viewers", pdf: "Universal across devices and platforms" },
        { feature: "Use Cases", jpg: "Web images, photos", pdf: "Reports, presentations, portfolios" }
    ];

    const conversionSteps = [
        "Upload JPG files - drag and drop or browse your device",
        "Arrange images in your preferred order using up/down arrows",
        "Click 'Convert to PDF' to merge images into a single file",
        "Download your high-quality PDF instantly"
    ];

    const faqs = [
        {
            question: "Can I convert multiple JPG files into one PDF?",
            answer: "Yes, our tool combines up to 20 JPG files (max 50MB total) into a single PDF, maintaining their original quality."
        },
        {
            question: "Will my images lose quality during conversion?",
            answer: "No, our JPG to PDF converter preserves the original resolution and quality of your images."
        },
        {
            question: "Is it safe to upload my files?",
            answer: "Absolutely, files are processed locally in your browser and automatically deleted after conversion for maximum privacy."
        },
        {
            question: "Can I reorder images before converting to PDF?",
            answer: "Yes, use the up/down arrows to arrange images in the desired sequence before conversion."
        }
    ];

    const proTips = [
        "Use high-resolution JPGs (300 DPI) for professional PDFs",
        "Organize images logically for better document flow",
        "Preview images to ensure clarity before converting",
        "Check PDF compatibility with your target platform"
    ];

    const whyChooseUs = [
        "Free, no registration or watermarks",
        "Fast conversion with progress tracking",
        "Secure, browser-based processing",
        "User-friendly interface with image reordering"
    ];

    const jpgFeatures = [
        "Compact file size for quick uploads",
        "Ideal for photographs and web graphics",
        "Widely supported across devices"
    ];

    const pdfFeatures = [
        "Professional format for documents and reports",
        "Supports multiple pages in one file",
        "Easy to share, view, and print"
    ];

    const conversionScenarios = [
        "Combining scanned documents into a single PDF for submission",
        "Creating product catalogs from multiple product images",
        "Preparing image-based presentations for professional use",
        "Archiving photos in a shareable, compact format",
        "Sharing image collections in a professional PDF document"
    ];

    const toolFeatures = [
        {
            icon: <FiSliders className="text-2xl text-indigo-500" />,
            title: "Flexible Image Ordering",
            points: [
                "Rearrange images with simple up/down controls",
                "Preview images to confirm the sequence"
            ]
        },
        {
            icon: <FiFileText className="text-2xl text-indigo-500" />,
            title: "High-Quality PDFs",
            points: [
                "Retains original JPG quality",
                "Creates clean, professional documents"
            ]
        },
        {
            icon: <FiDownload className="text-2xl text-indigo-500" />,
            title: "Efficient Processing",
            points: [
                "Convert multiple JPGs in seconds",
                "Instant PDF download with progress bar"
            ]
        },
        {
            icon: <FiLock className="text-2xl text-indigo-500" />,
            title: "Privacy First",
            points: [
                "Files processed locally, never stored",
                "Automatic deletion after conversion"
            ]
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
            <article className="prose prose-lg max-w-none">
                {/* Header Section */}
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        The Ultimate Guide to Converting JPG to PDF Online
                    </h1>
                    <div className="w-20 h-1 bg-indigo-500 mb-6"></div>
                </header>

                {/* File Types Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                        <FiFileText className="mr-2 text-indigo-500" />
                        Understanding JPG and PDF Formats
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* JPG Card */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <h3 className="text-xl font-medium text-gray-800 mb-4">JPG Files</h3>
                            <p className="text-gray-700 mb-4">
                                JPG files are widely used for their compact size and versatility:
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
                        {/* PDF Card */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <h3 className="text-xl font-medium text-gray-800 mb-4">PDF Files</h3>
                            <p className="text-gray-700 mb-4">
                                PDFs are the standard for professional, shareable documents:
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
                    </div>
                </section>

                {/* Conversion Scenarios Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        When to Convert JPG to PDF
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
                        Why Our JPG to PDF Converter Stands Out
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
                        Global Applications of JPG to PDF Conversion
                    </h2>
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <p className="text-gray-700 mb-4">
                            Our tool is used worldwide for various purposes:
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
                        JPG vs PDF: A Detailed Comparison
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">JPG Format</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PDF Format</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {formatComparison.map((row, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.feature}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.jpg}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.pdf}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Conversion Steps Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        How to Convert JPG to PDF in 4 Easy Steps
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
                        Frequently Asked Questions About JPG to PDF Conversion
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
                        Expert Tips for Converting JPG to PDF
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
                        Why Choose Our JPG to PDF Converter
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

export default JpgToPdfGuide;