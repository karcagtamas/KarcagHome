/* Get all series */
CREATE OR REPLACE PROCEDURE getAllSeries()
    BEGIN
        SELECT 
        series.id, 
        series.name, 
        series.addedTime, 
        series.creater AS createrId,
        creater.name AS creater,
        series.lastModification,
        series.lastModifier AS lastModifierId,
        modifier.name AS lastModifier
        FROM series
        INNER JOIN users AS creater ON creater.id = series.creater
        INNER JOIN users AS modifier ON modifier.id = series.lastModifier
        ORDER BY series.name; 
    END;

/* Add series */
CREATE OR REPLACE PROCEDURE addSeries(_name VARCHAR(100), _creater INT(11))
    BEGIN
       INSERT INTO series(name, creater, lastModifier)
       VALUES(_name, _creater, _creater);
    END;

/* Modify series */
CREATE OR REPLACE PROCEDURE updateSeries(_id INT(11), _name VARCHAR(100), _updater INT(11))
    BEGIN
       UPDATE series SET
       name = _name,
       lastModifier = _updater,
       lastModification = NOW()
       WHERE id = _id;
    END;

/* Delete series */
CREATE OR REPLACE PROCEDURE deleteSeries(_id INT(11))
    BEGIN
       DELETE FROM series WHERE id = _id;
    END;

/* Get all season for series */
CREATE OR REPLACE PROCEDURE getSeasons(_series INT(11))
    BEGIN
        SELECT
        seasons.id,
        seasons.series AS seriesId,
        series.name AS series,
        seasons.number,
        seasons.episodes
        FROM seasons
        INNER JOIN series ON series.id = seasons.series
        WHERE seasons.series = _series
        ORDER BY seasons.number;
    END;

/* Add season and episodes by the given episode number */
CREATE OR REPLACE PROCEDURE addSeason(_series INT(11), _number INT(2), _episodes INT(3))
    BEGIN
       DECLARE last INT(11) DEFAULT 0;
       DECLARE counter INT(3) DEFAULT 1;
       INSERT INTO seasons(series, number, episodes)
       VALUES(_series, _number, _episodes);
       SET last = LAST_INSERT_ID();
       WHILE counter <= _episodes DO
        CALL addEpisode(last, counter);
        SET counter = counter + 1;
       END WHILE;
    END; 

/* Delete season */
CREATE OR REPLACE PROCEDURE deleteSeason(_id INT(11))
    BEGIN
       DELETE FROM seasons WHERE id = _id;
    END;

/* Get all episode for a season*/
CREATE OR REPLACE PROCEDURE getEpisodes(_season INT(11))
    BEGIN
        SELECT
        episodes.id,
        episodes.season AS seasonId,
        seasons.number AS season,
        series.name AS series,
        series.id AS seriesId,
        episodes.number
        FROM episodes
        INNER JOIN seasons ON seasons.id = episodes.season
        INNER JOIN series ON series.id = seasons.series
        WHERE episodes.season = _season
        ORDER BY episodes.number;
    END;

/* Add episode */
CREATE OR REPLACE PROCEDURE addEpisode(_season INT(11), _number INT(3))
    BEGIN
       INSERT INTO episodes(season, number)
       VALUES(_season, _number);
    END;

/* Delete episode */
CREATE OR REPLACE PROCEDURE deleteEpisode(_id INT(11))
    BEGIN
       DELETE FROM episode WHERE id = _id;
    END;
