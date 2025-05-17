"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Type definition for a milestone item
interface Milestone {
  title: string;
  description: string;
  glow: string;
}


const float = {
  animation: "float 6s ease-in-out infinite",
};

const floatSlow = {
  animation: "floatSlow 12s ease-in-out infinite",
};

const floatFast = {
  animation: "floatFast 4s ease-in-out infinite",
};



// Milestones array with correct typing
const milestones: Milestone[] = [
  { title: "Python Foundations", description: "Started with print('Hello World')", glow: "#5bece5" },
  { title: "C++ Foundations", description: "Problem-solving, logic & algorithms.", glow: "#5bece5" },
  { title: "Frontend Galaxy", description: "HTML, CSS, JavaScript & React.", glow: "#7f5af0" },
  { title: "Backend Core", description: "Node.js, Express & MongoDB APIs.", glow: "#ff6b6b" },
  { title: "DevOps & Infra", description: "Docker, CI/CD, Netlify & Vercel.", glow: "#ffd93d" },
  { title: "Immersive UI + AI", description: "Three.js, Whisper, TTS interfaces.", glow: "#00d9ff" },
];

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".milestone");

    cards.forEach((card, i) => {
      const direction = i % 2 === 0 ? -100 : 100;

      gsap.fromTo(
        card,
        { opacity: 0, x: direction },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 10%",
            toggleActions: "play reverse play reverse",
            markers: false,
          },
        }
      );
    });
  }, []);

  return (
    <section className="py-24 px-6 text-white" ref={containerRef}>
      <h2 className="text-4xl font-bold text-center mb-16 text-[#5bece5]" style={{ fontFamily: "Inter" }}>
        About Me
      </h2>

      <div className="max-w-4xl mx-auto relative">
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#5bece5] to-[#00d9ff] -translate-x-1/2" />

        {/* Center Card */}
        <div className="mb-16 mx-auto w-full sm:w-2/3 lg:w-1/2 bg-[#3a0644] border border-[#5bece5] rounded-xl p-6 shadow-md text-center relative z-10">
          <h3 className="text-2xl font-bold mb-2">Hi, I am Abhishek Gautam</h3>
          <p className="text-gray-300">
            Passionate developer and aspiring computer science engineer crafting immersive experiences and scalable solutions.
          </p>
        </div>
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
          className="absolute rounded-full blur-lg opacity-70 bg-emerald-400"
          style={{ ...floatFast, bottom: "40px", left: "45%", width: "72px", height: "72px", zIndex: 2 }}
        />

        {/* Milestones */}
        <div className="space-y-16 relative z-10">
          {milestones.map((m, i) => {
            const direction = i % 2 === 0 ? "flex-row" : "flex-row-reverse";

            return (
              <div key={i} className={`milestone flex items-center gap-6 ${direction}`}>
                {/* Card */}
                <div className="w-1/2">
                  <div
                    className="bg-[#1e0224c2] p-4 rounded-xl shadow-md"
                    style={{ boxShadow: `0 0 10px ${m.glow}` }}
                  >
                    <h4 className="text-lg font-semibold">{m.title}</h4>
                    <p className="text-sm mt-2 text-gray-300">{m.description}</p>
                  </div>
                </div>

                {/* Connector Dot */}
                <div className="relative w-8 h-8">
                  <div
                    className="absolute inset-0 m-auto w-4 h-4 rounded-full"
                    style={{
                      background: m.glow,
                      boxShadow: `0 0 10px ${m.glow}`,
                    }}
                  />
                </div>

                <div className="w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
