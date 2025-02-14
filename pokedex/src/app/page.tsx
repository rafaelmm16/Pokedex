"use client";

import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PokemonList from '../components/PokemonList';

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-6"
      >
        <h1 className="text-6xl font-extrabold text-center text-primary my-8">
          Bem-vindo à Pokédex de Kanto!
        </h1>
        <PokemonList />
      </motion.main>
      <Footer />
    </div>
  );
}