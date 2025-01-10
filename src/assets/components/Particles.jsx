import React, { useEffect, useRef, useState } from 'react';

const ParticlesBackground = () => {
  const canvasRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Handle scroll
    const handleScroll = () => {
      setScrollY(window.scrollY * 0.2); // Adjust multiplier to control scroll sensitivity
    };
    window.addEventListener('scroll', handleScroll);

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.baseX = Math.random() * canvas.width;
        this.baseY = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.radius = Math.random() * 2 + 1.5;
      }

      draw() {
        // Adjust position based on scroll
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
    const particles = Array.from({ length: 300 }, () => new Particle());

    // Draw lines between nearby particles
    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].baseX - particles[j].baseX;
          const dy = (particles[i].baseY - scrollY) - (particles[j].baseY - scrollY);
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].baseX, particles[i].baseY - scrollY);
            ctx.lineTo(particles[j].baseX, particles[j].baseY - scrollY);
            ctx.strokeStyle = `rgba(74, 144, 226, ${0.2 * (1 - distance / 150)})`;
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
  }, [scrollY]); // Add scrollY to dependency array

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