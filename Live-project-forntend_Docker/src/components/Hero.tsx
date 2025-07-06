import React, { useEffect, useRef } from 'react';
import { Music, Leaf } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

const Hero: React.FC = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeUp');
        }
      },
      { threshold: 0.1 }
    );
    
    if (logoRef.current) {
      observer.observe(logoRef.current);
    }
    
    return () => {
      if (logoRef.current) {
        observer.unobserve(logoRef.current);
      }
    };
  }, []);
  
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1651372381086-9861c9c81db5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay gradient */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-primary-800/50 to-secondary-800/50"></div> */}
      
      <div className="container mx-auto px-4 py-20 text-center z-10">
        <div ref={logoRef} className="mb-8 opacity-0 transition-all duration-1000">
          {/* <div className="flex items-center justify-center text-primary-200">
            <Music className="h-16 w-16 md:h-24 md:w-24" />
            <Leaf className="h-16 w-16 md:h-24 md:w-24 ml-2" />
          </div> */}
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white opacity-0 animate-fadeIn" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          <TypeAnimation
            sequence={[
              'Cochin Sneha Veena Mimics',
              1000,
              'and Musical Foundation',
              2000
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="block"
          />
        </h1>
        
        <p className="text-xl md:text-2xl font-light text-white mb-8 max-w-3xl mx-auto opacity-0 animate-fadeIn" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          <TypeAnimation
            sequence={[
              'Uniting Talent & Nature for a Brighter Future',
              1000
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </p>
        
        <div className="opacity-0 animate-fadeIn" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
          <a href="#about" className="inline-block bg-white text-black px-8 py-3 rounded-full font-medium text-lg transition-all hover:bg-primary-700 hover:scale-105 hover:shadow-lg">
            Learn More
          </a>
        </div>
      </div>
      
      {/* Wave shape divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        {/* <svg
          className="w-full h-16 md:h-24"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="white"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V56.44Z"></path>
        </svg> */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="white" fill-opacity="1" d="M0,224L80,234.7C160,245,320,267,480,266.7C640,267,800,245,960,208C1120,171,1280,117,1360,90.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
      </div>
    </section>
  );
};

export default Hero;