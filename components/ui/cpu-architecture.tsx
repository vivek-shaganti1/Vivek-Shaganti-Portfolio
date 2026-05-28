"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CpuArchitectureProps extends React.SVGProps<SVGSVGElement> {
  text?: string;
  className?: string;
}

export const CpuArchitecture = ({
  text = "AI CPU",
  className,
  ...props
}: CpuArchitectureProps) => {
  return (
    <svg
      viewBox="0 0 200 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-full select-none", className)}
      {...props}
    >
      <defs>
        {/* Glow Filters */}
        <filter id="cpu-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        <filter id="dot-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Gradients */}
        <linearGradient id="cpu-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#0f172a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#020617" stopOpacity="0.95" />
        </linearGradient>

        <linearGradient id="cpu-border-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
        </linearGradient>

        <linearGradient id="text-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>

        <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
        </linearGradient>

        <linearGradient id="dot-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="dot-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="dot-grad-3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#db2777" />
        </linearGradient>
      </defs>

      {/* Grid pattern background */}
      <g opacity="0.15">
        <path d="M 0 10 H 200 M 0 20 H 200 M 0 30 H 200 M 0 40 H 200 M 0 50 H 200 M 0 60 H 200 M 0 70 H 200 M 0 80 H 200 M 0 90 H 200" stroke="#475569" strokeWidth="0.25" />
        <path d="M 20 0 V 100 M 40 0 V 100 M 60 0 V 100 M 80 0 V 100 M 100 0 V 100 M 120 0 V 100 M 140 0 V 100 M 160 0 V 100 M 180 0 V 100" stroke="#475569" strokeWidth="0.25" />
      </g>

      {/* Connection lines (static background path representation) */}
      <g stroke="url(#line-grad)" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6">
        {/* Line 1 */}
        <path d="M 10 20 h 79.5 q 5 0 5 5 v 30" />
        {/* Line 2 */}
        <path d="M 180 10 h -69.7 q -5 0 -5 5 v 40" />
        {/* Line 3 */}
        <path d="M 130 20 v 21.8 q 0 5 -5 5 h -25" />
        {/* Line 4 */}
        <path d="M 170 80 v -21.8 q 0 -5 -5 -5 h -65" />
        {/* Line 5 */}
        <path d="M 135 65 h 15 q 5 0 5 5 v 10 q 0 5 -5 5 h -39.8 q -5 0 -5 -5 v -35" />
        {/* Line 6 */}
        <path d="M 94.8 95 v -46" />
        {/* Line 7 */}
        <path d="M 88 88 v -15 q 0 -5 -5 -5 h -10 q -5 0 -5 -5 v -5 q 0 -5 5 -5 h 28" />
        {/* Line 8 */}
        <path d="M 30 30 h 25 q 5 0 5 5 v 6.5 q 0 5 5 5 h 35" />
      </g>

      {/* Central Core Module */}
      <g filter="url(#cpu-glow)">
        <rect
          x="75"
          y="35"
          width="50"
          height="30"
          rx="6"
          fill="url(#cpu-bg-grad)"
          stroke="url(#cpu-border-grad)"
          strokeWidth="1.5"
        />
        {/* Core details */}
        <rect x="79" y="39" width="42" height="22" rx="3" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.4" />
        <text
          x="100"
          y="52"
          textAnchor="middle"
          fill="url(#text-grad)"
          fontSize="7"
          fontWeight="bold"
          letterSpacing="0.8"
          className="font-mono"
        >
          {text}
        </text>
      </g>

      {/* Interactive/Animated Nodes along paths */}
      {/* Node 1 */}
      <circle cx="10" cy="20" r="2" fill="#60a5fa" opacity="0.8" />
      {/* Node 2 */}
      <circle cx="180" cy="10" r="2" fill="#c084fc" opacity="0.8" />
      {/* Node 3 */}
      <circle cx="130" cy="20" r="2" fill="#f472b6" opacity="0.8" />
      {/* Node 4 */}
      <circle cx="170" cy="80" r="2" fill="#60a5fa" opacity="0.8" />
      {/* Node 5 */}
      <circle cx="135" cy="65" r="2" fill="#c084fc" opacity="0.8" />
      {/* Node 6 */}
      <circle cx="94.8" cy="95" r="2" fill="#f472b6" opacity="0.8" />
      {/* Node 7 */}
      <circle cx="88" cy="88" r="2" fill="#60a5fa" opacity="0.8" />
      {/* Node 8 */}
      <circle cx="30" cy="30" r="2" fill="#c084fc" opacity="0.8" />

      {/* Moving Packets (using offset-path animations defined in CSS) */}
      <g filter="url(#dot-glow)">
        <circle r="2.5" fill="url(#dot-grad-1)" className="cpu-architecture cpu-line-1" />
        <circle r="2.5" fill="url(#dot-grad-2)" className="cpu-architecture cpu-line-2" />
        <circle r="2.5" fill="url(#dot-grad-3)" className="cpu-architecture cpu-line-3" />
        <circle r="2.5" fill="url(#dot-grad-1)" className="cpu-architecture cpu-line-4" />
        <circle r="2.5" fill="url(#dot-grad-2)" className="cpu-architecture cpu-line-5" />
        <circle r="2.5" fill="url(#dot-grad-3)" className="cpu-architecture cpu-line-6" />
        <circle r="2.5" fill="url(#dot-grad-1)" className="cpu-architecture cpu-line-7" />
        <circle r="2.5" fill="url(#dot-grad-2)" className="cpu-architecture cpu-line-8" />
      </g>
    </svg>
  );
};
