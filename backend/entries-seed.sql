PRAGMA foreign_keys = OFF;

DELETE FROM POKEMON_MOVE;
DELETE FROM POKEMON_ABILITY;
DELETE FROM POKEMON_TYPE;
DELETE FROM POKEMON;
DELETE FROM TYPE;
DELETE FROM EVO_STAGE;
DELETE FROM GENERATION;
DELETE FROM REGION;
DELETE FROM sqlite_sequence WHERE name IN ('POKEMON','TYPE','EVO_STAGE','GENERATION','REGION');

PRAGMA foreign_keys = ON;

-- 1. Regions
INSERT INTO REGION (name) VALUES ('Kanto'), ('Johto'), ('Hoenn');

-- 2. Generations
INSERT INTO GENERATION (name) VALUES ('Gen 1'), ('Gen 2'), ('Gen 3');

-- 3. Evolution Stages
INSERT INTO EVO_STAGE (name) VALUES ('Stage 1'), ('Stage 2'), ('Final');

-- 4. Types
INSERT INTO TYPE (name) VALUES 
('Normal'), ('Fire'), ('Water'), ('Grass'), ('Electric'), ('Ice'), 
('Fighting'), ('Poison'), ('Ground'), ('Flying'), ('Psychic'), ('Bug'), 
('Rock'), ('Ghost'), ('Dragon'), ('Steel'), ('Dark');

-- =============================================================================
-- 2. POKEMON ENTRIES
-- Format: (dex_number, name, region_id, gen_id, evo_stage_id)
-- =============================================================================

