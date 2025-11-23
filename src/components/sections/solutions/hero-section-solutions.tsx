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
  type: 'hub' | 'operator' | 'driver' | 'enterprise' | 'passenger';
  label?: string;
}

interface DataPacket {
  id: number;
  from: number;
  to: number;
  progress: number;
  speed: number;
}

export function HeroSectionSolutions() {
  const t = useTranslations('solutions.main.hero');
  const locale = useLocale();
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [networkNodes, setNetworkNodes] = useState<NetworkNode[]>([]);
  const [dataPackets, setDataPackets] = useState<DataPacket[]>([]);
  const [canvasSize, setCanvasSize] = useState({ width: 1200, height: 800 });
  const [mounted, setMounted] = useState(false);
  const animationRef = useRef<number | null>(null);

  // Track mounted state for theme detection
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === 'dark';

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
    // RTL Support: Position network on left for Arabic, right for English
    const centerX = locale === 'ar' ? width * 0.25 : width * 0.75;
    const centerY = height * 0.45;
    
    const newNodes: NetworkNode[] = [
      // Central AI Hub
      {
        id: 0,
        x: centerX,
        y: centerY,
        baseX: centerX,
        baseY: centerY,
        pulsePhase: 0,
        connections: [1, 2, 3, 4],
        type: 'hub'
      },
      // Operators node
      {
        id: 1,
        x: centerX - 180,
        y: centerY - 120,
        baseX: centerX - 180,
        baseY: centerY - 120,
        pulsePhase: Math.PI * 0.5,
        connections: [0],
        type: 'operator',
        label: 'Operators'
      },
      // Drivers node
      {
        id: 2,
        x: centerX + 180,
        y: centerY - 120,
        baseX: centerX + 180,
        baseY: centerY - 120,
        pulsePhase: Math.PI,
        connections: [0],
        type: 'driver',
        label: 'Drivers'
      },
      // Enterprises node
      {
        id: 3,
        x: centerX - 180,
        y: centerY + 120,
        baseX: centerX - 180,
        baseY: centerY + 120,
        pulsePhase: Math.PI * 1.5,
        connections: [0],
        type: 'enterprise',
        label: 'Enterprises'
      },
      // Passengers node
      {
        id: 4,
        x: centerX + 180,
        y: centerY + 120,
        baseX: centerX + 180,
        baseY: centerY + 120,
        pulsePhase: Math.PI * 2,
        connections: [0],
        type: 'passenger',
        label: 'Passengers'
      }
    ];

    setNetworkNodes(newNodes);

    // Initialize data packets
    const newPackets: DataPacket[] = [];
    for (let i = 0; i < 8; i++) {
      const from = 0;
      const to = (i % 4) + 1;
      newPackets.push({
        id: i,
        from,
        to,
        progress: Math.random(),
        speed: 0.001 + Math.random() * 0.001
      });
    }
    setDataPackets(newPackets);
  }, [canvasSize]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

      // Draw connections
      networkNodes.forEach(node => {
        node.connections.forEach(targetId => {
          const target = networkNodes.find(n => n.id === targetId);
          if (target) {
            ctx.strokeStyle = isDark ? 'rgba(96, 165, 250, 0.3)' : 'rgba(59, 130, 246, 0.2)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
          }
        });
      });

      // Draw nodes
      networkNodes.forEach(node => {
        const pulseSize = 5 + Math.sin(Date.now() * 0.002 + node.pulsePhase) * 3;

        // Outer glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 40);
        gradient.addColorStop(0, node.type === 'hub'
          ? (isDark ? 'rgba(96, 165, 250, 0.4)' : 'rgba(59, 130, 246, 0.3)')
          : (isDark ? 'rgba(96, 165, 250, 0.25)' : 'rgba(59, 130, 246, 0.15)'));
        gradient.addColorStop(1, isDark ? 'rgba(96, 165, 250, 0)' : 'rgba(59, 130, 246, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 40, 0, Math.PI * 2);
        ctx.fill();

        // Node circle
        ctx.fillStyle = node.type === 'hub' ? 'hsl(var(--chart-1))' : 'hsl(var(--primary))';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.type === 'hub' ? 20 : 15, 0, Math.PI * 2);
        ctx.fill();

        // Pulse ring
        ctx.strokeStyle = 'hsl(var(--chart-1) / 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, (node.type === 'hub' ? 20 : 15) + pulseSize, 0, Math.PI * 2);
        ctx.stroke();

        // Label
        if (node.label) {
          ctx.fillStyle = 'hsl(var(--foreground))';
          ctx.font = '14px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(node.label, node.x, node.y + 40);
        }
      });

      // Update and draw data packets
      setDataPackets(prevPackets =>
        prevPackets.map(packet => {
          const fromNode = networkNodes.find(n => n.id === packet.from);
          const toNode = networkNodes.find(n => n.id === packet.to);

          if (fromNode && toNode) {
            const x = fromNode.x + (toNode.x - fromNode.x) * packet.progress;
            const y = fromNode.y + (toNode.y - fromNode.y) * packet.progress;

            // Draw packet
            ctx.fillStyle = 'hsl(var(--chart-1))';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();

            // Update progress
            let newProgress = packet.progress + packet.speed;
            if (newProgress >= 1) {
              newProgress = 0;
            }

            return { ...packet, progress: newProgress };
          }
          return packet;
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [networkNodes, canvasSize, isDark]);

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

