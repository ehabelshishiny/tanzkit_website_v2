import { useEffect, useRef, useState } from 'react';

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

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [networkNodes, setNetworkNodes] = useState<NetworkNode[]>([]);
  const [dataPackets, setDataPackets] = useState<DataPacket[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 1200, height: 800 });
  const animationRef = useRef<number | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const logoImageRef = useRef<HTMLImageElement | null>(null);

  // Load logo image
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      logoImageRef.current = img;
      console.log('✅ Logo loaded successfully!');
    };
    img.onerror = (error) => {
      console.error('❌ Failed to load logo:', error);
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

    // Create central AI hub and connected nodes
    const centerX = width * 0.75;
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
        y: centerY - 80,
        baseX: centerX + 180,
        baseY: centerY - 80,
        pulsePhase: Math.PI,
        connections: [0],
        type: 'driver',
        label: 'Drivers'
      },
      // Enterprises node
      {
        id: 3,
        x: centerX + 120,
        y: centerY + 140,
        baseX: centerX + 120,
        baseY: centerY + 140,
        pulsePhase: Math.PI * 1.5,
        connections: [0],
        type: 'enterprise',
        label: 'Enterprises'
      },
      // Passengers node
      {
        id: 4,
        x: centerX - 160,
        y: centerY + 100,
        baseX: centerX - 160,
        baseY: centerY + 100,
        pulsePhase: Math.PI * 0.25,
        connections: [0],
        type: 'passenger',
        label: 'Passengers'
      }
    ];

    // Create initial data packets
    const newPackets: DataPacket[] = [];
    const connections = [[0,1], [0,2], [0,3], [0,4], [1,0], [2,0], [3,0], [4,0]];
    
    connections.forEach(([from, to], index) => {
      newPackets.push({
        id: index,
        from,
        to,
        progress: Math.random(),
        speed: 0.001 + Math.random() * 0.001
      });
    });

    setNetworkNodes(newNodes);
    setDataPackets(newPackets);
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
      // Clear canvas with light background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

      // Update node animations
      const updatedNodes = networkNodes.map(node => ({
        ...node,
        pulsePhase: node.pulsePhase + 0.02
      }));

      // Update data packets
      const updatedPackets = dataPackets.map(packet => ({
        ...packet,
        progress: (packet.progress + packet.speed) % 1
      }));

      setNetworkNodes(updatedNodes);
      setDataPackets(updatedPackets);

      // Draw connections between nodes
      networkNodes.forEach(node => {
        node.connections.forEach(connectionId => {
          const targetNode = networkNodes.find(n => n.id === connectionId);
          if (targetNode) {
            // Draw connection line
            ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
            ctx.lineWidth = 2;
            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(targetNode.x, targetNode.y);
            ctx.stroke();
          }
        });
      });

      // Draw animated data packets along connections
      updatedPackets.forEach(packet => {
        const fromNode = networkNodes.find(n => n.id === packet.from);
        const toNode = networkNodes.find(n => n.id === packet.to);
        
        if (fromNode && toNode) {
          const progress = packet.progress;
          const x = fromNode.x + (toNode.x - fromNode.x) * progress;
          const y = fromNode.y + (toNode.y - fromNode.y) * progress;

          // Determine color based on node types
          let color = '#3B82F6'; // Default blue
          if (fromNode.type === 'operator' || toNode.type === 'operator') color = '#F59E0B'; // Amber
          if (fromNode.type === 'driver' || toNode.type === 'driver') color = '#10B981'; // Emerald
          if (fromNode.type === 'enterprise' || toNode.type === 'enterprise') color = '#8B5CF6'; // Violet
          if (fromNode.type === 'passenger' || toNode.type === 'passenger') color = '#EC4899'; // Pink

          // Draw data packet
          ctx.fillStyle = color;
          ctx.shadowColor = color;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Draw nodes
      updatedNodes.forEach(node => {
        const pulse = Math.sin(node.pulsePhase) * 0.3 + 0.7;
        const size = node.type === 'hub' ? 40 : 15;

        // Node glow effect
        ctx.fillStyle = getNodeColor(node.type);
        ctx.shadowColor = getNodeColor(node.type);
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(node.x, node.y, size * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Node core - Draw logo for hub, white circle for others
        if (node.type === 'hub' && logoImageRef.current) {
  ctx.shadowBlur = 0;
  ctx.save();
  ctx.beginPath();
  ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();

  // Calculate logo size maintaining aspect ratio at 70% of circle diameter
  const circleDiameter = size * 2; // Hub circle diameter (25px * 2 = 50px)
  const maxLogoSize = circleDiameter * 1; // 100%
  const imgAspect = logoImageRef.current.width / logoImageRef.current.height;

  let logoWidth, logoHeight;
  if (imgAspect > 1) {
    // Landscape: width is larger dimension
    logoWidth = maxLogoSize;
    logoHeight = maxLogoSize / imgAspect;
  } else {
    // Portrait or square: height is larger dimension
    logoHeight = maxLogoSize;
    logoWidth = maxLogoSize * imgAspect;
  }

  ctx.drawImage(
    logoImageRef.current,
    node.x - logoWidth / 2,
    node.y - logoHeight / 2,
    logoWidth,
    logoHeight
  );
  ctx.restore();
} else if (node.type !== 'hub') {
  // Draw white circle inside the 4 surrounding nodes
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(node.x, node.y, size * 0.75, 0, Math.PI * 2);
  ctx.fill();
}


        // Draw labels for non-hub nodes
        if (node.type !== 'hub' && node.label) {
          ctx.fillStyle = '#1E293B';
          ctx.font = '12px system-ui, -apple-system, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(node.label, node.x, node.y + size + 20);
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
  }, [networkNodes, dataPackets, canvasSize]);

  // Helper function for node colors
  const getNodeColor = (type: NetworkNode['type']) => {
    switch (type) {
      case 'hub': return '#3B82F6'; // Blue
      case 'operator': return '#7CE3D8'; // Amber
      case 'driver': return '#7CE3D8'; // Emerald
      case 'enterprise': return '#5090F6'; // Violet
      case 'passenger': return '#5090F6'; // Pink
      default: return '#3B82F6';
    }
  };

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden"
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
        className="relative z-10 w-full px-6 py-20 flex items-center min-h-screen"
        style={{ transform: `translateY(${scrollY * -0.05}px)` }}
      >
        <div className="max-w-2xl w-full">
         {/* Animated Headline */}
<div className="mb-8">
  <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
    <span 
      className={`inline-block transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: '0.2s' }}
    >
      <span style={{ color: '#7CE3D8' }}>Smart</span> <span style={{ color: '#5090F6' }}>Mobility</span>,
    </span>{' '}
    <span 
      className={`inline-block transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: '0.4s' }}
    >
      Practical Results
    </span>
  </h1>
</div>


          {/* Body Text */}
          <div 
            className={`mb-8 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: '0.6s' }}
          >
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
              Tranzkit turns complex transport into dependable, efficient movement. Our AI-powered platform connects{' '}
              <span className="font-semibold text-blue-800">operators</span>,{' '}
              <span className="font-semibold text-blue-800">drivers</span>,{' '}
              <span className="font-semibold text-blue-800">enterprises</span>, and{' '}
              <span className="font-semibold text-blue-800">passengers</span>{' '}
              so every trip runs smoother, cheaper, and safer.
            </p>
          </div>
                  
          {/* CTA Button */}
          <div 
            className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: '0.8s' }}
          >
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 whitespace-nowrap">
              <span className="relative z-10 transition-all duration-300">Explore Solutions</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 origin-left"></div>
            </button>
          </div>           
          </div>
        </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
        style={{ transform: `translateX(-50%) translateY(${scrollY * -0.1}px)` }}
      >
        <i className="ri-arrow-down-line text-2xl text-teal-400 hover:text-teal-300 transition-colors duration-300"></i>
      </div>
    </section>
  );
}