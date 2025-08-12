-- MOVIE_LIST_MOVIES -----------------------------------------------------------
-- Generated --
INSERT INTO movie_list_movies (movie_id, list_id, movie_order)
SELECT
    movie_id,
    list_id,
    ROW_NUMBER() OVER (PARTITION BY list_id ORDER BY RANDOM()) AS movie_order
FROM (
    SELECT
        m.id AS movie_id,
        ml.id AS list_id
    FROM (
        SELECT id FROM movies ORDER BY RANDOM() LIMIT 10
    ) AS m
    CROSS JOIN LATERAL (
        SELECT id
        FROM movie_lists
        WHERE title <> 'Timmy and Jannys Crappy List'   -- excluding this list as I want to populate it myself
        ORDER BY RANDOM()
        LIMIT 3
    ) AS ml
) AS combos
WHERE NOT EXISTS (
    SELECT 1
    FROM movie_list_movies mlm
    WHERE mlm.movie_id = combos.movie_id
      AND mlm.list_id = combos.list_id
);

-- Custom Relation --
INSERT INTO movie_list_movies (movie_id, list_id, movie_order)
SELECT
    m.id,
    ml.id,
    1
FROM movies m
JOIN movie_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
WHERE m.title = 'One Flew Over the Coocoos Nest'
    AND NOT EXISTS (
        SELECT 1
        FROM movie_list_movies mlm
        WHERE mlm.movie_id = m.id AND mlm.list_id = ml.id
);

INSERT INTO movie_list_movies (movie_id, list_id, movie_order)
SELECT
    m.id,
    ml.id,
    2
FROM movies m
JOIN movie_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
WHERE m.title = 'Army of Darkness'
    AND NOT EXISTS (
        SELECT 1
        FROM movie_list_movies mlm
        WHERE mlm.movie_id = m.id AND mlm.list_id = ml.id
);

INSERT INTO movie_list_movies (movie_id, list_id, movie_order)
SELECT
    m.id,
    ml.id,
    3
FROM movies m
JOIN movie_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
WHERE m.title = 'The Rescuers Down Under'
    AND NOT EXISTS (
        SELECT 1
        FROM movie_list_movies mlm
        WHERE mlm.movie_id = m.id AND mlm.list_id = ml.id
);

INSERT INTO movie_list_movies (movie_id, list_id, movie_order)
SELECT
    m.id,
    ml.id,
    4
FROM movies m
JOIN movie_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
WHERE m.title = 'Alien'
    AND NOT EXISTS (
        SELECT 1
        FROM movie_list_movies mlm
        WHERE mlm.movie_id = m.id AND mlm.list_id = ml.id
);
