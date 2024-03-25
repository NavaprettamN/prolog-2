import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { URL, local_url } from './url';

const NavBar = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const [authenticated, setAuthenticated] = useState(auth.authenticated);
    useEffect(() => {
        setAuthenticated(auth.authenticated);
    });

    const handleLogout = async () => {
        try {
            const res = await axios.get(`${URL}/logout`, {withCredentials: true});
            if(res.status == 200) {
                console.log('cookie deleted');
                auth.checkAuthentication();
                setAuthenticated(auth.authenticated);
                navigate('/login');
            }
        }
        catch (err) {
            console.log('error : ', err);
        }
    }

    return (
        <nav className="sticky top-0 -mt-16 bg-black bg-opacity-50 p-4 z-10">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl ml-6 font-bold">Prolog</h1>
                {authenticated ? 
                <>
                    {/* Right-aligned links */}
                    <div className="space-x-8">
                        <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                        <Link to="/create" className="text-white hover:text-gray-300">Create</Link>
                        <button className="text-white hover:text-gray-300" onClick={handleLogout}>Logout</button>
                        <Link to="/profile" className="text-white hover:text-gray-300">Profile</Link>
                    </div>
                </> : <>
                    {/* Right-aligned links */}
                    <div className="space-x-8">
                        <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                        <Link to="#about" className="text-white hover:text-gray-300">About</Link>
                        <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
                        <Link to="#contact" className="text-white hover:text-gray-300">Contact</Link>
                    </div>
                </>}
                
            </div>
        </nav>
    );
};

export default NavBar;