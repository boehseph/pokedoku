-- Disable foreign key constraints during table creation
PRAGMA foreign_keys = OFF;

-- =============================================================================
-- 1. REFERENCE TABLES (Single-valued attributes)
-- =============================================================================

CREATE TABLE IF NOT EXISTS REGION (
    region_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS GENERATION (
    gen_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL -- e.g., "Gen 1", "Gen 2"
);

CREATE TABLE IF NOT EXISTS EVO_STAGE (
    evo_stage_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL -- "Stage 1", "Stage 2", "Final"
);

-- =============================================================================
-- 2. ATTRIBUTE DEFINITION TABLES
-- =============================================================================

CREATE TABLE IF NOT EXISTS TYPE (
    type_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS MOVE (
    move_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    type_id INTEGER, -- Moves have a specific type (e.g. Fire Blast is Fire)
    FOREIGN KEY (type_id) REFERENCES TYPE(type_id)
);

CREATE TABLE IF NOT EXISTS ABILITY (
    ability_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    description TEXT -- Added description for better UI/UX
);

-- =============================================================================
-- 3. CORE POKÉMON TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS POKEMON (
    pokemon_id INTEGER PRIMARY KEY AUTOINCREMENT,
    dex_number INTEGER UNIQUE NOT NULL, -- National Dex Number
    name TEXT UNIQUE NOT NULL,
    region_id INTEGER NOT NULL,
    gen_id INTEGER NOT NULL,
    evo_stage_id INTEGER NOT NULL,
    FOREIGN KEY (region_id) REFERENCES REGION(region_id),
    FOREIGN KEY (gen_id) REFERENCES GENERATION(gen_id),
    FOREIGN KEY (evo_stage_id) REFERENCES EVO_STAGE(evo_stage_id)
);

-- =============================================================================
-- 4. MANY-TO-MANY JUNCTION TABLES
-- =============================================================================

CREATE TABLE IF NOT EXISTS POKEMON_TYPE (
    pokemon_id INTEGER,
    type_id INTEGER,
    PRIMARY KEY (pokemon_id, type_id),
    FOREIGN KEY (pokemon_id) REFERENCES POKEMON(pokemon_id),
    FOREIGN KEY (type_id) REFERENCES TYPE(type_id)
);

CREATE TABLE IF NOT EXISTS POKEMON_MOVE (
    pokemon_id INTEGER,
    move_id INTEGER,
    PRIMARY KEY (pokemon_id, move_id),
    FOREIGN KEY (pokemon_id) REFERENCES POKEMON(pokemon_id),
    FOREIGN KEY (move_id) REFERENCES MOVE(move_id)
);

CREATE TABLE IF NOT EXISTS POKEMON_ABILITY (
    pokemon_id INTEGER,
    ability_id INTEGER,
    PRIMARY KEY (pokemon_id, ability_id),
    FOREIGN KEY (pokemon_id) REFERENCES POKEMON(pokemon_id),
    FOREIGN KEY (ability_id) REFERENCES ABILITY(ability_id)
);

-- =============================================================================
-- 5. USER MANAGEMENT
-- =============================================================================

CREATE TABLE IF NOT EXISTS USER (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

-- =============================================================================
-- 6. PUZZLE AND CONSTRAINT SYSTEM
-- =============================================================================

-- This table defines all possible categories a grid cell could have
CREATE TABLE IF NOT EXISTS CONSTRAINT_LIST (
    constraint_id INTEGER PRIMARY KEY AUTOINCREMENT,
    kind TEXT NOT NULL, -- e.g., 'TYPE', 'REGION', 'GEN', 'EVO_STAGE'
    value_id INTEGER NOT NULL, -- The ID from the corresponding table
    display_name TEXT NOT NULL -- e.g., 'Fire', 'Kanto', 'Stage 1'
);

CREATE TABLE IF NOT EXISTS PUZZLE (
    puzzle_id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_daily BOOLEAN DEFAULT 0
);

CREATE TABLE IF NOT EXISTS PUZZLE_CONSTRAINT (
    puzzle_id INTEGER,
    constraint_id INTEGER,
    axis TEXT CHECK(axis IN ('row', 'column')),
    position INTEGER CHECK(position IN (1, 2, 3)),
    PRIMARY KEY (puzzle_id, axis, position),
    FOREIGN KEY (puzzle_id) REFERENCES PUZZLE(puzzle_id),
    FOREIGN KEY (constraint_id) REFERENCES CONSTRAINT_LIST(constraint_id)
);

-- =============================================================================
-- 7. ATTEMPTS AND GAMEPLAY TRACKING
-- =============================================================================

CREATE TABLE IF NOT EXISTS ATTEMPT (
    attempt_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    puzzle_id INTEGER NOT NULL,
    guesses_remaining INTEGER DEFAULT 9,
    did_complete BOOLEAN DEFAULT 0,
    score INTEGER DEFAULT 0, -- Track how many out of 9 they got
    FOREIGN KEY (user_id) REFERENCES USER(user_id),
    FOREIGN KEY (puzzle_id) REFERENCES PUZZLE(puzzle_id)
);

-- Tracks the specific Pokemon guessed in each of the 9 cells
CREATE TABLE IF NOT EXISTS ATTEMPT_CELL (
    attempt_id INTEGER,
    row_pos INTEGER CHECK(row_pos IN (1, 2, 3)),
    col_pos INTEGER CHECK(col_pos IN (1, 2, 3)),
    pokemon_id INTEGER, 
    is_correct BOOLEAN DEFAULT 0,
    PRIMARY KEY (attempt_id, row_pos, col_pos),
    FOREIGN KEY (attempt_id) REFERENCES ATTEMPT(attempt_id),
    FOREIGN KEY (pokemon_id) REFERENCES POKEMON(pokemon_id)
);

-- Re-enable foreign key constraints
PRAGMA foreign_keys = ON;