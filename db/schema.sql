DROP SCHEMA IF EXISTS flashcard_app;

CREATE SCHEMA flashcard_app;
USE flashcard_app;

CREATE TABLE user (
    User_ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    Fname VARCHAR(30) NOT NULL,
    Lname VARCHAR(30) NOT NULL,
    Role VARCHAR(30),
    District VARCHAR(30),
    Locale VARCHAR(10),
    Score INT DEFAULT 0,
    Admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE flashcard (
    Card_ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    User_ID INT NOT NULL,
    Front VARCHAR(300) NOT NULL,
    Back VARCHAR(300) NOT NULL,
    Points INT NOT NULL,

    CONSTRAINT fk_user_id
        FOREIGN KEY (User_ID)
        REFERENCES user(User_ID)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE user_answers (
    User_ID INT NOT NULL,
    Card_ID INT NOT NULL,
    Times_answered INT DEFAULT 0 NOT NULL,
    Times_skipped INT DEFAULT 0 NOT NULL,
    Date_last_answered DATE,
    PRIMARY KEY (User_ID, Card_ID),

    CONSTRAINT fk_answer_user_id
        FOREIGN KEY (User_ID)
        REFERENCES user(User_ID)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    
    CONSTRAINT fk_answer_card_id
        FOREIGN KEY (Card_ID)
        REFERENCES flashcard(Card_ID)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);