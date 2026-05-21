import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PlansList = () => {
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get('http://localhost:8080/plans');
        setPlans(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching plans:', err);
        setError(err.response?.data || 'Error fetching plans');
        setPlans([]);
      }
    };
    fetchPlans();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen font-sans">
      {/* Hero Banner */}
      <div className="relative w-full h-80 md:h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1440317661399-07b1fccbe22e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Insurance Banner"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold font-serif drop-shadow-xl">
            Protect What Matters Most
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl font-light drop-shadow">
            Explore high-end insurance plans crafted for peace of mind and long-term security.
          </p>
        </div>
      </div>

      {/* Plans Section */}
      <div className="p-6 max-w-7xl mx-auto">
        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
          {plans.length > 0 ? (
            plans.map((plan) => (
              <div
                key={plan._id || plan.id?.timestamp}
                className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-md hover:shadow-indigo-300 hover:shadow-lg rounded-3xl overflow-hidden transform hover:-translate-y-2 hover:scale-105 transition-all duration-300"
              >
                {/* Title + Category Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-4">
                  <h2 className="text-xl md:text-2xl font-bold text-white truncate">
                    {plan.title}
                  </h2>
                  <span className="inline-block mt-2 bg-white/20 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm tracking-wide">
                    {plan.category}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {plan.description || 'A reliable plan offering premium coverage for your peace of mind.'}
                  </p>

                  <div className="space-y-1 text-sm text-gray-700">
                    <p><span className="font-medium">Age Range:</span> {plan.minAge} - {plan.maxAge}</p>
                    <p><span className="font-medium">Policy Term:</span> {plan.policyTerm}</p>
                    <p><span className="font-medium">Premium:</span> {plan.premiumRange}</p>
                    <p><span className="font-medium">Sum Assured:</span> {plan.sumAssuredRange}</p>
                  </div>

                  <p className="text-gray-500 text-xs">
                    Last updated: {new Date(plan.updatedAt).toLocaleDateString()}
                  </p>

                  <Link
                    to={`/plans/${encodeURIComponent(plan.title)}`}
                    className="inline-block text-indigo-600 hover:text-indigo-800 font-semibold transition duration-200"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">No plans found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlansList;
