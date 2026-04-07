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
    Score INT,
    Admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE flashcard (
    User_ID INT PRIMARY KEY NOT NULL,
    Front VARCHAR(300) NOT NULL,
    Back VARCHAR(300) NOT NULL,
    Points INT NOT NULL

    CONSTRAINT fk_user_id
        FOREIGN KEY (User_ID)
        REFERENCES user(User_ID)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

