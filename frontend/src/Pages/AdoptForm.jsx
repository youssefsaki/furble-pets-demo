import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { send } from '@emailjs/browser';
import Data from '../MyData.json';

const AdoptForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const animal = Data.find(a => a.id === parseInt(id));

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phone: '',
    experience: '',
    homeType: '',
    hasChildren: '',
    hasOtherPets: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!animal) return;

    setIsSubmitting(true);
    setError(null);

    const templateParams = {
      pet_name: animal.name,
      pet_species: animal.species,
      pet_breed: animal.breed || 'Unknown',
      ...formData
    };

    send(
      'service_so18dep',     
      'template_ynlcvz5',   
      templateParams,
      'icdpCV9K5MvGANo3P'      
    )
      .then(() => {
        setSubmitted(true);
        setIsSubmitting(false);
      })
      .catch((err) => {
        setError('Failed to send the form. Please try again or contact us directly.');
        setIsSubmitting(false);
        console.error('EmailJS error:', err);
      });
  };

  if (!animal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Animal Not Found</h2>
          <p className="text-gray-600 mb-6">The pet you're looking for doesn't exist in our records.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Browse Available Pets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-orange-600 hover:text-orange-800 mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to {animal.name}'s profile
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-green-600 p-6 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Adopt <span className="text-orange-200">{animal.name}</span>
            </h1>
            <p className="text-green-100 mt-2">
              Complete this form to start the adoption process
            </p>
          </div>

          {/* Pet Info */}
          <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-1/3">
              <img
                src={animal.image.startsWith('/') ? animal.image : `/${animal.image}`}
                alt={animal.name}
                className="w-full h-64 object-cover rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">About {animal.name}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Species</p>
                  <p className="font-medium">{animal.species}</p>
                </div>
                {animal.breed && (
                  <div>
                    <p className="text-sm text-gray-500">Breed</p>
                    <p className="font-medium">{animal.breed}</p>
                  </div>
                )}
                {animal.age && (
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="font-medium">{animal.age} years</p>
                  </div>
                )}
                {animal.gender && (
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium">{animal.gender}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className={`font-medium ${animal.adoptionStatus === "Available" ? "text-green-600" : "text-red-600"}`}>
                    {animal.adoptionStatus}
                  </p>
                </div>
              </div>
              {animal.description && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="text-gray-700">{animal.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Form */}
          <div className="p-6">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Thank you for your interest in adopting {animal.name}. We've received your application and will contact you within 2-3 business days.
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Browse More Pets
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {['firstName', 'lastName', 'email', 'phone', 'address'].map(field => (
                      <div key={field} className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                          {field.replace(/([A-Z])/g, ' $1').trim()}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type={
                            field === 'email' ? 'email' : 
                            field === 'phone' ? 'tel' : 
                            'text'
                          }
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Home Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type of Home
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="homeType"
                        value={formData.homeType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select...</option>
                        <option value="House">House</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Condo">Condo</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Do you have children?
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="hasChildren"
                        value={formData.hasChildren}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select...</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Do you have other pets?
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="hasOtherPets"
                        value={formData.hasOtherPets}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select...</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tell us about your experience with pets
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Have you had pets before? What kind? How would you describe your experience?"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-lg shadow-md hover:from-green-700 hover:to-green-600 transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Submit Adoption Application'
                    )}
                  </button>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                    <p>{error}</p>
                  </div>
                )}

                <p className="text-sm text-gray-500">
                  By submitting this form, you agree to our adoption process which may include a home visit and reference checks. 
                  We'll contact you within 2-3 business days to discuss next steps.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptForm;
