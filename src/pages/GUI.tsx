import Home from "../components/Home";
import { useState } from "react";
import { useModeContext } from "../providers/ModeProvider";

const float = {
  animation: "float 6s ease-in-out infinite",
};

const floatSlow = {
  animation: "floatSlow 12s ease-in-out infinite",
};

const floatFast = {
  animation: "floatFast 4s ease-in-out infinite",
};

const keyframes = `
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@keyframes floatSlow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
@keyframes floatFast {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-14px); }
}

@keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.4;
    }
    50% {
      transform: scale(1.5);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0.4;
    }
  }
`;


export default function GUI() {
    const { setMode } = useModeContext();
  
    const [pulsePoint, setPulsePoint] = useState<{ x: number; y: number } | null>(null);
  
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const gridSize = 12;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.round((e.clientX - rect.left) / gridSize) * gridSize;
      const y = Math.round((e.clientY - rect.top) / gridSize) * gridSize;
      setPulsePoint({ x, y });
    };
  
    return (
      <div
        className="min-h-screen bg-gradient-to-b from-[#0e0e0e] via-[#463168] to-[#361f5c] rounded-xl overflow-y-visible   text-white  cursor-none "
        style={{ position: "relative" }}
        onMouseMove={handleMouseMove}
      >
        {/* Inject keyframes */}
        <style>{keyframes}</style>
  
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(0, 183, 255, 0.15) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            // opacity:80,
            filter: "blur(2px)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
  
        {/* Pulsing dot */}
        {pulsePoint && (
          <div
            style={{
              position: "absolute",
              top: pulsePoint.y - 5,
              left: pulsePoint.x - 5,
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "rgba(0,183,255,0.8)",
              boxShadow: "0 0 10px 4px rgba(0,183,255,0.4)",
              animation: "pulse 1.2s ease-in-out infinite",
              zIndex: 4,
              pointerEvents: "none",
            }}
          />
        )}
  
        {/* Floating blobs */}
        <div
          className="absolute rounded-full blur-xl opacity-70 bg-purple-400"
          style={{ ...float, top: "120px", left: "72px", width: "40px", height: "40px", zIndex: 2 }}
        />
        <div
          className="absolute rounded-full blur-lg opacity-60 bg-blue-500"
          style={{ ...floatSlow, top: "80px", right: "48px", width: "24px", height: "48px", zIndex: 2 }}
        />
        <div
          className="absolute rounded-full blur-lg opacity-70 bg-pink-400"
          style={{ ...floatFast, bottom: "40px", left: "50%", width: "72px", height: "72px", zIndex: 2 }}
        />
  
        {/* Home content (above grid) */}
        <div style={{ position: "relative", zIndex: 1 ,marginTop:"0px" ,paddingTop:"0px"}}>
          <Home />
        </div>
  
        {/* Mode switch button */}
        <div >
          <button
            className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setMode("terminal")}
            style={{ zIndex: 2}}
          >
            Terminal
          </button>
        </div>
      </div>
    );
  }
  