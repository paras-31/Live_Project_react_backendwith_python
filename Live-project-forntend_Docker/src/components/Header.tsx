import React, { useState, useEffect } from 'react';
import { Music, Leaf, Menu, X } from 'lucide-react';
import { Link } from './ui/Link';

interface HeaderProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className={`flex items-center text-primary-600 ${ isScrolled ? 'text-gray-800 text-lg' : 'text-white text-xl'}`}>
            <Music className="h-8 w-8" />
            <Leaf className="h-8 w-8 ml-1" />
          </div>

          <div className="ml-2">
            <h1 className={`font-bold transition-all duration-300 ${
              isScrolled ? 'text-gray-800 text-lg' : 'text-white text-xl'
            }`}>
              <span className="block sm:inline">CSVMMF</span> 
            </h1>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {['Home', 'About', 'Members', 'Gallery', 'Work', 'Contact'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-200'
              }`}
            >
              {item}
            </Link>
          ))}

          {/* Logout Button */}
          {isLoggedIn && (
            <button
              onClick={onLogout}
              className="ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className={isScrolled ? 'text-gray-800' : 'text-white'} />
          ) : (
            <Menu className={isScrolled ? 'text-gray-800' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 py-4 animate-fadeIn">
          <ul className="flex flex-col items-center space-y-4">
            {['Home', 'About', 'Members', 'Gallery', 'Work', 'Contact'].map((item) => (
              <li key={item}>
                <Link
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-primary-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}

            {/* Logout Button in Mobile Menu */}
            {isLoggedIn && (
              <li>
                <button
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                  className="bg-red-600 px-4 py-2 text-white rounded hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
