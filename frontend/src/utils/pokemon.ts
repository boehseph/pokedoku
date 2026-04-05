const SPRITE_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald';

export function getPokemonSpriteUrl(dexNumber: number): string {
  return `${SPRITE_BASE}/${dexNumber}.png`;
}
