USE karcaghome;

/* Get all movies */
CREATE PROCEDURE getAllMovies()
BEGIN
    SELECT movies.id, 
        movies.name, 
        movies.addedTime, 
        movies.creater AS createrId, 
        creater.name AS creater, 
        movies.lastModification, 
        movies.lastModifier AS lastModifierId, 
        modifier.name AS lastModifier,
        FALSE AS seen
        FROM movies
    INNER JOIN users AS creater ON movies.creater = creater.id
    INNER JOIN users AS modifier ON movies.lastModifier = modifier.id
    ORDER BY movies.name;
END;    

/* Get movies for a user */
CREATE PROCEDURE getMovies(_userId INT(11))
BEGIN
    SELECT movies.id, 
        movies.name, 
        movies.addedTime, 
        movies.creater AS createrId, 
        creater.name AS creater, 
        movies.lastModification, 
        movies.lastModifier AS lastModifierId, 
        modifier.name AS lastModifier,
        switch_movies_users.seen
        FROM switch_movies_users
    INNER JOIN movies ON switch_movies_users.movie = movies.id
    INNER JOIN users AS creater ON movies.creater = creater.id
    INNER JOIN users AS modifier ON movies.lastModifier = modifier.id
    WHERE switch_movies_users.user = _userId
    ORDER BY switch_movies_users.seen, movies.name;
END;

/* Get movie by id */
CREATE PROCEDURE getMovie(_id INT(11))
BEGIN
    SELECT movies.id, 
        movies.name, 
        movies.addedTime, 
        movies.creater AS createrId, 
        creater.name AS creater, 
        movies.lastModification, 
        movies.lastModifier AS lastModifierId, 
        modifier.name AS lastModifier,
        FALSE AS seen
        FROM movies
    INNER JOIN users AS creater ON movies.creater = creater.id
    INNER JOIN users AS modifier ON movies.lastModifier = modifier.id
    WHERE movies.id = _id
    ORDER BY movies.name;
END; 


/* Add new movie */
CREATE PROCEDURE addMovie(_creater INT(11), _name VARCHAR(100))
BEGIN
    INSERT INTO movies (name, creater, lastModifier)
    VALUES(_name, _creater, _creater);
    CALL getMovie(LAST_INSERT_ID());
END;

/* Update movie */
CREATE PROCEDURE updateMovie(_id INT(11), _updater INT(11), _name VARCHAR(100))
BEGIN
    UPDATE movies SET name = _name, lastModifier = _updater, lastModification = CURRENT_TIMESTAMP WHERE id = _id;
END;

/* Delete movie */
CREATE PROCEDURE deleteMovie(_id INT(11))
BEGIN
    DELETE FROM movies WHERE id = _id;
END;

/* Pick movie */
CREATE PROCEDURE pickMovie(_id INT(11), _userId INT(11))
BEGIN
    INSERT INTO switch_movies_users (movie, user)
    VALUES (_id, _userId);
END;

/* Unpick movie */
CREATE PROCEDURE unPickMovie(_id INT(11), _userId INT(11))
BEGIN
    DELETE FROM switch_movies_users WHERE movie = _id AND user = _userId;
END;

/* See movie */
CREATE PROCEDURE seeMovie(_id INT(11), _userId INT(11), _value BOOLEAN)
BEGIN
    UPDATE switch_movies_users SET seen = _value WHERE movie = _id AND user = _userId;
END;