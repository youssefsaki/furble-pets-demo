import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      {/* Hero Section */}
      <section className="relative rounded-xl overflow-hidden mb-16">
        <div 
          className="absolute inset-0  z-10"
          aria-hidden="true"
        />
        <div
          className="bg-cover bg-center h-96 md:h-[500px] flex items-center"
          style={{
            backgroundImage: 'url("/images/backgroundd.jpg")',
          }}
        >
          <div className="container mx-auto px-6 relative z-20 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-black mb-6 animate-fade-in">
              Welcome to <span className="text-orange-400">Happy Paws</span> Shelter 🐾
            </h1>
            <p className="text-lg md:text-xl text-black max-w-2xl mx-auto leading-relaxed">
              Our mission is to rescue, rehabilitate, and rehome animals in need. 
              Discover how we help pets find their forever homes.
            </p>
            <div className="mt-66">
              <Link to="/petlist">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Meet Our Pets
              </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Mission Section */}
      <section className="my-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our <span className="text-orange-500">Mission</span>
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            At <span className="font-bold text-orange-600">Happy Paws</span>, we are
            dedicated to rescuing and rehabilitating animals from all walks of life. We
            provide a safe haven for pets, ensuring they receive the care, love,
            and medical attention they deserve until they find their forever family.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="text-orange-500 text-4xl mb-4">❤️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Compassionate Care</h3>
            <p className="text-gray-600">
              Every animal receives individualized attention and care tailored to their specific needs.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="text-orange-500 text-4xl mb-4">🏠</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Forever Homes</h3>
            <p className="text-gray-600">
              We carefully match pets with loving families through our thorough adoption process.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="text-orange-500 text-4xl mb-4">🌎</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Community Impact</h3>
            <p className="text-gray-600">
              We educate the community about responsible pet ownership and animal welfare.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="my-16 bg-gradient-to-r from-orange-50 to-amber-50 py-16 px-8 rounded-2xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What We <span className="text-orange-500">Do</span>
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-start">
              <div className="bg-orange-100 p-4 rounded-lg mr-6 group-hover:bg-orange-200 transition-colors">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Rescue & Rehabilitation</h3>
                <p className="text-gray-600">
                  We rescue animals from challenging situations and provide comprehensive medical care, 
                  nutritious food, safe shelter, and emotional rehabilitation to help them heal.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="flex items-start">
              <div className="bg-orange-100 p-4 rounded-lg mr-6 group-hover:bg-orange-200 transition-colors">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Adoption Services</h3>
                <p className="text-gray-600">
                  Our dedicated team carefully matches animals with loving families through a 
                  thorough vetting process, ensuring successful, lifelong adoptions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="my-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Happy <span className="text-orange-500">Tails</span>
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stories of love and second chances from our shelter alumni
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
           {
            id: 1,
            image: '/images/handi.pgp.webp',
            title: "Max's Journey",
            description: "After an injury left his back legs paralyzed, Bruno didn’t give up — with a wheelchair, he's back to chasing joy every day.",
           },
          {
            id: 2,
            image: '/images/catyy.jpeg',
            title: "Luna's New Beginning",
            description: "Luna was found wandering the streets, scared and alone. Today, she's the heart of her new home, cuddled every night and adored like a queen.",
          },
          {
            id: 3,
            image: '/images/doood.jpeg',
            title: "Bella's Forever Home",
            description: "After spending months in a shelter, Bella finally met her perfect match. She now enjoys a peaceful life full of adventures and companionship.",
          },
          ].map((story) => (
          <div
           key={story.id}
           className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
          <div className="h-48 bg-gray-200 overflow-hidden">
            <img
             src={story.image}
             alt={story.title}
             className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{story.title}</h3>
            <p className="text-gray-600 mb-4">{story.description}</p>
           </div>
           </div>
          ))}
        </div>
       </section>

      {/* How You Can Help Section */}
      <section className="my-16 bg-orange-600 rounded-2xl p-12 text-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How You Can <span className="text-orange-200">Help</span>
          </h2>
          <div className="w-24 h-1 bg-orange-300 mx-auto mb-6"></div>
          <p className="text-lg max-w-2xl mx-auto">
            Your support makes our work possible. Here's how you can contribute to our mission.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-3">Donate</h3>
            <p className="mb-4">
              Financial contributions help us provide food, medical care, and shelter for animals in need.
            </p>
            <Link to="/donate">
            <button className="bg-white text-orange-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors">
              Donate Now
            </button>
            </Link>
          </div>
          
          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
            <div className="text-4xl mb-4">👐</div>
            <h3 className="text-xl font-bold mb-3">Volunteer</h3>
            <p className="mb-4">
              Share your time and skills to help care for our animals and support our operations.
            </p>
            <Link to='/contactus'>
            <button className="bg-white text-orange-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors">
              Volunteer
            </button>
            </Link>
          </div>
          
          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="text-xl font-bold mb-3">Foster</h3>
            <p className="mb-4">
              Provide temporary homes for animals as they await their forever families.
            </p>
            <Link to='/contactus'>
            <button className="bg-white text-orange-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors">
              Learn More
            </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="my-16 text-center">
        <div className="bg-white p-12 rounded-2xl shadow-lg max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Get in <span className="text-orange-500">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Have questions about adoption, volunteering, or donations? We'd love to hear from you!
          </p>
          <Link to='/contactus'>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            
            Contact Us
          </button>
          </Link>
          <div className="mt-8 flex justify-center space-x-6">
            <a href="https://www.facebook.com/" className="text-gray-500 hover:text-orange-500 transition-colors">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://www.instagram.com/" className="text-gray-500 hover:text-orange-500 transition-colors">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/" className="text-gray-500 hover:text-orange-500 transition-colors">
              <span className="sr-only">Linkedin</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;