import React from 'react';

const Donate = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold text-orange-600 mb-6">Support Our Shelter 🐾</h1>
      <p className="text-lg text-gray-700 mb-8">
        Your donation helps us rescue, feed, and provide medical care for animals in need.
        Every contribution counts and makes a difference in the lives of our furry friends!
      </p>

      <div className="bg-white shadow-md p-6 rounded-xl border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Donation Details</h2>
        <p className="text-gray-700 mb-2"><strong>Bank Name:</strong> CIH Bank</p>
        <p className="text-gray-700 mb-2"><strong>Account Holder:</strong> Happy Paws Shelter</p>
        <p className="text-gray-700 mb-2"><strong>RIB:</strong> 1234 5678 9101 1121 3141 5161</p>
        <p className="text-gray-700 mt-6">
          Merci pour votre générosité ❤️
        </p>
      </div>
    </div>
  );
};

export default Donate;
