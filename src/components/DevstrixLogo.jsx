import React from 'react';

/**
 * DevstrixLogo Component
 * Premium Geometric Vector Brand Mark with Victor Murea Law Firm Inspired Motion:
 * 1. Geometric Blueprint Outline Draw (Stroke tracing: 0s - 0.7s)
 * 2. Elastic Snap & Materialization into Cyan/Teal Gradient (0.35s+)
 * 3. [X] Square Badge Pop & Rotation (0.45s+)
 * 4. Typography "evstrix" Wordmark Unfold (0.65s+)
 * 5. Ambient Light Sheen / Shimmer Gliding Sweep (Looping every 4.5s)
 * 6. Interactive Micro-tilt & Glow on Hover
 */
export default function DevstrixLogo({ className = "h-7 sm:h-8 w-auto" }) {
  return (
    <div className="devstrix-logo-container relative inline-flex items-center cursor-pointer select-none">
      <div className="logo-inner-wrapper relative overflow-hidden rounded-lg inline-flex items-center">
        
        {/* SVG Vector Logo Canvas */}
        <svg
          viewBox="0 0 830 224"
          className={`${className} overflow-visible block`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Primary Mark Gradient (Teal-to-Cyan-to-Indigo) */}
            <linearGradient id="devstrixMarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>

            {/* Glowing Blueprint Tracing Line */}
            <linearGradient id="strokeTraceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="50%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#99f6e4" />
            </linearGradient>

            {/* Box Gradient */}
            <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>

          {/* Phase 1: Geometric Blueprint Stroke Tracing */}
          <path
            className="d-stroke-tracer"
            d="M 12 0 H 112 A 112 112 0 0 1 224 112 A 112 112 0 0 1 112 224 H 60 V 168 H 112 A 56 56 0 0 0 168 112 A 56 56 0 0 0 112 56 H 0 V 12 A 12 12 0 0 1 12 0 Z"
            stroke="url(#strokeTraceGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Phase 2: Solid Fill Materialization & Snap */}
          <path
            className="mark-solid-fill"
            d="M 12 0 H 112 A 112 112 0 0 1 224 112 A 112 112 0 0 1 112 224 H 60 V 168 H 112 A 56 56 0 0 0 168 112 A 56 56 0 0 0 112 56 H 0 V 12 A 12 12 0 0 1 12 0 Z"
            fill="url(#devstrixMarkGrad)"
          />

          {/* Phase 2.5: [X] Square Badge Pop & Cross */}
          <g className="box-pop">
            <rect
              x="0"
              y="112"
              width="56"
              height="56"
              rx="10"
              fill="url(#boxGrad)"
              stroke="#020617"
              strokeWidth="3"
            />
            <path
              className="x-stroke-tracer"
              d="M 16 128 L 40 152 M 40 128 L 16 152"
              stroke="#020617"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Phase 3: Wordmark Unfold & Mask Reveal */}
          <g className="wordmark-unfold">
            <image
              href="/devstrix-text-trans.png"
              x="228"
              y="0"
              width="602"
              height="224"
              preserveAspectRatio="xMidYMid meet"
            />
          </g>
        </svg>

        {/* Ambient Shimmer Sheen Sweep */}
        <div className="shimmer-sweeper pointer-events-none" />
      </div>
    </div>
  );
}
