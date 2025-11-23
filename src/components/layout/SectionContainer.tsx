// src/components/layout/SectionContainer.tsx
import React from "react";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionContainer({ children, className = "" }: SectionContainerProps) {
  return <div className={`container ${className}`}>{children}</div>;
}
