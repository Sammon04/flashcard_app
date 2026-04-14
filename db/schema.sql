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
    image VARCHAR(50),
    fname VARCHAR(30) NOT NULL,
    lname VARCHAR(30) NOT NULL,
    role VARCHAR(30) NOT NULL,
    district VARCHAR(30) NOT NULL,
    locale VARCHAR(20) NOT NULL,
    wildcard VARCHAR(100) NOT NULL,

    CONSTRAINT fk_info_user_id
        FOREIGN KEY (info_user_id)
        REFERENCES user(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
)