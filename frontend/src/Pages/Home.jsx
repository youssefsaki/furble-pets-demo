import React from "react";
import { Link } from "react-router-dom";
import { FaPaw, FaHeart, FaSearch, FaHome, FaPhoneAlt } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-screen flex items-center justify-center text-center px-4 sm:px-8 lg:px-16"
        style={{ 
          backgroundImage: ' url("/images/baaak.avif")',
          backgroundPosition: 'center 30%'
        }}
      >
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-6 animate-fade-in">
            Find Your <span className="text-orange-300">Purrfect</span> Companion <FaPaw className="inline ml-2" />
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-black mt-6 mb-8 leading-relaxed">
            Every pet deserves a loving home. Discover your new best friend today and experience the joy of pet adoption.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/petlist"
              className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <FaSearch /> Browse Pets
            </Link>
            <Link
              to="/about"
              className="px-8 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <FaHeart /> Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Pet Categories */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Meet Our <span className="text-orange-500">Furry Friends</span>
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
            <p className="text-lg text-gray-600 mt-6 max-w-3xl mx-auto">
              We have wonderful companions waiting for their forever homes
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                name: "Dogs", 
                img: "/images/dogy.jpg", 
                desc: "Loyal, loving companions ready to fill your life with joy",
                bg: "bg-blue-50"
              },
              { 
                name: "Cats", 
                img: "/images/caty.jpg", 
                desc: "Independent yet affectionate feline friends",
                bg: "bg-purple-50"
              },
              { 
                name: "Rabbits", 
                img: "/images/rabbit.jpg", 
                desc: "Gentle and playful companions perfect for cozy homes",
                bg: "bg-pink-50"
              },
              { 
                name: "Birds", 
                img: "/images/birdy.jpg", 
                desc: "Colorful, intelligent pets that bring music to your life",
                bg: "bg-yellow-50"
              },
            ].map((pet) => (
              <div 
                key={pet.name} 
                className={`${pet.bg} rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={pet.img} 
                    alt={pet.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{pet.name}</h3>
                  <p className="text-gray-600">{pet.desc}</p>
                  <Link
                    to={`/petlist?species=${pet.name.toLowerCase()}`}
                    className="inline-block mt-4 text-orange-600 font-medium hover:text-orange-700 transition-colors"
                  >
                    View Available {pet.name} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our <span className="text-orange-500">Adoption</span> Process
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
            <p className="text-lg text-gray-600 mt-6 max-w-3xl mx-auto">
              Simple steps to bring your new family member home
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Find Your Match", 
                desc: "Browse our pets and find your perfect companion", 
                icon: <FaSearch className="text-3xl text-orange-500 mb-4" />
              },
              { 
                title: "Submit Application", 
                desc: "Complete our simple adoption application form", 
                icon: <FaHeart className="text-3xl text-orange-500 mb-4" />
              },
              { 
                title: "Welcome Home", 
                desc: "Finalize adoption and bring your new friend home", 
                icon: <FaHome className="text-3xl text-orange-500 mb-4" />
              },
            ].map((step, index) => (
              <div 
                key={step.title} 
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="flex justify-center">
                  {step.icon}
                </div>
                <div className="mb-4 flex justify-center">
                  <div className="bg-orange-100 text-orange-600 font-bold rounded-full w-10 h-10 flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Adoption Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex items-center gap-12">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <img 
                src="/images/hapypaw.jpg" 
                alt="Happy pet with owner" 
                className="rounded-xl shadow-lg w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Why <span className="text-orange-500">Adopt</span> a Pet?
              </h2>
              <div className="space-y-6">
                {[
                  "🐾 Save a life and give a homeless pet a second chance",
                  "❤️ Experience unconditional love and companionship",
                  "🏡 Adopted pets often show immense gratitude and loyalty",
                  "💰 More affordable than buying from breeders",
                  "🌍 Help reduce pet overpopulation and support ethical treatment"
                ].map((benefit) => (
                  <div key={benefit} className="flex items-start">
                    <p className="text-lg text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  to="/about"
                  className="inline-block px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
                >
                  Learn More About Adoption
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Meet Your New Best Friend?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Take the first step towards unconditional love and companionship today
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/petlist"
              className="px-8 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Browse Available Pets
            </Link>
            <Link
              to="/contactus"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-orange-600 transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <FaPhoneAlt /> Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img
                src="/images/dog.png"
                alt="AdoptOne Logo"
                className="w-10 h-10 object-contain mr-3"
              />
              <span className="text-2xl font-bold">Furble Test</span>
            </div>
            <p className="text-gray-400">
              Dedicated to finding loving homes for pets in need. Join us in our mission to make a difference in animals' lives.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/petlist" className="text-gray-400 hover:text-white transition-colors">Available Pets</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contactus" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Morocco 
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                (212)772527475
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                test@furble.com
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} furble . All rights reserved.</p>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Home;