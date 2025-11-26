'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import { GradientButton } from '@/components/ui/gradient-button';
import { ArrowRight } from 'lucide-react';

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

export function HeroSectionSolutions() {
  const t = useTranslations('solutions.main.hero');
  const locale = useLocale();
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const iconImageRef = useRef<HTMLImageElement | null>(null);
  const [networkNodes, setNetworkNodes] = useState<NetworkNode[]>([]);
  const pulseDots = useRef<PulseDot[]>([]);
  const [canvasSize, setCanvasSize] = useState({ width: 1200, height: 800 });
  const [mounted, setMounted] = useState(false);
  const [iconLoaded, setIconLoaded] = useState(false);
  const animationRef = useRef<number | null>(null);

  // Track mounted state for theme detection
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === 'dark';

  // Brand colors - Ocean Blue to Emerald gradient for circles/shapes
  const getNodeColor = (index: number, isDark: boolean, alpha: number = 1) => {
    // Create gradient spectrum from ocean blue to emerald
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

  // Pulse dot colors - Each dot gets unique vibrant color (non-brand colors)
  const getDotColor = (dotId: number, isDark: boolean, alpha: number = 1) => {
    const dotColors = isDark
      ? [
          `rgba(255, 107, 107, ${alpha})`,   // Coral Red - Dot 1
          `rgba(255, 184, 77, ${alpha})`,    // Orange - Dot 2
          `rgba(255, 234, 167, ${alpha})`,   // Yellow - Dot 3
          `rgba(185, 127, 255, ${alpha})`,   // Purple - Dot 4
          `rgba(255, 121, 198, ${alpha})`,   // Pink - Dot 5
        ]
      : [
          `rgba(239, 68, 68, ${alpha})`,     // Red - Dot 1
          `rgba(249, 115, 22, ${alpha})`,    // Orange - Dot 2
          `rgba(234, 179, 8, ${alpha})`,     // Gold - Dot 3
          `rgba(147, 51, 234, ${alpha})`,    // Purple - Dot 4
          `rgba(236, 72, 153, ${alpha})`,    // Pink - Dot 5
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

  // Initialize network visualization with 5 nodes in pentagon formation
  useEffect(() => {
    const { width, height } = canvasSize;
    // RTL Support: Position network on left for Arabic, right for English
    const centerX = locale === 'ar' ? width * 0.25 : width * 0.75;
    const centerY = height * 0.45;
    const radius = 180; // Distance from center to outer nodes
    
    // Pentagon formation: 5 points evenly distributed
    // Starting from top and going clockwise
    const angleOffset = -Math.PI / 2; // Start from top
    const angleStep = (Math.PI * 2) / 5;
    
    const newNodes: NetworkNode[] = [
      // Central Hub with Tranzkit icon
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
      // Node 1: Operator (Top)
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
      // Node 2: Enterprise (Top Right)
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
      // Node 3: Supervisor (Bottom Right)
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
      // Node 4: Driver (Bottom Left)
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
      // Node 5: Rider (Top Left)
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

    // Initialize pulse dots - one for each outer node (50% slower speed)
    const newPulseDots: PulseDot[] = [];
    for (let i = 1; i <= 5; i++) {
      newPulseDots.push({
        id: i,
        fromNode: i,
        progress: Math.random(), // Random starting position
        speed: 0.002, // 50% slower than before (was 0.008)
        returning: false
      });
    }
    pulseDots.current = newPulseDots;
  }, [canvasSize, locale]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

      // LAYER 1: Draw connections (lines) - bottom layer
      networkNodes.forEach(node => {
        node.connections.forEach(targetId => {
          const target = networkNodes.find(n => n.id === targetId);
          if (target) {
            ctx.strokeStyle = getNodeColor(2, isDark, 0.25); // Cyan with transparency
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
          }
        });
      });

      // LAYER 2: Draw pulse dots - middle layer (under circles)
      pulseDots.current = pulseDots.current.map(dot => {
        const fromNode = networkNodes.find(n => n.id === (dot.returning ? 0 : dot.fromNode));
        const toNode = networkNodes.find(n => n.id === (dot.returning ? dot.fromNode : 0));

        if (fromNode && toNode) {
          // Calculate position along the line
          const x = fromNode.x + (toNode.x - fromNode.x) * dot.progress;
          const y = fromNode.y + (toNode.y - fromNode.y) * dot.progress;

          // Draw glow effect first (behind the dot) - each dot has unique color
          const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, 12);
          glowGradient.addColorStop(0, getDotColor(dot.id, isDark, 0.8));
          glowGradient.addColorStop(1, getDotColor(dot.id, isDark, 0));
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(x, y, 12, 0, Math.PI * 2);
          ctx.fill();

          // Draw filled pulse dot on top - each dot has unique color
          ctx.fillStyle = getDotColor(dot.id, isDark, 1);
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fill();

          // Update progress
          let newProgress = dot.progress + dot.speed;
          let newReturning = dot.returning;

          // When reaching the end, reverse direction
          if (newProgress >= 1) {
            newProgress = 0;
            newReturning = !dot.returning;
          }

          return { ...dot, progress: newProgress, returning: newReturning };
        }
        return dot;
      });

      // LAYER 3: Draw nodes (circles and hub) - top layer
      networkNodes.forEach((node, index) => {
        const pulseSize = 5 + Math.sin(Date.now() * 0.002 + node.pulsePhase) * 3;

        // Outer glow
        const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 40);
        if (node.type === 'hub') {
          // Hub gets gradient glow from ocean blue to emerald
          glowGradient.addColorStop(0, getNodeColor(0, isDark, 0.5));
          glowGradient.addColorStop(0.5, getNodeColor(3, isDark, 0.3));
          glowGradient.addColorStop(1, getNodeColor(5, isDark, 0));
        } else {
          glowGradient.addColorStop(0, getNodeColor(index, isDark, 0.3));
          glowGradient.addColorStop(1, getNodeColor(index, isDark, 0));
        }
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 40, 0, Math.PI * 2);
        ctx.fill();

        // Node circle - perfectly round with 100% opacity
        if (node.type === 'hub') {
          // Hub node with gradient background (ocean blue to emerald) - 100% opacity
          const hubGradient = ctx.createRadialGradient(
            node.x - 15, node.y - 15, 0,
            node.x + 15, node.y + 15, 50
          );
          hubGradient.addColorStop(0, getNodeColor(0, isDark, 1.0)); // 100% opacity
          hubGradient.addColorStop(1, getNodeColor(5, isDark, 1.0)); // 100% opacity
          ctx.fillStyle = hubGradient;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 35, 0, Math.PI * 2);
          ctx.fill();

          // Draw Tranzkit icon in the center of hub
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
          // Outer nodes - each with different gradient color - 100% opacity
          ctx.fillStyle = getNodeColor(index, isDark, 1.0); // 100% opacity
          ctx.beginPath();
          ctx.arc(node.x, node.y, 18, 0, Math.PI * 2);
          ctx.fill();
        }

        // Pulse ring - perfectly circular with gradient colors
        ctx.strokeStyle = getNodeColor(node.type === 'hub' ? 3 : index, isDark, 0.6);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, (node.type === 'hub' ? 35 : 18) + pulseSize, 0, Math.PI * 2);
        ctx.stroke();

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
      <div ref={containerRef} className="absolute inset-0">
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
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              {t('cta')}
            </GradientButton>
          </motion.div>
        </div>
      </div>

      {/* Gradient Overlay - Adjusted for Better Contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/30 to-transparent dark:from-slate-950/40 dark:via-slate-950/20 dark:to-transparent pointer-events-none" />
    </section>
  );
}