-- GENERATION 1 (Kanto)
INSERT INTO POKEMON (dex_number, name, region_id, gen_id, evo_stage_id) VALUES
(1, 'Bulbasaur', 1, 1, 1), (2, 'Ivysaur', 1, 1, 2), (3, 'Venusaur', 1, 1, 3),
(4, 'Charmander', 1, 1, 1), (5, 'Charmeleon', 1, 1, 2), (6, 'Charizard', 1, 1, 3),
(7, 'Squirtle', 1, 1, 1), (8, 'Wartortle', 1, 1, 2), (9, 'Blastoise', 1, 1, 3),
(10, 'Caterpie', 1, 1, 1), (11, 'Metapod', 1, 1, 2), (12, 'Butterfree', 1, 1, 3),
(13, 'Weedle', 1, 1, 1), (14, 'Kakuna', 1, 1, 2), (15, 'Beedrill', 1, 1, 3),
(16, 'Pidgey', 1, 1, 1), (17, 'Pidgeotto', 1, 1, 2), (18, 'Pidgeot', 1, 1, 3),
(19, 'Rattata', 1, 1, 1), (20, 'Raticate', 1, 1, 3), (21, 'Spearow', 1, 1, 1),
(22, 'Fearow', 1, 1, 3), (23, 'Ekans', 1, 1, 1), (24, 'Arbok', 1, 1, 3),
(25, 'Pikachu', 1, 1, 2), (26, 'Raichu', 1, 1, 3), (27, 'Sandshrew', 1, 1, 1),
(28, 'Sandslash', 1, 1, 3), (29, 'Nidoran♀', 1, 1, 1), (30, 'Nidorina', 1, 1, 2),
(31, 'Nidoqueen', 1, 1, 3), (32, 'Nidoran♂', 1, 1, 1), (33, 'Nidorino', 1, 1, 2),
(34, 'Nidoking', 1, 1, 3), (35, 'Clefairy', 1, 1, 2), (36, 'Clefable', 1, 1, 3),
(37, 'Vulpix', 1, 1, 1), (38, 'Ninetales', 1, 1, 3), (39, 'Jigglypuff', 1, 1, 2),
(40, 'Wigglytuff', 1, 1, 3), (41, 'Zubat', 1, 1, 1), (42, 'Golbat', 1, 1, 2),
(43, 'Oddish', 1, 1, 1), (44, 'Gloom', 1, 1, 2), (45, 'Vileplume', 1, 1, 3),
(46, 'Paras', 1, 1, 1), (47, 'Parasect', 1, 1, 3), (48, 'Venonat', 1, 1, 1),
(49, 'Venomoth', 1, 1, 3), (50, 'Diglett', 1, 1, 1), (51, 'Dugtrio', 1, 1, 3),
(52, 'Meowth', 1, 1, 1), (53, 'Persian', 1, 1, 3), (54, 'Psyduck', 1, 1, 1),
(55, 'Golduck', 1, 1, 3), (56, 'Mankey', 1, 1, 1), (57, 'Primeape', 1, 1, 3),
(58, 'Growlithe', 1, 1, 1), (59, 'Arcanine', 1, 1, 3), (60, 'Poliwag', 1, 1, 1),
(61, 'Poliwhirl', 1, 1, 2), (62, 'Poliwrath', 1, 1, 3), (63, 'Abra', 1, 1, 1),
(64, 'Kadabra', 1, 1, 2), (65, 'Alakazam', 1, 1, 3), (66, 'Machop', 1, 1, 1),
(67, 'Machoke', 1, 1, 2), (68, 'Machamp', 1, 1, 3), (69, 'Bellsprout', 1, 1, 1),
(70, 'Weepinbell', 1, 1, 2), (71, 'Victreebel', 1, 1, 3), (72, 'Tentacool', 1, 1, 1),
(73, 'Tentacruel', 1, 1, 3), (74, 'Geodude', 1, 1, 1), (75, 'Graveler', 1, 1, 2),
(76, 'Golem', 1, 1, 3), (77, 'Ponyta', 1, 1, 1), (78, 'Rapidash', 1, 1, 3),
(79, 'Slowpoke', 1, 1, 1), (80, 'Slowbro', 1, 1, 3), (81, 'Magnemite', 1, 1, 1),
(82, 'Magneton', 1, 1, 3), (83, 'Farfetchd', 1, 1, 3), (84, 'Doduo', 1, 1, 1),
(85, 'Dodrio', 1, 1, 3), (86, 'Seel', 1, 1, 1), (87, 'Dewgong', 1, 1, 3),
(88, 'Grimer', 1, 1, 1), (89, 'Muk', 1, 1, 3), (90, 'Shellder', 1, 1, 1),
(91, 'Cloyster', 1, 1, 3), (92, 'Gastly', 1, 1, 1), (93, 'Haunter', 1, 1, 2),
(94, 'Gengar', 1, 1, 3), (95, 'Onix', 1, 1, 1), (96, 'Drowzee', 1, 1, 1),
(97, 'Hypno', 1, 1, 3), (98, 'Krabby', 1, 1, 1), (99, 'Kingler', 1, 1, 3),
(100, 'Voltorb', 1, 1, 1), (101, 'Electrode', 1, 1, 3), (102, 'Exeggcute', 1, 1, 1),
(103, 'Exeggutor', 1, 1, 3), (104, 'Cubone', 1, 1, 1), (105, 'Marowak', 1, 1, 3),
(106, 'Hitmonlee', 1, 1, 3), (107, 'Hitmonchan', 1, 1, 3), (108, 'Lickitung', 1, 1, 1),
(109, 'Koffing', 1, 1, 1), (110, 'Weezing', 1, 1, 3), (111, 'Rhyhorn', 1, 1, 1),
(112, 'Rhydon', 1, 1, 3), (113, 'Chansey', 1, 1, 2), (114, 'Tangela', 1, 1, 1),
(115, 'Kangaskhan', 1, 1, 3), (116, 'Horsea', 1, 1, 1), (117, 'Seadra', 1, 1, 2),
(118, 'Goldeen', 1, 1, 1), (119, 'Seaking', 1, 1, 3), (120, 'Staryu', 1, 1, 1),
(121, 'Starmie', 1, 1, 3), (122, 'Mr. Mime', 1, 1, 3), (123, 'Scyther', 1, 1, 1),
(124, 'Jynx', 1, 1, 3), (125, 'Electabuzz', 1, 1, 2), (126, 'Magmar', 1, 1, 2),
(127, 'Pinsir', 1, 1, 3), (128, 'Tauros', 1, 1, 3), (129, 'Magikarp', 1, 1, 1),
(130, 'Gyarados', 1, 1, 3), (131, 'Lapras', 1, 1, 3), (132, 'Ditto', 1, 1, 3),
(133, 'Eevee', 1, 1, 1), (134, 'Vaporeon', 1, 1, 3), (135, 'Jolteon', 1, 1, 3),
(136, 'Flareon', 1, 1, 3), (137, 'Porygon', 1, 1, 1), (138, 'Omanyte', 1, 1, 1),
(139, 'Omastar', 1, 1, 3), (140, 'Kabuto', 1, 1, 1), (141, 'Kabutops', 1, 1, 3),
(142, 'Aerodactyl', 1, 1, 3), (143, 'Snorlax', 1, 1, 3), (144, 'Articuno', 1, 1, 3),
(145, 'Zapdos', 1, 1, 3), (146, 'Moltres', 1, 1, 3), (147, 'Dratini', 1, 1, 1),
(148, 'Dragonair', 1, 1, 2), (149, 'Dragonite', 1, 1, 3), (150, 'Mewtwo', 1, 1, 3),
(151, 'Mew', 1, 1, 3);

