import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PetList = () => {
  const [animals, setAnimals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Requête axios pour récupérer les données depuis JSON server
    axios.get('https://furble-pets-demo.onrender.com/pets')
      .then(response => {
        setAnimals(response.data);
        setFilteredAnimals(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données :", error);
        setError('Impossible de charger les données. Veuillez réessayer plus tard.');
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === "") {
      setFilteredAnimals(animals);
    } else {
      const filtered = animals.filter(animal =>
        animal.name.toLowerCase().includes(value) ||
        animal.breed.toLowerCase().includes(value) ||
        animal.species.toLowerCase().includes(value)
      );
      setFilteredAnimals(filtered);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="animate-pulse flex space-x-4 mb-12">
          <div className="h-12 w-48 bg-orange-200 rounded"></div>
        </div>
        {/* Loader cards ici */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden h-[650px]">
              <div className="h-56 bg-orange-100 animate-pulse"></div>
              <div className="p-6 space-y-4">
                <div className="h-6 bg-orange-100 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-orange-50 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-orange-50 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-orange-50 rounded w-2/3 animate-pulse"></div>
                <div className="h-4 bg-orange-50 rounded w-4/5 animate-pulse"></div>
              </div>
              <div className="px-6 pb-6">
                <div className="h-10 bg-orange-100 rounded-lg animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-orange-50">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-orange-800 mb-6">
          Find Your <span className="text-orange-600">Purrfect</span> Companion
        </h1>
        <p className="text-lg text-center text-orange-700 mb-12 max-w-2xl mx-auto">
          Discover loving pets waiting for their forever homes
        </p>
        
        <div className="mb-12 flex justify-center">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search by name, breed or species..."
              className="px-6 py-4 border-2 border-orange-200 rounded-xl shadow-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
              value={searchTerm}
              onChange={handleSearch}
            />
            <svg 
              className="absolute right-4 top-4 h-6 w-6 text-orange-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {filteredAnimals.length === 0 ? (
          <div className="text-center py-12">
            <svg 
              className="mx-auto h-16 w-16 text-orange-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-2xl font-medium text-orange-800">No pets found</h3>
            <p className="mt-2 text-orange-600">Try adjusting your search or check back later</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setFilteredAnimals(animals);
              }}
              className="mt-6 px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredAnimals.map((animal, index) => (
              <div
                key={index}
                className="group flex flex-col justify-between max-w-xs w-full mx-auto bg-white shadow-xl rounded-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 ease-in-out h-[650px] hover:shadow-2xl border-2 border-transparent hover:border-orange-200"
              >
                <div className="relative overflow-hidden h-76">
                  <img 
                    src={animal.image} 
                    alt={animal.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full shadow-sm">
                    <span className={`text-sm font-semibold ${animal.adoptionStatus === "Available" ? "text-green-600" : "text-red-600"}`}>
                      {animal.adoptionStatus}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 overflow-auto">
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl md:text-2xl font-bold text-gray-900 mb-2 hover:text-orange-600 transition-colors">
                      {animal.name}
                    </h2>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      {animal.age} {animal.age === 1 ? 'year' : 'years'}
                    </span>
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-orange-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">{animal.species} • {animal.breed}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-orange-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-700">{animal.location.city}, {animal.location.country}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold text-orange-700 mb-2">About Me</h4>
                    <p className="text-gray-600 line-clamp-3">{animal.description}</p>
                  </div>
                </div>
                
                <div className="px-6 pb-6 mt-auto">
                  <Link to={`/petprofile/${animal.id}`}>
                    <button className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 shadow-md transition-all duration-300">
                      Meet {animal.name.split(' ')[0]}
                      <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PetList;
