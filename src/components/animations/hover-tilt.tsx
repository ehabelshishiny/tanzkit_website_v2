'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface HoverTiltProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  scale?: number;
}

export function HoverTilt({
  children,
  className,
  tiltAmount = 10,
  scale = 1.02
}: HoverTiltProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -tiltAmount;
    const rotateYValue = ((x - centerX) / centerX) * tiltAmount;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        scale: rotateX !== 0 || rotateY !== 0 ? scale : 1
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}

