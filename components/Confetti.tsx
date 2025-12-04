import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  velocity: { x: number; y: number };
  life: number;
}

export const Confetti: React.FC<{ trigger: number }> = ({ trigger }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (trigger === 0) return;

    const colors = ['#6366F1', '#10B981', '#F43F5E', '#F59E0B', '#3B82F6'];
    const newParticles: Particle[] = [];

    // Create explosion at center of screen
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 2;
      newParticles.push({
        id: Math.random(),
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed,
        },
        life: 1.0,
      });
    }

    setParticles(newParticles);
  }, [trigger]);

  useEffect(() => {
    if (particles.length === 0) return;

    let animationFrameId: number;

    const animate = () => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.velocity.x,
            y: p.y + p.velocity.y + 0.2, // Gravity
            life: p.life - 0.015,
          }))
          .filter(p => p.life > 0)
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [particles]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            width: '8px',
            height: '8px',
            backgroundColor: p.color,
            borderRadius: '50%',
            opacity: p.life,
            transform: `scale(${p.life})`,
          }}
        />
      ))}
    </div>
  );
};