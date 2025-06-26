import React from 'react';
import { FiCheck, FiDownload, FiImage, FiLock, FiSliders, FiGlobe, FiAward, FiSmartphone, FiUser,  } from 'react-icons/fi';

const ImageConversionGuide = () => {
    // Data arrays for cleaner JSX
    // Data arrays
    const globalUses = [
        { country: "India", use: "Businesses optimizing WhatsApp catalogs" },
        { country: "Indonesia", use: "Creators adapting content for varying internet speeds" },
        { country: "USA", use: "Retailers prepping Amazon product images" },
        { country: "Russia", use: "Professionals converting official documents" }
    ];

    const formatComparison = [
        { feature: "Quality Preservation", png: "Perfect reproduction", jpg: "Adjustable quality" },
        { feature: "Transparency", png: "Works flawlessly", jpg: "Not available" },
        { feature: "Storage Needs", png: "More space required", jpg: "Significant savings" },
        { feature: "Best Uses", png: "Logos, text-heavy graphics", jpg: "Photos, complex images" }
    ];

    const conversionSteps = [
        "Add your files - drag them in or browse your device",
        "Set your preferences - adjust quality and background",
        "Start converting - single click does the magic",
        "Get your files - download individually or zipped"
    ];

    const faqs = [
        {
            question: "Will my images look worse after converting?",
            answer: "Not noticeably - keep quality at 80-90% for the perfect balance between size and clarity."
        },
        {
            question: 'Need a pure white background?',
            answer: 'Just check "Remove Transparency" and set the color picker to white (#FFFFFF).'
        },
        {
            question: "How many files can I convert together?",
            answer: "While there's no strict limit, we suggest 20-30 files at a time for smooth operation."
        },
        {
            question: "Where do my files go after converting?",
            answer: "Nowhere - they're processed in your browser and immediately discarded when done."
        }
    ];

    const proTips = [
        "Websites: 65-75% quality hits the sweet spot",
        "Print projects: Use 90-100% quality at 300 DPI",
        "Online stores: Keep product images under 500KB",
        "Social media: Size images to platform specs first"
    ];

    const whyChooseUs = [
        "Mobile-friendly for users on the go",
        "Straightforward interface anyone can use",
        "Consistent results professionals trust",
        "Handles all file names including special characters"
    ];

    const pngFeatures = [
        "Crystal-clear logos with transparent backgrounds",
        "Detailed screenshots that include text",
        "Images that need multiple edits without losing quality"
    ];

    const jpgFeatures = [
        "Great for photo galleries and social media",
        "Ideal when you're tight on storage space",
        "The preferred choice for most website images"
    ];

    const conversionScenarios = [
        "Your website feels a bit sluggish—JPGs can help speed up loading times significantly",
        "You're uploading to social media—platforms like Instagram handle JPGs more efficiently",
        "You need to send image-heavy emails—smaller attachments get to your recipients faster",
        "You're creating product listings—maintains visual appeal while being lightweight",
        "You're preparing print materials—ensures quality while keeping file sizes manageable"
    ];

    const toolFeatures = [
        {
            icon: <FiSliders className="text-2xl text-indigo-500" />,
            title: "Custom Quality Control",
            points: [
                "Easily adjust compression with our user-friendly slider",
                "See changes in real-time with live previews"
            ]
        },
        {
            icon: <FiImage className="text-2xl text-indigo-500" />,
            title: "Background Options Made Simple",
            points: [
                "Quickly replace transparent areas",
                "One-click white background for polished documents"
            ]
        },
        {
            icon: <FiDownload className="text-2xl text-indigo-500" />,
            title: "Work Smarter, Not Harder",
            points: [
                "Process multiple images at once",
                "Receive organized downloads in ZIP bundles"
            ]
        },
        {
            icon: <FiLock className="text-2xl text-indigo-500" />,
            title: "Your Privacy Matters",
            points: [
                "Your images never touch our servers",
                "Automatic file deletion after conversion"
            ]
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
            <article className="prose prose-lg max-w-none">
                {/* Header Section */}
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        The Complete Guide to Convert PNG to JPG Image Format
                    </h1>
                    <div className="w-20 h-1 bg-indigo-500 mb-6"></div>
                </header>

                {/* File Types Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                        <FiImage className="mr-2 text-indigo-500" />
                        Understanding Image File Types
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* PNG Card */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <h3 className="text-xl font-medium text-gray-800 mb-4">PNG Files</h3>
                            <p className="text-gray-700 mb-4">
                                Think of PNG files as digital photocopies—they capture every detail perfectly:
                            </p>
                            <ul className="space-y-2">
                                {pngFeatures.map((feature, index) => (
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
                                JPG files are more like impressionist paintings—compact yet effective:
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
                        When to Make the Switch from PNG to JPG
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
                        What Makes Our Conversion Tool Different
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
                        Real-World Uses Across the Globe
                    </h2>
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <p className="text-gray-700 mb-4">
                            Our users worldwide leverage this tool for:
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
                        PNG vs JPG: A Practical Comparison
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consideration</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PNG Format</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">JPG Format</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {formatComparison.map((row, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.feature}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.png}</td>
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
                        How to Convert in 4 Simple Steps
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
                        Answers to Common Questions
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
                        Professional Tips for Best Results
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
                <section>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                        <FiAward className="mr-2 text-indigo-500" />
                        Why People Choose Our Converter
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

export default ImageConversionGuide;