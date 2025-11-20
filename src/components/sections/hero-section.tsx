'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { TrialCTAButton } from '@/components/ui/trial-cta-button';

interface Vehicle {
  id: number;
  type: 'bus' | 'van' | 'scooter';
  x: number;
  y: number;
  progress: number;
  path: { x: number; y: number }[];
  speed: number;
  color: string;
  size: number;
}

interface NetworkNode {
  id: number;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  pulsePhase: number;
  connections: number[];
}

interface BackgroundNode {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  pulsePhase: number;
  floatPhase: number;
  connections: number[];
}

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  cta?: string;
}

export function HeroSection({ title, subtitle, cta }: HeroSectionProps) {
  const t = useTranslations('home.hero');
  const tCommon = useTranslations('common');
  const { theme } = useTheme();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [networkNodes, setNetworkNodes] = useState<NetworkNode[]>([]);
  const [backgroundPattern, setBackgroundPattern] = useState<{
    nodes: BackgroundNode[];
    connections: { from: number; to: number; progress: number }[];
  }>({ nodes: [], connections: [] });
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 1200, height: 800 });
  const [mounted, setMounted] = useState(false);
  const animationRef = useRef<number | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const carImageRef = useRef<HTMLImageElement | null>(null);
  const carImageRedRef = useRef<HTMLImageElement | null>(null);

  // Track mounted state for theme detection
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === 'dark';

  // Load car SVGs
  useEffect(() => {
    // Blue car SVG
    const carSVGBlue = `
          <svg fill="#5090F6" viewBox="0 -39.69 122.88 122.88" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="enable-background:new 0 0 122.88 43.49" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style> <g> <path class="st0" d="M103.94,23.97c5.39,0,9.76,4.37,9.76,9.76c0,5.39-4.37,9.76-9.76,9.76c-5.39,0-9.76-4.37-9.76-9.76 C94.18,28.34,98.55,23.97,103.94,23.97L103.94,23.97z M23,29.07v3.51h3.51C26.09,30.86,24.73,29.49,23,29.07L23,29.07z M26.52,34.87H23v3.51C24.73,37.97,26.09,36.6,26.52,34.87L26.52,34.87z M20.71,38.39v-3.51H17.2 C17.62,36.6,18.99,37.96,20.71,38.39L20.71,38.39z M17.2,32.59h3.51v-3.51C18.99,29.49,17.62,30.86,17.2,32.59L17.2,32.59z M105.09,29.07v3.51h3.51C108.18,30.86,106.82,29.49,105.09,29.07L105.09,29.07z M108.6,34.87h-3.51v3.51 C106.82,37.97,108.18,36.6,108.6,34.87L108.6,34.87z M102.8,38.39v-3.51h-3.51C99.71,36.6,101.07,37.96,102.8,38.39L102.8,38.39z M99.28,32.59h3.51v-3.51C101.07,29.49,99.71,30.86,99.28,32.59L99.28,32.59z M49.29,12.79c-1.54-0.35-3.07-0.35-4.61-0.28 C56.73,6.18,61.46,2.07,75.57,2.9l-1.94,12.87L50.4,16.65c0.21-0.61,0.33-0.94,0.37-1.55C50.88,13.36,50.86,13.15,49.29,12.79 L49.29,12.79z M79.12,3.13L76.6,15.6l24.13-0.98c2.48-0.1,2.91-1.19,1.41-3.28c-0.68-0.95-1.44-1.89-2.31-2.82 C93.59,1.86,87.38,3.24,79.12,3.13L79.12,3.13z M0.46,27.28H1.2c0.46-2.04,1.37-3.88,2.71-5.53c2.94-3.66,4.28-3.2,8.65-3.99 l24.46-4.61c5.43-3.86,11.98-7.3,19.97-10.2C64.4,0.25,69.63-0.01,77.56,0c4.54,0.01,9.14,0.28,13.81,0.84 c2.37,0.15,4.69,0.47,6.97,0.93c2.73,0.55,5.41,1.31,8.04,2.21l9.8,5.66c2.89,1.67,3.51,3.62,3.88,6.81l1.38,11.78h1.43v6.51 c-0.2,2.19-1.06,2.52-2.88,2.52h-2.37c0.92-20.59-28.05-24.11-27.42,1.63H34.76c3.73-17.75-14.17-23.91-22.96-13.76 c-2.67,3.09-3.6,7.31-3.36,12.3H2.03c-0.51-0.24-0.91-0.57-1.21-0.98c-1.05-1.43-0.82-5.74-0.74-8.23 C0.09,27.55-0.12,27.28,0.46,27.28L0.46,27.28z M21.86,23.97c5.39,0,9.76,4.37,9.76,9.76c0,5.39-4.37,9.76-9.76,9.76 c-5.39,0-9.76-4.37-9.76-9.76C12.1,28.34,16.47,23.97,21.86,23.97L21.86,23.97z"></path> </g> </g></svg>
    `;

    // Red car SVG
    const carSVGRed = `
          <svg fill="#7CE3D8" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 552.506 552.506" xml:space="preserve" stroke="#7CE3D8">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <g>
            <path d="M103.918,334.136c-23.793,0-43.172,19.376-43.172,43.185s19.373,43.173,43.172,43.173 c23.817,0,43.172-19.364,43.172-43.173C147.09,353.524,127.742,334.136,103.918,334.136z M103.918,404.454 c-14.952,0-27.125-12.179-27.125-27.134c0-14.954,12.167-27.133,27.125-27.133c14.964,0,27.136,12.166,27.136,27.133 C131.054,392.275,118.888,404.454,103.918,404.454z M450.189,334.136c-23.809,0-43.178,19.376-43.178,43.185 s19.363,43.173,43.178,43.173s43.172-19.364,43.172-43.173C493.355,353.524,473.992,334.136,450.189,334.136z M450.189,404.454 c-14.961,0-27.139-12.179-27.139-27.134c0-14.954,12.166-27.133,27.139-27.133c14.949,0,27.127,12.166,27.127,27.133 C477.305,392.275,465.139,404.454,450.189,404.454z M536.461,320.776h16.033V177.858c0-25.325-20.521-45.846-45.84-45.846H45.842 C20.508,132.013,0,152.533,0,177.858v162.008c0,25.337,20.508,45.857,45.842,45.857h11.959c-0.292-2.137-0.487-4.293-0.487-6.503 c0-26.585,21.556-48.147,48.144-48.147c26.588,0,48.144,21.562,48.144,48.147c0,2.21-0.207,4.366-0.487,6.503h250.857 c-0.292-2.137-0.486-4.293-0.486-6.503c0-26.585,21.555-48.147,48.158-48.147c26.586,0,48.129,21.562,48.129,48.147 c0,2.21-0.194,4.366-0.486,6.503h53.219v-19.107h-16.039c-2.533,0-4.591-2.053-4.591-4.579v-36.682 C531.863,322.816,533.922,320.776,536.461,320.776z M305.664,155.706V265.74h-84.049V155.706H305.664z M89.401,265.74H72.586 c-38.584,0-37.811-22.914-37.811-25.441v-80.011c0-2.53,2.046-4.582,4.576-4.582h50.05h38.97V265.74H89.401z M132.957,265.74 V155.706h84.063V265.74H132.957z M402.725,265.74h-92.482V155.706h92.482V265.74z M443.596,261.151 c0,2.542-2.059,4.589-4.573,4.589h-32.011V155.706h32.011c2.515,0,4.573,2.052,4.573,4.582V261.151z M525.805,290.964 c0,0-20.6,1.869-42.983-3.27c-22.371-5.133-25.465-25.383-25.465-25.383v-83.385v-23.602h44.841 c13.031,0,23.602,10.568,23.602,23.602v112.037H525.805z"></path>
          </g>
        </g>
      </svg>
    `;

    const imgBlue = new Image();
    imgBlue.onload = () => {
      carImageRef.current = imgBlue;
    };
    imgBlue.src = 'data:image/svg+xml;base64,' + btoa(carSVGBlue);

    const imgRed = new Image();
    imgRed.onload = () => {
      carImageRedRef.current = imgRed;
    };
    imgRed.src = 'data:image/svg+xml;base64,' + btoa(carSVGRed);
  }, []);

  // Helper: evaluate a cubic Bezier at t (0..1)
  const cubicBezierPoint = (t: number, p0: { x: number; y: number }, p1: { x: number; y: number }, p2: { x: number; y: number }, p3: { x: number; y: number }) => {
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;
    const uuu = uu * u;
    const ttt = tt * t;

    const x = uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x;
    const y = uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y;
    return { x, y };
  };

  // Generate smooth worm/snake-like undulating path
  const generateSPath = (sx: number, sy: number, ex: number, ey: number, samples = 500) => {
    const path: { x: number; y: number }[] = [];
    const spanX = ex - sx;
    const spanY = ey - sy;
    
    // Create smooth wave motion like a worm's body
    const waveCount = 3; // Number of wave cycles
    const waveAmplitude = Math.min(Math.abs(spanX), Math.abs(spanY)) * 0.15; // Wave height
    
    for (let i = 0; i <= samples; i++) {
      const t = i / samples; // Progress from 0 to 1
      
      // Base diagonal progression from start to end
      const baseX = sx + spanX * t;
      const baseY = sy + spanY * t;
      
      // Add smooth sine wave perpendicular to the diagonal direction
      // This creates the worm-like undulation
      const angle = Math.atan2(spanY, spanX); // Direction of travel
      const perpAngle = angle + Math.PI / 2; // Perpendicular angle
      
      // Sine wave offset (creates the worm wiggle)
      const waveOffset = Math.sin(t * Math.PI * waveCount) * waveAmplitude;
      
      // Apply the wave offset perpendicular to travel direction
      const x = baseX + Math.cos(perpAngle) * waveOffset;
      const y = baseY + Math.sin(perpAngle) * waveOffset;
      
      path.push({ x, y });
    }

    return path;
  };

  // Initialize background pattern
  const initializeBackgroundPattern = (width: number, height: number) => {
    const nodes: BackgroundNode[] = [];
    const connections: { from: number; to: number; progress: number }[] = [];

    // Create a grid of nodes - more dense on larger screens
    const columns = Math.max(6, Math.floor(width / 150));
    const rows = Math.max(4, Math.floor(height / 150));

    const horizontalSpacing = width / columns;
    const verticalSpacing = height / rows;

    // Add some random offset to make it less rigid
    const randomOffset = Math.min(horizontalSpacing, verticalSpacing) * 0.3;

    for (let row = 0; row <= rows; row++) {
      for (let col = 0; col <= columns; col++) {
        const baseX = col * horizontalSpacing + (Math.random() - 0.5) * randomOffset;
        const baseY = row * verticalSpacing + (Math.random() - 0.5) * randomOffset;

        // Keep nodes away from the left text area (approx 60% of screen)
        if (baseX > width * 0.4) {
          nodes.push({
            x: baseX,
            y: baseY,
            baseX,
            baseY,
            size: 2 + Math.random() * 3,
            pulsePhase: Math.random() * Math.PI * 2,
            floatPhase: Math.random() * Math.PI * 2,
            connections: []
          });
        }
      }
    }

    // Create connections between nearby nodes (road network simulation)
    nodes.forEach((node, i) => {
      nodes.forEach((otherNode, j) => {
        if (i !== j && node.connections.length < 3) {
          const distance = Math.hypot(node.x - otherNode.x, node.y - otherNode.y);
          const maxConnectionDistance = Math.min(width, height) * 0.2;

          if (distance < maxConnectionDistance && Math.random() > 0.7) {
            node.connections.push(j);
            connections.push({
              from: i,
              to: j,
              progress: Math.random() * Math.PI * 2
            });
          }
        }
      });
    });

    setBackgroundPattern({ nodes, connections });
  };

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

  // Initialize vehicles, network nodes, and background pattern
  useEffect(() => {
    const { width, height } = canvasSize;

    // Build two S-shaped routes on the right side of the screen (avoid left text area)
    const marginLeft = Math.max(width * 0.58, 300); // keep routes to the right of text
    // Build two diagonal S-shaped routes that span the full canvas
    const route1 = generateSPath(
      // start near top-right
      width - 0,
      Math.max(20, height * 0.06) + 50,
      // end near bottom-left
      Math.min(width * 0.08, 60),
      Math.min(height * 0.94, height - 100) + 50,
      420
    );

    const route2 = generateSPath(
      width - 0,
      Math.max(40, height * 0.12) + 50,
      Math.min(width * 0.12, 100),
      Math.min(height * 0.9, height - 40) + 50,
      420
    );


    // Create exactly two vehicles, one per route, moving in opposite directions
    const newVehicles: Vehicle[] = [];
    newVehicles.push({
      id: 0,
      type: 'bus',
      x: route1[0].x,
      y: route1[0].y,
      progress: 0.1,
      path: route1,
      speed: 0.00015, // positive: top -> bottom
      color: '#3B82F6',
      size: 14
    });

    newVehicles.push({
      id: 1,
      type: 'van',
      x: route2[route2.length - 1].x,
      y: route2[route2.length - 1].y,
      progress: 0.9,
      path: route2,
      speed: -0.00015, // negative: bottom -> top (opposite direction)
      color: '#EF4444',
      size: 16
    });

    // Place a few network nodes away from text area on the right
    const newNodes: NetworkNode[] = [];
    const nodePositions = [
      { x: marginLeft + (width - marginLeft) * 0.35, y: height * 0.2 },
      { x: marginLeft + (width - marginLeft) * 0.75, y: height * 0.5 },
      { x: marginLeft + (width - marginLeft) * 0.45, y: height * 0.78 }
    ];

    nodePositions.forEach((pos, i) => {
      newNodes.push({
        id: i,
        x: pos.x,
        y: pos.y,
        baseX: pos.x,
        baseY: pos.y,
        pulsePhase: Math.random() * Math.PI * 2,
        connections: []
      });
    });

    // Link nearby nodes
    newNodes.forEach((node, i) => {
      newNodes.forEach((otherNode, j) => {
        if (i !== j && node.connections.length < 2) {
          const distance = Math.hypot(node.x - otherNode.x, node.y - otherNode.y);
          if (distance < Math.max(width, height) * 0.6) node.connections.push(j);
        }
      });
    });

    setVehicles(newVehicles);
    setNetworkNodes(newNodes);
    initializeBackgroundPattern(width, height);
    setIsVisible(true);
  }, [canvasSize]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size properly
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasSize.width * dpr;
    canvas.height = canvasSize.height * dpr;
    canvas.style.width = `${canvasSize.width}px`;
    canvas.style.height = `${canvasSize.height}px`;
    ctx.scale(dpr, dpr);

    const animate = () => {
      // Clear canvas with theme-adaptive background
      ctx.fillStyle = isDark ? 'rgba(20, 20, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)';
      ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

      // Draw background pattern (road network)
      ctx.save();

      // Draw connection lines (road network)
      backgroundPattern.connections.forEach(conn => {
        const fromNode = backgroundPattern.nodes[conn.from];
        const toNode = backgroundPattern.nodes[conn.to];

        if (fromNode && toNode) {
          // Animate the connection progress
          conn.progress += 0.02;
          if (conn.progress > Math.PI * 2) conn.progress = 0;

          const pulse = Math.sin(conn.progress) * 0.3 + 0.7; // 0.4 to 1.0

          ctx.strokeStyle = isDark
            ? `rgba(45, 212, 191, ${0.15 * pulse})`
            : `rgba(94, 234, 212, ${0.1 * pulse})`; // teal with varying opacity
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 4]);
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.stroke();
        }
      });

      // Draw floating nodes (waypoints/intersections)
      backgroundPattern.nodes.forEach(node => {
        // Gentle floating animation
        node.pulsePhase += 0.01;
        node.floatPhase += 0.005;

        const floatX = Math.sin(node.floatPhase) * 2;
        const floatY = Math.cos(node.floatPhase * 0.7) * 2;
        const pulseSize = node.size * (0.8 + Math.sin(node.pulsePhase) * 0.2);

        ctx.fillStyle = isDark
          ? `rgba(45, 212, 191, ${0.4 + Math.sin(node.pulsePhase) * 0.2})`
          : `rgba(94, 234, 212, ${0.3 + Math.sin(node.pulsePhase) * 0.2})`; // teal
        ctx.shadowColor = isDark ? 'rgb(45, 212, 191)' : 'rgb(94, 234, 212)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(node.x + floatX, node.y + floatY, pulseSize, 0, Math.PI * 2);
        ctx.fill();

        // Inner dot
        ctx.fillStyle = isDark ? `rgba(200, 200, 220, 0.8)` : `rgba(255, 255, 255, 0.8)`;
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(node.x + floatX, node.y + floatY, pulseSize * 0.3, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
      ctx.setLineDash([]);

      // Draw dashed S-shaped routes (one per vehicle path) — static dashes (no animation)
      const drawn = new Set<number>();
      vehicles.forEach((vehicle, vi) => {
        const path = vehicle.path;
        if (!path || path.length < 2) return;

        // Avoid drawing duplicate paths if same reference used
        const pathId = vi; // each vehicle has its own path in our setup
        if (drawn.has(pathId)) return;
        drawn.add(pathId);

        ctx.save();
        ctx.strokeStyle = isDark ? 'rgba(100, 116, 139, 0.4)' : 'rgba(148, 163, 184, 0.25)';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.setLineDash([16, 12]);
        ctx.lineWidth = 3;
        ctx.strokeStyle = isDark ? 'rgba(100, 116, 139, 0.5)' : 'rgba(148,163,184,0.3)';
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
          ctx.lineTo(path[i].x, path[i].y);
        }
        ctx.stroke();
        ctx.restore();
      });

      // Update and draw vehicles
      vehicles.forEach(vehicle => {
        vehicle.progress += vehicle.speed;
        if (vehicle.progress >= 1) vehicle.progress = 0;
        if (vehicle.progress < 0) vehicle.progress = 1;

        const pathIndex = Math.floor(vehicle.progress * (vehicle.path.length - 1));
        const nextIndex = Math.min(pathIndex + 1, vehicle.path.length - 1);
        const localProgress = (vehicle.progress * (vehicle.path.length - 1)) - pathIndex;

        const currentPos = vehicle.path[pathIndex];
        const nextPos = vehicle.path[nextIndex];

        if (currentPos && nextPos) {
          // Interpolate position
          vehicle.x = currentPos.x + (nextPos.x - currentPos.x) * localProgress;
          vehicle.y = currentPos.y + (nextPos.y - currentPos.y) * localProgress;

          // Calculate the movement direction
          let angle = Math.atan2(nextPos.y - currentPos.y, nextPos.x - currentPos.x);

          // Flip the direction if the vehicle moves "backward" (negative speed)
          if (vehicle.speed < 0) angle += Math.PI;

          // === VEHICLE (CAR SVG FOR BOTH VEHICLES) ===
          ctx.save();

          // Determine which car image to use based on vehicle color
          const carImage = vehicle.color === '#3B82F6' ? carImageRef.current : carImageRedRef.current;

          if (carImage) {
            // Draw car SVG for both vehicles
            ctx.translate(vehicle.x, vehicle.y);
            ctx.rotate(angle + Math.PI); // Adjust rotation for car orientation

            // If this is the red car, flip it vertically (mirror on horizontal axis)
            // We apply scale(1, -1) so only the red car is flipped; blue car remains normal.
            if (vehicle.color === '#EF4444') {
              ctx.scale(1, -1);
            }

            ctx.drawImage(
              carImage,
              -vehicle.size * 1.5,
              -vehicle.size * 1.5,
              vehicle.size * 2,
              vehicle.size * 2
            );
          } else {
            // Fallback: Draw glowing circle if image not loaded
            ctx.fillStyle = vehicle.color;
            ctx.shadowColor = vehicle.color;
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.arc(vehicle.x, vehicle.y, vehicle.size * 0.6, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [vehicles, networkNodes, canvasSize, backgroundPattern, isDark]);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse movement handler - using ref instead of state to prevent re-renders
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mousePositionRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      />

      {/* Hero Content */}
      <div
        className="relative z-10 container mx-auto px-6 py-20 flex items-center min-h-screen"
        style={{ transform: `translateY(${scrollY * -0.05}px)` }}
      >
        <div className="max-w-4xl w-full">
          {/* Animated Headline */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              <span
                className={`inline-block transition-all duration-1000 ease-out text-foreground ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: '0.3s' }}
              >
                {title || t('title')}
              </span>{' '}
              <span
                className={`inline-block transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: '0.6s' }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 animate-pulse drop-shadow-2xl">
                  {t('titleHighlight')}
                </span>
              </span>
              <br />
            </h1>
            <h2
              className={`text-xl md:text-2xl text-muted-foreground mt-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: '1.2s' }}
            >
              {subtitle || t('subtitle')}
            </h2>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: '1.8s' }}
          >
            <div className="animate-pulse hover:animate-none">
              <TrialCTAButton
                variant="primary"
                size="lg"
                className="shadow-2xl shadow-accent/50 !h-[56px]"
              />
            </div>

            <button className="group relative px-8 py-4 border-2 border-accent text-accent font-semibold rounded-lg transition-all duration-500 hover:bg-gradient-to-r hover:from-accent hover:to-primary hover:text-primary-foreground hover:scale-105 hover:shadow-lg hover:shadow-accent/30 whitespace-nowrap overflow-hidden cursor-pointer">
              <span className="flex items-center gap-2 relative z-10 transition-all duration-300">
                {tCommon('learnMore')}
              </span>
            </button>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-3 gap-8 mt-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: '2.1s' }}
          >
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
        style={{ transform: `translateX(-50%) translateY(${scrollY * -0.1}px)` }}
      >
        <svg
          className="w-6 h-6 text-teal-400 hover:text-teal-300 transition-colors duration-300"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}

