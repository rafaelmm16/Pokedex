import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-800 text-gray-300 text-center p-4 mt-6 dark:bg-dark-gray-800 dark:text-dark-gray-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <p>© 2023 Pokédex. Todos os direitos reservados.</p>
      <nav className="flex justify-center gap-4 mt-2">
      </nav>
    </motion.footer>
  );
};

export default Footer;