import Link from 'next/link';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header
      className="bg-gradient-to-b from-[#e3350d] to-[#c72c0a] p-4 shadow-xl border-b-[6px] border-black/80"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-center items-center relative h-16">
        {/* Decorative lines like a pokedex */}
        <div className="absolute left-0 top-0 w-full h-full pointer-events-none flex justify-between px-8">
            <div className="flex items-center gap-4">
               <div className="w-16 h-16 bg-blue-400 rounded-full border-4 border-white shadow-[0_0_15px_rgba(96,165,250,0.8)] animate-pulse"></div>
               <div className="flex gap-2">
                 <div className="w-4 h-4 bg-red-500 rounded-full border border-black/30 shadow-inner"></div>
                 <div className="w-4 h-4 bg-yellow-400 rounded-full border border-black/30 shadow-inner"></div>
                 <div className="w-4 h-4 bg-green-500 rounded-full border border-black/30 shadow-inner"></div>
               </div>
            </div>
        </div>

        <div className="z-10">
          <Link 
            href="/" 
            className="flex items-center gap-4 group text-decoration-none"
          >
            {/* Pokeball Icon */}
            <motion.svg 
              className="w-12 h-12 text-white fill-current drop-shadow-md group-hover:text-yellow-300 transition-colors" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.4 }}
            >
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8h5.086c.441 1.701 1.983 3 3.914 3s3.473-1.299 3.914-3H20c0 4.411-3.589 8-8 8zm0-11c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm8-1H16.914c-.441-1.701-1.983-3-3.914-3S9.527 6.299 9.086 8H4c0-4.411 3.589-8 8-8s8 3.589 8 8z" />
            </motion.svg>
            <span className="text-5xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-yellow-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-widest uppercase group-hover:scale-105 transition-transform duration-300">
              Pokédex
            </span>
          </Link>
        </div>
        <nav className="flex gap-8">
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;