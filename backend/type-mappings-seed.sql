DELETE FROM POKEMON_TYPE;

-- =============================================================================
-- 3. TYPE MAPPINGS (Gen 1: Kanto)
-- IDs: 1:Normal, 2:Fire, 3:Water, 4:Grass, 5:Electric, 6:Ice, 7:Fighting, 
-- 8:Poison, 9:Ground, 10:Flying, 11:Psychic, 12:Bug, 13:Rock, 14:Ghost, 
-- 15:Dragon, 16:Steel, 17:Dark
-- =============================================================================

-- Bulbasaur
INSERT INTO POKEMON_TYPE VALUES (1, 4), (1, 8), (2, 4), (2, 8), (3, 4), (3, 8);
-- Charmander
INSERT INTO POKEMON_TYPE VALUES (4, 2), (5, 2), (6, 2), (6, 10);
-- Squirtle
INSERT INTO POKEMON_TYPE VALUES (7, 3), (8, 3), (9, 3);
-- Caterpie
INSERT INTO POKEMON_TYPE VALUES (10, 12), (11, 12), (12, 12), (12, 10);
-- Weedle
INSERT INTO POKEMON_TYPE VALUES (13, 12), (13, 8), (14, 12), (14, 8), (15, 12), (15, 8);
-- Pidgey
INSERT INTO POKEMON_TYPE VALUES (16, 1), (16, 10), (17, 1), (17, 10), (18, 1), (18, 10);
-- Rattata
INSERT INTO POKEMON_TYPE VALUES (19, 1), (20, 1);
-- Spearow
INSERT INTO POKEMON_TYPE VALUES (21, 1), (21, 10), (22, 1), (22, 10);
-- Ekans
INSERT INTO POKEMON_TYPE VALUES (23, 8), (24, 8);
-- Pikachu
INSERT INTO POKEMON_TYPE VALUES (25, 5), (26, 5);
-- Sandshrew
INSERT INTO POKEMON_TYPE VALUES (27, 9), (28, 9);
-- Nidoran (F)
INSERT INTO POKEMON_TYPE VALUES (29, 8), (30, 8), (31, 8), (31, 9);
-- Nidoran (M)
INSERT INTO POKEMON_TYPE VALUES (32, 8), (33, 8), (34, 8), (34, 9);
-- Clefairy
INSERT INTO POKEMON_TYPE VALUES (35, 1), (36, 1);
-- Vulpix
INSERT INTO POKEMON_TYPE VALUES (37, 2), (38, 2);
-- Jigglypuff
INSERT INTO POKEMON_TYPE VALUES (39, 1), (40, 1);
-- Zubat
INSERT INTO POKEMON_TYPE VALUES (41, 8), (41, 10), (42, 8), (42, 10);
-- Oddish
INSERT INTO POKEMON_TYPE VALUES (43, 4), (43, 8), (44, 4), (44, 8), (45, 4), (45, 8);
-- Paras
INSERT INTO POKEMON_TYPE VALUES (46, 12), (46, 4), (47, 12), (47, 4);
-- Venonat
INSERT INTO POKEMON_TYPE VALUES (48, 12), (48, 8), (49, 12), (49, 8);
-- Diglett
INSERT INTO POKEMON_TYPE VALUES (50, 9), (51, 9);
-- Meowth
INSERT INTO POKEMON_TYPE VALUES (52, 1), (53, 1);
-- Psyduck
INSERT INTO POKEMON_TYPE VALUES (54, 3), (55, 3);
-- Mankey
INSERT INTO POKEMON_TYPE VALUES (56, 7), (57, 7);
-- Growlithe
INSERT INTO POKEMON_TYPE VALUES (58, 2), (59, 2);
-- Poliwag
INSERT INTO POKEMON_TYPE VALUES (60, 3), (61, 3), (62, 3), (62, 7);
-- Abra
INSERT INTO POKEMON_TYPE VALUES (63, 11), (64, 11), (65, 11);
-- Machop
INSERT INTO POKEMON_TYPE VALUES (66, 7), (67, 7), (68, 7);
-- Bellsprout
INSERT INTO POKEMON_TYPE VALUES (69, 4), (69, 8), (70, 4), (70, 8), (71, 4), (71, 8);
-- Tentacool
INSERT INTO POKEMON_TYPE VALUES (72, 3), (72, 8), (73, 3), (73, 8);
-- Geodude
INSERT INTO POKEMON_TYPE VALUES (74, 13), (74, 9), (75, 13), (75, 9), (76, 13), (76, 9);
-- Ponyta
INSERT INTO POKEMON_TYPE VALUES (77, 2), (78, 2);
-- Slowpoke
INSERT INTO POKEMON_TYPE VALUES (79, 3), (79, 11), (80, 3), (80, 11);
-- Magnemite
INSERT INTO POKEMON_TYPE VALUES (81, 5), (81, 16), (82, 5), (82, 16);
-- Farfetch'd
INSERT INTO POKEMON_TYPE VALUES (83, 1), (83, 10);
-- Doduo
INSERT INTO POKEMON_TYPE VALUES (84, 1), (84, 10), (85, 1), (85, 10);
-- Seel
INSERT INTO POKEMON_TYPE VALUES (86, 3), (87, 3), (87, 6);
-- Grimer
INSERT INTO POKEMON_TYPE VALUES (88, 8), (89, 8);
-- Shellder
INSERT INTO POKEMON_TYPE VALUES (90, 3), (91, 3), (91, 6);
-- Gastly
INSERT INTO POKEMON_TYPE VALUES (92, 14), (92, 8), (93, 14), (93, 8), (94, 14), (94, 8);
-- Onix
INSERT INTO POKEMON_TYPE VALUES (95, 13), (95, 9);
-- Drowzee
INSERT INTO POKEMON_TYPE VALUES (96, 11), (97, 11);
-- Krabby
INSERT INTO POKEMON_TYPE VALUES (98, 3), (99, 3);
-- Voltorb
INSERT INTO POKEMON_TYPE VALUES (100, 5), (101, 5);
-- Exeggcute
INSERT INTO POKEMON_TYPE VALUES (102, 4), (102, 11), (103, 4), (103, 11);
-- Cubone
INSERT INTO POKEMON_TYPE VALUES (104, 9), (105, 9);
-- Hitmonlee/chan
INSERT INTO POKEMON_TYPE VALUES (106, 7), (107, 7);
-- Lickitung
INSERT INTO POKEMON_TYPE VALUES (108, 1);
-- Koffing
INSERT INTO POKEMON_TYPE VALUES (109, 8), (110, 8);
-- Rhyhorn
INSERT INTO POKEMON_TYPE VALUES (111, 9), (111, 13), (112, 9), (112, 13);
-- Chansey
INSERT INTO POKEMON_TYPE VALUES (113, 1);
-- Tangela
INSERT INTO POKEMON_TYPE VALUES (114, 4);
-- Kangaskhan
INSERT INTO POKEMON_TYPE VALUES (115, 1);
-- Horsea
INSERT INTO POKEMON_TYPE VALUES (116, 3), (117, 3);
-- Goldeen
INSERT INTO POKEMON_TYPE VALUES (118, 3), (119, 3);
-- Staryu
INSERT INTO POKEMON_TYPE VALUES (120, 3), (121, 3), (121, 11);
-- Mr. Mime
INSERT INTO POKEMON_TYPE VALUES (122, 11);
-- Scyther
INSERT INTO POKEMON_TYPE VALUES (123, 12), (123, 10);
-- Jynx
INSERT INTO POKEMON_TYPE VALUES (124, 6), (124, 11);
-- Electabuzz / Magmar
INSERT INTO POKEMON_TYPE VALUES (125, 5), (126, 2);
-- Pinsir / Tauros
INSERT INTO POKEMON_TYPE VALUES (127, 12), (128, 1);
-- Magikarp
INSERT INTO POKEMON_TYPE VALUES (129, 3), (130, 3), (130, 10);
-- Lapras / Ditto
INSERT INTO POKEMON_TYPE VALUES (131, 3), (131, 6), (132, 1);
-- Eevee Evolutions
INSERT INTO POKEMON_TYPE VALUES (133, 1), (134, 3), (135, 5), (136, 2);
-- Porygon
INSERT INTO POKEMON_TYPE VALUES (137, 1);
-- Fossil Pokemon
INSERT INTO POKEMON_TYPE VALUES (138, 3), (138, 13), (139, 3), (139, 13);
INSERT INTO POKEMON_TYPE VALUES (140, 13), (140, 3), (141, 13), (141, 3);
INSERT INTO POKEMON_TYPE VALUES (142, 13), (142, 10);
-- Snorlax
INSERT INTO POKEMON_TYPE VALUES (143, 1);
-- Birds
INSERT INTO POKEMON_TYPE VALUES (144, 6), (144, 10), (145, 5), (145, 10), (146, 2), (146, 10);
-- Dragons
INSERT INTO POKEMON_TYPE VALUES (147, 15), (148, 15), (149, 15), (149, 10);
-- Legendaries
INSERT INTO POKEMON_TYPE VALUES (150, 11), (151, 11);

