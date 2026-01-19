import React from 'react';
import './AnimatedBackground.css';

export const ThreeBackground: React.FC = () => {
  return (
    <div className="animated-background">
      {/* Animated gradient background */}
      <div className="gradient-bg" />
      
      {/* Animated blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      
      {/* Particle effect container */}
      <div className="particles-container">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
      
      {/* Overlay for text readability */}
      <div className="overlay" />
    </div>
  );
};

export default ThreeBackground;
