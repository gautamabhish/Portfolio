import TC from "../components/Terminal"
import { useModeContext } from "../providers/ModeProvider"

const Terminal = () => {
  const { setMode } = useModeContext();

  return (
    <div>
      <TC onGuiSwitch={() => setMode("gui")} />
    </div>
  );
}

export default Terminal;