-- =============================================================================
-- 3. TYPE MAPPINGS (Gen 2: Johto)
-- IDs: 1:Normal, 2:Fire, 3:Water, 4:Grass, 5:Electric, 6:Ice, 7:Fighting, 
-- 8:Poison, 9:Ground, 10:Flying, 11:Psychic, 12:Bug, 13:Rock, 14:Ghost, 
-- 15:Dragon, 16:Steel, 17:Dark
-- =============================================================================

-- Chikorita
INSERT INTO POKEMON_TYPE VALUES (152, 4), (153, 4), (154, 4);
-- Cyndaquil
INSERT INTO POKEMON_TYPE VALUES (155, 2), (156, 2), (157, 2);
-- Totodile
INSERT INTO POKEMON_TYPE VALUES (158, 3), (159, 3), (160, 3);
-- Sentret
INSERT INTO POKEMON_TYPE VALUES (161, 1), (162, 1);
-- Hoothoot 
INSERT INTO POKEMON_TYPE VALUES (163, 1), (163, 10), (164, 1), (164, 10);
-- Ledyba
INSERT INTO POKEMON_TYPE VALUES (165, 12), (165, 10), (166, 12), (166, 10);
-- Spinarak 
INSERT INTO POKEMON_TYPE VALUES (167, 12), (167, 8), (168, 12), (168, 8);
-- Crobat 
INSERT INTO POKEMON_TYPE VALUES (169, 8), (169, 10);
-- Chinchou
INSERT INTO POKEMON_TYPE VALUES (170, 3), (170, 5), (171, 3), (171, 5);
-- Pichu, Cleffa, Igglybuff
INSERT INTO POKEMON_TYPE VALUES (172, 5), (173, 1), (174, 1);
-- Togepi
INSERT INTO POKEMON_TYPE VALUES (175, 1), (176, 1), (176, 10);
-- Natu
INSERT INTO POKEMON_TYPE VALUES (177, 11), (177, 10), (178, 11), (178, 10);
-- Mareep
INSERT INTO POKEMON_TYPE VALUES (179, 5), (180, 5), (181, 5);
-- Bellossom
INSERT INTO POKEMON_TYPE VALUES (182, 4);
-- Marill
INSERT INTO POKEMON_TYPE VALUES (183, 3), (184, 3);
-- Sudowoodo
INSERT INTO POKEMON_TYPE VALUES (185, 13);
-- Politoed
INSERT INTO POKEMON_TYPE VALUES (186, 3);
-- Hoppip
INSERT INTO POKEMON_TYPE VALUES (187, 4), (187, 10), (188, 4), (188, 10), (189, 4), (189, 10);
-- Aipom, Sunkern, Yanma
INSERT INTO POKEMON_TYPE VALUES (190, 1), (191, 4), (192, 4), (193, 12), (193, 10);
-- Wooper
INSERT INTO POKEMON_TYPE VALUES (194, 3), (194, 9), (195, 3), (195, 9);
-- Eeveelutions
INSERT INTO POKEMON_TYPE VALUES (196, 11), (197, 17);
-- Murkrow, Slowking, Misdreavus, Unown, Wobbuffet
INSERT INTO POKEMON_TYPE VALUES (198, 17), (198, 10), (199, 3), (199, 11), (200, 14), (201, 11), (202, 11);
-- Girafarig
INSERT INTO POKEMON_TYPE VALUES (203, 1), (203, 11);
-- Pineco 
INSERT INTO POKEMON_TYPE VALUES (204, 12), (205, 12), (205, 16);
-- Dunsparce, Gligar, Steelix
INSERT INTO POKEMON_TYPE VALUES (206, 1), (207, 9), (207, 10), (208, 16), (208, 9);
-- Snubbull, Qwilfish
INSERT INTO POKEMON_TYPE VALUES (209, 1), (210, 1), (211, 3), (211, 8);
-- Scizor, Shuckle, Heracross
INSERT INTO POKEMON_TYPE VALUES (212, 12), (212, 16), (213, 12), (213, 13), (214, 12), (214, 7);
-- Sneasel, Teddiursa 
INSERT INTO POKEMON_TYPE VALUES (215, 17), (215, 6), (216, 1), (217, 1);
-- Slugma
INSERT INTO POKEMON_TYPE VALUES (218, 2), (219, 2), (219, 13);
-- Swinub, Corsola
INSERT INTO POKEMON_TYPE VALUES (220, 6), (220, 9), (221, 6), (221, 9), (222, 3), (222, 13);
-- Remoraid, Delibird , Mantine
INSERT INTO POKEMON_TYPE VALUES (223, 3), (224, 3), (225, 6), (225, 10), (226, 3), (226, 10);
-- Skarmory , Houndour 
INSERT INTO POKEMON_TYPE VALUES (227, 16), (227, 10), (228, 17), (228, 2), (229, 17), (229, 2);
-- Kingdra, Phanpy
INSERT INTO POKEMON_TYPE VALUES (230, 3), (230, 15), (231, 9), (232, 9);
-- Porygon2, Stantler, Smeargle
INSERT INTO POKEMON_TYPE VALUES (233, 1), (234, 1), (235, 1);
-- Tyrogue, Smoochum, Elekid, Magby
INSERT INTO POKEMON_TYPE VALUES (236, 7), (237, 7), (238, 6), (238, 11), (239, 5), (240, 2);
-- Miltank, Blissey, Raikou, Entei, Suicune
INSERT INTO POKEMON_TYPE VALUES (241, 1), (242, 1), (243, 5), (244, 2), (245, 3);
-- Tyranitar
INSERT INTO POKEMON_TYPE VALUES (246, 13), (246, 9), (247, 13), (247, 9), (248, 13), (248, 17);
-- Legendaries
INSERT INTO POKEMON_TYPE VALUES (249, 11), (249, 10), (250, 2), (250, 10), (251, 11), (251, 4);

