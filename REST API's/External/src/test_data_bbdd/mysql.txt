CREATE DATABASE demo_database;
USE demo_database;

CREATE TABLE Users(
	id INTEGER NOT NULL,
    user_name VARCHAR(20) NOT NULL,
    user_profession ENUM("Dev", "Admin") NOT NULL
);

INSERT INTO Users VALUES(1, "Alberto", "Dev");
INSERT INTO Users VALUES(2, "Lucia", "Admin");
INSERT INTO Users VALUES(3, "Rocio", "Dev");
INSERT INTO Users VALUES(4, "Juan", "Dev");
INSERT INTO Users VALUES(5, "Carlos", "Admin");