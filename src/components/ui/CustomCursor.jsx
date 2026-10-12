import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const isVisibleRef = useRef(false);
  const isHoveredRef = useRef(false);

  // 1:1 hardware direct motion values for 0ms input latency (no spring drag)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    // Disable custom cursor on touch/mobile devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    let rafHoverId = null;

    const onMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      // Decouple interactive element check into RAF to keep main thread completely unblocked
      if (!rafHoverId) {
        const targetElement = e.target;
        rafHoverId = requestAnimationFrame(() => {
          if (targetElement && targetElement.closest) {
            const target = targetElement.closest(
              'a, button, [role="button"], .cursor-pointer, input, textarea, select, [data-cursor="hover"]'
            );
            const isTargetHovered = Boolean(target);
            if (isHoveredRef.current !== isTargetHovered) {
              isHoveredRef.current = isTargetHovered;
              setIsHovered(isTargetHovered);
            }
          }
          rafHoverId = null;
        });
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };
    const onMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      if (rafHoverId) cancelAnimationFrame(rafHoverId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [cursorX, cursorY]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[99999]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ opacity: { duration: 0.12 } }}
    >
      <AnimatePresence>
        {!isHovered ? (
          // Default State: Filled glowing indigo circle for scrolling & browsing
          <motion.div
            key="circle-cursor"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isClicked ? 0.72 : 1,
              opacity: 1,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.09, ease: 'easeOut' }}
            className="w-3.5 h-3.5 rounded-full bg-indigo-500 shadow-[0_0_14px_rgba(99,102,241,0.95)]"
          />
        ) : (
          // Hover State: Vibrant Indigo Organic Heart badge with White Arrow ↗ matching theme
          <motion.div
            key="heart-cursor"
            initial={{ scale: 0.4, rotate: -15, opacity: 0 }}
            animate={{
              scale: isClicked ? 0.85 : 1,
              rotate: -8,
              opacity: 1,
            }}
            exit={{ scale: 0.4, rotate: 10, opacity: 0 }}
            transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center filter drop-shadow-[0_0_16px_rgba(99,102,241,0.75)]"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              className="overflow-visible"
            >
              <defs>
                <linearGradient id="heartCursorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="50%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
              </defs>
              {/* Stylized Indigo Heart Silhouette */}
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="url(#heartCursorGradient)"
              />
              {/* Pure White Up-Right Arrow ↗ inside heart */}
              <path
                d="M9 13.5L14.5 8M14.5 8H10.5M14.5 8V12"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