-- =============================================================================
-- 4. TYPE MAPPINGS (Gen 3: Hoenn)
-- =============================================================================

-- Treecko
INSERT INTO POKEMON_TYPE VALUES (252, 4), (253, 4), (254, 4);
-- Torchic
INSERT INTO POKEMON_TYPE VALUES (255, 2), (256, 2), (256, 7), (257, 2), (257, 7);
-- Mudkip
INSERT INTO POKEMON_TYPE VALUES (258, 3), (259, 3), (259, 9), (260, 3), (260, 9);
-- Poochyena, Zigzagoon
INSERT INTO POKEMON_TYPE VALUES (261, 17), (262, 17), (263, 1), (264, 1);
-- Wurmple
INSERT INTO POKEMON_TYPE VALUES (265, 12), (266, 12), (267, 12), (267, 10), (268, 12), (269, 12), (269, 8);
-- Lotad 
INSERT INTO POKEMON_TYPE VALUES (270, 3), (270, 4), (271, 3), (271, 4), (272, 3), (272, 4);
-- Seedot
INSERT INTO POKEMON_TYPE VALUES (273, 4), (274, 4), (274, 17), (275, 4), (275, 17);
-- Taillow
INSERT INTO POKEMON_TYPE VALUES (276, 1), (276, 10), (277, 1), (277, 10), (278, 3), (278, 10), (279, 3), (279, 10);
-- Ralts, Surskit, Masquerain
INSERT INTO POKEMON_TYPE VALUES (280, 11), (281, 11), (282, 11), (283, 12), (283, 3), (284, 12), (284, 10);
-- Shroomish, Slakoth
INSERT INTO POKEMON_TYPE VALUES (285, 4), (286, 4), (286, 7), (287, 1), (288, 1), (289, 1);
-- Nincada, Ninjask, Shedinja
INSERT INTO POKEMON_TYPE VALUES (290, 12), (290, 9), (291, 12), (291, 10), (292, 12), (292, 14);
-- Whismur, Makuhita, Azurill
INSERT INTO POKEMON_TYPE VALUES (293, 1), (294, 1), (295, 1), (296, 7), (297, 7), (298, 1);
-- Nosepass, Skitty, Sableye, Mawile
INSERT INTO POKEMON_TYPE VALUES (299, 13), (300, 1), (301, 1), (302, 17), (302, 14), (303, 16);
-- Aron
INSERT INTO POKEMON_TYPE VALUES (304, 16), (304, 13), (305, 16), (305, 13), (306, 16), (306, 13);
-- Meditite, Electrike
INSERT INTO POKEMON_TYPE VALUES (307, 7), (307, 11), (308, 7), (308, 11), (309, 5), (310, 5);
-- Plusle, Minun, Volbeat, Illumise, Roselia
INSERT INTO POKEMON_TYPE VALUES (311, 5), (312, 5), (313, 12), (314, 12), (315, 4), (315, 8);
-- Gulpin, Carvanha
INSERT INTO POKEMON_TYPE VALUES (316, 8), (317, 8), (318, 3), (318, 17), (319, 3), (319, 17);
-- Wailmer, Numel
INSERT INTO POKEMON_TYPE VALUES (320, 3), (321, 3), (322, 2), (322, 9), (323, 2), (323, 9);
-- Torkoal, Spoink, Spinda, Trapinch
INSERT INTO POKEMON_TYPE VALUES (324, 2), (325, 11), (326, 11), (327, 1), (328, 9), (329, 9), (329, 15), (330, 9), (330, 15);
-- Cacnea, Swablu
INSERT INTO POKEMON_TYPE VALUES (331, 4), (332, 4), (332, 17), (333, 1), (333, 10), (334, 15), (334, 10);
-- Zangoose, Seviper, Lunatone/Solrock
INSERT INTO POKEMON_TYPE VALUES (335, 1), (336, 8), (337, 13), (337, 11), (338, 13), (338, 11);
-- Barboach, Corphish
INSERT INTO POKEMON_TYPE VALUES (339, 3), (339, 9), (340, 3), (340, 9), (341, 3), (342, 3), (342, 17);
-- Baltoy, Lileep, Anorith
INSERT INTO POKEMON_TYPE VALUES (343, 9), (343, 11), (344, 9), (344, 11), (345, 13), (345, 4), (346, 13), (346, 4), (347, 13), (347, 12), (348, 13), (348, 12);
-- Feebas, Castform, Kecleon
INSERT INTO POKEMON_TYPE VALUES (349, 3), (350, 3), (351, 1), (352, 1);
-- Shuppet, Duskull, Tropius
INSERT INTO POKEMON_TYPE VALUES (353, 14), (354, 14), (355, 14), (356, 14), (357, 4), (357, 10);
-- Chimecho, Absol, Wynaut, Snorunt
INSERT INTO POKEMON_TYPE VALUES (358, 11), (359, 17), (360, 11), (361, 6), (362, 6);
-- Spheal
INSERT INTO POKEMON_TYPE VALUES (363, 6), (363, 3), (364, 6), (364, 3), (365, 6), (365, 3);
-- Clamperl, Relicanth, Luvdisc
INSERT INTO POKEMON_TYPE VALUES (366, 3), (367, 3), (368, 3), (369, 3), (369, 13), (370, 3);
-- Bagon
INSERT INTO POKEMON_TYPE VALUES (371, 15), (372, 15), (373, 15), (373, 10);
-- Beldum
INSERT INTO POKEMON_TYPE VALUES (374, 16), (374, 11), (375, 16), (375, 11), (376, 16), (376, 11);
-- Regi Trio, Latias/Latios
INSERT INTO POKEMON_TYPE VALUES (377, 13), (378, 6), (379, 16), (380, 15), (380, 11), (381, 15), (381, 11);
-- Weather Trio
INSERT INTO POKEMON_TYPE VALUES (382, 3), (383, 9), (384, 15), (384, 10);
-- Jirachi, Deoxys
INSERT INTO POKEMON_TYPE VALUES (385, 16), (385, 11), (386, 11);