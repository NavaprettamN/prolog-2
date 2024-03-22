import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const BlogPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [username, setUsername] = useState('');
  
    useEffect(() => {
      const fetchBlogDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/blog/${id}`, {withCredentials: true});
          console.log(response);
          setBlog(response.data.blog);
          setUsername(response.data.username);
        } catch (error) {
          console.error('Error fetching blog details:', error);
        }
      };
      fetchBlogDetails();
    }, [id]);
  
    return (
      <div className="container mx-auto py-8">
      {blog && (
        <div className="bg-white p-8 rounded shadow-md">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-center">{blog.title}</h2>
            <p className="text-gray-600 mb-4">{blog.content}</p>
            <p className="text-gray-500 text-left">Written by: {username}</p>
          </div>
        </div>
      )}
    </div>
    );
  };

export default BlogPage