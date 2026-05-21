import React from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

const AnimatedCounter = ({ value }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      controls.start({ count: value });
    }
  }, [isInView, controls, value]);

  return (
    <motion.span
      ref={ref}
      initial={{ count: 0 }}
      animate={controls}
      transition={{ duration: 2, ease: 'easeOut' }}
    >
      {Math.floor(value)}
    </motion.span>
  );
};

const WhyChooseMe = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-indigo-700 text-white py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto bg-white p-6 lg:p-10 rounded-3xl shadow-2xl flex flex-col lg:flex-row items-center space-y-10 lg:space-y-0 lg:space-x-16">
        
        {/* Profile Section */}
        <div className="w-36 h-36 sm:w-42 sm:h-42 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
          <img 
            src="https://imgs.search.brave.com/24iKeM0qAsh78VpOmLfyLdWNKIrPcMI5HmxRKhVr4Gg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzM5LzUzLzYw/LzM2MF9GXzEzOTUz/NjA4Nl95eG80RERB/Z0JNS0N4d2dkcDhL/SnZ6cFpnbk1DOENw/eC5qcGc" 
            alt="Your Photo" 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Information Section */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">
            Why Choose Me as Your LIC Agent?
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-8 text-gray-800">
            With years of experience in helping individuals and families secure their financial future, I provide trusted advice and personalized solutions. My dedication to customer satisfaction has earned me a reputation as a reliable LIC advisor.
          </p>

          {/* Stats Section */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 justify-center">
            {[
              { title: 'LICs Done', value: 150, suffix: '+ Policies' },
              { title: 'Claims Processed', value: 35, suffix: '+ Claims' },
              { title: 'Funds Managed', value: 2.5, suffix: 'Cr+ ₹' },
              { title: 'Active Since', value: 3, suffix: 'Years' }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-blue-50 p-3 sm:p-5 rounded-xl shadow-md text-center w-full"
              >
                <h3 className="text-sm sm:text-base font-semibold text-blue-800 mb-2">{item.title}</h3>
                <p className="text-lg sm:text-xl font-bold text-blue-700">
                  <AnimatedCounter value={item.value} /> {item.suffix}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseMe;
