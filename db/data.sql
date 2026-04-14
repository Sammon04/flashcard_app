USE flashcard_app;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE user_info;
TRUNCATE TABLE user;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO user (user_id, password, score, Admin) VALUES
    (100, "$2y$10$8emsdReOgGZe/Bd9xAuabe5x/yxiLkX7JtYOFcRUjyB0xhObEtyS2", 0, FALSE),
    (101, "$2y$10$TnDetc9ZgcuNISGl91ft6.7HzPUAAqPHya2ksL3VH9D1SuqA58twe", 0, TRUE),
    (102, "$2y$10$O7Uttkbv6f48nkZVhlwfVeUlWSWe9utrJEtEyhg7Bd8Wh87zVaYkW", 0, FALSE),
    (103, "$2y$10$vUkH.Ne/RZGCg.Moh2i7TeFm1DYJozMaONwwU28Agmj2HNaDXWjI.", 0, FALSE);

INSERT INTO user_info(info_user_id, fname, lname, role, district, locale, wildcard) VALUES
    (100, "Raymond", "Didonato", "Front-end Dev", "Redford", "english", "placeholder"),
    (101, "Samuel", "Belanger", "Back-end Dev", "Redford", "english", "placeholder"),
    (102, "Gabriel", "Ball", "Front-end Dev", "Somewhere", "english", "placeholder"),
    (103, "Lohann", "spy_tf2", "Creative lead", "France", "french", "placeholder");