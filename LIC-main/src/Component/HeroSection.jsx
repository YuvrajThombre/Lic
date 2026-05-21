import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 py-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://imgs.search.brave.com/WmGHh2WsZbFZsvEJq13_cygeZylUpKaFMfahx00IJEE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bGlmZWhhY2sub3Jn/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDIy/LzA2L2F6aXotYWNo/YXJraS1VM0M3OVNl/SGE3ay11bnNwbGFz/aC1zY2FsZWQtZTE2/NjEwNjA4MDQxMTAu/anBn')",
        }}
      ></div>

      {/* Content Wrapper */}
      <div className="relative z-10 w-full px-6 flex flex-col lg:flex-row items-center justify-center">
        {/* Left Column */}
        <div className="text-white text-left max-w-xl w-full lg:w-1/2">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            A Smart Investment Today, for a Secured Future Tomorrow.
          </h1>
          <p className="text-md md:text-lg mb-6">
            We're here to help you reach the retirement score you want. <br />
            Unlock your Retirement Confidence Score and start planning for what's next with a personalized plan.
          </p>

          {/* Buttons with Navigation */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-4 px-8 rounded transition duration-300 cursor-pointer min-w-[150px]"
              aria-label="Contact us"
              onClick={() => navigate('/contact')}
            >
              Get In Touch
            </button>
            <button
              className="border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold py-4 px-8 rounded transition duration-300 cursor-pointer min-w-[150px]"
              aria-label="View our plans"
              onClick={() => navigate('/plans')}
            >
              View Plans
            </button>
          </div>
        </div>

        {/* Right Spacer (optional) */}
        <div className="hidden lg:block w-1/2"></div>
      </div>
    </div>
  );
};

export default HeroSection;
