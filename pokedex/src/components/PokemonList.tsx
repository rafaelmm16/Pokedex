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
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {pokemonList.map((pokemon, index) => (
        <li key={index} className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 dark:from-dark-purple-500 dark:to-dark-purple-700 dark:text-dark-white">
          <a href={`/pokemon/${pokemon.id}`}>
            <div>
              <h2 className="text-xl font-bold">{capitalizeFirstLetter(pokemon.name)}</h2>
              {pokemon.sprites?.front_default && (
                <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-20 h-20 mx-auto" />
              )}
              <p>Height: {pokemon.height}</p>
              <p>Weight: {pokemon.weight}</p>
              <h3 className="font-semibold mt-2">Abilities:</h3>
              <ul>
                {pokemon.abilities.map((ability, index) => (
                  <li key={index}>{ability.ability.name}</li>
                ))}
              </ul>
              <h3 className="font-semibold mt-2">Types:</h3>
              <ul className="flex flex-wrap gap-2">
                {pokemon.types.map((typeInfo, index) => (
                  <li key={index} className={`${typeColors[typeInfo.type.name]} text-black px-2 py-1 rounded`}>
                    {capitalizeFirstLetter(typeInfo.type.name)}
                  </li>
                ))}
              </ul>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default PokemonList;