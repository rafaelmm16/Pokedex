"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const typeColors = {
  normal: 'bg-normal',
  fire: 'bg-fire',
  water: 'bg-water',
  grass: 'bg-grass',
  electric: 'bg-electric',
  ice: 'bg-ice',
  fighting: 'bg-fighting',
  poison: 'bg-poison',
  ground: 'bg-ground',
  flying: 'bg-flying',
  psychic: 'bg-psychic',
  bug: 'bg-bug',
  rock: 'bg-rock',
  ghost: 'bg-ghost',
  dragon: 'bg-dragon',
  dark: 'bg-dark',
  steel: 'bg-steel',
  fairy: 'bg-fairy',
};

const PokemonDetail = () => {
  const params = useParams();
  const { id } = params;
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setPokemon(response.data);
    };

    if (id) {
      fetchPokemonDetail();
    }
  }, [id]);

  if (!pokemon) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const mainType = pokemon.types && pokemon.types.length > 0 ? pokemon.types[0].type.name : 'normal';
  const bgClass = typeColors[mainType] || 'bg-gray-800';
  const imageUrl = pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default;

  return (
    <div className="min-h-screen p-8 flex justify-center items-center">
      <div className={`w-full max-w-5xl ${bgClass} rounded-[3rem] shadow-2xl overflow-hidden relative text-white flex flex-col md:flex-row`}>
        {/* Background number watermark */}
        <div className="absolute top-8 right-12 opacity-20 text-9xl font-black italic z-0 pointer-events-none tracking-tighter">
          #{String(pokemon.id).padStart(3, '0')}
        </div>

        {/* Left Side - Image and Basic Info */}
        <div className="md:w-1/2 p-12 relative z-10 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/20">
          <h1 className="text-6xl font-extrabold capitalize drop-shadow-xl mb-4 text-center">
            {pokemon.name}
          </h1>
          
          <div className="flex gap-3 mb-8">
            {pokemon.types.map((typeInfo, index) => (
              <span 
                key={index} 
                className="bg-white/30 px-6 py-2 rounded-full text-lg font-bold uppercase tracking-widest backdrop-blur-md shadow-sm"
              >
                {typeInfo.type.name}
              </span>
            ))}
          </div>

          <div className="relative w-72 h-72 md:w-96 md:h-96 flex justify-center items-center animate-[float_6s_ease-in-out_infinite]">
            {imageUrl && (
              <img 
                src={imageUrl} 
                alt={pokemon.name} 
                className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] z-10" 
              />
            )}
            {/* Soft glow behind the pokemon */}
            <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl -z-10 transform scale-75"></div>
          </div>
        </div>

        {/* Right Side - Details and Stats */}
        <div className="md:w-1/2 bg-black/30 backdrop-blur-xl p-10 flex flex-col justify-center relative z-10">
          
          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="bg-white/10 rounded-2xl p-6 text-center shadow-inner">
              <p className="text-white/60 text-sm font-bold uppercase tracking-widest mb-2">Altura</p>
              <p className="font-semibold text-3xl">{pokemon.height / 10} <span className="text-xl">m</span></p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 text-center shadow-inner">
              <p className="text-white/60 text-sm font-bold uppercase tracking-widest mb-2">Peso</p>
              <p className="font-semibold text-3xl">{pokemon.weight / 10} <span className="text-xl">kg</span></p>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-white/80 text-lg font-bold uppercase tracking-widest mb-4 border-b border-white/20 pb-2">Habilidades</h3>
            <ul className="flex flex-wrap gap-4">
              {pokemon.abilities.map((ability, index) => (
                <li key={index} className="!m-0 !p-0 !bg-transparent !shadow-none !scale-100">
                  <span className="bg-white/15 px-5 py-3 rounded-xl font-semibold capitalize text-lg inline-block border border-white/10 shadow-sm">
                    {ability.ability.name.replace('-', ' ')}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
             <h3 className="text-white/80 text-lg font-bold uppercase tracking-widest mb-4 border-b border-white/20 pb-2">Estatísticas Base</h3>
             <div className="space-y-4">
                {pokemon.stats.map((stat, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-32 uppercase text-xs font-bold text-white/70 tracking-wider">
                      {stat.stat.name.replace('-', ' ')}
                    </span>
                    <div className="flex-1 bg-black/40 rounded-full h-3 ml-4 overflow-hidden relative">
                      <div 
                        className="h-full bg-white rounded-full relative overflow-hidden" 
                        style={{ width: `${Math.min(100, (stat.base_stat / 200) * 100)}%` }}
                      >
                         {/* Optional Shimmer effect on stat bar */}
                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                      </div>
                    </div>
                    <span className="w-10 text-right font-bold ml-4">{stat.base_stat}</span>
                  </div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;