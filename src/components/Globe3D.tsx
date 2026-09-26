import React, { useEffect, useRef, useState } from 'react';

interface CityNode {
  name: string;
  lat: number;
  lng: number;
  isHost?: boolean;
  delegates?: number;
}

const DIPLOMATIC_CITIES: CityNode[] = [
  { name: 'New Delhi (Host)', lat: 28.6139, lng: 77.2090, isHost: true, delegates: 60 },
  { name: 'Geneva', lat: 46.2044, lng: 6.1432, delegates: 8 },
  { name: 'Nairobi', lat: -1.2921, lng: 36.8219, delegates: 6 },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503, delegates: 7 },
  { name: 'London', lat: 51.5074, lng: -0.1278, delegates: 8 },
  { name: 'New York', lat: 40.7128, lng: -74.0060, delegates: 9 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198, delegates: 6 },
  { name: 'São Paulo', lat: -23.5505, lng: -46.6333, delegates: 5 },
  { name: 'Cairo', lat: 30.0444, lng: 31.2357, delegates: 5 },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093, delegates: 4 },
  { name: 'Seoul', lat: 37.5665, lng: 126.9780, delegates: 5 },
  { name: 'Jakarta', lat: -6.2088, lng: 106.8456, delegates: 6 },
  { name: 'Johannesburg', lat: -26.2041, lng: 28.0473, delegates: 4 },
  { name: 'Dhaka', lat: 23.8103, lng: 90.4125, delegates: 5 },
  { name: 'Kathmandu', lat: 27.7172, lng: 85.3240, delegates: 4 },
  { name: 'Colombo', lat: 6.9271, lng: 79.8612, delegates: 4 },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708, delegates: 6 },
];

