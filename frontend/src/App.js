import './App.css';
import React from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import LangingPage from './components/LangingPage';
import Login from './components/Login';
import Home from './components/Home';
import { AuthProvider } from './components/AuthContext';
import Signup from './components/Signup';
import CreatePage from './components/CreatePage';
import ProfilePage from './components/ProfilePage';
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<LangingPage />} />
          {/* <Route path='/nothing' element={<NavBar />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<Home />} />
          <Route path='/create' element={<CreatePage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
