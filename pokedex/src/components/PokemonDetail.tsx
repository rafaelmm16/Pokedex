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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{capitalizeFirstLetter(pokemon.name)}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <h2>Abilities:</h2>
      <ul>
        {pokemon.abilities.map((ability, index) => (
          <li key={index}>{ability.ability.name}</li>
        ))}
      </ul>
      <h2>Types:</h2>
      <ul className="flex flex-wrap gap-2">
        {pokemon.types.map((typeInfo, index) => (
          <li key={index} className={`${typeColors[typeInfo.type.name]} text-black px-2 py-1 rounded`}>
            {capitalizeFirstLetter(typeInfo.type.name)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonDetail;