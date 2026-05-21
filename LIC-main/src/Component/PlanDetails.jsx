import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const PlanDetail = () => {
  const { title } = useParams(); // Get the encoded title from the URL
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    message: '',
    planname: decodeURIComponent(title), // Automatically set planname from URL title
  });
  const [formStatus, setFormStatus] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await axios.get('http://localhost:8080/plans');
        const decodedTitle = decodeURIComponent(title);
        const foundPlan = response.data.find((p) => p.title === decodedTitle);
        if (foundPlan) {
          setPlan(foundPlan);
          setError('');
        } else {
          setError('Plan not found');
          setPlan(null);
        }
      } catch (err) {
        console.error('Error fetching plan:', err);
        setError(err.response?.data || 'Error fetching plan details');
        setPlan(null);
      }
    };
    fetchPlan();
  }, [title]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/form', formData);
      setFormStatus('Enquiry submitted successfully!');
      setFormError('');
      setFormData({
        name: '',
        email: '',
        number: '',
        message: '',
        planname: decodeURIComponent(title),
      });
    } catch (err) {
      console.error('Error submitting form:', err);
      setFormError(err.response?.data || 'Error submitting enquiry');
      setFormStatus('');
    }
  };

  if (error) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen font-sans flex items-center justify-center px-4">
        <div className="max-w-md mx-auto bg-white/95 backdrop-blur-md border border-gray-200 shadow-lg rounded-3xl p-8 text-center">
          <p className="text-red-500 text-lg font-medium">{error}</p>
          <Link
            to="/plans"
            className="mt-6 inline-block text-indigo-600 hover:text-indigo-800 font-semibold transition duration-200"
          >
            Back to Plans
          </Link>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen font-sans flex items-center justify-center px-4">
        <div className="max-w-md mx-auto bg-white/95 backdrop-blur-md border border-gray-200 shadow-lg rounded-3xl p-8 text-center">
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen font-sans md:py-12 md:px-4 sm:px-6 lg:px-8">
      {/* Plan Details Section */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/95 backdrop-blur-md md:border border-gray-200 shadow-2xl md:rounded-3xl overflow-hidden transform transition-all duration-500 animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-700 to-blue-600 px-6 py-8 sm:py-10 lg:py-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white truncate animate-slide-up">
              {plan.title}
            </h1>
            <span className="inline-block mt-3 bg-white/20 text-white text-xs sm:text-sm px-4 py-2 rounded-full backdrop-blur-sm tracking-wide animate-slide-up delay-100">
              {plan.category}
            </span>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 lg:p-10 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 animate-fade-in delay-200">
                Plan Overview
              </h2>
               <p className="text-indigo-600 text-base sm:text-lg font-medium italic bg-indigo-50 p-4 rounded-lg animate-fade-in delay-400">
                {plan.description || 'Plan for your future with confidence.'}
              </p>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed animate-fade-in delay-300">
                {plan.content}
              </p>
             
            </div>

            {/* Table for Plan Details */}
            <div className="overflow-x-auto animate-fade-in delay-500">
              <table className="w-full text-sm sm:text-base text-left text-gray-700 border-collapse">
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition duration-200">
                    <th className="py-3 px-4 font-medium text-gray-800">Age Range</th>
                    <td className="py-3 px-4">{plan.minAge} - {plan.maxAge}</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition duration-200">
                    <th className="py-3 px-4 font-medium text-gray-800">Policy Term</th>
                    <td className="py-3 px-4">{plan.policyTerm}</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition duration-200">
                    <th className="py-3 px-4 font-medium text-gray-800">Premium</th>
                    <td className="py-3 px-4">{plan.premiumRange}</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition duration-200">
                    <th className="py-3 px-4 font-medium text-gray-800">Sum Assured</th>
                    <td className="py-3 px-4">{plan.sumAssuredRange}</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition duration-200">
                    <th className="py-3 px-4 font-medium text-gray-800">Maturity Benefits</th>
                    <td className="py-3 px-4">{plan.maturityBenefits}</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition duration-200">
                    <th className="py-3 px-4 font-medium text-gray-800">Tax Benefits</th>
                    <td className="py-3 px-4">{plan.taxBenefits}</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition duration-200">
                    <th className="py-3 px-4 font-medium text-gray-800">Last Updated</th>
                    <td className="py-3 px-4">{new Date(plan.updatedAt).toLocaleDateString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Link
              to="/plans"
              className="inline-block text-indigo-600 hover:text-indigo-800 font-semibold transition duration-200 animate-fade-in delay-600"
            >
              Back to Plans
            </Link>
          </div>
        </div>

        {/* Enquiry Form */}
        <div className="md:mt-12 bg-white/95 backdrop-blur-md md:border border-gray-200  shadow-lg md:rounded-3xl p-6 sm:p-8 animate-fade-in delay-700">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
            Enquire About {plan.title}
          </h2>
          {formStatus && (
            <p className="text-green-600 text-sm sm:text-base mb-4">{formStatus}</p>
          )}
          {formError && (
            <p className="text-red-600 text-sm sm:text-base mb-4">{formError}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="number"
                className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                placeholder="Your message or questions about the plan"
              />
            </div>
            <input
              type="hidden"
              name="planname"
              value={formData.planname}
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Submit Enquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlanDetail;