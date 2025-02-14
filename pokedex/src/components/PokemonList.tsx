"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
      const pokemonDetails = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const pokemonDetail = await axios.get(pokemon.url);
          return pokemonDetail.data;
        })
      );
      setPokemonList(pokemonDetails);
    };

    fetchPokemon();
  }, []);

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {pokemonList.map((pokemon, index) => (
        <li key={index} className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 dark:from-dark-purple-500 dark:to-dark-purple-700 dark:text-dark-white">
          <div>
            <h2 className="text-xl font-bold">{pokemon.name}</h2>
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
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PokemonList;