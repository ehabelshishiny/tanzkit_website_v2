'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import { GradientButton } from '@/components/ui/gradient-button';
import { RTLAwareArrow } from '@/components/ui/rtl-aware-arrow';

interface NetworkNode {
  id: number;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  pulsePhase: number;
  connections: number[];
  type: 'hub' | 'operator' | 'driver' | 'enterprise' | 'passenger' | 'supervisor';
  label?: string;
}

interface PulseDot {
  id: number;
  fromNode: number;
  progress: number;
  speed: number;
  returning: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  distance: number;
  maxDistance: number;
  color: string;
  size: number;
  alpha: number;
}

export function HeroSectionSolutions() {
  const t = useTranslations('solutions.main.hero');
  const locale = useLocale();
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const iconImageRef = useRef<HTMLImageElement | null>(null);
  const [networkNodes, setNetworkNodes] = useState<NetworkNode[]>([]);
  const pulseDots = useRef<PulseDot[]>([]);
  const particles = useRef<Particle[]>([]);
  const [canvasSize, setCanvasSize] = useState({ width: 1200, height: 800 });
  const [mounted, setMounted] = useState(false);
  const [iconLoaded, setIconLoaded] = useState(false);
  const animationRef = useRef<number | null>(null);
  const lastParticleBurst = useRef<number>(0);
  const isNetworkInitialized = useRef(false); // ✅ NEW: Track if network is ready

  // Track mounted state for theme detection
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === 'dark';

  // Brand colors - Ocean Blue to Emerald gradient for circles/shapes
  const getNodeColor = (index: number, isDark: boolean, alpha: number = 1) => {
    const colors = isDark
      ? [
          `rgba(96, 165, 250, ${alpha})`,    // Ocean Blue
          `rgba(100, 181, 246, ${alpha})`,   // Blue-Cyan
          `rgba(104, 197, 242, ${alpha})`,   // Cyan
          `rgba(108, 213, 238, ${alpha})`,   // Cyan-Teal
          `rgba(112, 229, 234, ${alpha})`,   // Teal
          `rgba(118, 232, 216, ${alpha})`,   // Emerald-Teal
        ]
      : [
          `rgba(59, 130, 246, ${alpha})`,    // Ocean Blue
          `rgba(64, 150, 240, ${alpha})`,    // Blue-Cyan
          `rgba(69, 170, 234, ${alpha})`,    // Cyan
          `rgba(74, 190, 228, ${alpha})`,    // Cyan-Teal
          `rgba(79, 210, 222, ${alpha})`,    // Teal
          `rgba(86, 218, 200, ${alpha})`,    // Emerald-Teal
        ];
    return colors[index % colors.length];
  };

  // Pulse dot colors
  const getDotColor = (dotId: number, isDark: boolean, alpha: number = 1) => {
    const dotColors = isDark
      ? [
          `rgba(255, 107, 107, ${alpha})`,
          `rgba(255, 184, 77, ${alpha})`,
          `rgba(255, 234, 167, ${alpha})`,
          `rgba(185, 127, 255, ${alpha})`,
          `rgba(255, 121, 198, ${alpha})`,
        ]
      : [
          `rgba(239, 68, 68, ${alpha})`,
          `rgba(249, 115, 22, ${alpha})`,
          `rgba(234, 179, 8, ${alpha})`,
          `rgba(147, 51, 234, ${alpha})`,
          `rgba(236, 72, 153, ${alpha})`,
        ];
    return dotColors[(dotId - 1) % dotColors.length];
  };

  // Load Tranzkit Icon
  useEffect(() => {
    const img = new window.Image();
    img.src = '/assets/icon/Tranzkit_icon_svg.svg';
    img.onload = () => {
      iconImageRef.current = img;
      setIconLoaded(true);
    };
    img.onerror = () => {
      console.error('Failed to load Tranzkit icon');
    };
  }, []);

  // Initialize canvas size
  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setCanvasSize({
          width: Math.max(1200, rect.width),
          height: Math.max(800, rect.height)
        });
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  // Initialize network visualization
  useEffect(() => {
    const { width, height } = canvasSize;
    const centerX = locale === 'ar' ? width * 0.25 : width * 0.75;
    const centerY = height * 0.45;
    const radius = 180;
    
    const angleOffset = -Math.PI / 2;
    const angleStep = (Math.PI * 2) / 5;
    
    const newNodes: NetworkNode[] = [
      {
        id: 0,
        x: centerX,
        y: centerY,
        baseX: centerX,
        baseY: centerY,
        pulsePhase: 0,
        connections: [1, 2, 3, 4, 5],
        type: 'hub'
      },
      {
        id: 1,
        x: centerX + radius * Math.cos(angleOffset),
        y: centerY + radius * Math.sin(angleOffset),
        baseX: centerX + radius * Math.cos(angleOffset),
        baseY: centerY + radius * Math.sin(angleOffset),
        pulsePhase: 0,
        connections: [0],
        type: 'operator',
        label: 'Operator'
      },
      {
        id: 2,
        x: centerX + radius * Math.cos(angleOffset + angleStep),
        y: centerY + radius * Math.sin(angleOffset + angleStep),
        baseX: centerX + radius * Math.cos(angleOffset + angleStep),
        baseY: centerY + radius * Math.sin(angleOffset + angleStep),
        pulsePhase: Math.PI * 0.4,
        connections: [0],
        type: 'enterprise',
        label: 'Enterprise'
      },
      {
        id: 3,
        x: centerX + radius * Math.cos(angleOffset + angleStep * 2),
        y: centerY + radius * Math.sin(angleOffset + angleStep * 2),
        baseX: centerX + radius * Math.cos(angleOffset + angleStep * 2),
        baseY: centerY + radius * Math.sin(angleOffset + angleStep * 2),
        pulsePhase: Math.PI * 0.8,
        connections: [0],
        type: 'supervisor',
        label: 'Supervisor'
      },
      {
        id: 4,
        x: centerX + radius * Math.cos(angleOffset + angleStep * 3),
        y: centerY + radius * Math.sin(angleOffset + angleStep * 3),
        baseX: centerX + radius * Math.cos(angleOffset + angleStep * 3),
        baseY: centerY + radius * Math.sin(angleOffset + angleStep * 3),
        pulsePhase: Math.PI * 1.2,
        connections: [0],
        type: 'driver',
        label: 'Driver'
      },
      {
        id: 5,
        x: centerX + radius * Math.cos(angleOffset + angleStep * 4),
        y: centerY + radius * Math.sin(angleOffset + angleStep * 4),
        baseX: centerX + radius * Math.cos(angleOffset + angleStep * 4),
        baseY: centerY + radius * Math.sin(angleOffset + angleStep * 4),
        pulsePhase: Math.PI * 1.6,
        connections: [0],
        type: 'passenger',
        label: 'Rider'
      }
    ];

    setNetworkNodes(newNodes);

    // Initialize pulse dots
    const newPulseDots: PulseDot[] = [];
    for (let i = 1; i <= 5; i++) {
      newPulseDots.push({
        id: i,
        fromNode: i,
        progress: Math.random(),
        speed: 0.002,
        returning: false
      });
    }
    pulseDots.current = newPulseDots;
    
    // ✅ NEW: Mark network as initialized after a short delay
    setTimeout(() => {
      isNetworkInitialized.current = true;
    }, 100);
  }, [canvasSize, locale]);

  // Create particle burst from hub
  const createParticleBurst = (hubNode: NetworkNode) => {
    const particleCount = 12; // Number of particles per burst
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 / particleCount) * i + Math.random() * 0.3;
      const colorIndex = Math.floor(Math.random() * 6);
      
      newParticles.push({
        id: Date.now() + i,
        x: hubNode.x,
        y: hubNode.y,
        angle: angle,
        speed: 0.8 + Math.random() * 0.6, // 0.8 to 1.4
        distance: 0,
        maxDistance: 60 + Math.random() * 40, // 60 to 100
        color: getNodeColor(colorIndex, isDark, 1),
        size: 3 + Math.random() * 2, // 3 to 5
        alpha: 1
      });
    }
    
    particles.current = [...particles.current, ...newParticles];
  };

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
      const currentTime = Date.now();

      // ✅ FIXED: Only create particle burst after network is fully initialized
      const hubNode = networkNodes.find(n => n.type === 'hub');
      if (isNetworkInitialized.current && hubNode && currentTime - lastParticleBurst.current > 2000) {
        createParticleBurst(hubNode);
        lastParticleBurst.current = currentTime;
      }

      // LAYER 1: Draw connections (lines)
      networkNodes.forEach(node => {
        node.connections.forEach(targetId => {
          const target = networkNodes.find(n => n.id === targetId);
          if (target) {
            ctx.strokeStyle = getNodeColor(2, isDark, 0.25);
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
          }
        });
      });

      // LAYER 2: Draw pulse dots
      pulseDots.current = pulseDots.current.map(dot => {
        const fromNode = networkNodes.find(n => n.id === (dot.returning ? 0 : dot.fromNode));
        const toNode = networkNodes.find(n => n.id === (dot.returning ? dot.fromNode : 0));

        if (fromNode && toNode) {
          const x = fromNode.x + (toNode.x - fromNode.x) * dot.progress;
          const y = fromNode.y + (toNode.y - fromNode.y) * dot.progress;

          const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, 12);
          glowGradient.addColorStop(0, getDotColor(dot.id, isDark, 0.8));
          glowGradient.addColorStop(1, getDotColor(dot.id, isDark, 0));
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(x, y, 12, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = getDotColor(dot.id, isDark, 1);
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fill();

          let newProgress = dot.progress + dot.speed;
          let newReturning = dot.returning;

          if (newProgress >= 1) {
            newProgress = 0;
            newReturning = !dot.returning;
          }

          return { ...dot, progress: newProgress, returning: newReturning };
        }
        return dot;
      });

      // LAYER 2.5: Draw and update particles
      particles.current = particles.current.filter(particle => {
        particle.distance += particle.speed;
        const progress = particle.distance / particle.maxDistance;
        
        if (progress >= 1) return false; // Remove particle
        
        particle.alpha = 1 - progress; // Fade out as it travels
        
        const x = particle.x + Math.cos(particle.angle) * particle.distance;
        const y = particle.y + Math.sin(particle.angle) * particle.distance;
        
        // Draw particle glow
        const particleGlow = ctx.createRadialGradient(x, y, 0, x, y, particle.size * 3);
        const glowColor = particle.color.replace(/[\d.]+\)$/g, `${particle.alpha * 0.4})`);
        particleGlow.addColorStop(0, particle.color.replace(/[\d.]+\)$/g, `${particle.alpha * 0.8})`));
        particleGlow.addColorStop(1, glowColor.replace(/[\d.]+\)$/g, '0)'));
        ctx.fillStyle = particleGlow;
        ctx.beginPath();
        ctx.arc(x, y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw particle core
        ctx.fillStyle = particle.color.replace(/[\d.]+\)$/g, `${particle.alpha})`);
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        return true;
      });

      // LAYER 3: Draw nodes
      networkNodes.forEach((node, index) => {
        if (node.type === 'hub') {
          // === HUB WITH GRADIENT RING BORDER & LAYERED SHADOWS ===
          
          // 1. LAYERED SHADOW DEPTH (Multiple shadow layers)
          const shadowLayers = [
            { offsetX: 0, offsetY: 12, blur: 24, alpha: 0.15 },  // Deepest shadow
            { offsetX: 0, offsetY: 8, blur: 16, alpha: 0.12 },   // Medium shadow
            { offsetX: 0, offsetY: 4, blur: 8, alpha: 0.08 },    // Close shadow
            { offsetX: 0, offsetY: 2, blur: 4, alpha: 0.05 }     // Subtle shadow
          ];
          
          shadowLayers.forEach(shadow => {
            ctx.shadowColor = isDark 
              ? `rgba(0, 0, 0, ${shadow.alpha * 1.5})` 
              : `rgba(0, 0, 0, ${shadow.alpha})`;
            ctx.shadowBlur = shadow.blur;
            ctx.shadowOffsetX = shadow.offsetX;
            ctx.shadowOffsetY = shadow.offsetY;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
            ctx.beginPath();
            ctx.arc(node.x, node.y, 35, 0, Math.PI * 2);
            ctx.fill();
          });
          
          // Reset shadows
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;

          // 2. Outer glow
          const outerGlow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 50);
          outerGlow.addColorStop(0, getNodeColor(0, isDark, 0.4));
          outerGlow.addColorStop(0.5, getNodeColor(3, isDark, 0.2));
          outerGlow.addColorStop(1, getNodeColor(5, isDark, 0));
          ctx.fillStyle = outerGlow;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 50, 0, Math.PI * 2);
          ctx.fill();

          // 3. White background circle
          ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
          ctx.beginPath();
          ctx.arc(node.x, node.y, 35, 0, Math.PI * 2);
          ctx.fill();

          // 4. ANIMATED GRADIENT RING BORDER
          const time = Date.now() * 0.001;
          const rotationAngle = time * 0.7; // Rotate gradient slowly
          
          // Calculate gradient positions with rotation
          const gradStartX = node.x + Math.cos(rotationAngle) * 35;
          const gradStartY = node.y + Math.sin(rotationAngle) * 35;
          const gradEndX = node.x + Math.cos(rotationAngle + Math.PI) * 35;
          const gradEndY = node.y + Math.sin(rotationAngle + Math.PI) * 35;
          
          const borderGradient = ctx.createLinearGradient(
            gradStartX, gradStartY,
            gradEndX, gradEndY
          );
          borderGradient.addColorStop(0, getNodeColor(0, isDark, 0.9));    // Ocean Blue
          borderGradient.addColorStop(0.33, getNodeColor(2, isDark, 0.9)); // Cyan
          borderGradient.addColorStop(0.66, getNodeColor(4, isDark, 0.9)); // Teal
          borderGradient.addColorStop(1, getNodeColor(5, isDark, 0.9));    // Emerald
          
          ctx.strokeStyle = borderGradient;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 35, 0, Math.PI * 2);
          ctx.stroke();

          // 5. Inner highlight for depth
          const innerHighlight = ctx.createRadialGradient(
            node.x - 10, node.y - 10, 0,
            node.x, node.y, 25
          );
          innerHighlight.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
          innerHighlight.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = innerHighlight;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 35, 0, Math.PI * 2);
          ctx.fill();

          // 6. Draw Tranzkit icon
          if (iconLoaded && iconImageRef.current) {
            const iconSize = 50;
            ctx.drawImage(
              iconImageRef.current,
              node.x - iconSize / 2,
              node.y - iconSize / 2,
              iconSize,
              iconSize
            );
          }

        } else {
          // === OUTER NODES WITH LAYERED SHADOWS ===
          
          // 1. Layered shadows for depth
          const nodeShadows = [
            { offsetX: 0, offsetY: 6, blur: 12, alpha: 0.12 },
            { offsetX: 0, offsetY: 3, blur: 6, alpha: 0.08 },
            { offsetX: 0, offsetY: 1, blur: 3, alpha: 0.04 }
          ];
          
          nodeShadows.forEach(shadow => {
            ctx.shadowColor = isDark 
              ? `rgba(0, 0, 0, ${shadow.alpha * 1.5})` 
              : `rgba(0, 0, 0, ${shadow.alpha})`;
            ctx.shadowBlur = shadow.blur;
            ctx.shadowOffsetX = shadow.offsetX;
            ctx.shadowOffsetY = shadow.offsetY;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
            ctx.beginPath();
            ctx.arc(node.x, node.y, 18, 0, Math.PI * 2);
            ctx.fill();
          });
          
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;

          // 2. Outer glow
          const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 35);
          glowGradient.addColorStop(0, getNodeColor(index, isDark, 0.3));
          glowGradient.addColorStop(1, getNodeColor(index, isDark, 0));
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 35, 0, Math.PI * 2);
          ctx.fill();

          // 3. Node circle with gradient
          const nodeGradient = ctx.createRadialGradient(
            node.x - 5, node.y - 5, 0,
            node.x + 5, node.y + 5, 20
          );
          nodeGradient.addColorStop(1, getNodeColor(index, isDark, 1.0));
          nodeGradient.addColorStop(1, getNodeColor(index, isDark, 1.0));
          ctx.fillStyle = nodeGradient;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 18, 0, Math.PI * 2);
          ctx.fill();

          // 4. Border
          ctx.strokeStyle = getNodeColor(index, isDark, 0.4);
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 18, 0, Math.PI * 2);
          ctx.stroke();

          // 5. Simple pulse ring
          const pulseSize = 4 + Math.sin(Date.now() * 0.002 + node.pulsePhase) * 3;
          ctx.strokeStyle = getNodeColor(index, isDark, 0.5);
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 18 + pulseSize, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Label
        if (node.label) {
          ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)';
          ctx.font = 'bold 14px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(node.label, node.x, node.y + 45);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [networkNodes, canvasSize, isDark, iconLoaded]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Gradient Background with Brand Colors */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[oklch(0.95_0.02_250)] via-[oklch(0.92_0.04_240)] to-[oklch(0.90_0.03_165)] dark:from-[oklch(0.15_0.04_250)] dark:via-[oklch(0.20_0.06_240)] dark:to-[oklch(0.18_0.04_165)] animate-gradient-shift"
        style={{ backgroundSize: '200% 200%' }}
      />

      {/* Floating Orbs - Brand Color Accents */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none">
        {/* Ocean Blue Orb */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[oklch(0.52_0.12_240)]/40 dark:bg-[oklch(0.60_0.14_240)]/50 rounded-full blur-3xl animate-float-slow" />
        {/* Emerald Orb */}
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[oklch(0.65_0.12_165)]/40 dark:bg-[oklch(0.70_0.14_165)]/50 rounded-full blur-3xl animate-float-slower" />
      </div>

     {/* Canvas Background - Network Visualization */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 hidden xl:block"
      >
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          className="w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-8 lg:px-12 py-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-accent">Smart</span>{' '}
              <span className="text-primary">Mobility</span>
              <span className="text-foreground">, Practical Results</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              {t('subtitle')}
            </p>
            <GradientButton
              href="#explore"
              size="lg"
              icon={<RTLAwareArrow className="w-5 h-5" />}
              iconPosition="right"
            >
              {t('cta')}
            </GradientButton>
          </motion.div>
        </div>
      </div>

      {/* Gradient Overlay - Adjusted for Better Contrast */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r pointer-events-none ${
          locale === 'ar' 
            ? 'from-white/0 via-white/0 to-transparent dark:from-slate-950/0 dark:via-slate-950/0 dark:to-transparent' 
            : 'from-white/60 via-white/30 to-transparent dark:from-slate-950/40 dark:via-slate-950/20 dark:to-transparent'
        }`}
      />
    </section>
  );
}
