import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  twinkleSpeed: number;
}

export const AtmosphereCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Reduced motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Stars
    const starCount = Math.floor(Math.min(width, 1920) / 12);
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.75),
      radius: Math.random() * 1.4 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1)
    }));

    // Petals
    const petalCount = prefersReducedMotion ? 0 : 24;
    const petalColors = [
      'rgba(255, 182, 193, 0.65)',
      'rgba(255, 192, 203, 0.55)',
      'rgba(244, 114, 182, 0.6)',
      'rgba(251, 207, 232, 0.5)',
      'rgba(236, 72, 153, 0.45)'
    ];

    const petals: Petal[] = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 9 + 6,
      speedX: Math.random() * 0.8 - 0.2,
      speedY: Math.random() * 0.7 + 0.4,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.5 + 0.3,
      color: petalColors[Math.floor(Math.random() * petalColors.length)]
    }));

    // Shooting star
    let shootingStar: { x: number; y: number; length: number; speed: number; opacity: number; active: boolean } | null = null;
    let shootingStarCooldown = 180;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Stars
      for (const star of stars) {
        if (!prefersReducedMotion) {
          star.alpha += star.twinkleSpeed;
          if (star.alpha > 0.95 || star.alpha < 0.2) {
            star.twinkleSpeed = -star.twinkleSpeed;
          }
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.shadowBlur = star.radius > 1 ? 6 : 0;
        ctx.shadowColor = 'rgba(236, 72, 153, 0.6)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 2. Shooting Star
      if (!prefersReducedMotion) {
        if (shootingStar && shootingStar.active) {
          ctx.save();
          ctx.beginPath();
          const tailX = shootingStar.x - shootingStar.length;
          const tailY = shootingStar.y - shootingStar.length * 0.4;
          const gradient = ctx.createLinearGradient(tailX, tailY, shootingStar.x, shootingStar.y);
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
          gradient.addColorStop(1, `rgba(255, 240, 245, ${shootingStar.opacity})`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.8;
          ctx.lineCap = 'round';
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(shootingStar.x, shootingStar.y);
          ctx.stroke();
          ctx.restore();

          shootingStar.x += shootingStar.speed;
          shootingStar.y += shootingStar.speed * 0.4;
          shootingStar.opacity -= 0.015;

          if (shootingStar.opacity <= 0 || shootingStar.x > width || shootingStar.y > height) {
            shootingStar.active = false;
            shootingStarCooldown = Math.floor(Math.random() * 240 + 180);
          }
        } else {
          shootingStarCooldown--;
          if (shootingStarCooldown <= 0) {
            shootingStar = {
              x: Math.random() * (width * 0.7),
              y: Math.random() * (height * 0.4),
              length: Math.random() * 90 + 70,
              speed: Math.random() * 6 + 7,
              opacity: 0.9,
              active: true
            };
          }
        }
      }

      // 3. Draw Petals
      if (!prefersReducedMotion) {
        for (const petal of petals) {
          petal.x += petal.speedX + Math.sin(petal.y * 0.01) * 0.4;
          petal.y += petal.speedY;
          petal.rotation += petal.rotationSpeed;

          if (petal.y > height + 20) {
            petal.y = -20;
            petal.x = Math.random() * width;
          }
          if (petal.x > width + 20) petal.x = -20;
          if (petal.x < -20) petal.x = width + 20;

          ctx.save();
          ctx.translate(petal.x, petal.y);
          ctx.rotate(petal.rotation);

          ctx.beginPath();
          ctx.fillStyle = petal.color;
          // Petal organic curve
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(petal.size * 0.6, -petal.size * 0.4, petal.size * 0.8, petal.size * 0.8, 0, petal.size * 1.2);
          ctx.bezierCurveTo(-petal.size * 0.8, petal.size * 0.8, -petal.size * 0.6, -petal.size * 0.4, 0, 0);
          ctx.fill();

          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
