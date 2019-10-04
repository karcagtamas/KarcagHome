/* Set token for a user */
CREATE OR REPLACE PROCEDURE setToken(_user int(11), _token varchar(255))
BEGIN
    DELETE FROM tokens WHERE user = _user;
    INSERT INTO tokens (user, token) VALUES(_user, _token);
END;

/* Get token for a user if it in the expiration day */
CREATE OR REPLACE PROCEDURE getToken(_user int(11), _token varchar(255))
BEGIN
    SELECT * FROM tokens WHERE user = _user AND token = _token AND creationDate + INTERVAL 1 DAY > NOW();
END;

/* Get user by the given id */
CREATE OR REPLACE PROCEDURE getUser(_user int(11))
BEGIN
    SELECT * FROM users WHERE id = _user;
END;
