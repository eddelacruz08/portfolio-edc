'use client';

import { useEffect, useRef } from 'react';

interface LetterGlitchProps {
  glitchSpeed?: number;
  centerVignette?: boolean;
  outerVignette?: boolean;
  smooth?: boolean;
  className?: string;
}

export default function LetterGlitch({
  glitchSpeed = 50,
  centerVignette = true,
  outerVignette = false,
  smooth = true,
  className = '',
}: LetterGlitchProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Character set for glitch effect
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);

    // Initialize drops
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    // Animation loop
    const draw = () => {
      // Create fade effect
      ctx.fillStyle = smooth ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text style
      ctx.fillStyle = '#0F0'; // Green color
      ctx.font = `${fontSize}px monospace`;

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Apply vignette effects
        let alpha = 1;
        if (centerVignette || outerVignette) {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const distance = Math.sqrt(
            Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
          );
          const maxDistance = Math.sqrt(
            Math.pow(centerX, 2) + Math.pow(centerY, 2)
          );
          const normalizedDistance = distance / maxDistance;

          if (centerVignette) {
            alpha = 1 - normalizedDistance * 0.7;
          }
          if (outerVignette) {
            alpha = normalizedDistance;
          }
        }

        ctx.globalAlpha = alpha;
        ctx.fillText(char, x, y);
        ctx.globalAlpha = 1;

        // Reset drop to top randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    // Start animation with speed control
    let lastTime = 0;
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;

      if (deltaTime >= glitchSpeed) {
        draw();
        lastTime = currentTime;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [glitchSpeed, centerVignette, outerVignette, smooth]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 ${className}`}
      style={{
        background: 'black',
        opacity: 0.3,
      }}
    />
  );
}
