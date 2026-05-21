import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const BlogPost = () => {
  const { title } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (!title) {
          throw new Error('No title provided in URL');
        }
        const decodedTitle = decodeURIComponent(title);
        console.log('Fetching blog with title:', decodedTitle);
        const response = await axios.get(`http://localhost:8080/blog/${encodeURIComponent(decodedTitle)}`);
        console.log('Backend response:', response.data);
        setBlog(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError(err.response?.data || err.message || 'Error fetching blog post');
        setBlog(null);
      }
    };
    fetchBlog();
  }, [title]);

  if (error) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen p-4 font-sans">
        <div className="max-w-4xl mx-auto">
          <p className="text-red-500 text-center text-base sm:text-lg">{error}</p>
          <Link
            to="/"
            className="block text-center mt-4 text-indigo-600 hover:text-indigo-800 font-semibold transition duration-200"
          >
            ← Back to Blog List
          </Link>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen p-4 font-sans">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-gray-600 text-base sm:text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen font-sans">
      {/* Hero Header */}
      <div className="relative w-full h-56 sm:h-72 md:h-96 overflow-hidden">
        <img
          src={blog.img}
          alt={blog.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold font-serif drop-shadow-xl">
            {blog.title}
          </h1>
          <p className="mt-2 text-xs sm:text-sm md:text-lg font-light drop-shadow">
            By <span className="font-medium">{blog.author}</span> on{' '}
            {new Date(blog.postdate).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="md:p-4 sm:p-4 max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-md border border-gray-200 md:shadow-md md:rounded-3xl overflow-hidden transform transition-all duration-300 hover:shadow-indigo-300">
          <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            <Link
              to="/blogs"
              className="inline-block text-indigo-600 hover:text-indigo-800 font-semibold transition duration-200 text-sm sm:text-base"
            >
              ← Back to Blog List
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs sm:text-sm text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full transition-colors duration-200 hover:bg-indigo-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="relative bg-indigo-50/50 border-l-4 border-indigo-300 p-4 rounded-lg italic text-gray-700 text-sm sm:text-base md:text-lg transition-all duration-300 hover:bg-indigo-50">
              {blog.description}
            </div>

            <div className="prose prose-indigo max-w-none text-gray-800 text-sm sm:text-base md:text-lg">
              {blog.content ? (
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              ) : (
                <p>No content available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;