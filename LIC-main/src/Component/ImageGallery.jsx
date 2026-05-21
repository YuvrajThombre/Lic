import React from 'react';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1514415008039-efa173293080?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8TGlmZSUyMEluc3VyYW5jZXxlbnwwfHwwfHx8MA%3D%3D',
    caption: 'Awarded Best LIC Advisor – 2023',
  },
  {
    src: 'https://images.unsplash.com/photo-1527856263669-12c3a0af2aa6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fExpZmUlMjBJbnN1cmFuY2V8ZW58MHx8MHx8fDA%3D',
    caption: 'Happy Family after Policy Signup',
  },
  {
    src: 'https://images.unsplash.com/photo-1542353436-312f0e1f67ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fExpZmUlMjBJbnN1cmFuY2V8ZW58MHx8MHx8fDA%3D',
    caption: 'Policy Awareness Event – Pune',
  },
  {
    src: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fExpZmUlMjBJbnN1cmFuY2V8ZW58MHx8MHx8fDA%3D',
    caption: 'Recognition from Senior LIC Officials',
  },
  {
    src: 'https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TGlmZSUyMEluc3VyYW5jZXxlbnwwfHwwfHx8MA%3D%3D',
    caption: 'Grateful Client – Claim Settlement Support',
  },
];

const ImageGallery = () => {
  return (
    <section className="bg-white py-0 px-4 sm:px-6 lg:px-8">
      

      <div className="overflow-x-auto hide-scrollbar pb-4">
        <div className="flex gap-4 min-w-max px-2 md:px-4">
          {images.map((img, index) => (
            <div
              key={index}
             className="relative w-64 sm:w-72 flex-shrink-0 overflow-hidden shadow-lg group transform transition duration-300 hover:scale-105 rounded-md"

            >
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-48 sm:h-56 object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/30 text-white px-4 py-2 text-sm sm:text-base font-medium">

                {img.caption}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            height: 10px;
          }
          .hide-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .hide-scrollbar::-webkit-scrollbar-thumb {
            background-color: #4B5563;
            border-radius: 9999px;
            border: 3px solid transparent;
            background-clip: content-box;
          }
        `}
      </style>
    </section>
  );
};

export default ImageGallery;
