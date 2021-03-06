USE karcaghome;
/* Set token for a user */
CREATE PROCEDURE setToken(_user int(11), _token varchar(255))
BEGIN
    DELETE FROM tokens WHERE user = _user;
    INSERT INTO tokens (user, token) VALUES(_user, _token);
    UPDATE users SET lastLogin = NOW() WHERE id = _user;
END;

/* Get token for a user if it in the expiration day */
CREATE PROCEDURE getToken(_user int(11), _token varchar(255))
BEGIN
    SELECT * FROM tokens WHERE user = _user AND token = _token AND creationDate + INTERVAL 1 DAY > NOW();
END;

/* Get user by the given id */
CREATE PROCEDURE getUser(_user int(11))
BEGIN
    SELECT * FROM users WHERE id = _user;
END;
