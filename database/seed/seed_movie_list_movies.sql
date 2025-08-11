-- MOVIE_LIST_MOVIES -----------------------------------------------------------
-- Generated --
INSERT INTO movie_list_movies (movie_id, list_id)
SELECT
    m.id,
    ml.id
FROM (
    SELECT id FROM movies ORDER BY RANDOM() LIMIT 10
) AS m,
LATERAL (
    SELECT id FROM movie_lists ORDER BY RANDOM() limit 3
) as ml
WHERE NOT EXISTS (
    SELECT 1
    FROM movie_list_movies mlm
    WHERE mlm.movie_id = m.id AND mlm.list_id = ml.id
);


-- Custom Relation --
INSERT INTO movie_list_movies (movie_id, list_id)
SELECT
    m.id,
    ml.id
FROM movies m
JOIN movie_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
WHERE m.title = 'One Flew Over the Coocoos Nest'
    AND NOT EXISTS (
        SELECT 1
        FROM movie_list_movies mlm
        WHERE mlm.movie_id = m.id AND mlm.list_id = ml.id
);

INSERT INTO movie_list_movies (movie_id, list_id)
SELECT
    m.id,
    ml.id
FROM movies m
JOIN movie_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
WHERE m.title = 'Army of Darkness'
    AND NOT EXISTS (
        SELECT 1
        FROM movie_list_movies mlm
        WHERE mlm.movie_id = m.id AND mlm.list_id = ml.id
);

INSERT INTO movie_list_movies (movie_id, list_id)
SELECT
    m.id,
    ml.id
FROM movies m
JOIN movie_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
WHERE m.title = 'The Rescuers Down Under'
    AND NOT EXISTS (
        SELECT 1
        FROM movie_list_movies mlm
        WHERE mlm.movie_id = m.id AND mlm.list_id = ml.id
);

INSERT INTO movie_list_movies (movie_id, list_id)
SELECT
    m.id,
    ml.id
FROM movies m
JOIN movie_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
WHERE m.title = 'Alien'
    AND NOT EXISTS (
        SELECT 1
        FROM movie_list_movies mlm
        WHERE mlm.movie_id = m.id AND mlm.list_id = ml.id
);
