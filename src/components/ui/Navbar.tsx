import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const borderKeyframes = `
    @keyframes borderMove {
      0% {
        background-position: 0% 50%;
      }
      100% {
        background-position: 100% 50%;
      }
    }
  `;

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = borderKeyframes;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <nav className="flex sm:justify-between justify-center  items-center text-white px-6 py-4 overflow-hidden">
      {/* Logo */}
      <div className="text-xl font-semibold tracking-wide hidden sm:block">
        Abhishek Gautam
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-6 items-center">
        <li>
          <a
            href="#contact"
            className="cursor-pointer hover:text-[#5bece5] transition-colors duration-200"
          >
            Contact
          </a>
        </li>
        <li>
          <a
            href="#about"
            className="cursor-pointer hover:text-[#5bece5] transition-colors duration-200"
          >
            About
          </a>
        </li>
        <li>
          <Link
            to="/services"
            className="cursor-pointer hover:text-[#5bece5] transition-colors duration-200"
          >
            Services
          </Link>
        </li>

        {/* Animated Border Button */}
        <li className="relative group px-4 py-2 rounded-2xl bg-[#1a1a1a] text-white font-medium overflow-hidden cursor-pointer">
          <span className="relative z-10">
            <a href="#contact">Hire Me</a>
          </span>
          <div
            className="absolute inset-0 rounded-2xl p-[2px] z-0 animate-[borderMove_3s_linear_infinite] group-hover:animate-[borderMove_1s_linear_infinite]"
            style={{
              backgroundImage: 'linear-gradient(270deg, #5bece5, #0077ff, #5bece5)',
              backgroundSize: '400% 400%',
              borderRadius: '1rem',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
              WebkitMaskComposite: 'destination-out',
            }}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
