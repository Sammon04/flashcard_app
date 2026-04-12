DROP SCHEMA IF EXISTS flashcard_app;

CREATE SCHEMA flashcard_app;
USE flashcard_app;

CREATE TABLE user (
    user_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    password VARCHAR(255) NOT NULL,
    fname VARCHAR(30) NOT NULL,
    lname VARCHAR(30) NOT NULL,
    role VARCHAR(30),
    district VARCHAR(30),
    locale VARCHAR(10),
    score INT DEFAULT 0,
    admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE flashcard (
    card_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    card_user_id INT NOT NULL,
    front VARCHAR(300) NOT NULL,
    back VARCHAR(300) NOT NULL,
    points INT NOT NULL,

    CONSTRAINT fk_user_id
        FOREIGN KEY (card_user_id)
        REFERENCES user(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE user_answers (
    answer_user_id INT NOT NULL,
    answer_card_id INT NOT NULL,
    times_answered INT DEFAULT 0 NOT NULL,
    times_skipped INT DEFAULT 0 NOT NULL,
    date_last_answered DATE,
    PRIMARY KEY (answer_user_id, answer_card_id),

    CONSTRAINT fk_answer_user_id
        FOREIGN KEY (answer_user_id)
        REFERENCES user(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    
    CONSTRAINT fk_answer_card_id
        FOREIGN KEY (answer_card_id)
        REFERENCES flashcard(card_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);