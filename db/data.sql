USE flashcard_app;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE flashcard;
TRUNCATE TABLE user;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO user (user_id, password, fname, lname, role, district, locale, score, Admin) VALUES
    (100, "$2y$10$8emsdReOgGZe/Bd9xAuabe5x/yxiLkX7JtYOFcRUjyB0xhObEtyS2", 'Raymond', 'Didonato', 'Front-End Dev', 'Redford', 'en', 0, FALSE),
    (101, "$2y$10$TnDetc9ZgcuNISGl91ft6.7HzPUAAqPHya2ksL3VH9D1SuqA58twe", 'Samuel', 'Belanger', 'Database-Admin', 'Redford', 'en', 0, TRUE),
    (102, "$2y$10$O7Uttkbv6f48nkZVhlwfVeUlWSWe9utrJEtEyhg7Bd8Wh87zVaYkW", 'Gabriel', 'Ball', 'Front-End Dev', 'Dearborn', 'en', 0, FALSE),
    (103, "$2y$10$vUkH.Ne/RZGCg.Moh2i7TeFm1DYJozMaONwwU28Agmj2HNaDXWjI.", 'Lohann', 'Ratatouille', 'Back-End Dev', 'France', 'fr', 0, FALSE);

INSERT INTO flashcard (card_user_id, Front, Back, Points) VALUES
    ((SELECT user_id FROM user WHERE user_id = 100),
    "What is Raymond's favorite snack?",
    "Oreos",
    20),
    ((SELECT user_id FROM user WHERE user_id = 100),
    "What is Raymond's dog's name?",
    "Destroyer of worlds",
    25),
    ((SELECT user_id FROM user WHERE user_id = 100),
    "Where does Raymond go to eat during lunch?",
    "Chili's",
    15),
    ((SELECT user_id FROM user WHERE user_id = 102),
    "How tall is Gabe?",
    "5 foot 23",
    20),
    ((SELECT user_id FROM user WHERE user_id = 102),
    "What is Gabe's exact home address?",
    "308 Negra Arroyo Lane, Albuquerque, New Mexico, 87104",
    100),
    ((SELECT user_id FROM user WHERE user_id = 102),
    "What is Gabe's cat's name?",
    "Gabe 2",
    21),
    ((SELECT user_id FROM user WHERE user_id = 102),
    "What is Gabe's first name?",
    "Gabriel",
    1),
    ((SELECT user_id FROM user WHERE user_id = 102),
    "What is Gabe's favorite programming language?",
    "Assembly",
    35),
    ((SELECT user_id FROM user WHERE user_id = 103),
    "Why does Lohann only have one card?",
    "Because sam is tired",
    20);