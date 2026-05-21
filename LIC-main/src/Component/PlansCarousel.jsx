import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PlansCarousel = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [planCategories, setPlanCategories] = useState([
    {
      id: 1,
      name: "Term Insurance Plans",
      description: "Pure protection plans with affordable premiums.",
      availablePlans: 0, // Initial value, will be updated
      imageUrl: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/term-insurance"
    },
    {
      id: 2,
      name: "Pension Schemes",
      description: "Savings + insurance benefits.",
      availablePlans: 0,
      imageUrl: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/endowment-plans"
    },
    {
      id: 3,
      name: "Unit Linked Plans",
      description: "Coverage for the entire life with maturity benefits.",
      availablePlans: 0,
      imageUrl: "https://images.unsplash.com/photo-1652151368404-d9b0e7713bdb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/whole-life-plans"
    },
    {
      id: 4,
      name: "Micro Insurance Plans",
      description: "Periodic returns during the policy term.",
      availablePlans: 0,
      imageUrl: "https://images.unsplash.com/photo-1624953901718-e24ee7200b85?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/money-back-plans"
    },
    {
      id: 5,
      name: "Withdrawn Plans",
      description: "For post-retirement income and financial stability.",
      availablePlans: 0,
      imageUrl: "https://images.unsplash.com/photo-1633158829875-e5316a358c6f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/pension-plans"
    },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch("http://localhost:8080/plans");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const plans = await response.json();
        
        // Count plans per category
        const planCounts = plans.reduce((acc, plan) => {
          acc[plan.category] = (acc[plan.category] || 0) + 1;
          return acc;
        }, {});

        // Update planCategories with dynamic counts
        setPlanCategories((prevCategories) =>
          prevCategories.map((category) => ({
            ...category,
            availablePlans: planCounts[category.name] || 0,
          }))
        );
      } catch (error) {
        console.error("Error fetching plans:", error);
        // Optionally, keep default counts or set to 0
      }
    };

    fetchPlans();
  }, []); // Empty dependency array to run once on mount

  const cardsPerSlide = 3;

  const handleDotClick = (index) => {
    const container = scrollRef.current;
    const cardWidth = container.scrollWidth / planCategories.length;
    container.scrollTo({
      left: index * cardsPerSlide * cardWidth,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  const handleScroll = (dir) => {
    let newIndex = activeIndex + (dir === "left" ? -1 : 1);
    const maxIndex = Math.ceil(planCategories.length / cardsPerSlide) - 1;
    if (newIndex < 0) newIndex = 0;
    if (newIndex > maxIndex) newIndex = maxIndex;
    handleDotClick(newIndex);
  };

  const handleCardClick = (categoryName) => {
    navigate(`/category/${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="w-full px-4 py-12 bg-gray-50">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">Explore Our Plans</h2>
        <p className="text-gray-600 text-lg mt-2">
          Choose a plan that fits your future and your finances.
        </p>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory space-x-4 no-scrollbar scroll-smooth"
      >
        {planCategories.map((plan) => (
          <div
            key={plan.id}
            onClick={() => handleCardClick(plan.name)}
            className="cursor-pointer snap-start shrink-0 w-[85%] sm:w-[45%] lg:w-[30%] bg-white rounded-xl shadow-md hover:shadow-xl transition"
          >
            <img
              src={plan.imageUrl}
              alt={plan.name}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {plan.name}
              </h3>
              <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
              <div className="flex justify-between items-center mt-4 text-sm">
                <span className="text-gray-500">
                  {plan.availablePlans} Plans
                </span>
                <span className="text-blue-600 font-medium hover:underline">
                  View Plans →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots and Arrows omitted for brevity */}
    </div>
  );
};

export default PlansCarousel;