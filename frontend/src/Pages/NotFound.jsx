import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100  flex flex-col items-center justify-center text-center px-4">
      <div className="relative w-60 h-60 mb-6">
        <img
          src="/images/caat.png"
          alt="Lost dog"
          className="w-full h-full object-contain relative z-10"
        />
        <div
          className="absolute bottom-10 right-2 w-7 h-2 bg-amber-400 rounded-full origin-left animate-[wag_0.6s_ease-in-out_infinite_alternate]"
        ></div>
      </div>

      <h1 className="text-4xl sm:text-5xl font-bold text-orange-700 mb-2">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 text-lg mb-6">
        This pup got lost... 🐾 Let’s take you back home!
      </p>

      <Link
        to="/"
        className="bg-orange-600 hover:bg-orange-800 text-white px-6 py-3 rounded-full text-lg transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;