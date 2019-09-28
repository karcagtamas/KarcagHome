CREATE OR REPLACE PROCEDURE setToken(_user int(11), _token varchar(255))
BEGIN
    DELETE FROM tokens WHERE user = _user;
    INSERT INTO tokens (user, token) VALUES(_user, _token);
END;

CREATE OR REPLACE PROCEDURE getToken(_user int(11), _token varchar(255))
BEGIN
    SELECT * FROM tokens WHERE user = _user AND token = _token AND creationDate + INTERVAL 1 DAY > NOW();
END;