import React, { useState, useRef } from "react";
import { OrganizationChart } from "primereact/organizationchart";
import { orgData } from "../utils/orgData";

export const OrgChartPM: React.FC<{ data: any[] }> = ({ data }) => {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());

  const initialDistance = useRef<number | null>(null);
  const lastScale = useRef<number>(scale);

  const getDistance = () => {
    const arr = Array.from(pointers.current.values());
    if (arr.length < 2) return 0;
    const dx = arr[0].x - arr[1].x;
    const dy = arr[0].y - arr[1].y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    initialDistance.current = arr.length === 2 ? getDistance() : null;
    containerRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    const arr = Array.from(pointers.current.values());

    // PINCH ZOOM QUANDO 2 PONTEIROS
    if (arr.length === 2) {
      const currentDistance = getDistance();

      if (initialDistance.current === null) {
        initialDistance.current = currentDistance;
        lastScale.current = lastScale.current;
      }

      const newScale = (currentDistance / initialDistance.current!) * lastScale.current;
      lastScale.current = Math.max(0.4, Math.min(2, newScale));
      setScale(Math.max(0.4, Math.min(3, newScale)));
      return;
    }

    // DRAG DO CHART QUANDO 1 PONTEIRO
    if (arr.length === 1) {
      setPos(p => ({ x: p.x + e.movementX, y: p.y + e.movementY }));
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) {
      initialDistance.current = null;
      lastScale.current = lastScale.current;
    }
    lastScale.current = scale;
    containerRef.current?.releasePointerCapture(e.pointerId);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    setScale((s) => {
      const delta = e.deltaY * -0.001; // ajuste fino do zoom
      const newScale = s + delta;
      return Math.max(0.2, Math.min(5, newScale)); // agora zoom out pode ir até 0.2x e zoom in até 5x
    });
  };

  return (
    <div className="flex flex-col gap-3 p-2 bg-gray-200">

      {/* BOTÕES */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setScale(s => Math.min(s + 0.1, 2))}
          className="px-3 py-2 bg-blue-600 text-white rounded-2xl shadow cursor-pointer hover:bg-blue-500 hover:transform hover:scale-105 transition duration-300"
        >
          + Zoom In
        </button>

        <button
          onClick={() => setScale(s => Math.max(s - 0.1, 0.2))}
          className="px-3 py-2 bg-blue-600 hover:bg-blue-500 hover:transform hover:scale-105 transition duration-300 text-white rounded-2xl shadow cursor-pointer"
        >
          - Zoom Out
        </button>

        <button
          onClick={() => {
            setScale(1);
            setPos({ x: 0, y: 0 });
          }}
          className="px-3 hover:bg-gray-400 hover:transform hover:scale-105 transition duration-300 py-2 bg-gray-500 text-white rounded-2xl shadow cursor-pointer"
        >
          🔄 Reset
        </button>
      </div>

      {/* CONTAINER COM GESTO + DRAG */}
      <div
        ref={containerRef}
        className="flex justify-center items-center h-[calc(100vh-70px)] bg-gray-900 cursor-grab active:cursor-grabbing overflow-hidden flex justify-center border border-gray-700 rounded-2xl p-3"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
      >

        <div
          className="transition-transform duration-200"
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
            transformOrigin: "center top"
          }}
        >

          <OrganizationChart value={orgData} selectionMode="single" />

        </div>

      </div>
    </div>
  );
};
