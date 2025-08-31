import { useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useGUITheme } from '../../providers/GUITheme';

const Navbar = () => {
  const { theme, toggleTheme } = useGUITheme();



  const isDark = theme === "dark";

  return (
    <nav
      className={`flex sm:justify-between justify-center items-center px-6 py-4 overflow-hidden border-b ${
        isDark
          ? "bg-[#0e0e0e] text-white border-gray-800"
          : "bg-white text-black border-gray-200"
      }`}
    >
      {/* Logo */}
      <div className="text-xl font-semibold tracking-wide hidden sm:block">
        Abhishek Gautam
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-6 items-center">
        <li>
          <a
            href="#contact"
            className={`cursor-pointer transition-colors duration-200 ${
              isDark ? "hover:text-[#5bece5]" : "hover:text-blue-600"
            }`}
          >
            Contact
          </a>
        </li>
        

        {/* Animated Border Button */}
        <li
          className={`relative group px-4 py-2 rounded-2xl font-medium overflow-hidden cursor-pointer ${
            isDark ? "bg-[#1a1a1a] text-white" : "bg-gray-100 text-black"
          }`}
        >
          <span className="relative z-10">
            <a href="#contact">Hire Me</a>
          </span>
          <div
            className="absolute inset-0 rounded-2xl p-[2px] z-0 animate-[borderMove_3s_linear_infinite] group-hover:animate-[borderMove_1s_linear_infinite]"
            style={{
              backgroundImage: isDark
                ? "linear-gradient(270deg, #5bece5, #0077ff, #5bece5)"
                : "linear-gradient(270deg, #0077ff, #5bece5, #0077ff)",
              backgroundSize: "400% 400%",
              borderRadius: "1rem",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "destination-out",
            }}
          />
        </li>

        {/* Theme Toggle */}
        <li className="ml-4 cursor-pointer" onClick={toggleTheme}>
          {isDark ? (
            <Sun size={22} className="text-yellow-400 hover:opacity-80 transition" />
          ) : (
            <Moon size={22} className="text-gray-700 hover:opacity-80 transition" />
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
