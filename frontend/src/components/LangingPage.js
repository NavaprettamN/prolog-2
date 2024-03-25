import React from 'react'
import NavBar from './NavBar'
import { URL, local_url } from './url';

const LangingPage = () => {
  return (
    <div>
      <NavBar />
      {/* Company Name Section */}
        <div className="bg-gray-800 text-white flex flex-col gap-4 justify-center items-center min-h-screen">
                <h1 className="text-4xl font-bold">Prolog</h1>
                <p>Your personal progress logger</p>
            </div>

            {/* About Us Section */}
                <div className="container bg-gray-200 py-16 mx-auto flex flex-col md:flex-row items-center justify-center">
                    <div className="md:w-1/2 p-8">
                        <h2 className="text-2xl font-bold mb-4">About Us</h2>
                        <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
                    </div>
                    <div className="md:w-1/2 p-8">
                        <img src="https://via.placeholder.com/400" alt="About Us" className="w-full" />
                    </div>
                </div>

            {/* Explore Blogs Section */}
            <div className="container bg-gray-300 py-16 text-center mx-auto flex flex-col items-center justify-center h-screen">
                <h2 className="text-2xl font-bold mb-4">Explore Blogs</h2>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Explore Blogs</button>
            </div>

            {/* Contact Us Section */}
            <div className="bg-gray-400 py-16 text-center ">
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p>Contact information or contact form goes here...</p>
            </div>
    </div>
  )
}

export default LangingPage