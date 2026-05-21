import React, { useState } from 'react';
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from 'react-icons/fa';

const GetInTouch = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    message: '',
  });

  // State for submission feedback
  const [status, setStatus] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null); // Reset status

    try {
      const response = await fetch('http://localhost:8080/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.text();
        setStatus({ type: 'success', message: result || 'Form submitted successfully!' });
        // Reset form
        setFormData({
          name: '',
          email: '',
          number: '',
          message: '',
        });
      } else {
        const errorText = await response.text();
        setStatus({ type: 'error', message: errorText || 'Failed to submit form. Please try again.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'An error occurred: ' + error.message });
    }
  };

  return (
    <section className="bg-gray-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
        {/* Left: Contact Info */}
        <div className="space-y-10">
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-900 mb-4 tracking-tight">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-md">
              Reach out anytime via phone, WhatsApp, or email. You can also connect with me on social media for updates and insights.
            </p>
          </div>

          <div className="space-y-4">
            {/* Phone */}
            <a
              href="tel:+911234567890"
              className="flex items-center gap-4 bg-blue-100 hover:bg-blue-200 text-blue-800 px-5 py-4 rounded-xl transition duration-300 shadow-md"
            >
              <FaPhoneAlt className="text-xl" />
              <span className="text-base font-medium">+91 12345 67890</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/911234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-green-100 hover:bg-green-200 text-green-800 px-5 py-4 rounded-xl transition duration-300 shadow-md"
            >
              <FaWhatsapp className="text-xl" />
              <span className="text-base font-medium">Chat on WhatsApp</span>
            </a>

            {/* Email */}
            <a
              href="mailto:agent@example.com"
              className="flex items-center gap-4 bg-red-100 hover:bg-red-200 text-red-700 px-5 py-4 rounded-xl transition duration-300 shadow-md"
            >
              <FaEnvelope className="text-xl" />
              <span className="text-base font-medium">agent@example.com</span>
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 pt-4">
            <a
              href="https://instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-500 text-2xl transition-all duration-200"
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 text-2xl transition-all duration-200"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-800 text-2xl transition-all duration-200"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl w-full">
          <h3 className="text-3xl font-bold text-blue-900 mb-8">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
              <input
                type="tel"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                required
                placeholder="+91 12345 67890"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
              <textarea
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder="Write your message here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              ></textarea>
            </div>

            {status && (
              <div
                className={`text-sm p-3 rounded-lg ${
                  status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {status.message}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 rounded-lg text-lg font-semibold transition duration-300"
            >
              Submit Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;