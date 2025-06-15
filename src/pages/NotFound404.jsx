import React from "react";
import { Link } from "react-router-dom";

const NotFound404 = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
            <p className="mb-6 text-gray-400">
                Sorry, the page you are looking for does not exist or has been moved.
            </p>
            <Link
                to="/"
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Go to Home
            </Link>
        </div>
    );
};

export default NotFound404;