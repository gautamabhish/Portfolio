import Home from "../components/Home";
import { useModeContext } from "../providers/ModeProvider";
import { useGUITheme } from "../providers/GUITheme";

export default function GUI() {
  const { setMode } = useModeContext();
  const {theme} = useGUITheme()

  // Define theme-based styles
  const isDark = theme === "dark";

  const containerClasses = isDark
    ? "min-h-screen bg-gradient-to-b from-[#0e0e0e] via-[#463168] to-[#361f5c] text-white"
    : "min-h-screen bg-gradient-to-b from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1] text-black";

  return (
    <div
      className={`${containerClasses} rounded-xl overflow-y-visible `}
      style={{ position: "relative" }}
    >
      {/* Grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: isDark
            ? "radial-gradient(circle, rgba(0, 183, 255, 0.3) 1px, transparent 1px)"
            : "radial-gradient(circle, rgba(0, 0, 0, 0.15) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          filter: "blur(2px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Home content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Home />
      </div>

      {/* Mode switch button */}
      <div>
        <button
          className={`fixed bottom-4 right-4 px-4 py-2 rounded ${
            isDark ? "bg-blue-500 text-white" : "bg-blue-600 text-white"
          }`}
          onClick={() => setMode("terminal")}
          style={{ zIndex: 2 }}
        >
          Terminal
        </button>
      </div>
    </div>
  );
}
