/** Constraint label for a row or column header (from /api/new-game). */
export interface GridConstraint {
  kind: 'TYPE' | 'REGION' | 'ABILITY' | 'EVO';
  id: number;
  name: string;
}

export interface NewGameResponse {
  puzzle_id: number;
  rows: GridConstraint[];
  cols: GridConstraint[];
}

/** Pokémon placed in a cell (search + guess flow). */
export interface PokemonPick {
  pokemon_id: number;
  dex_number: number;
  name: string;
}

export interface PendingBoard {
  puzzle_id: number;
  guesses: (PokemonPick | null)[][];
}

export interface UserSession {
  id: number;
  username: string;
}
