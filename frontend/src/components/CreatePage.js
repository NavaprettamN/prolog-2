import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { URL, local_url } from './url';

const CreatePage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [frequency, setFrequency] = useState('daily'); // Set default value to 'daily'
    const navigate = useNavigate();
    const auth = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to your backend API to create the blog
            const response = await axios.post(`${URL}/createblog`, {title, content, frequency, userId : auth.userId, lastPostedAt: Date.now()}, 
            {withCredentials: true});
            if (response.status == 200) {
                // Blog created successfully, redirect to the dashboard or another page
                console.log("blog created");
                navigate('/dashboard');
            } else {
                // Handle error response
                console.error('Failed to create blog');
            }
        } catch (error) {
            // Handle network errors
            console.error('Error creating blog:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
            <h2 className="text-lg font-semibold mb-4">Create New Blog</h2>
            <form onSubmit={handleSubmit}>
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
                <div className="mb-4">
                    <label className="block mb-2 font-medium">Frequency:</label>
                    <select
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
                >
                    Create Blog
                </button>
            </form>
        </div>
    );
}

export default CreatePage