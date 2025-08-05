-- USER_MOVIE_LISTS ------------------------------------------------------------
-- Generated --
INSERT INTO user_movie_lists (user_id, list_id)
SELECT
    u.id,
    ml.id
FROM (
    SELECT id FROM users ORDER BY RANDOM() LIMIT 5
) AS u,
LATERAL (
    SELECT id FROM movie_lists ORDER BY RANDOM() limit 3
) as ml;

-- Custom Relations --
INSERT INTO user_movie_lists (user_id, list_id)
SELECT
    u.id,
    ml.id
FROM users u
JOIN movie_lists ml ON ml.list_title = 'David Lynch Is Not Playing Around'
WHERE u.email = 'david@lynch.com'
    AND NOT EXISTS (
        SELECT 1
        FROM user_movie_lists uml
        WHERE uml.user_id = u.id AND uml.list_id = ml.id
);

INSERT INTO user_movie_lists (user_id, list_id)
SELECT
    u.id,
    ml.id
FROM users u
JOIN movie_lists ml ON ml.list_title = 'Timmy and Jannys Crappy List'
WHERE u.email = 'jan@jan.com'
    AND NOT EXISTS (
        SELECT 1
        FROM user_movie_lists uml
        WHERE uml.user_id = u.id AND uml.list_id = ml.id
);

INSERT INTO user_movie_lists (user_id, list_id)
SELECT
    u.id,
    ml.id
FROM users u
JOIN movie_lists ml ON ml.list_title = 'Timmy and Jannys Crappy List'
WHERE u.email = 'tim@tim.com'
    AND NOT EXISTS (
        SELECT 1
        FROM user_movie_lists uml
        WHERE uml.user_id = u.id AND uml.list_id = ml.id
);

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
