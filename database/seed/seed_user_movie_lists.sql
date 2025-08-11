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
JOIN movie_lists ml ON ml.title = 'David Lynch Is Not Playing Around'
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
JOIN movie_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
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
JOIN movie_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
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
JOIN movie_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
WHERE u.email = 'tim@tim.com'
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
JOIN movie_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
WHERE u.email = 'susan@strong.com'
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
JOIN movie_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
WHERE u.email = 'sofia@coppola.com'
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
JOIN movie_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
WHERE u.email = 'sam@raimi.com'
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
JOIN movie_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
WHERE u.email = 'gorgeous@lucas.com'
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
JOIN movie_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
WHERE u.email = 'bigk@kathyrn.com'
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
JOIN movie_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
WHERE u.email = 'stanley@kubrick.com'
    AND NOT EXISTS (
        SELECT 1
        FROM user_movie_lists uml
        WHERE uml.user_id = u.id AND uml.list_id = ml.id
);