-- GENERATION 2 (Johto)
INSERT INTO POKEMON (dex_number, name, region_id, gen_id, evo_stage_id) VALUES
(152, 'Chikorita', 2, 2, 1), (153, 'Bayleef', 2, 2, 2), (154, 'Meganium', 2, 2, 3),
(155, 'Cyndaquil', 2, 2, 1), (156, 'Quilava', 2, 2, 2), (157, 'Typhlosion', 2, 2, 3),
(158, 'Totodile', 2, 2, 1), (159, 'Croconaw', 2, 2, 2), (160, 'Feraligatr', 2, 2, 3),
(161, 'Sentret', 2, 2, 1), (162, 'Furret', 2, 2, 3), (163, 'Hoothoot', 2, 2, 1),
(164, 'Noctowl', 2, 2, 3), (165, 'Ledyba', 2, 2, 1), (166, 'Ledian', 2, 2, 3),
(167, 'Spinarak', 2, 2, 1), (168, 'Ariados', 2, 2, 3), (169, 'Crobat', 2, 2, 3),
(170, 'Chinchou', 2, 2, 1), (171, 'Lanturn', 2, 2, 3), (172, 'Pichu', 2, 2, 1),
(173, 'Cleffa', 2, 2, 1), (174, 'Igglybuff', 2, 2, 1), (175, 'Togepi', 2, 2, 1),
(176, 'Togetic', 2, 2, 3), (177, 'Natu', 2, 2, 1), (178, 'Xatu', 2, 2, 3),
(179, 'Mareep', 2, 2, 1), (180, 'Flaaffy', 2, 2, 2), (181, 'Ampharos', 2, 2, 3),
(182, 'Bellossom', 2, 2, 3), (183, 'Marill', 2, 2, 2), (184, 'Azumarill', 2, 2, 3),
(185, 'Sudowoodo', 2, 2, 3), (186, 'Politoed', 2, 2, 3), (187, 'Hoppip', 2, 2, 1),
(188, 'Skiploom', 2, 2, 2), (189, 'Jumpluff', 2, 2, 3), (190, 'Aipom', 2, 2, 1),
(191, 'Sunkern', 2, 2, 1), (192, 'Sunflora', 2, 2, 3), (193, 'Yanma', 2, 2, 1),
(194, 'Wooper', 2, 2, 1), (195, 'Quagsire', 2, 2, 3), (196, 'Espeon', 2, 2, 3),
(197, 'Umbreon', 2, 2, 3), (198, 'Murkrow', 2, 2, 1), (199, 'Slowking', 2, 2, 3),
(200, 'Misdreavus', 2, 2, 1), (201, 'Unown', 2, 2, 3), (202, 'Wobbuffet', 2, 2, 3),
(203, 'Girafarig', 2, 2, 3), (204, 'Pineco', 2, 2, 1), (205, 'Forretress', 2, 2, 3),
(206, 'Dunsparce', 2, 2, 3), (207, 'Gligar', 2, 2, 1), (208, 'Steelix', 2, 2, 3),
(209, 'Snubbull', 2, 2, 1), (210, 'Granbull', 2, 2, 3), (211, 'Qwilfish', 2, 2, 3),
(212, 'Scizor', 2, 2, 3), (213, 'Shuckle', 2, 2, 3), (214, 'Heracross', 2, 2, 3),
(215, 'Sneasel', 2, 2, 1), (216, 'Teddiursa', 2, 2, 1), (217, 'Ursaring', 2, 2, 3),
(218, 'Slugma', 2, 2, 1), (219, 'Magcargo', 2, 2, 3), (220, 'Swinub', 2, 2, 1),
(221, 'Piloswine', 2, 2, 3), (222, 'Corsola', 2, 2, 3), (223, 'Remoraid', 2, 2, 1),
(224, 'Octillery', 2, 2, 3), (225, 'Delibird', 2, 2, 3), (226, 'Mantine', 2, 2, 3),
(227, 'Skarmory', 2, 2, 3), (228, 'Houndour', 2, 2, 1), (229, 'Houndoom', 2, 2, 3),
(230, 'Kingdra', 2, 2, 3), (231, 'Phanpy', 2, 2, 1), (232, 'Donphan', 2, 2, 3),
(233, 'Porygon2', 2, 2, 3), (234, 'Stantler', 2, 2, 3), (235, 'Smeargle', 2, 2, 3),
(236, 'Tyrogue', 2, 2, 1), (237, 'Hitmontop', 2, 2, 3), (238, 'Smoochum', 2, 2, 1),
(239, 'Elekid', 2, 2, 1), (240, 'Magby', 2, 2, 1), (241, 'Miltank', 2, 2, 3),
(242, 'Blissey', 2, 2, 3), (243, 'Raikou', 2, 2, 3), (244, 'Entei', 2, 2, 3),
(245, 'Suicune', 2, 2, 3), (246, 'Larvitar', 2, 2, 1), (247, 'Pupitar', 2, 2, 2),
(248, 'Tyranitar', 2, 2, 3), (249, 'Lugia', 2, 2, 3), (250, 'Ho-Oh', 2, 2, 3),
(251, 'Celebi', 2, 2, 3);

