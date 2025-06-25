import React, { useState } from "react";
import { Helmet } from "react-helmet";

const AndroidImageToPdf = () => {
    const [email, setEmail] = useState("");
    const [feedback, setFeedback] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can add logic to handle email subscription
        setFeedback("Thank you for subscribing! We'll keep you updated.");
        setEmail("");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Helmet>
                <title>Coming Soon - Your Tool Name</title>
                <meta name="description" content="Our tool is coming soon. Stay tuned for updates!" />
            </Helmet>
            <h1 className="text-5xl font-bold mb-4">Coming Soon</h1>
            <p className="text-lg text-gray-600 mb-8">
                We're excited to announce that our new tool is on its way! 
                Stay tuned for updates and be the first to know when we launch.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    className="p-2 border border-gray-300 rounded mb-4 w-64"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Subscribe
                </button>
            </form>
            {feedback && <p className="mt-4 text-green-600">{feedback}</p>}
            <div className="mt-8">
                <p className="text-gray-500">Follow us on social media for updates:</p>
                <div className="flex space-x-4 mt-2">
                    <a href="#" className="text-blue-600 hover:underline">Facebook</a>
                    <a href="#" className="text-blue-600 hover:underline">Twitter</a>
                    <a href="#" className="text-blue-600 hover:underline">Instagram</a>
                </div>
            </div>
        </div>
    );
};



export default AndroidImageToPdf;
