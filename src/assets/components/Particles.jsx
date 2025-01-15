import React, { useEffect, useRef, useState } from 'react';

const ParticlesBackground = () => {
  const canvasRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [particleCount, setParticleCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Handle scroll
    const handleScroll = () => {
      setScrollY(window.scrollY * 0.2);
    };
    window.addEventListener('scroll', handleScroll);

    // Calculate particle count based on screen size
    const calculateParticleCount = () => {
      const area = window.innerWidth * window.innerHeight;
      // Base density of approximately 1 particle per 8000 pixels
      const particleDensity = 1 / 8000;
      const count = Math.floor(area * particleDensity);
      // Clamp the count between 50 and 500 particles
      return Math.min(Math.max(count, 50), 500);
    };

    // Set canvas size and update particle count
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setParticleCount(calculateParticleCount());
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.baseX = Math.random() * canvas.width;
        this.baseY = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        // Scale particle size based on screen width
        const baseSize = Math.min(canvas.width, canvas.height) * 0.002;
        this.radius = (Math.random() * baseSize + baseSize) * 0.75;
      }

      draw() {
        const adjustedY = this.baseY - scrollY;
        
        ctx.beginPath();
        ctx.arc(this.baseX, adjustedY, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 76, 255, 0.3)';
        ctx.fill();
      }

      update() {
        this.baseX += this.vx;
        this.baseY += this.vy;

        // Bounce off edges with adjusted boundaries
        if (this.baseX < 0 || this.baseX > canvas.width) this.vx = -this.vx;
        if (this.baseY < scrollY || this.baseY > canvas.height + scrollY) this.vy = -this.vy;
      }
    }

    // Create particles
    const particles = Array.from({ length: particleCount }, () => new Particle());

    // Draw lines between nearby particles
    const drawLines = () => {
      // Scale connection distance based on screen size
      const connectionDistance = Math.min(canvas.width, canvas.height) * 0.15;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].baseX - particles[j].baseX;
          const dy = (particles[i].baseY - scrollY) - (particles[j].baseY - scrollY);
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].baseX, particles[i].baseY - scrollY);
            ctx.lineTo(particles[j].baseX, particles[j].baseY - scrollY);
            ctx.strokeStyle = `rgba(74, 144, 226, ${0.2 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      drawLines();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollY, particleCount]); // Added particleCount to dependency array

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: '#f4f4f9',
        pointerEvents: 'none'
      }}
    />
  );
};

export default ParticlesBackground;