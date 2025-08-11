-- MOVIES ----------------------------------------------------------------------
WITH
  arrays AS (
    SELECT
      ARRAY['Shadow', 'Echo', 'Iron', 'Whispers', 'Neon', 'Silent', 'Crimson', 'Last', 'Broken', 'Fading'] AS titles1,
      ARRAY['Dream', 'Empire', 'Storm', 'Memory', 'Light', 'Fall', 'Machine', 'Voices', 'Horizon', 'Maze'] AS titles2,
      ARRAY['Olivia','Marcus','Rachel','Victor','Nina','Leo','Ava','Jonas','Clara','Henry','Julian','Amara','Theo','Freya','Elias','Maya','Silas','Zoe','Sebastian','Isla'] AS director_first,
      ARRAY['Waters','Bloom','Keene','Dane','Carter','Vargas','Monroe','Reeve','Ray','Vale','Knox','Winters','Hale','Stone','Bishop','Wolfe','Griffin','March','Black','Quinn'] AS director_last,
      ARRAY['Action','Sci-Fi','Drama','Thriller','Romance','Adventure','Cyberpunk','Mystery','Horror','Historical','Fantasy','Comedy','Crime','Documentary','Animation'] AS genres
  )

-- Generate and insert 20 random movies
INSERT INTO movies (title, director, genre, release_date)
SELECT
  initcap(arr.titles1[ceil(random() * array_length(arr.titles1, 1))::int]) || ' ' ||
  initcap(arr.titles2[ceil(random() * array_length(arr.titles2, 1))::int]) AS title,

  initcap(arr.director_first[ceil(random() * array_length(arr.director_first, 1))::int]) || ' ' ||
  initcap(arr.director_last[ceil(random() * array_length(arr.director_last, 1))::int]) AS director,

  arr.genres[ceil(random() * array_length(arr.genres, 1))::int] AS genre,

  DATE '1950-01-01' + floor(random() * (DATE '2025-12-31' - DATE '1950-01-01'))::int AS release_date

FROM generate_series(1, 20), arrays arr;

-- custom movies --
INSERT INTO movies (title, director, genre, release_date)
VALUES
('One Flew Over the Coocoos Nest', 'Milos Forman', 'Drama', '1975-11-19'),
('Army of Darkness','Sam Raimi','Action Comedy','1993-02-19'),
('The Rescuers Down Under','Mike Gabriel / Hendel Butoy','Animated Adventure','1990-11-16'),
('Alien','Ridley Scott','Sci Fi Horror','1979-06-22');
