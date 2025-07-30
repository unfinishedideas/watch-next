-- USERS -----------------------------------------------------------------------
-- Generated --
INSERT INTO users (username, email, password_hash, deleted)
SELECT
    'user_' || gs.id AS username,
    'user_' || gs.id || '@example.com' AS email,
    '7715F5391F6785727C85D375E14787A5FC3E2697AA83AA1BF8165B5A1402EEBC-7F6D77B0645E6EB3CBC8FEE9172570A8' AS password_hash,   -- everyone has 123456 as password
    (random() < 0.5)::boolean
FROM generate_series(1,30) AS gs(id);

-- Custom Users --
INSERT INTO users (username, email, password_hash)
VALUES
('janny', 'jan@jan.com', '1CFFDAE473B95719F3650370ABB498EC1D201B9EC5A8F5AAC8B602B2708751DC-F9CEEFFD9ABDA407072A5308AD68B765'),    
('timmy', 'tim@tim.com', '48E36F77A520AA6EAF0FF559A46389EB50BFAE1E3C3748A4513E08AFA5090165-D2E59D5877E1C8439B82936937100431'),    
('davidlynch', 'david@lynch.com', '7715F5391F6785727C85D375E14787A5FC3E2697AA83AA1BF8165B5A1402EEBC-7F6D77B0645E6EB3CBC8FEE9172570A8');


-- MOVIE LISTS -----------------------------------------------------------------
-- Generated --
WITH titles AS (
    SELECT unnest(ARRAY[
        'Top Picks', 'Must Watch', 'Favorites', 'Weekend Watchlist', 'Critically Acclaimed',
        'Hidden Gems', 'Oscar Winners', 'Feel-Good Movies', 'Mind Benders', 'Cult Classics'
    ]) AS label
),
genres AS (
    SELECT unnest(ARRAY[
        'Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Romance',
        'Documentary', 'Thriller', 'Fantasy', 'Animated'
    ]) AS genre
),
numbered AS (
    SELECT
        row_number() OVER () AS id,
        g.genre,
        t.label
        FROM genres g
        CROSS JOIN titles t
        ORDER BY random()
        LIMIT 10
)
INSERT INTO movie_lists (list_title)
SELECT
    genre || ' - ' || label AS list_title
FROM numbered;

-- Custom Lists --
INSERT INTO movie_lists(list_title)
VALUES
('Timmy and Jannys Crappy List'),
('David Lynch Is Not Playing Around'),
('David Lynch Is Not Playing Around');


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


-- MOVIES ----------------------------------------------------------------------
-- Generated --
WITH titles AS (
  SELECT unnest(ARRAY[
    'The Last Horizon', 'Midnight Mirage', 'Echoes of Tomorrow', 'Shadows of the Past',
    'Gravity Well', 'Neon Skies', 'The Forgotten', 'Crimson Dust', 'Parallel Lives',
    'Silent Accord', 'Steel Hearts', 'Moonbreaker', 'Velocity Run', 'Binary Sunset',
    'Clockwork Souls', 'Urban Saints', 'After the Storm', 'Digital Ghosts',
    'Frostbite', 'The Fifth Signal', 'Lost Frequencies', 'The Archive',
    'Skybound', 'Blood Circuit', 'Terra 9', 'Whisper Protocol', 'Chrono City',
    'Dreamstate', 'SubZero', 'Iron Harvest', 'Deep Bloom', 'Vortex Shift',
    'The Hollow Mind', 'Nova Bound', 'Spectrum Divide', 'Zero Fall',
    'Obsidian Sleep', 'Future Relic', 'Quiet Vector', 'Synthetic Eden',
    'Echo Chamber', 'Terminal Rain', 'Voidlight', 'Second Pulse',
    'Edge of Stillness', 'The Long Loop', 'Memory Leak', 'Dark Algorithm',
    'Skyglass', 'Signal Lost'
  ]) AS movie_title
)
INSERT INTO movies (id, movie_title)
SELECT gen_random_uuid(), movie_title
FROM titles
LIMIT 50;


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
