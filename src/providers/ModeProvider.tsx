// ModeContext.tsx
import React, { createContext, useContext, useState } from "react";

// 1. Define the context type
type Mode = "terminal" | "gui";

interface ModeContextType {
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

// 2. Create the context outside the component
const ModeContext = createContext<ModeContextType | undefined>(undefined);

// 3. Provider component
export const ModeProvider = ({ children }: { children: any }) => {
  const [mode, setMode] = useState<Mode>("gui");

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};

// 4. Custom hook
export const useModeContext = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("useModeContext must be used within a ModeProvider");
  }
  return context;
};
