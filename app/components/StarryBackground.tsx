"use client";

import { useEffect, useRef } from 'react';

interface StarryBackgroundProps {
  className?: string;
}

export default function StarryBackground({ className = '' }: StarryBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match window
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Star properties
    const stars: {
      x: number;
      y: number;
      radius: number;
      color: string;
      velocity: number;
      alpha: number;
      pulse: number;
    }[] = [];
    
    // Create 150 stars
    for (let i = 0; i < 150; i++) {
      const radius = Math.random() * 1.5;
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius,
        color: i % 5 === 0 ? '#9C88FF' : i % 7 === 0 ? '#8EFFFF' : '#FFFFFF',
        velocity: 0.05 + Math.random() * 0.1,
        alpha: 0.1 + Math.random() * 0.9,
        pulse: Math.random() * 0.1
      });
    }
    
    // Create 3 nebula clouds
    const nebulas = [
      {
        x: canvas.width * 0.2,
        y: canvas.height * 0.3,
        radius: canvas.width * 0.15,
        color: 'rgba(147, 51, 234, 0.05)' // Purple
      },
      {
        x: canvas.width * 0.7,
        y: canvas.height * 0.6,
        radius: canvas.width * 0.2,
        color: 'rgba(59, 130, 246, 0.04)' // Blue
      },
      {
        x: canvas.width * 0.8,
        y: canvas.height * 0.2,
        radius: canvas.width * 0.25,
        color: 'rgba(236, 72, 153, 0.03)' // Pink
      }
    ];
    
    let frame = 0;
    
    // Animation loop
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw nebulas
      nebulas.forEach(nebula => {
        const gradient = ctx.createRadialGradient(
          nebula.x, nebula.y, 0,
          nebula.x, nebula.y, nebula.radius
        );
        gradient.addColorStop(0, nebula.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
      
      // Draw stars
      stars.forEach(star => {
        // Update position
        star.y += star.velocity;
        
        // Reset position when star reaches bottom
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        
        // Pulsating effect
        star.alpha = Math.max(0.1, star.alpha + Math.sin(frame * 0.02) * star.pulse);
        
        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
        
        // Draw glow for brighter stars
        if (star.radius > 1) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
          const glow = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.radius * 3
          );
          glow.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
          glow.addColorStop(1, 'transparent');
          ctx.fillStyle = glow;
          ctx.fill();
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);
  
  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#070B34] via-[#0D1445] to-[#0A0F2D] opacity-90"></div>
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0"
      />
    </div>
  );
} 