import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaHeart, FaPaw, FaVenusMars, FaCalendarAlt, FaWeight, FaMapMarkerAlt, FaSyringe } from 'react-icons/fa';
import Data from "../MyData.json";  

const PetProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const animal = Data.find(a => a.id === parseInt(id));

  if (!animal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Pet Not Found</h2>
          <p className="text-gray-600 mb-6">The pet you're looking for doesn't exist in our records.</p>
          <button
            onClick={() => navigate('/petlist')}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Browse Available Pets
          </button>
        </div>
      </div>
    );
  }

  const handleAdoptClick = () => {
    navigate(`/adoptform/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-orange-600 hover:text-orange-800 mb-8 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back to Pets
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pet Image */}
          <div className="relative overflow-hidden rounded-2xl shadow-xl h-96 lg:h-full">
            <img 
              src={animal.image} 
              alt={animal.name} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            {animal.adoptionStatus === "Available" && (
              <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full shadow-sm">
                <span className="text-green-600 font-semibold">
                  Available for Adoption
                </span>
              </div>
            )}
          </div>

          {/* Pet Details */}
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                {animal.name}
                <span className="text-orange-500 ml-2">
                  <FaPaw className="inline" />
                </span>
              </h1>
              <button 
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Add to favorites"
              >
                <FaHeart size={24} />
              </button>
            </div>

            <p className="text-gray-600 text-lg mb-8">{animal.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <FaVenusMars className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium">{animal.gender}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <FaCalendarAlt className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-medium">{animal.age} years</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <FaWeight className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Size</p>
                  <p className="font-medium">{animal.size}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <FaSyringe className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Vaccinated</p>
                  <p className="font-medium">{animal.vaccinated ? "Yes" : "No"}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <FaMapMarkerAlt className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">
                    {animal.location.city}, {animal.location.country}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <FaCalendarAlt className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Available Since</p>
                  <p className="font-medium">{animal.adoptableSince}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">More About {animal.name}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700">Species</h4>
                  <p className="text-gray-600">{animal.species}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Breed</h4>
                  <p className="text-gray-600">{animal.breed || 'Mixed'}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700">Temperament</h4>
                  <p className="text-gray-600">{animal.temperament || 'Friendly and affectionate'}</p>
                </div>
              </div>
            </div>

            {animal.adoptionStatus === "Available" && (
              <div className="mt-8">
                <button 
                  onClick={handleAdoptClick}
                  className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-md"
                >
                  Adopt {animal.name}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetProfile;