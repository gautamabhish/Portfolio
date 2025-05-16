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
    <div className="flex justify-between items-center text-white px-6 py-4 ">
      <div className="text-xl font-semibold tracking-wide hover:cursor-pointer">Abhishek Gautam</div>

      <ul className="flex space-x-6 text-white items-center hover:*:cursor:pointer">
      <li className="cursor-pointer hover:text-[#5bece5] transition-colors duration-200">
  <a href="#contact" >
    Contact
  </a>
</li>

        <li className="cursor-pointer hover:text-[#5bece5] transition-colors duration-200"><a href="#about">About</a></li>
        <li className="cursor-pointer hover:text-[#5bece5] transition-colors duration-200"> <Link to="/services">Services</Link></li>

        {/* Animated border button */}
        <li className="relative group py-3 px-4 rounded-2xl bg-[#1a1a1a] text-white font-medium overflow-hidden hover:cursor-pointer ">
          <span className="relative z-10"><a href="#contact">Hire Me</a></span>
          <div className="absolute inset-0 rounded-2xl p-[2px] z-0 animate-[borderMove_3s_linear_infinite] group-hover:animate-[borderMove_1s_linear_infinite]"
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
    </div>
  );
};

export default Navbar;
