// src/components/About.jsx
import React from "react";

function About() {
  return (
    <section className="bg-white text-gray-800 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">About This Tool</h2>
        <p className="text-lg text-gray-600">
          This lightweight web app helps you quickly convert image files (like PNG, JPG) into a single PDF document. It’s built using modern web technologies like React, Tailwind CSS, and Node.js.
        </p>
        <p className="mt-4 text-gray-500">
          We're continuously adding new features like support for more file formats, drag-and-drop uploads, dark mode, and conversion progress indicators.
        </p>
      </div>
    </section>
  );
}

export default About;
