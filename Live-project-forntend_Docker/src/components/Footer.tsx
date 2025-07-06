import React from 'react';
import { Music, Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="flex items-center text-green-400">
                <Music className="h-8 w-8" />
                <Leaf className="h-8 w-8 ml-1" />
              </div>
              <span className="ml-2 font-bold text-xl">CSVMMF</span>
            </div>
            <p className="text-gray-400 mb-6">
              Uniting Talent & Nature for a Brighter Future
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#members" className="text-gray-400 hover:text-white transition-colors">Our Team</a></li>
              <li><a href="#gallery" className="text-gray-400 hover:text-white transition-colors">Gallery</a></li>
              <li><a href="#work" className="text-gray-400 hover:text-white transition-colors">Our Work</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Key Members</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Sandeep Kajal <span className="text-green-400">(Key Functionary)</span></li>
              <li className="text-gray-400">Abhishek Arya <span className="text-green-400">(Secretary)</span></li>
              <li className="text-gray-400">Sumitra <span className="text-green-400">(Treasurer)</span></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-green-400 mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-400">VPO Haripur Kamboan Karera Khurd,<br />Yamunanagar, Haryana 135004</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                <a href="mailto:csvmmfskills@gmail.com" className="text-gray-400 hover:text-white transition-colors">csvmmfskills@gmail.com</a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                <span className="text-gray-400">8168019011, 8708429389</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Cochin Sneha Veena Mimics and Musical Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;