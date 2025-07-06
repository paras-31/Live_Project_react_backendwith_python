import React, { useEffect, useRef } from 'react';
import { User, Award, Target } from 'lucide-react';

const About: React.FC = () => {
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
    <section id="about" ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">About Our Foundation</h2>
          <div className="w-24 h-1 bg-green-600 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-on-scroll opacity-0 transition-all duration-1000">
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-700 mb-4">
                The Cochin Sneha Veena Mimics and Musical Foundation is dedicated to nation-building through environmental conservation, skill development, healthcare, and social upliftment. We address crucial challenges such as global warming through large-scale plantation drives, bridging the skill gap between industry demands and young talent, and enhancing healthcare accessibility for the rural poor.
              </p>
              <div className="flex items-center text-green-700 font-medium">
                <Target className="w-5 h-5 mr-2" />
                <span>Uniting Talent & Nature for a Brighter Future</span>
              </div>
            </div>
          </div>
          
          <div className="animate-on-scroll opacity-0 transition-all duration-1000" style={{ transitionDelay: '0.2s' }}>
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
              <div className="flex items-center mb-4">
                <User className="w-10 h-10 text-blue-600 mr-3" />
                <h3 className="text-2xl font-semibold text-gray-800">Our Key Functionary</h3>
              </div>
              
              {/* <h4 className="text-xl font-medium text-gray-800 mb-2">Mr. Sandeep Kajal</h4> */}
              <p className="text-gray-700 mb-4">
                Born on December 20, 1983, in Raipur Jattan, Karnal, Mr. Sandeep Kajal has built a distinguished career in academia, law, and social service. With over 15 years of hands-on experience in social service, he leads with passion, expanding the reach and impact of the NGO, striving to create a more sustainable, skilled, and inclusive society.
                {/* The Cochin Sneha Veena Mimics and Musical Foundation is dedicated to nation-building through environmental conservation, skill development, healthcare, and social upliftment. We address crucial challenges such as global warming through large-scale plantation drives, bridging the skill gap between industry demands and young talent, and enhancing healthcare accessibility for the rural poor. */}

              </p>
              
              <div className="flex items-center text-blue-700 font-medium">
                <Award className="w-5 h-5 mr-2" />
                <span>President, Cochin Sneha Veena Mimics and Musical Foundation</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 animate-on-scroll opacity-0 transition-all duration-1000" style={{ transitionDelay: '0.4s' }}>
          <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">About Our President</h3>
            <p className="text-gray-700 mb-4">
              With a strong educational foundation, Mr. Sandeep Kajal pursued his LLB from CCS University, Meerut, followed by an M.Tech from Maharishi Markandey University, Mullana. His commitment to knowledge and justice led him to serve as a Professor at MM University while also working as a Senior Advocate at Karnal District Court, making significant contributions in both the legal and educational domains.
            </p>
            <p className="text-gray-700 mb-4">
              Recognizing the urgent need for action in various social sectors, Mr. Kajal took on the role of President with a deep commitment to nation-building through environmental conservation, skill development, healthcare, and social upliftment. His vision centers around addressing crucial challenges such as global warming through large-scale plantation drives, bridging the skill gap between industry demands and young talent, and enhancing healthcare accessibility for the rural poor.
            </p>
            <p className="text-gray-700">
              He has actively worked on the ground, providing direct aid to those in need, particularly supporting underprivileged individuals who struggle to afford medical treatment due to financial constraints. His leadership ensures that the trust significantly contributes to environmental conservation, women empowerment, skill training, natural resource preservation, and the upliftment of Scheduled Castes and marginalized communities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;