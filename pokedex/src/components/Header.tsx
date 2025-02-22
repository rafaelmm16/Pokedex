import Link from 'next/link';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header
      className="bg-red-500 p-6 shadow-lg dark:bg-dark-red-500 shimmer"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-4xl font-bold text-black">
          <Link href="/">Pokédex</Link>
        </div>
        <nav className="flex gap-8">
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;