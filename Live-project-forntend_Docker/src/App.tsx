import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Members from './components/Members';
import Gallery from './components/Gallery';
import WorkAreas from './components/WorkAreas';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Modal from './components/Modal';

import './animations.css';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    document.title = "Cochin Sneha Veena Mimics and Musical Foundation";
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <main className="relative z-0">
        <Hero />

        {/* Show buttons only if NOT logged in */}
        {!isLoggedIn && (
          <div className="flex justify-center gap-6 mt-6 mb-8 z-10 relative">
            <button
              className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
            <button
              className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => setShowSignup(true)}
            >
              Signup
            </button>
          </div>
        )}

        <About />
        <Members />
        <Gallery />
        <WorkAreas />
      </main>

      {/* Modals */}
      <Modal isOpen={showLogin} onClose={() => setShowLogin(false)}>
        <Login onLoginSuccess={handleLoginSuccess} />
      </Modal>

      <Modal isOpen={showSignup} onClose={() => setShowSignup(false)}>
        <Signup />
      </Modal>

      <Footer />
    </div>
  );
}

export default App;
