# Pokedoku
### Revisions and Corrections


### Background
My project is called Pokedoku, and it’s a nerdy spin on the well known Sudoku game. Pokedoku is a game where the user is met with a 3x3 grid where each column has a constraint and each row has a constraint. The user is challenged to think of a Pokemon that meets both the row and column constraints in each cell.

For example, a column constraint could be “Type: Fire” and a row constraint could be “Type: Flying”, in which the user is then tasked to find a Pokemon (there can be multiple & always at least one) that has both the Fire and Flying type. The user can enter a Pokemon’s name, and the grid will let the player know if their choice was correct.
The data in this project’s database will mostly be composed of the different attributes of Pokemon. Since there are currently 1000+ Pokemon across 9 generations, I’m limiting the scope of my project to the first 3 generations (386 Pokemon total).

The database will model the relationships between Pokemon and their attributes. The many-to-many relationships are:
- Pokemon–Type
- Pokemon–Move
- Pokemon–Ability

The one-to-many relationships are:
- Pokemon has one Region of origin
- Pokemon has one EvoStage (Stage 1 / Stage 2 / Final)
- Pokemon has one Generation of origin (introduced gen)
- Pokemon has one National Dex number

The service my project is intended to provide is a game for users to play and test their knowledge of Pokemon. Pokemon has lots of other games that are available for purchase and also has one of the most well known trading card games in the world, but sometimes people just want a free way to challenge their knowledge.

### Application Requirements
**R1: Core Gameplay / UI**
R1.1) The application should consist of a 3x3 grid puzzle where each row has one constraint and each column has one constraint.

R1.2) The application should allow the user to select a cell and enter a Pokemon name.

R1.3) The application should validate whether the entered Pokemon satisfies both the row and column constraints for that cell.

R1.4) The application should display whether the entry is correct or incorrect for that cell.

R1.5) The application should display a remaining guesses counter and update it as the user makes guesses.

R1.6) The application should have a “give up” button that the user can press to end the game early.

R1.7) The application should not save failed boards.

———————————————————————————————————————

**R2: Guest Use & Accounts**

R2.1) The application should be usable without logging in.


R2.2) The application should support user login.


R2.3) If logged in, the application should allow users to save completed boards to their profile.


R2.4) If logged in, the application should provide a profile view where the user can see a list of their saved boards.

———————————————————————————————————————

**R3: Database Content**

R3.1) The database should store Pokemon data up to Generation 3 (386 Pokemon total).


R3.2) For each Pokemon, the database should store the following single-valued attributes: national dex number, name, region of origin, evolution stage, and generation of origin.


R3.3) For each Pokemon, the database should store the following multi-valued attributes using many-to-many tables: types, moves, and abilities.

———————————————————————————————————————

**R4: Puzzles & Attempts**

R4.1) The database should store each puzzle’s six constraints (3 row constraints and 3 column constraints).


R4.2) The database should store puzzle play progress as attempts, including the Pokemon selected for each filled cell.


R4.3) If logged in, attempts should be associated with the user so boards can be saved and viewed later.


R4.4) If logged in, a user shouldn’t be able to see their failed puzzle boards.

### Due Diligence

Because Pokemon is owned by Nintendo and Pokedoku isn’t an original idea, there are potential intellectual property concerns. I still think this project can be completed appropriately as a course project, as follows:

CPY1.1) Pokemon is owned by Nintendo. For this project, I won’t copy/paste or import data from other public Pokemon databases. Instead, I’ll use publicly available information about Pokemon and create my own SQLite database from scratch.

CPY1.2) The idea of Pokedoku isn’t original, and the game already exists at pokedoku.com. This project is a recreation of the concept for a school assignment. I won’t claim the idea as my own, and I won’t advertise it as an original product.

CPY1.3) I don’t plan to host this as a public service or deploy it on a server. It’ll only be included on my GitHub as a course project submission and to add to my portfolio. Because of these ownership/originality concerns, it should be treated as a school project rather than something intended for broad public use.

