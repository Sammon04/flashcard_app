USE flashcard_app;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE flashcard;
TRUNCATE TABLE user;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO user (Fname, Lname, Role, District, Locale, Score, Admin) VALUES
    ('Raymond', 'Didonato', 'Front-End Dev', 'Redford', 'en', 0, FALSE),
    ('Samuel', 'Belanger', 'Database-Admin', 'Redford', 'en', 0, TRUE),
    ('Gabriel', 'Ball', 'Front-End Dev', 'Dearborn', 'en', 0, FALSE),
    ('Lohann', 'Ratatouille', 'Back-End Dev', 'France', 'fr', 0, FALSE);

INSERT INTO flashcard (User_ID, Front, Back, Points) VALUES
    ((SELECT User_ID FROM user WHERE Fname = 'Raymond' AND Lname = 'Didonato'),
    "What is Raymond's favorite snack?",
    "Oreos",
    20),
    ((SELECT User_ID FROM user WHERE Fname = 'Raymond' AND Lname = 'Didonato'),
    "What is Raymond's dog's name?",
    "Destroyer of worlds",
    25),
    ((SELECT User_ID FROM user WHERE Fname = 'Raymond' AND Lname = 'Didonato'),
    "Where does Raymond go to eat during lunch?",
    "Chili's",
    15),
    ((SELECT User_ID FROM user WHERE Fname = 'Gabriel' AND Lname = 'Ball'),
    "How tall is Gabe?",
    "5 foot 23",
    20),
    ((SELECT User_ID FROM user WHERE Fname = 'Gabriel' AND Lname = 'Ball'),
    "What is Gabe's exact home address?",
    "308 Negra Arroyo Lane, Albuquerque, New Mexico, 87104",
    100),
    ((SELECT User_ID FROM user WHERE Fname = 'Gabriel' AND Lname = 'Ball'),
    "What is Gabe's cat's name?",
    "Gabe 2",
    21),
    ((SELECT User_ID FROM user WHERE Fname = 'Gabriel' AND Lname = 'Ball'),
    "What is Gabe's first name?",
    "Gabriel",
    1),
    ((SELECT User_ID FROM user WHERE Fname = 'Gabriel' AND Lname = 'Ball'),
    "What is Gabe's favorite programming language?",
    "Assembly",
    35),
    ((SELECT User_ID FROM user WHERE Fname = 'Lohann' AND Lname = 'Ratatouille'),
    "Why does Lohann only have one card?",
    "Because sam is tired",
    20);