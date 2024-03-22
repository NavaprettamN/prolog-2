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
      <div>
        {blog && (
          <div>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <p>Written by: {username}</p>
          </div>
        )}
      </div>
    );
  };

export default BlogPage