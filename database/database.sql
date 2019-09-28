CREATE DATABASE karcaghome
CHARACTER SET utf8
COLLATE utf8_hungarian_ci;

CREATE TABLE macs(
    id INT(11) NOT NULL AUTO_INCREMENT,
    address CHAR(17) NOT NULL,
    ip VARCHAR(15),
    owner VARCHAR(100) NOT NULL,
    deviceName VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE users(
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    displayName VARCHAR(100) NOT NULL,
    lastLogin DATETIME,
    registration DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE tokens(
    token VARCHAR(255) NOT NULL,
    user INT(11) NOT NULL,
    creationDate DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY(user),
    CONSTRAINT fk_tokens_user_users_id FOREIGN KEY (user)
    REFERENCES users(id)
);

CREATE TABLE movies(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    addedTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    creater INT(11) NOT NULL,
    lastModification DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    lastModifier INT(11) NOT NULL,
    PRIMARY KEY(id),
    ADD CONSTRAINT fk_movies_creater_users_id FOREIGN KEY creater
    REFERENCES users(id),
    ADD CONSTRAINT fk_movies_lastModifier_users_id FOREIGN KEY lastModifier
    REFERENCES users(id)
);

CREATE TABLE switch_movies_users(
    movie INT(11) NOT NULL,
    user INT(11) NOT NULL,
    seen BOOLEAN DEFAULT FALSE,
    lastModification DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(movie, user),
    ADD CONSTRAINT fk_switch_movies_users_user_users_id FOREIGN KEY user
    REFERENCES users(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_switch_movies_users_movie_movies_id FOREIGN KEY movie
    REFERENCES movies(id) ON DELETE CASCADE
); 

CREATE TABLE series(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    addedTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    creater INT(11) NOT NULL,
    lastModification DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    lastModifier INT(11) NOT NULL,
    PRIMARY KEY(id),
    ADD CONSTRAINT fk_series_creater_users_id FOREIGN KEY creater
    REFERENCES users(id),
    ADD CONSTRAINT fk_series_lastModifier_users_id FOREIGN KEY lastModifier
    REFERENCES users(id)
);

CREATE TABLE seasons(
    id INT(11) NOT NULL AUTO_INCREMENT,
    series INT(11) NOT NULL AUTO_INCREMENT,
    number INT(2) NOT NULL AUTO_INCREMENT,
    episodes INT(3) NOT NULL DEFAULT 0,
    PRIMARY KEY(id), 
    ADD CONSTRAINT fk_seasons_series_series_id FOREIGN KEY series
    REFERENCES series(id) ON DELETE CASCADE
);

CREATE TABLE episodes(
    id INT(11) NOT NULl AUTO_INCREMENT,
    season INT(11) NOT NULL AUTO_INCREMENT,
    number INT(3) NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(id),
    ADD CONSTRAINT fk_episodes_season_seasons_id FOREIGN KEY season
    REFERENCES seasons(id) ON DELETE CASCADE
);

CREATE TABLE switch_episodes_users(
    episode INT(11) NOT NULL,
    user INT(11) NOT NULL,
    seen BOOLEAN DEFAULT FALSE,
    lastModification DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(episode, user),
    ADD CONSTRAINT fk_switch_episodes_users_user_users_id FOREIGN KEY user
    REFERENCES users(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_switch_episodes_users_episode_episodes_id FOREIGN KEY movie
    REFERENCES episodes(id) ON DELETE CASCADE
)