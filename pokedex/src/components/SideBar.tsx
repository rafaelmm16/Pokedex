"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const generations = [
  { name: 'Geração 1', limit: 151, offset: 0, region: 'Kanto' },
  { name: 'Geração 2', limit: 100, offset: 151, region: 'Johto' },
  { name: 'Geração 3', limit: 135, offset: 251, region: 'Hoenn' },
  { name: 'Geração 4', limit: 107, offset: 386, region: 'Sinnoh' },
  { name: 'Geração 5', limit: 156, offset: 493, region: 'Unova' },
  { name: 'Geração 6', limit: 72, offset: 649, region: 'Kalos' },
  { name: 'Geração 7', limit: 88, offset: 721, region: 'Alola' },
  { name: 'Geração 8', limit: 96, offset: 809, region: 'Galar' },
  { name: 'Geração 9', limit: 120, offset: 905, region: 'Paldea' },
];

function SideMenuContent() {
  const searchParams = useSearchParams();
  const limit = searchParams.get('limit') || '151';
  const offset = searchParams.get('offset') || '0';

  return (
    <ul className="flex flex-col gap-4">
      {generations.map((gen, index) => {
        const isActive = limit === String(gen.limit) && offset === String(gen.offset);
        return (
              <li key={index} className="!m-0 !p-0 !bg-transparent !shadow-none hover:!scale-100">
            <Link
              href={`/?limit=${gen.limit}&offset=${gen.offset}`}
              className={`flex flex-col py-3 px-5 rounded-xl border-2 transition-all duration-300 group ${
                isActive
                  ? 'bg-side-menu-item-active text-[#ffd700] scale-105'
                  : 'bg-black/20 border-transparent text-white/80 hover:bg-black/40 hover:border-black/50 hover:scale-105'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold tracking-wide group-hover:text-white transition-colors">
                  {gen.region}
                </span>
                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${isActive ? 'bg-[#ffd700] text-black' : 'bg-black/50 text-white/60 group-hover:bg-black/70'}`}>
                  {gen.limit} PKMN
                </span>
              </div>
              <span className={`text-sm mt-1 font-medium ${isActive ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`}>
                {gen.name}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

const SideMenu = () => {
  return (
    <aside className="w-72 h-screen sticky top-0 bg-side-menu border-r-8 border-black/80 flex flex-col shadow-2xl z-10">
      <div className="p-6 border-b-4 border-black/30 flex-shrink-0">
        <h2 className="text-4xl font-black italic text-side-menu-title tracking-widest uppercase text-center">
          Pokédex
        </h2>
        <p className="text-white/60 text-xs text-center mt-2 tracking-widest uppercase font-bold">Regiões</p>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
        <nav>
          <Suspense fallback={
            <ul className="flex flex-col gap-4">
              {/* Fallback silencioso mantendo apenas o layout base */}
            </ul>
          }>
            <SideMenuContent />
          </Suspense>
        </nav>
      </div>
    </aside>
  );
};

export default SideMenu;
