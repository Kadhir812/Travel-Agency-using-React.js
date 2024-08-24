import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  useEffect(() => {
    // Load particles.js script
    const script = document.createElement('script');
    script.src = 'src/Particles/particles.js';  // Adjust the path as necessary
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.particlesJS('particles-js', {
        particles: {
          number: { value: 60 },
          size: { value: 4 },
          move: { speed: 2 },
          line_linked: {
            enable: true,
            distance: 150,
            opacity: 0.8,
            color: "#ffffff",
          },
        },
      });
    };

    return () => {
      // Clean up script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="relative h-screen bg-cover bg-center bg-[url('../bg.jpeg')]">
      {/* Particle Background */}
      <div id="particles-js" className="absolute inset-0 z-0"></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-1"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Your Next Adventure</h1>
        <p className="text-xl md:text-2xl mb-8">Explore the world with us. Book your dream vacation today!</p>
        <Link to="/signup" className="bg-lime-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full mb-4">
          Get Started
        </Link>
        <Link to="/login" className="text-blue-300 hover:text-blue-500 underline">
          Already have an account? Log in
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