-- GENERATION 3 (Hoenn)
INSERT INTO POKEMON (dex_number, name, region_id, gen_id, evo_stage_id) VALUES
(252, 'Treecko', 3, 3, 1), (253, 'Grovyle', 3, 3, 2), (254, 'Sceptile', 3, 3, 3),
(255, 'Torchic', 3, 3, 1), (256, 'Combusken', 3, 3, 2), (257, 'Blaziken', 3, 3, 3),
(258, 'Mudkip', 3, 3, 1), (259, 'Marshtomp', 3, 3, 2), (260, 'Swampert', 3, 3, 3),
(261, 'Poochyena', 3, 3, 1), (262, 'Mightyena', 3, 3, 3), (263, 'Zigzagoon', 3, 3, 1),
(264, 'Linoone', 3, 3, 3), (265, 'Wurmple', 3, 3, 1), (266, 'Silcoon', 3, 3, 2),
(267, 'Beautifly', 3, 3, 3), (268, 'Cascoon', 3, 3, 2), (269, 'Dustox', 3, 3, 3),
(270, 'Lotad', 3, 3, 1), (271, 'Lombre', 3, 3, 2), (272, 'Ludicolo', 3, 3, 3),
(273, 'Seedot', 3, 3, 1), (274, 'Nuzleaf', 3, 3, 2), (275, 'Shiftry', 3, 3, 3),
(276, 'Taillow', 3, 3, 1), (277, 'Swellow', 3, 3, 3), (278, 'Wingull', 3, 3, 1),
(279, 'Pelipper', 3, 3, 3), (280, 'Ralts', 3, 3, 1), (281, 'Kirlia', 3, 3, 2),
(282, 'Gardevoir', 3, 3, 3), (283, 'Surskit', 3, 3, 1), (284, 'Masquerain', 3, 3, 3),
(285, 'Shroomish', 3, 3, 1), (286, 'Breloom', 3, 3, 3), (287, 'Slakoth', 3, 3, 1),
(288, 'Vigoroth', 3, 3, 2), (289, 'Slaking', 3, 3, 3), (290, 'Nincada', 3, 3, 1),
(291, 'Ninjask', 3, 3, 3), (292, 'Shedinja', 3, 3, 3), (293, 'Whismur', 3, 3, 1),
(294, 'Loudred', 3, 3, 2), (295, 'Exploud', 3, 3, 3), (296, 'Makuhita', 3, 3, 1),
(297, 'Hariyama', 3, 3, 3), (298, 'Azurill', 3, 3, 1), (299, 'Nosepass', 3, 3, 3),
(300, 'Skitty', 3, 3, 1), (301, 'Delcatty', 3, 3, 3), (302, 'Sableye', 3, 3, 3),
(303, 'Mawile', 3, 3, 3), (304, 'Aron', 3, 3, 1), (305, 'Lairon', 3, 3, 2),
(306, 'Aggron', 3, 3, 3), (307, 'Meditite', 3, 3, 1), (308, 'Medicham', 3, 3, 3),
(309, 'Electrike', 3, 3, 1), (310, 'Manectric', 3, 3, 3), (311, 'Plusle', 3, 3, 3),
(312, 'Minun', 3, 3, 3), (313, 'Volbeat', 3, 3, 3), (314, 'Illumise', 3, 3, 3),
(315, 'Roselia', 3, 3, 3), (316, 'Gulpin', 3, 3, 1), (317, 'Swalot', 3, 3, 3),
(318, 'Carvanha', 3, 3, 1), (319, 'Sharpedo', 3, 3, 3), (320, 'Wailmer', 3, 3, 1),
(321, 'Wailord', 3, 3, 3), (322, 'Numel', 3, 3, 1), (323, 'Camerupt', 3, 3, 3),
(324, 'Torkoal', 3, 3, 3), (325, 'Spoink', 3, 3, 1), (326, 'Grumpig', 3, 3, 3),
(327, 'Spinda', 3, 3, 3), (328, 'Trapinch', 3, 3, 1), (329, 'Vibrava', 3, 3, 2),
(330, 'Flygon', 3, 3, 3), (331, 'Cacnea', 3, 3, 1), (332, 'Cacturne', 3, 3, 3),
(333, 'Swablu', 3, 3, 1), (334, 'Altaria', 3, 3, 3), (335, 'Zangoose', 3, 3, 3),
(336, 'Seviper', 3, 3, 3), (337, 'Lunatone', 3, 3, 3), (338, 'Solrock', 3, 3, 3),
(339, 'Barboach', 3, 3, 1), (340, 'Whiscash', 3, 3, 3), (341, 'Corphish', 3, 3, 1),
(342, 'Crawdaunt', 3, 3, 3), (343, 'Baltoy', 3, 3, 1), (344, 'Claydol', 3, 3, 3),
(345, 'Lileep', 3, 3, 1), (346, 'Cradily', 3, 3, 3), (347, 'Anorith', 3, 3, 1),
(348, 'Armaldo', 3, 3, 3), (349, 'Feebas', 3, 3, 1), (350, 'Milotic', 3, 3, 3),
(351, 'Castform', 3, 3, 3), (352, 'Kecleon', 3, 3, 3), (353, 'Shuppet', 3, 3, 1),
(354, 'Banette', 3, 3, 3), (355, 'Duskull', 3, 3, 1), (356, 'Dusclops', 3, 3, 3),
(357, 'Tropius', 3, 3, 3), (358, 'Chimecho', 3, 3, 3), (359, 'Absol', 3, 3, 3),
(360, 'Wynaut', 3, 3, 1), (361, 'Snorunt', 3, 3, 1), (362, 'Glalie', 3, 3, 3),
(363, 'Spheal', 3, 3, 1), (364, 'Sealeo', 3, 3, 2), (365, 'Walrein', 3, 3, 3),
(366, 'Clamperl', 3, 3, 1), (367, 'Huntail', 3, 3, 3), (368, 'Gorebyss', 3, 3, 3),
(369, 'Relicanth', 3, 3, 3), (370, 'Luvdisc', 3, 3, 3), (371, 'Bagon', 3, 3, 1),
(372, 'Shelgon', 3, 3, 2), (373, 'Salamence', 3, 3, 3), (374, 'Beldum', 3, 3, 1),
(375, 'Metang', 3, 3, 2), (376, 'Metagross', 3, 3, 3), (377, 'Regirock', 3, 3, 3),
(378, 'Regice', 3, 3, 3), (379, 'Registeel', 3, 3, 3), (380, 'Latias', 3, 3, 3),
(381, 'Latios', 3, 3, 3), (382, 'Kyogre', 3, 3, 3), (383, 'Groudon', 3, 3, 3),
(384, 'Rayquaza', 3, 3, 3), (385, 'Jirachi', 3, 3, 3), (386, 'Deoxys', 3, 3, 3);