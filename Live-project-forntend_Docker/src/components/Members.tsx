import React, { useEffect, useRef } from 'react';
import { User } from 'lucide-react';

interface Member {
  id: number;
  name: string;
  position: string;
  image: string;
}

const members: Member[] = [
  {
    id: 1,
    name: "Sandeep Kajal",
    position: "Key Functionary",
    image: "https://i.pinimg.com/736x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"
  },
  {
    id: 2,
    name: "Abhishek Arya",
    position: "Secretary",
    image: "https://i.pinimg.com/736x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"
  },
  {
    id: 3,
    name: "Sumitra",
    position: "Treasurer",
    image: "https://i.pinimg.com/736x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"
  }
];

const Members: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-fadeUp');
            }, index * 150);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = sectionRef.current?.querySelectorAll('.member-card');
    elements?.forEach(el => observer.observe(el));
    
    return () => {
      elements?.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="members" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Key Members</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Meet the dedicated individuals who drive our mission forward and work tirelessly to create positive change.</p>
          <div className="w-24 h-1 bg-green-600 mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:w-[70%]  m-auto">
          {members.map((member, index) => (
            <div 
              key={member.id} 
              className="member-card opacity-0 transition-all duration-1000 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transform hover:-translate-y-2 transition-all"
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <h4 className="text-xl font-bold">{member.name}</h4>
                    <p>{member.position}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h4>
                <p className="text-green-600 font-medium mb-4">{member.position}</p>
                <div className="flex items-center text-gray-600">
                  <User className="w-5 h-5 mr-2" />
                  <span>Trust Member</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Members;