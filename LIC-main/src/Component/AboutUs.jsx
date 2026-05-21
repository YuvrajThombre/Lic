import React from 'react';

const AboutUs = () => {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
        
        {/* Text Content */}
        <div
          className="flex-1 animate-fade-in-up"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-6">
            About Me
          </h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            I am a dedicated LIC Agent committed to helping individuals and families secure their future through trusted insurance solutions. With years of experience, I provide personalized advice that aligns with your life goals and financial aspirations.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            My mission is to offer more than just policies—I offer peace of mind, security, and a relationship built on trust and results. Join hundreds of satisfied clients who have made the smart choice with LIC.
          </p>
        </div>

        {/* Image Section */}
        <div className="flex-1 animate-fade-in">
          <div className="rounded-3xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80"
              alt="LIC Agent"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
