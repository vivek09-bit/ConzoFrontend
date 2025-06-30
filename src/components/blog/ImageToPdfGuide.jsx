import React from 'react';
import { FiCheck, FiDownload, FiFileText, FiLock, FiSliders, FiGlobe, FiAward, FiSmartphone, FiUser } from 'react-icons/fi';

const ImageToPdfGuide = () => {
    // Data arrays for modular content
    const globalUses = [
        { country: "India", use: "Students compiling scanned notes into PDFs" },
        { country: "USA", use: "Professionals creating image-based reports" },
        { country: "Brazil", use: "Photographers archiving photo collections" },
        { country: "Germany", use: "Businesses merging product images into catalogs" }
    ];

    const formatComparison = [
        { feature: "File Size", image: "Varies by format (JPG, PNG)", pdf: "Optimized for multiple images" },
        { feature: "Document Structure", image: "Single, standalone files", pdf: "Multi-page, unified document" },
        { feature: "Compatibility", image: "Requires image viewers", pdf: "Universal across platforms" },
        { feature: "Use Cases", image: "Photos, graphics", pdf: "Reports, portfolios, presentations" }
    ];

    const conversionSteps = [
        "Upload your images - drag and drop or select from your device",
        "Reorder images using up/down arrows for the desired sequence",
        "Click 'Convert to PDF' to combine images into a single file",
        "Download your professional PDF instantly"
    ];

    const faqs = [
        {
            question: "Which image formats can I convert to PDF?",
            answer: "Our tool supports popular formats like JPG, PNG, and more, with up to 20 files (max 50MB total) per conversion."
        },
        {
            question: "Will my images lose quality in the PDF?",
            answer: "No, our converter retains the original quality of your images, ensuring crisp and clear PDFs."
        },
        {
            question: "Is my data secure during the conversion process?",
            answer: "Yes, all files are processed locally in your browser and automatically deleted after conversion."
        },
        {
            question: "Can I customize the order of images in the PDF?",
            answer: "Absolutely, use the up/down arrows to arrange images before converting to PDF."
        }
    ];

    const proTips = [
        "Use high-resolution images (300 DPI) for professional-grade PDFs",
        "Group related images for a cohesive document structure",
        "Preview images to verify clarity before conversion",
        "Ensure PDF compatibility with your intended platform"
    ];

    const whyChooseUs = [
        "Free, no sign-up or watermarks required",
        "Fast processing with real-time progress updates",
        "Secure, browser-based file handling",
        "Intuitive interface with image reordering"
    ];

    const imageFeatures = [
        "Supports multiple formats like JPG, PNG, and more",
        "Ideal for photos, graphics, and web content",
        "Compact and widely compatible"
    ];

    const pdfFeatures = [
        "Professional format for documents and reports",
        "Combines multiple images into one file",
        "Easy to share, view, and print"
    ];

    const conversionScenarios = [
        "Merging scanned documents into a single PDF for academic submissions",
        "Creating professional portfolios from image collections",
        "Combining product photos into e-commerce catalogs",
        "Archiving event photos in a shareable PDF format",
        "Preparing image-based presentations for meetings"
    ];

    const toolFeatures = [
        {
            icon: <FiSliders className="text-2xl text-indigo-500" />,
            title: "Customizable Image Order",
            points: [
                "Easily reorder images with drag-and-drop or arrows",
                "Preview images to confirm the layout"
            ]
        },
        {
            icon: <FiFileText className="text-2xl text-indigo-500" />,
            title: "Superior PDF Output",
            points: [
                "Preserves image quality in the PDF",
                "Creates polished, professional documents"
            ]
        },
        {
            icon: <FiDownload className="text-2xl text-indigo-500" />,
            title: "Swift Conversion",
            points: [
                "Processes multiple images in seconds",
                "Instant PDF download with progress tracking"
            ]
        },
        {
            icon: <FiLock className="text-2xl text-indigo-500" />,
            title: "Secure Processing",
            points: [
                "Files stay local, never stored on servers",
                "Automatic file deletion post-conversion"
            ]
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
            <article className="prose prose-lg max-w-none">
                {/* Header Section */}
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        The Ultimate Guide to Converting Images to PDF Online
                    </h1>
                    <div className="w-20 h-1 bg-indigo-500 mb-6"></div>
                </header>

                {/* File Types Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                        <FiFileText className="mr-2 text-indigo-500" />
                        Understanding Image and PDF Formats
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Image Card */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <h3 className="text-xl font-medium text-gray-800 mb-4">Image Files</h3>
                            <p className="text-gray-700 mb-4">
                                Image files like JPG and PNG are versatile for capturing visuals:
                            </p>
                            <ul className="space-y-2">
                                {imageFeatures.map((feature, index) => (
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
                    </div>
                </section>

                {/* Conversion Scenarios Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        When to Convert Images to PDF
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
                        Why Our Image to PDF Converter Excels
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
                        Global Use Cases for Image to PDF Conversion
                    </h2>
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <p className="text-gray-700 mb-4">
                            Our tool empowers users worldwide to:
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
                        Images vs PDF: A Comprehensive Comparison
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image Formats</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PDF Format</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {formatComparison.map((row, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.feature}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.image}</td>
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
                        How to Convert Images to PDF in 4 Simple Steps
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
                        Frequently Asked Questions About Image to PDF Conversion
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
                        Expert Tips for Converting Images to PDF
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
                        Why Choose Our Image to PDF Converter
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

export default ImageToPdfGuide;