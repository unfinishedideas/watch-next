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
INSERT INTO watch_lists (title, is_private)
SELECT
    genre || ' - ' || label AS title,
    (random() < 0.5)::boolean
FROM numbered;

-- Custom Lists --
INSERT INTO watch_lists(title)
VALUES
('Timmy and Jannys Crappy List'),
('David Lynch Is Not Playing Around'),
('Peter and Sams Watch List'),
('The Arnoldverse'),
('The Arnoldverse'),
('The Arnoldverse');

