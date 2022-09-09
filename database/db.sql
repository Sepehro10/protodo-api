CREATE DATABASE protodo;

CREATE TABLE users(
    id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(40) NOT NULL
);

CREATE TABLE lists(
    id SERIAL NOT NULL PRIMARY KEY,
    owner_id INT NOT NULL REFERENCES users (id),
    list_name VARCHAR(50) NOT NULL,
    UNIQUE(owner_id)
);

CREATE TABLE todos(
    id SERIAL NOT NULL PRIMARY KEY,
    list_id INT NOT NULL REFERENCES lists (id),
    todo_name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE(list_id)
);

INSERT INTO users (username, password) VALUES ('admin', 'admin');
INSERT INTO lists (owner_id, list_name) VALUES (1, 'Test');
INSERT INTO todos (list_id, todo_name, description) VALUES (1, 'need to do this', 'i really need to do it');
