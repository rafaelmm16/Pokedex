"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

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

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchPokemon = async () => {
      const limit = searchParams.get('limit') || '151';
      const offset = searchParams.get('offset') || '0';

      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const pokemonDetails = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const pokemonDetail = await axios.get(pokemon.url);
          return pokemonDetail.data;
        })
      );
      setPokemonList(pokemonDetails);
    };

    fetchPokemon();
  }, [searchParams]);

  return (
    <div className="p-8">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {pokemonList.map((pokemon, index) => {
          const mainType = pokemon.types && pokemon.types.length > 0 ? pokemon.types[0].type.name : 'normal';
          const bgClass = typeColors[mainType] || 'bg-gray-800';
          const imageUrl = pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default;
          
          return (
            <li 
              key={index} 
              className={`${bgClass} group !m-0 !p-0 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden relative`}
            >
              <a href={`/pokemon/${pokemon.id}`} className="block h-full w-full p-6 text-white text-decoration-none">
                <div className="absolute top-4 right-6 opacity-30 text-5xl font-black italic z-0 pointer-events-none">
                  #{String(pokemon.id).padStart(3, '0')}
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <h2 className="text-3xl font-extrabold mb-4 capitalize drop-shadow-md">
                    {pokemon.name}
                  </h2>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {pokemon.types.map((typeInfo, idx) => (
                      <span 
                        key={idx} 
                        className="bg-white/25 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider backdrop-blur-sm shadow-sm"
                      >
                        {typeInfo.type.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex-1 flex justify-center items-center my-4">
                    {imageUrl && (
                      <img 
                        src={imageUrl} 
                        alt={pokemon.name} 
                        className="w-48 h-48 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-300" 
                      />
                    )}
                  </div>
                  
                  <div className="bg-black/20 rounded-2xl p-4 mt-auto backdrop-blur-md">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Altura</p>
                        <p className="font-semibold text-lg">{pokemon.height / 10} m</p>
                      </div>
                      <div>
                        <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Peso</p>
                        <p className="font-semibold text-lg">{pokemon.weight / 10} kg</p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PokemonList;