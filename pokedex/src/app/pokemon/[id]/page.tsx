import PokemonDetail from '../../../components/PokemonDetail';

export function generateStaticParams() {
  const ids = Array.from({ length: 151 }, (_, i) => String(i + 1));
  return ids.map((id) => ({
    id,
  }));
}

export default function PokemonPage() {
  return <PokemonDetail />;
}