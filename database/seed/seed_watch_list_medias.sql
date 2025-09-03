-- MOVIE_LIST_MOVIES -----------------------------------------------------------
-- Generated --
INSERT INTO watch_list_medias (media_id, list_id, media_order)
SELECT
    media_id,
    list_id,
    ROW_NUMBER() OVER (PARTITION BY list_id ORDER BY RANDOM()) AS media_order
FROM (
    SELECT
        m.id AS media_id,
        ml.id AS list_id
    FROM (
        SELECT id FROM medias ORDER BY RANDOM() LIMIT 10
    ) AS m
    CROSS JOIN LATERAL (
        SELECT id
        FROM watch_lists
        WHERE title <> 'Timmy and Jannys Crappy List'   -- excluding this list as I want to populate it myself
        ORDER BY RANDOM()
        LIMIT 3
    ) AS ml
) AS combos
WHERE NOT EXISTS (
    SELECT 1
    FROM watch_list_medias mlm
    WHERE mlm.media_id = combos.media_id
      AND mlm.list_id = combos.list_id
);

-- Custom Relation --
INSERT INTO watch_list_medias (media_id, list_id, media_order)
SELECT
    m.id,
    ml.id,
    1
FROM medias m
JOIN watch_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
WHERE m.title = 'One Flew Over the Coocoos Nest'
    AND NOT EXISTS (
        SELECT 1
        FROM watch_list_medias mlm
        WHERE mlm.media_id = m.id AND mlm.list_id = ml.id
);

INSERT INTO watch_list_medias (media_id, list_id, media_order)
SELECT
    m.id,
    ml.id,
    2
FROM medias m
JOIN watch_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
WHERE m.title = 'Army of Darkness'
    AND NOT EXISTS (
        SELECT 1
        FROM watch_list_medias mlm
        WHERE mlm.media_id = m.id AND mlm.list_id = ml.id
);

INSERT INTO watch_list_medias (media_id, list_id, media_order)
SELECT
    m.id,
    ml.id,
    3
FROM medias m
JOIN watch_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
WHERE m.title = 'The Rescuers Down Under'
    AND NOT EXISTS (
        SELECT 1
        FROM watch_list_medias mlm
        WHERE mlm.media_id = m.id AND mlm.list_id = ml.id
);

INSERT INTO watch_list_medias (media_id, list_id, media_order)
SELECT
    m.id,
    ml.id,
    4
FROM medias m
JOIN watch_lists ml ON ml.title = 'Timmy and Jannys Crappy List'
WHERE m.title = 'Alien'
    AND NOT EXISTS (
        SELECT 1
        FROM watch_list_medias mlm
        WHERE mlm.media_id = m.id AND mlm.list_id = ml.id
);
