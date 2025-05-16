import { useState, useEffect, useRef } from "react";

const commands = {
  help: `You can switch to GUI mode for a better experience.\nAvailable commands:\n- about\n- projects\n- contact\n- gui\n- clear\n- sudo hire-me\n- ls\n- cd\n`,
  about: `\nHi, I'm Abhishek Gautam 👋
I'm a full-stack developer passionate about building immersive experiences, from sleek UIs to real-time apps. I love blending code with creativity — recently explored AI, Web3, and 3D interfaces like Meta Worlds.
Skills: React, Next.js, Node.js, TypeScript, Three.js, MongoDB, Python.
Always learning. Always building.\n\n`,
  projects: "1. Portfolio Terminal UI\n2. AI Chat App\n3. Meta World Project",
  contact:
    "Email: blockchaindevabhishek@gmail.com\nGitHub: github.com/gautamabhish\nLinkedIn: https://www.linkedin.com/in/abhishek-gautam-a2a6b92a4",
  gui: "Switching to GUI mode...",
};

type HireMeStep = "idle" | "awaitingName" | "awaitingContact";

export default function Terminal({ onGuiSwitch }: { onGuiSwitch: ()=> void }) {
  const [history, setHistory] = useState<string[]>([
    "Hi, I'm Abhishek Gautam 👋 \nI'm a full-stack developer passionate about building immersive experiences, from sleek UIs to real-time apps!\nType `help` to begin.",
  ]);
  const [input, setInput] = useState("");
  const [hireMeStep, setHireMeStep] = useState<HireMeStep>("idle");
  const [userName, setUserName] = useState("");
  const [currentPath, setCurrentPath] = useState("/home/terminal");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();

    // Handle ongoing hire-me flow
    if (hireMeStep === "awaitingName") {
      setUserName(trimmed);
      setHistory((prev) => [
        ...prev,
        `> Name: ${trimmed}`,
        "Please enter your contact info (email, LinkedIn, etc.):",
      ]);
      setHireMeStep("awaitingContact");
      return;
    }

    if (hireMeStep === "awaitingContact") {
      const contact = trimmed;
      setHistory((prev) => [
        ...prev,
        `> Contact: ${contact}`,
        `✅ Thank you, ${userName}! I'll reach out to you at ${contact}.`,
      ]);
      setHireMeStep("idle");
      setUserName("");
      return;
    }

    // Save to command history
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(null);

    // cd .. logic
    if (trimmed === "cd ..") {
      if (currentPath !== "/home") {
        setCurrentPath("/home");
        setHistory((prev) => [...prev, `$ ${trimmed}`]);
      }
      return;
    }
    
    if (trimmed === "cd terminal") {
      if (currentPath === "/home") {
        setCurrentPath("/home/terminal");
        setHistory((prev) => [...prev, `$ ${trimmed}`]);
      } else {
        setHistory((prev) => [...prev, `$ ${trimmed}`, "Command not found in this directory"]);
      }
      return;
    }
    
    if (trimmed === "cd gui") {
      if (currentPath === "/home") {
        setHistory((prev) => [...prev, `$ ${trimmed}`, "Switching to GUI..."]);
        onGuiSwitch();
      } else {
        setHistory((prev) => [...prev, `$ ${trimmed}`, "GUI not found in this directory. Check home directory"]);
      }
      return;
    }
    

    // ls command
    if (trimmed === "ls") {
      let output = currentPath === "/home" ? "gui  terminal" : "";
      setHistory((prev) => [...prev, `$ ${trimmed}`, output]);
      return;
    }

    // clear screen
    if (trimmed === "clear") {
      setHistory(["You can always switch to GUI mode!.\nWelcome to my terminal portfolio! Type `help` to begin.",]);
      return;
    }

    // sudo hire-me
    if (trimmed === "sudo hire-me") {
      setHireMeStep("awaitingName");
      setHistory((prev) => [...prev, `$ ${trimmed}`, "Please enter your name:"]);
      return;
    }

    if (trimmed === "hire-me") {
      setHistory((prev) => [
        ...prev,
        `$ ${trimmed}`,
        "Permission denied: try using `sudo hire-me`",
      ]);
      return;
    }

    const baseCmd = trimmed.split(" ")[0];
    const output = commands[baseCmd as keyof typeof commands];
    
    if (currentPath === "/home/terminal") {
      if (trimmed === "gui") {
        setHistory((prev) => [...prev, `$ ${trimmed}`, "Switching to GUI..."]);
        onGuiSwitch();
      } else if (output) {
        setHistory((prev) => [...prev, `$ ${trimmed}`, output]);
      } else {
        setHistory((prev) => [...prev, `$ ${trimmed}`, `Command not found: ${trimmed}`]);
      }
    }
    
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && e.key.toLowerCase() === "c") {
      setHistory((prev) => [
        ...prev,
        `abhishekgautam:${currentPath}$ ${input}`,
        "^C",
      ]);
      setInput("");
      setHireMeStep("idle");
      return;
    }
    if (e.key === "Enter") {
      if (input.trim() !== "") handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex =
        historyIndex === null
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandHistory.length === 0 || historyIndex === null) return;
      const newIndex =
        historyIndex + 1 >= commandHistory.length ? null : historyIndex + 1;
      setHistoryIndex(newIndex);
      setInput(newIndex !== null ? commandHistory[newIndex] : "");
    }
  };

  return (
    <div className="bg-black text-green-400 font-mono h-screen p-4 overflow-y-auto w-full">
      {history.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap">{line}</div>
      ))}
     <div className="flex">
  {hireMeStep === "idle" && (
    <span className="w-fit">{`abhishekgautam:${currentPath}$`}</span>
  )}
  <input
    ref={inputRef}
    className="bg-black text-green-400 outline-none ml-2 w-full"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={handleKeyDown}
    autoFocus
    spellCheck={false}
    placeholder={
      hireMeStep === "awaitingName"
        ? "Enter your name..."
        : hireMeStep === "awaitingContact"
        ? "Enter your contact info..."
        : ""
    }
  />
</div>
<div >
    <button className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={onGuiSwitch}>
        GUI
    </button>
</div>

    </div>
  );
}
