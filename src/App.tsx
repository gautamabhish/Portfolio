import { ModeProvider, useModeContext } from "./providers/ModeProvider";
import Terminal from "./pages/Terminal";
import GUI from "./pages/GUI";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { GUIThemeProvider } from "./providers/GUITheme";

const AppContent = () => {
  const { mode } = useModeContext();

  return mode === "terminal" ? <Terminal /> : <GUIThemeProvider><GUI /></GUIThemeProvider>;
};

export default function App() {
  return (
    <div >
      <ModeProvider>

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppContent/>}></Route>
        {/* <Route path="/services" element={<Services/>}></Route> */}
      </Routes>
      </BrowserRouter>
      </ModeProvider>
        
    </div>
  );
}
