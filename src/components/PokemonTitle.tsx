export default function PokemonTitle({name}: { name: string }) {
  return (
      <h1 className="text-center font-semibold" style={{letterSpacing: '.5rem'}}>
        {name.toUpperCase()}
      </h1>
  );
}
