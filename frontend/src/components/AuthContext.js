import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { URL, local_url } from './url';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState();

    useEffect(() => {
        // Check if user is authenticated using server-side validation
        checkAuthentication();
    }, []);

    const checkAuthentication = async () => {
        console.log("Checking authentication...");
        try {
          const res = await axios.get(`${URL}/getuser`, {
            withCredentials: true,
          });
            if (res.status == 200) {
                console.log("something to check");
                const data = await res.data.userId;
                setUserId(data);
                // console.log(data); --> to check whether the user data is saved
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
            }
        } catch (error) {
            console.log('Error checking authentication:');
            setAuthenticated(false);
        }
    };

    return (
        <AuthContext.Provider value={{ authenticated, userId, checkAuthentication }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {return useContext(AuthContext);}