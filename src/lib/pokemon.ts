/**
 * Extract the Pokémon ID from the URL.
 *
 * @example
 * // returns 1
 * extractIdFromUrl('https://pokeapi.co/api/v2/pokemon/1/');
 *
 * @param url - The URL to extract the ID from.
 *
 * @returns The Pokémon ID.
 */
export function getIdFromPokeApiURl(url: string): number {
  const urlParts = url.split('/');
  const id = Number(urlParts.filter(Boolean).pop());
  if (isNaN(id))
    throw new Error(`Could not extract Pokémon ID from URL: ${url}`);

  return id;
}
