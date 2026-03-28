PRAGMA foreign_keys = OFF;

DELETE FROM ATTEMPT_CELL;
DELETE FROM ATTEMPT;
DELETE FROM USER;
DELETE FROM sqlite_sequence WHERE name = 'USER';

PRAGMA foreign_keys = ON;

INSERT INTO USER (username, password) VALUES 
('boeh', '123'),
('ldnel', '123');