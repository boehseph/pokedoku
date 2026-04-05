const { dbGet } = require('./database');

/** Subquery: pokemon IDs matching a single constraint (used for grid generation / solutions). */
function getSubQuery(constraint) {
  switch (constraint.kind) {
    case 'TYPE':
      return `SELECT pokemon_id FROM POKEMON_TYPE WHERE type_id = ${constraint.id}`;
    case 'REGION':
      return `SELECT pokemon_id FROM POKEMON WHERE region_id = ${constraint.id}`;
    case 'ABILITY':
      return `SELECT pokemon_id FROM POKEMON_ABILITY WHERE ability_id = ${constraint.id}`;
    case 'EVO':
      return `SELECT pokemon_id FROM POKEMON WHERE evo_stage_id = ${constraint.id}`;
    default:
      return `SELECT pokemon_id FROM POKEMON`;
  }
}

/** SQL to test if a specific Pokémon satisfies one constraint (two placeholders: pokemon_id, constraint id). */
function constraintMembershipSql(kind) {
  switch (kind) {
    case 'TYPE':
      return 'SELECT 1 FROM POKEMON_TYPE WHERE pokemon_id = ? AND type_id = ?';
    case 'REGION':
      return 'SELECT 1 FROM POKEMON WHERE pokemon_id = ? AND region_id = ?';
    case 'ABILITY':
      return 'SELECT 1 FROM POKEMON_ABILITY WHERE pokemon_id = ? AND ability_id = ?';
    case 'EVO':
      return 'SELECT 1 FROM POKEMON WHERE pokemon_id = ? AND evo_stage_id = ?';
    default:
      return null;
  }
}

async function checkPokemonMatchesConstraint(pokemonId, constraint) {
  const sql = constraintMembershipSql(constraint.kind);
  if (!sql) return false;
  const row = await dbGet(sql, [pokemonId, constraint.id]);
  return !!row;
}

async function getValidPokemonName(c1, c2) {
  const sql = `
    SELECT p.name
    FROM POKEMON p
    INNER JOIN (${getSubQuery(c1)}) a ON p.pokemon_id = a.pokemon_id
    INNER JOIN (${getSubQuery(c2)}) b ON p.pokemon_id = b.pokemon_id
    LIMIT 1
  `;

  try {
    const row = await dbGet(sql, []);
    return row ? row.name : null;
  } catch (err) {
    console.error('Query Error:', err);
    return null;
  }
}

module.exports = {
  getSubQuery,
  checkPokemonMatchesConstraint,
  getValidPokemonName,
};
