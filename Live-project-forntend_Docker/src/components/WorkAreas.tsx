import React, { useEffect, useRef } from 'react';
import { Shield, Users, Headphones, Leaf, Heart, Briefcase } from 'lucide-react';

const WorkAreas: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeUp');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach(el => observer.observe(el));
    
    return () => {
      elements?.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="work" ref={sectionRef} className="py-20 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Work Areas</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">The foundation works across multiple sectors to create sustainable impact and foster positive change.</p>
          <div className="w-24 h-1 bg-green-600 mx-auto mt-4"></div>
        </div>
        
        <div className="animate-on-scroll opacity-0 transition-all duration-1000 mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Operational Sectors</h3>
            <p className="text-gray-700 mb-6">
              The Cochin Sneha Veena Mimics and Musical Foundation engages in diverse fields, making significant contributions to social welfare and community development.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Leaf className="w-10 h-10 text-green-600" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Environmental Conservation</h4>
                  <p className="text-gray-600">Tree planting, clean energy adoption, and ecological protection initiatives.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <Headphones className="w-10 h-10 text-green-600" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Art and Culture</h4>
                  <p className="text-gray-600">Supporting performing arts, traditional crafts, and cultural preservation.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <Heart className="w-10 h-10 text-green-600" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Healthcare Programs</h4>
                  <p className="text-gray-600">Organizing blood donation drives and free health check-ups for communities.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <Briefcase className="w-10 h-10 text-green-600" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Employment Assistance</h4>
                  <p className="text-gray-600">Facilitating job opportunities for trained candidates and skill development.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="animate-on-scroll opacity-0 transition-all duration-1000" style={{ transitionDelay: '0.2s' }}>
            <div className="bg-white rounded-lg shadow-md p-8 h-full">
              <div className="flex items-center mb-6">
                <Shield className="w-10 h-10 text-blue-600 mr-3" />
                <h3 className="text-2xl font-semibold text-gray-800">Government Collaborations</h3>
              </div>
              
              <p className="text-gray-700 mb-6">
                The trust actively works alongside several ministries, contributing to national and regional welfare initiatives:
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-1 mt-1 mr-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Ministry of Social Justice and Empowerment – Supporting programs for marginalized communities</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-1 mt-1 mr-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Ministry of Rural Development – Enhancing sustainable growth in rural areas</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-1 mt-1 mr-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Ministry of Skill Development and Entrepreneurship – Training and employment generation</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-1 mt-1 mr-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Ministry of Minority Affairs – Initiatives for minority community upliftment</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-1 mt-1 mr-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Ministry of AYUSH – Promoting traditional healthcare practices</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="animate-on-scroll opacity-0 transition-all duration-1000" style={{ transitionDelay: '0.4s' }}>
            <div className="bg-white rounded-lg shadow-md p-8 h-full">
              <div className="flex items-center mb-6">
                <Users className="w-10 h-10 text-green-600 mr-3" />
                <h3 className="text-2xl font-semibold text-gray-800">Skill Councils</h3>
              </div>
              
              <p className="text-gray-700 mb-6">
                The foundation partners with multiple sector skill councils to enhance industry-specific training:
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mt-1 mr-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Solar Sector Skill Council</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mt-1 mr-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Apparel and Made-ups Industry</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mt-1 mr-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Handicrafts and Artisans Sector</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mt-1 mr-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Sports Development Council</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mt-1 mr-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Water Management and Plumbing Sector</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default WorkAreas;