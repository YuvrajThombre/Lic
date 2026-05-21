import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    contact: '',
  });
  const [formStatus, setFormStatus] = useState(null);
  const intervalRef = useRef(null);

  // Fetch testimonials from public endpoint
  const fetchTestimonials = async () => {
    try {
      const response = await axios.get('http://localhost:8080/testimonials');
      setTestimonials(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setError(err.response?.data || 'Error fetching testimonials');
      setTestimonials([]);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Carousel interval
  useEffect(() => {
    if (testimonials.length > 1 && !isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 3000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, testimonials.length]);

  // Navigation handlers
  const handleHoldStart = () => setIsPaused(true);
  const handleHoldEnd = () => setIsPaused(false);
  const nextTestimonial = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Modal handlers



  // Form submission handler
 

  return (
    <div
      className="w-full bg-gray-100 py-16 px-4"
      onMouseDown={handleHoldStart}
      onMouseUp={handleHoldEnd}
      onTouchStart={handleHoldStart}
      onTouchEnd={handleHoldEnd}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden shadow-xl">
        {/* Left Side with background image and overlay */}
        <div
          className="relative flex items-center justify-center text-white p-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative z-10 text-center lg:text-left space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">What Our Clients Say</h2>
            <p className="text-lg lg:text-xl text-blue-100">
              Real stories from people who trusted us for their LIC planning — their words, their experiences.
            </p>
            
          </div>
        </div>

        {/* Right Side Testimonial Carousel */}
        <div className="bg-white p-10 flex flex-col justify-center relative text-center">
          {error ? (
            <p className="text-red-500 text-lg">{error}</p>
          ) : testimonials.length === 0 ? (
            <p className="text-gray-600 text-lg">No testimonials available.</p>
          ) : (
            <>
              <p className="text-xl italic text-gray-700 mb-6 transition-all duration-500 ">
                “{testimonials[currentIndex].review}”
              </p>
              <p className="text-blue-800 font-semibold text-lg">
                - {testimonials[currentIndex].name}
              </p>
              
              {testimonials.length > 1 && (
                <>
                  <button
                    onClick={prevTestimonial}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-700 text-white p-3 rounded-full shadow-md hover:bg-blue-900 transition"
                  >
                    ◀
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-700 text-white p-3 rounded-full shadow-md hover:bg-blue-900 transition"
                  >
                    ▶
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>


    </div>
  );
};

export default Testimonials;