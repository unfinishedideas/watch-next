-- USER_MOVIE_LISTS ------------------------------------------------------------
-- Generated --
INSERT INTO user_watch_lists (user_id, list_id)
SELECT
    u.id,
    ml.id
FROM (
    SELECT id FROM users ORDER BY RANDOM() LIMIT 5
) AS u,
LATERAL (
    SELECT id FROM watch_lists ORDER BY RANDOM() limit 3
) as ml;

-- Custom Relations --
INSERT INTO user_watch_lists (user_id, list_id)
SELECT
    u.id,
    ml.id
FROM users u
JOIN watch_lists ml ON ml.title = 'David Lynch Is Not Playing Around'
WHERE u.email = 'david@lynch.com'
    AND NOT EXISTS (
        SELECT 1
        FROM user_watch_lists uml
        WHERE uml.user_id = u.id AND uml.list_id = ml.id
);

INSERT INTO user_watch_lists (user_id, list_id)
SELECT
    u.id,
    ml.id
FROM users u
JOIN watch_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
WHERE u.email = 'jan@jan.com'
    AND NOT EXISTS (
        SELECT 1
        FROM user_watch_lists uml
        WHERE uml.user_id = u.id AND uml.list_id = ml.id
);

INSERT INTO user_watch_lists (user_id, list_id)
SELECT
    u.id,
    ml.id
FROM users u
JOIN watch_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
WHERE u.email = 'tim@tim.com'
    AND NOT EXISTS (
        SELECT 1
        FROM user_watch_lists uml
        WHERE uml.user_id = u.id AND uml.list_id = ml.id
);

INSERT INTO user_watch_lists (user_id, list_id)
SELECT
    u.id,
    ml.id
FROM users u
JOIN watch_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
WHERE u.email = 'susan@strong.com'
    AND NOT EXISTS (
        SELECT 1
        FROM user_watch_lists uml
        WHERE uml.user_id = u.id AND uml.list_id = ml.id
);

INSERT INTO user_watch_lists (user_id, list_id)
SELECT
    u.id,
    ml.id
FROM users u
JOIN watch_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
WHERE u.email = 'sofia@coppola.com'
    AND NOT EXISTS (
        SELECT 1
        FROM user_watch_lists uml
        WHERE uml.user_id = u.id AND uml.list_id = ml.id
);

INSERT INTO user_watch_lists (user_id, list_id)
SELECT
    u.id,
    ml.id
FROM users u
JOIN watch_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
WHERE u.email = 'sam@raimi.com'
    AND NOT EXISTS (
        SELECT 1
        FROM user_watch_lists uml
        WHERE uml.user_id = u.id AND uml.list_id = ml.id
);

INSERT INTO user_watch_lists (user_id, list_id)
SELECT
    u.id,
    ml.id
FROM users u
JOIN watch_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
WHERE u.email = 'gorgeous@lucas.com'
    AND NOT EXISTS (
        SELECT 1
        FROM user_watch_lists uml
        WHERE uml.user_id = u.id AND uml.list_id = ml.id
);

INSERT INTO user_watch_lists (user_id, list_id)
SELECT
    u.id,
    ml.id
FROM users u
JOIN watch_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
WHERE u.email = 'bigk@kathyrn.com'
    AND NOT EXISTS (
        SELECT 1
        FROM user_watch_lists uml
        WHERE uml.user_id = u.id AND uml.list_id = ml.id
);

INSERT INTO user_watch_lists (user_id, list_id)
SELECT
    u.id,
    ml.id
FROM users u
JOIN watch_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
WHERE u.email = 'stanley@kubrick.com'
    AND NOT EXISTS (
        SELECT 1
        FROM user_watch_lists uml
        WHERE uml.user_id = u.id AND uml.list_id = ml.id
);

-- Give David Lynch a lot of lists
INSERT INTO user_watch_lists (user_id, list_id)
SELECT
    u.id,
    ml.id
FROM users u
JOIN watch_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
WHERE u.email = 'david@lynch.com'
    AND NOT EXISTS (
        SELECT 1
        FROM user_watch_lists uml
        WHERE uml.user_id = u.id AND uml.list_id = ml.id
);

INSERT INTO user_watch_lists (user_id, list_id)
SELECT
    u.id,
    ml.id
FROM users u
JOIN watch_lists ml ON ml.title = 'Peter and Sams Watch List'
WHERE u.email = 'david@lynch.com'
    AND NOT EXISTS (
        SELECT 1
        FROM user_watch_lists uml
        WHERE uml.user_id = u.id AND uml.list_id = ml.id
);

INSERT INTO user_watch_lists (user_id, list_id)
SELECT
    u.id,
    ml.id
FROM users u
JOIN watch_lists ml ON ml.title = 'Netflix and Bill'
WHERE u.email = 'david@lynch.com'
    AND NOT EXISTS (
        SELECT 1
        FROM user_watch_lists uml
        WHERE uml.user_id = u.id AND uml.list_id = ml.id
);

INSERT INTO user_watch_lists (user_id, list_id)
SELECT
    u.id,
    ml.id
FROM users u
JOIN watch_lists ml ON ml.title = 'Horror Movies Featuring Alien Ice Cream'
WHERE u.email = 'david@lynch.com'
    AND NOT EXISTS (
        SELECT 1
        FROM user_watch_lists uml
        WHERE uml.user_id = u.id AND uml.list_id = ml.id
);

INSERT INTO user_watch_lists (user_id, list_id)
SELECT
    u.id,
    ml.id
FROM users u
JOIN watch_lists ml ON ml.title = 'Oscar Bait'
WHERE u.email = 'david@lynch.com'
    AND NOT EXISTS (
        SELECT 1
        FROM user_watch_lists uml
        WHERE uml.user_id = u.id AND uml.list_id = ml.id
);

INSERT INTO user_watch_lists (user_id, list_id)
SELECT
    u.id,
    ml.id
FROM users u
JOIN watch_lists ml ON ml.title = 'Mockumentary Films About Portland Oregon'
WHERE u.email = 'david@lynch.com'
    AND NOT EXISTS (
        SELECT 1
        FROM user_watch_lists uml
        WHERE uml.user_id = u.id AND uml.list_id = ml.id
);

INSERT INTO user_watch_lists (user_id, list_id)
SELECT
    u.id,
    ml.id
FROM users u
JOIN watch_lists ml ON ml.title = 'Movies Where the Heroes Find Atlantis and Regret It Immediately'
WHERE u.email = 'david@lynch.com'
    AND NOT EXISTS (
        SELECT 1
        FROM user_watch_lists uml
        WHERE uml.user_id = u.id AND uml.list_id = ml.id
);

INSERT INTO user_watch_lists (user_id, list_id)
SELECT
    u.id,
    ml.id
FROM users u
JOIN watch_lists ml ON ml.title = 'ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'
WHERE u.email = 'david@lynch.com'
    AND NOT EXISTS (
        SELECT 1
        FROM user_watch_lists uml
        WHERE uml.user_id = u.id AND uml.list_id = ml.id
);

