import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const EditBlogPage = () => {

  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {

      const res = await axios.get(`http://localhost:5000/blog/${id}`, {withCredentials: true});
      const {blog} = res.data;
      setTitle(blog.title);
      setContent(blog.content);
    }catch (err) {
      console.error('Error fetching blog data:', err);
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(id);
    try {
      const res = await axios.put(`http://localhost:5000/updateblog/${id}`, {title, content, lastPostedAt: Date.now()}, {withCredentials: true})
      console.log("the update worked? : ", res);
    }
    catch (err) {
      console.error('Error updating blog data:', err);
    }
  }

  return (
    <div className="container mx-auto py-8">
    <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label className="block mb-2 font-medium">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
      >
        Update Blog
      </button>
    </form>
  </div>
  )
}

export default EditBlogPage;