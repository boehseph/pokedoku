DELETE FROM PUZZLE_CONSTRAINT;
DELETE FROM PUZZLE;
DELETE FROM CONSTRAINT_LIST;
DELETE FROM sqlite_sequence WHERE name IN ('CONSTRAINT_LIST','PUZZLE');

-- Types (Mapping to your TYPE table IDs)
INSERT INTO CONSTRAINT_LIST (kind, value_id, display_name) VALUES 
('TYPE', 1, 'Normal'), ('TYPE', 2, 'Fire'), ('TYPE', 3, 'Water'), 
('TYPE', 4, 'Grass'), ('TYPE', 5, 'Electric'), ('TYPE', 6, 'Ice'), 
('TYPE', 7, 'Fighting'), ('TYPE', 8, 'Poison'), ('TYPE', 9, 'Ground'), 
('TYPE', 10, 'Flying'), ('TYPE', 11, 'Psychic'), ('TYPE', 12, 'Bug'), 
('TYPE', 13, 'Rock'), ('TYPE', 14, 'Ghost'), ('TYPE', 15, 'Dragon'), 
('TYPE', 16, 'Steel'), ('TYPE', 17, 'Dark');

-- Regions (Mapping to your REGION table)
INSERT INTO CONSTRAINT_LIST (kind, value_id, display_name) VALUES 
('REGION', 1, 'Kanto'), ('REGION', 2, 'Johto'), ('REGION', 3, 'Hoenn');

-- Generations
INSERT INTO CONSTRAINT_LIST (kind, value_id, display_name) VALUES 
('GEN', 1, 'Gen 1'), ('GEN', 2, 'Gen 2'), ('GEN', 3, 'Gen 3');

-- Evolution Stages
INSERT INTO CONSTRAINT_LIST (kind, value_id, display_name) VALUES 
('EVO_STAGE', 1, 'Base Form'), ('EVO_STAGE', 2, 'Second Stage'), ('EVO_STAGE', 3, 'Final Evolution');

-- Create the puzzle entry
INSERT INTO PUZZLE (puzzle_id, is_daily) VALUES (1, 1);

-- Row Constraints (Position 1, 2, 3)
INSERT INTO PUZZLE_CONSTRAINT (puzzle_id, constraint_id, axis, position) VALUES 
(1, 2, 'row', 1), (1, 3, 'row', 2), (1, 4, 'row', 3);

-- Column Constraints (Position 1, 2, 3)
INSERT INTO PUZZLE_CONSTRAINT (puzzle_id, constraint_id, axis, position) VALUES 
(1, 18, 'column', 1), (1, 19, 'column', 2), (1, 20, 'column', 3);   