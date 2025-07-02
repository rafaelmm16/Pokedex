"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const generations = [
  { name: 'Geração 1', limit: 151, offset: 0 },
  { name: 'Geração 2', limit: 100, offset: 151 },
  { name: 'Geração 3', limit: 135, offset: 251 },
  { name: 'Geração 4', limit: 107, offset: 386 },
  { name: 'Geração 5', limit: 156, offset: 493 },
  { name: 'Geração 6', limit: 72, offset: 649 },
  { name: 'Geração 7', limit: 88, offset: 721 },
  { name: 'Geração 8', limit: 96, offset: 809 },
];

const SideMenu = () => {
  const searchParams = useSearchParams();
  const limit = searchParams.get('limit') || '151';
  const offset = searchParams.get('offset') || '0';

  return (
    <aside className="w-64 bg-pokedex-red text-white p-4 shadow-lg">
      <h2 className="text-3xl font-bold mb-5 text-center">Gerações</h2>
      <nav>
        <ul>
          {generations.map((gen, index) => {
            const isActive = limit === String(gen.limit) && offset === String(gen.offset);
            return (
              <li key={index} className="mb-2">
                <Link
                  href={`/?limit=${gen.limit}&offset=${gen.offset}`}
                  className={`block p-3 rounded-lg text-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-pokedex-red-dark shadow-inner'
                      : 'hover:bg-pokedex-red-light hover:scale-105'
                  }`}
                >
                  {gen.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default SideMenu;