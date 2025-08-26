"use client";

import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PokemonList from '../components/PokemonList';

// A lista de gerações foi movida para este arquivo para evitar o erro de importação.
const generations = [
  { name: 'Geração 1', limit: 151, offset: 0, region: 'Kanto' },
  { name: 'Geração 2', limit: 100, offset: 151, region: 'Johto' },
  { name: 'Geração 3', limit: 135, offset: 251, region: 'Hoenn' },
  { name: 'Geração 4', limit: 107, offset: 386, region: 'Sinnoh' },
  { name: 'Geração 5', limit: 156, offset: 493, region: 'Unova' },
  { name: 'Geração 6', limit: 72, offset: 649, region: 'Kalos' },
  { name: 'Geração 7', limit: 88, offset: 721, region: 'Alola' },
  { name: 'Geração 8', limit: 96, offset: 809, region: 'Galar' },
];

export default function Home() {
  const searchParams = useSearchParams();
  const offset = searchParams.get('offset') || '0';
  const currentGeneration = generations.find(gen => String(gen.offset) === offset);
  const title = `Bem-vindo à Pokédex de ${currentGeneration ? currentGeneration.region : 'Kanto'}!`;

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-6"
      >
        <h1 className="text-6xl font-extrabold text-center text-primary my-8">{title}</h1>
        <PokemonList />
      </motion.main>
      <Footer />
    </div>
  );
}