export const Globe3D: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  // Rotation state
  const rotYRef = useRef<number>(-0.8);
  const rotXRef = useRef<number>(0.35);
  const isDraggingRef = useRef<boolean>(false);
  const lastMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Precompute Fibonacci sphere dots for subtle globe surface
    const DOT_COUNT = 680;
    const dots: { lat: number; lng: number }[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < DOT_COUNT; i++) {
      const y = 1 - (i / (DOT_COUNT - 1)) * 2; // -1 to 1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const lat = Math.asin(y) * (180 / Math.PI);
      const lng = Math.atan2(x, z) * (180 / Math.PI);
      dots.push({ lat, lng });
    }

    // Host node coordinates for arcs
    const hostNode = DIPLOMATIC_CITIES.find(c => c.isHost) || DIPLOMATIC_CITIES[0];

    const to3D = (lat: number, lng: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180) + rotYRef.current;
      const tilt = rotXRef.current;

      // Base spherical coordinates
      let x = -radius * Math.sin(phi) * Math.cos(theta);
      let y = radius * Math.cos(phi);
      let z = radius * Math.sin(phi) * Math.sin(theta);

      // Apply tilt around X axis
      const yTilted = y * Math.cos(tilt) - z * Math.sin(tilt);
      const zTilted = y * Math.sin(tilt) + z * Math.cos(tilt);

      return { x, y: yTilted, z: zTilted };
    };

    let pulse = 0;

    const render = () => {
      // Auto-rotation when not dragging
      if (!isDraggingRef.current) {
        rotYRef.current += 0.0035;
      }
      pulse += 0.04;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.42;

      // Background atmospheric radial glow
      const bgGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.4,
        centerX,
        centerY,
        radius * 1.35
      );
      bgGlow.addColorStop(0, 'rgba(229, 30, 43, 0.08)');
      bgGlow.addColorStop(0.65, 'rgba(180, 10, 20, 0.03)');
      bgGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bgGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // Outer globe boundary outline
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(229, 30, 43, 0.22)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Atmospheric limb glow rim
      const rimGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.88,
        centerX,
        centerY,
        radius
      );
      rimGradient.addColorStop(0, 'rgba(229, 30, 43, 0)');
      rimGradient.addColorStop(1, 'rgba(229, 30, 43, 0.28)');
      ctx.fillStyle = rimGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw latitude/longitude rings (meridians and parallels)
      ctx.lineWidth = 0.75;
      [-40, -20, 0, 20, 40].forEach(parallelLat => {
        ctx.beginPath();
        let first = true;
        for (let lng = -180; lng <= 180; lng += 8) {
          const pt = to3D(parallelLat, lng, radius);
          if (pt.z > 0) {
            const screenX = centerX + pt.x;
            const screenY = centerY - pt.y;
            if (first) {
              ctx.moveTo(screenX, screenY);
              first = false;
            } else {
              ctx.lineTo(screenX, screenY);
            }
          } else {
            first = true;
          }
        }
        ctx.strokeStyle = parallelLat === 0 ? 'rgba(230, 200, 135, 0.28)' : 'rgba(255, 255, 255, 0.06)';
        ctx.stroke();
      });

      // Draw surface land points (dots)
      dots.forEach(dot => {
        const pt = to3D(dot.lat, dot.lng, radius);
        if (pt.z > 0) {
          // Front hemisphere
          const alpha = (pt.z / radius) * 0.6 + 0.15;
          ctx.beginPath();
          ctx.arc(centerX + pt.x, centerY - pt.y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(235, 225, 220, ${alpha * 0.6})`;
          ctx.fill();
        }
      });

      // Draw diplomatic convergence arcs towards New Delhi
      const hostPos = to3D(hostNode.lat, hostNode.lng, radius);

      DIPLOMATIC_CITIES.forEach(city => {
        if (city.isHost) return;
        const cityPos = to3D(city.lat, city.lng, radius);

        // If either the city or host is on front hemisphere
        if (hostPos.z > -radius * 0.2 || cityPos.z > -radius * 0.2) {
          const midLat = (hostNode.lat + city.lat) / 2;
          const midLng = (hostNode.lng + city.lng) / 2;
          // Elevate mid-point higher than radius for 3D curved arc effect
          const arcAltitude = radius * 1.22;
          const midPos = to3D(midLat, midLng, arcAltitude);

          const startX = centerX + cityPos.x;
          const startY = centerY - cityPos.y;
          const ctrlX = centerX + midPos.x;
          const ctrlY = centerY - midPos.y;
          const endX = centerX + hostPos.x;
          const endY = centerY - hostPos.y;

          // Arc curve
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY);
          
          const depthAlpha = Math.max(0.1, (cityPos.z + radius) / (2 * radius));
          ctx.strokeStyle = `rgba(230, 200, 135, ${depthAlpha * 0.35})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Animated light packet traveling along the arc
          const t = (Math.sin(pulse + city.lat * 0.1) + 1) / 2;
          const pktX = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * ctrlX + t * t * endX;
          const pktY = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * ctrlY + t * t * endY;

          ctx.beginPath();
          ctx.arc(pktX, pktY, 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 240, 200, 0.85)';
          ctx.shadowColor = '#e6c887';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Draw diplomatic city beacons
      DIPLOMATIC_CITIES.forEach(city => {
        const pt = to3D(city.lat, city.lng, radius);
        if (pt.z > -10) {
          const screenX = centerX + pt.x;
          const screenY = centerY - pt.y;

          if (city.isHost) {
            // Pulsing host rings for New Delhi
            const pulseRadius = 5 + (Math.sin(pulse * 2) + 1) * 3.5;
            ctx.beginPath();
            ctx.arc(screenX, screenY, pulseRadius * 1.6, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(229, 30, 43, 0.25)';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(screenX, screenY, pulseRadius, 0, Math.PI * 2);
            ctx.strokeStyle = '#e6c887';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Core center beacon
            ctx.beginPath();
            ctx.arc(screenX, screenY, 4.5, 0, Math.PI * 2);
            ctx.fillStyle = '#ff1e32';
            ctx.shadowColor = '#e51e2b';
            ctx.shadowBlur = 12;
            ctx.fill();
            ctx.shadowBlur = 0;

            // Host City Label
            ctx.fillStyle = '#fcfaf7';
            ctx.font = 'bold 11px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('NEW DELHI', screenX, screenY - 14);

            ctx.fillStyle = '#e6c887';
            ctx.font = 'bold 8px monospace';
            ctx.fillText('HOST SUMMIT’26', screenX, screenY - 4);
          } else {
            // Standard delegate city node
            ctx.beginPath();
            ctx.arc(screenX, screenY, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = '#e6c887';
            ctx.shadowColor = '#e6c887';
            ctx.shadowBlur = 4;
            ctx.fill();
            ctx.shadowBlur = 0;

            // Show name if on front and high prominence
            if (pt.z > radius * 0.35) {
              ctx.fillStyle = 'rgba(235, 225, 220, 0.7)';
              ctx.font = '9px sans-serif';
              ctx.textAlign = 'left';
              ctx.fillText(city.name, screenX + 6, screenY + 3);
            }
          }
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    // Mouse / Touch Drag Handlers
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;
      rotYRef.current += dx * 0.006;
      rotXRef.current = Math.max(-0.9, Math.min(0.9, rotXRef.current + dy * 0.005));
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - lastMouseRef.current.x;
      const dy = e.touches[0].clientY - lastMouseRef.current.y;
      rotYRef.current += dx * 0.006;
      rotXRef.current = Math.max(-0.9, Math.min(0.9, rotXRef.current + dy * 0.005));
      lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      el.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('touchend', onTouchEnd);
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (el) {
        el.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        el.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{ touchAction: 'none' }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      
      {/* Subtle Hint Overlay */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] text-[#a89c99] tracking-wider uppercase font-mono pointer-events-none backdrop-blur-sm">
        Drag to Rotate • Delhi Convergence Node
      </div>
    </div>
  );
};
