import React, { useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import axios from 'axios';
import NavBar from './NavBar';

const Home = () => {
  
  const [blogs, setBlogs] = useState([]);
  const [userBlogs, setUserBlogs] = useState([]);
  const auth = useAuth();
  const userId = auth.userId;
  useEffect(() => {
    // Fetch blogs when the component mounts
    getBLogs();
    userBlog(); 
}, []);

  const getBLogs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/allblogs');
      setBlogs(res.data);
    }
    catch(err) {
      console.log("error while fetching the blogs : ", err);
    }
  }

  const userBlog = async () => {
    try {
      const res = await axios.get('http://localhost:5000/getuserblog', {withCredentials: true});
      setUserBlogs(res.data);
    }
    catch(err) {
      console.log("error while fetching the blogs : ", err);
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <NavBar />
      <div className="container mx-auto py-16">
        <div className="flex justify-center">
          {/* Left side - All Blogs */}
          <div className="w-3/4 bg-gradient-to-br from-purple-600 to-blue-500 bg-opacity-75 rounded p-4 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">All Blogs</h2>
            <div className="space-y-4">
              {blogs.map(blog => (
                <div key={blog._id} className="bg-white p-4 rounded shadow-md">
                  <h3 className="text-xl font-semibold"><a href={`/blog/${blog._id}`} className="text-blue-500 hover:underline">{blog.title}</a></h3>
                  <p className="text-gray-600">{blog.content}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right side - User Blogs */}
          <div className="w-1/4 ml-4 bg-gradient-to-br from-purple-600 to-blue-500 bg-opacity-75 rounded p-4 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Your Blogs</h2>
            {/* Display user's blogs here */}
            {userBlogs.map(blog => (
                <div key={blog._id} className="bg-white p-4 rounded shadow-md">
                  <a href={`/blog/${blog._id}`} className="text-blue-500 hover:underline">{blog.title}</a>
                  <p className="text-gray-600">{blog.content}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home