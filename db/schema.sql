DROP SCHEMA IF EXISTS flashcard_app;

CREATE SCHEMA flashcard_app;
USE flashcard_app;

CREATE TABLE user (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    password VARCHAR(255) NOT NULL,
    score INT DEFAULT 0,
    admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE user_info (
    info_user_id INT PRIMARY KEY,
    fname VARCHAR(30) NOT NULL,
    lname VARCHAR(30) NOT NULL,
    image VARCHAR(50),
    role VARCHAR(30),
    district VARCHAR(30),
    locale VARCHAR(20),
    wildcard VARCHAR(100),

    CONSTRAINT fk_info_user_id
        FOREIGN KEY (info_user_id)
        REFERENCES user(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
)