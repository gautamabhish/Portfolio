//@ts-nocheck
import React, { useState, useEffect } from 'react';
import { useGUITheme } from '../../providers/GUITheme';
import { Github } from 'lucide-react';
import { Radio as Live } from 'lucide-react';

const phrases = [
  { verb: "Design"},
  { verb: "Develop" },
  { verb: "Deliver"},
];

export default function Hero() {
  const { theme } = useGUITheme();
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showFadeUp, setShowFadeUp] = useState(false);
  const [resetCycle, setResetCycle] = useState(false);

  // Manual UI state
  const [currentProjectIndex, setCurrentProjectIndex] = useState<number | null>(null);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [callStack, setCallStack] = useState<any[]>([]);
  const [eventQueue, setEventQueue] = useState<any[]>([]);

  const isDark = theme === 'dark';

  const MyProjects = [
    {
      id: 1,
      funcName: "showEdutrust()",
      title: "Edutrust",
      description:
        "A full-featured quiz hosting platform enabling creators to design quizzes with video, audio, and image support. Includes role-based access, referral programs, and a community forum for engagement.",
      tech: ["Next.js", "Node.js", "MySQL", "Express", "Prisma", "Razorpay"],
      github: "https://github.com/gautamabhish/Skillpass",
      link: "https://skillpass.vercel.app/",
    },
    {
      id: 2,
      funcName: "showCodeON()",
      title: "CodeON",
      description:
        "A developer profile card generator integrating LeetCode, Codeforces, and GitHub scores with ranking and tier calculation. Implemented Kubernetes manifests, Helm charts, and multi-tier Dockerized deployments.",
      tech: ["React.js", "Tailwind CSS", "Framer Motion", "MongoDB"],
      github: "https://github.com/gautamabhish/codeON",
      link: "https://code-on-one.vercel.app/",
    },
    {
      id: 3,
      funcName: "showDiscordBot()",
      title: "AI Discord Bot",
      description:
        "An AI-powered Discord bot built with Grok SDK, designed to handle channel queries and provide intelligent responses in real-time.",
      tech: ["discord.js", "Node.js", "grok-sdk"],
      github: "https://github.com/gautamabhish/Discord-Bot-?tab=readme-ov-file",
    },
    {
      id: 4,
      funcName: "showEdutrustDevops()",
      title: "Edutrust DevOps",
      description:
        "End-to-end DevOps deployment of the Edutrust platform on Minikube. Leveraged Docker, Kubernetes, Helm, ArgoCD, and Terraform for CI/CD, with added security using Trivy.",
      tech: ["AWS", "Docker", "Kubernetes", "Helm", "ArgoCD", "Terraform", "Trivy"],
      github: "https://github.com/gautamabhish/EdutrustDevops",
    },
  ];

  // Typing animation
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const fullText = `${currentPhrase.verb}`;

    if (resetCycle) {
      setTypedText("");
      setCharIndex(0);
      setResetCycle(false);
      return;
    }

    if (charIndex < fullText.length) {
      const timer = setTimeout(() => {
        setTypedText(fullText.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        setResetCycle(true);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [charIndex, phraseIndex, resetCycle]);

  // Fade-in
  useEffect(() => {
    const timer = setTimeout(() => setShowFadeUp(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Mobile: Direct project handling without event loop
  const handleProjectClick = (index: number) => {
    setCurrentProjectIndex(index);
    setShowProjectDetails(true);
  };

  const closeCurrentProject = () => {
    setShowProjectDetails(false);
    setCurrentProjectIndex(null);
  };

  // Desktop: Keep original event loop behavior
  const handleProjectClickDesktop = (index: number) => {
    const project = MyProjects[index];
    if (!eventQueue.some(p => p.id === project.id) && !callStack.some(p => p.id === project.id)) {
      setEventQueue(prev => [...prev, project]);
    }
  };

  useEffect(() => {
    if (eventQueue.length === 0 || callStack.length !== 0) return;
    const next = eventQueue[0];
    setEventQueue(prev => prev.slice(1));
    setCallStack([next]);
    const idx = MyProjects.findIndex(p => p.id === next.id);
    setCurrentProjectIndex(idx >= 0 ? idx : null);
    setShowProjectDetails(true);
  }, [callStack, eventQueue]);

  const closeCurrentProjectDesktop = () => {
    setCallStack([]);
    setShowProjectDetails(false);
    setCurrentProjectIndex(null);
  };

  const themeClasses = isDark ? 'bg-black text-white' : 'bg-white text-black';
  const accentColor = isDark ? 'text-gray-300' : 'text-gray-700';
  const borderColor = isDark ? 'border-gray-800' : 'border-gray-200';
  const stackColor = isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-300';
  const queueColor = isDark ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-400';

  return (
    <div className={`min-h-screen ${themeClasses} transition-colors duration-300`}>
      {/* Mobile Layout */}
    <div className="block lg:hidden">
  <div className="min-h-screen flex flex-col justify-center px-6 py-8">
    <div className={`transition-opacity duration-700 ${showFadeUp ? 'opacity-100' : 'opacity-0'}`}>
      {/* Mobile Header */}
      <h2 className="text-3xl md:text-4xl font-light mb-2 tracking-tight font-mono text-center">
        ABHISHEK GAUTAM
      </h2>
      <div className="h-12 mb-8 text-center">
        <p className={`text-xl md:text-2xl font-light font-mono ${accentColor}`}>
          {typedText}
          <span className="animate-pulse">|</span>
        </p>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        <h3 className={`text-lg font-mono ${accentColor} text-center mb-6`}>Projects</h3>
        <div className="flex flex-col gap-4">
          {MyProjects.map((project, index) => {
            const isOpen = currentProjectIndex === index && showProjectDetails;
            return (
              <div
                key={project.id}
                className={`overflow-hidden rounded-lg border ${borderColor} transition-all duration-500 ${
                  isOpen
                    ? `${isDark ? 'bg-gray-900' : 'bg-gray-50'} shadow-lg`
                    : `${isDark ? 'bg-gray-900' : 'bg-gray-50'}`
                }`}
              >
                <button
                  onClick={() => {
                    if (isOpen) {
                      closeCurrentProject();
                    } else {
                      setCurrentProjectIndex(index);
                      setShowProjectDetails(true);
                    }
                  }}
                  className="w-full p-4 text-left flex justify-between items-center"
                >
                  <div>
                    <h4 className={`${isDark?'text-white':'text-white'} text-lg font-semibold mb-1`}>{project.title}</h4>
                    {!isOpen && (
                      <p className={`text-[#ffecec] text-sm ${accentColor} line-clamp-2 `}>
                        {project.description.substring(0, 100)}...
                      </p>
                    )}
                  </div>
                  <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                    +
                  </div>
                </button>

                {/* Full Reveal Details */}
                <div
                  className={`transition-all duration-500 px-4 pb-4 ${
                    isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className={`text-base leading-relaxed mt-2 ${accentColor}`}>{project.description}</p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-3 py-1 border ${borderColor} rounded-md text-sm font-mono ${accentColor}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-4">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm underline"
                      >
                        <Live size={16} />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm underline"
                      >
                        <Github size={16} />
                        
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
</div>


      {/* Desktop Layout - Original Event Loop Design */}
      <div className="hidden lg:flex h-screen">
        {/* Left Side - Name/Project Details */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-16">
          <div className={`transition-opacity duration-700 ${showFadeUp ? 'opacity-100' : 'opacity-0'}`}>
            {!showProjectDetails ? (
              <>
                <h2 className="text-4xl lg:text-6xl font-light mb-2 tracking-tight font-mono ml-8">
                  ABHISHEK GAUTAM
                </h2>
                <div className="h-16 mb-6 ml-8">
                  <p className={`text-2xl lg:text-3xl font-light font-mono ${accentColor} min-h-[3rem]`}>
                    {typedText}
                    <span className="animate-pulse">|</span>
                  </p>
                </div>
              </>
            ) : (
              <div
                className={`transition-all duration-500 transform ${
                  showProjectDetails ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl lg:text-5xl font-semibold tracking-tight ">
                    {MyProjects[currentProjectIndex!]?.title}
                  </h3>
                  <button
                    onClick={closeCurrentProjectDesktop}
                    className="ml-4 px-3 py-1 rounded-full hover:bg-red-600 hover:text-red-500 text-white transition"
                  >
                    ×
                  </button>
                </div>

                <p className={`text-lg lg:text-xl font-light leading-relaxed mb-6 ${accentColor}`}>
                  {MyProjects[currentProjectIndex!]?.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {MyProjects[currentProjectIndex!]?.tech?.map((tech, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 border ${borderColor} rounded-md text-sm font-mono ${accentColor} bg-opacity-50`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  {MyProjects[currentProjectIndex!]?.link && (
                    <a
                      href={MyProjects[currentProjectIndex!].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm underline"
                    >
                      <Live />
                    </a>
                  )}
                  {MyProjects[currentProjectIndex!]?.github && (
                    <a
                      href={MyProjects[currentProjectIndex!].github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm underline"
                    >
                      <Github />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Event Loop Visualization (Desktop Only) */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          {/* Call Stack */}
          <div className="w-full max-w-sm mb-6">
            <h4 className={`text-lg font-mono mb-4 ${accentColor} text-center`}>Call Stack</h4>
            <div className={`h-32 border-2 ${stackColor} rounded-lg p-4 flex flex-col justify-end transition-all duration-300 w-full`}>
              {callStack.length > 0 ? (
                callStack.map((project) => (
                  <div
                    key={`stack-${project.id}`}
                    className={`p-3 mb-2 rounded border-l-4 text-sm font-mono transition-all duration-300 ${
                      isDark ? 'bg-red-900 border-red-400 text-red-100' : 'bg-red-100 border-red-500 text-red-800'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>{project.funcName}</div>
                      <button
                        onClick={() => { setCallStack([]); setShowProjectDetails(false); setCurrentProjectIndex(null); }}
                        className="text-xs px-2 rounded hover:bg-red-600 bg-transparent hover:text-red-800 text-white transition"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className={`text-center ${accentColor} font-mono text-sm`}>Stack Empty</div>
              )}
            </div>
          </div>

          {/* Event Loop Arrow */}
          <div className="mb-6 flex items-center">
            <div className={`w-16 h-0.5 ${isDark ? 'bg-yellow-400' : 'bg-blue-500'} relative`}>
              <div className={`absolute right-0 w-2 h-2 ${isDark ? 'bg-yellow-400' : 'bg-blue-500'} transform rotate-45 translate-x-1 -translate-y-0.5`} />
            </div>
            <span className={`mx-4 text-sm font-mono ${accentColor}`}>Projects</span>
            <div className={`w-16 h-0.5 ${isDark ? 'bg-yellow-400' : 'bg-blue-500'} relative`}>
              <div className={`absolute right-0 w-2 h-2 ${isDark ? 'bg-yellow-400' : 'bg-blue-500'} transform rotate-45 translate-x-1 -translate-y-0.5`} />
            </div>
          </div>

          {/* Event Queue */}
          <div className="w-full max-w-sm mb-6">
            <h4 className={`text-lg font-mono mb-4 ${accentColor} text-center`}>Project Queue</h4>
            <div className={`h-32 border-2 ${queueColor} rounded-lg p-4 overflow-y-auto transition-all duration-300`}>
              {eventQueue.length > 0 ? (
                eventQueue.map((project, index) => (
                  <div
                    key={`queue-${project.id}`}
                    className={`p-3 mb-2 rounded border-l-4 text-sm font-mono transition-all duration-300 ${
                      isDark ? 'bg-green-900 border-green-400 text-green-100' : 'bg-green-100 border-green-500 text-green-800'
                    }`}
                    style={{ transform: `translateX(${index * 2}px)`, zIndex: eventQueue.length - index }}
                  >
                    {project.funcName}
                  </div>
                ))
              ) : (
                <div className={`text-center ${accentColor} font-mono text-sm`}>Queue Empty</div>
              )}
            </div>
          </div>

          {/* Desktop Controls */}
          <div className="flex flex-col items-center gap-3">
            <div className="grid grid-cols-2 gap-2 mt-4 w-full max-w-sm text-white">
              {MyProjects.map((project, index) => {
                const inQueue = eventQueue.some(p => p.id === project.id);
                const inStack = callStack.some(p => p.id === project.id);
                return (
                  <button
                    key={project.id}
                    onClick={() => handleProjectClickDesktop(index)}
                    disabled={inQueue || inStack}
                    className={`rounded border text-xs font-mono transition-all duration-200 ${
                      inStack
                        ? `${isDark ? 'bg-red-900 border-red-600 text-red-200' : 'bg-red-100 border-red-400 text-red-700'} cursor-not-allowed`
                        : inQueue
                        ? `${isDark ? 'bg-green-900 border-green-600 text-green-200' : 'bg-green-100 border-green-400 text-green-700'} cursor-not-allowed`
                        : `${borderColor} hover:scale-105 cursor-pointer ${isDark ? 'hover:border-gray-600' : 'hover:border-gray-400'}`
                    }`}
                  >
                    {project.funcName}
                  </button>
                );
              })}
            </div>
          </div>

          <div className={`mt-4 text-xs font-mono ${accentColor} text-center`}>
            Click a project to View.
          </div>
        </div>
      </div>
    </div>
  );
}