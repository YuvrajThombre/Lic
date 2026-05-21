import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/blog');
        setBlogs(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError(err.response?.data || 'Error fetching blogs');
        setBlogs([]);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen font-sans">
      {/* Hero Banner */}
      <div className="relative w-full h-80 md:h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Blog Banner"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold font-serif drop-shadow-xl">
            Discover Our Insights
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl font-light drop-shadow">
            Dive into our latest blog posts for expert tips, stories, and inspiration.
          </p>
        </div>
      </div>

      {/* Blogs Section */}
      <div className="p-6 max-w-7xl mx-auto">
        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-md hover:shadow-indigo-300 hover:shadow-lg rounded-3xl overflow-hidden transform hover:-translate-y-2 hover:scale-105 transition-all duration-300"
              >
                {/* Image + Title Header */}
                <div className="relative">
                  <img
                    src={blog.img}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <Link to={`/blog/${encodeURIComponent(blog.title)}`}>
                      <h2 className="text-xl md:text-2xl font-bold text-white truncate hover:text-indigo-200 transition-colors duration-200">
                        {blog.title}
                      </h2>
                    </Link>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {blog.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-500 text-xs">
                    By <span className="font-medium">{blog.author}</span> on{' '}
                    {new Date(blog.postdate).toLocaleDateString()}
                  </p>

                  <Link
                    to={`/blog/${encodeURIComponent(blog.title)}`}
                    className="inline-block text-indigo-600 hover:text-indigo-800 font-semibold transition duration-200"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">No blogs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogList;