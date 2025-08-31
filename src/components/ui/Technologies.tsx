import React from 'react';
import { useGUITheme } from '../../providers/GUITheme';

const techImages = [
  '/images/typescript.png',
  '/images/javascript.png',
  '/images/python.png',
  '/images/sql.png',
  '/images/react.png',
  '/images/nextjs.png',
  '/images/tailwind.png',
  '/images/redux.png',
  '/images/express.png',
  '/images/docker.png',
  '/images/kubernetes.png',
  '/images/helm.png',
  '/images/ansible.png',
  '/images/terraform.png',
  '/images/git.png',
  '/images/aws.png',
  '/images/argocd.png',
];

const Technologies = () => {
  const { theme } = useGUITheme();
  const isDark = theme === 'dark';

  const containerBg = isDark ? 'bg-black' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-black';

  return (
    <div
      className={`p-6 rounded-xl shadow-md ${containerBg} transition-colors duration-300 overflow-hidden`}
    >
      {/* <h2 className={`text-2xl font-bold mb-6 ${textColor}`}>
        Technologies I have worked with
      </h2> */}

      <div className="space-y-6">
        {/* Row 1 */}
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-8 animate-marquee">
            {techImages.concat(techImages).map((src, idx) => (
              <img
                key={`row1-${idx}`}
                src={src}
                alt="tech logo"
                className="h-16 w-auto object-contain flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Row 2 (reverse) */}
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-8 animate-marquee-reverse">
            {techImages.concat(techImages).map((src, idx) => (
              <img
                key={`row2-${idx}`}
                src={src}
                alt="tech logo"
                className="h-16 w-auto object-contain flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 20s linear infinite;
        }
        .animate-marquee-reverse {
          display: flex;
          width: max-content;
          animation: marquee-reverse 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Technologies;
