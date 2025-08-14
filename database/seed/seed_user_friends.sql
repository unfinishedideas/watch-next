-- USER_FRIENDS ----------------------------------------------------------------
-- Custom Relations --
INSERT INTO user_friends (user1_id, user2_id, status)
SELECT
    u1.id,
    u2.id,
    'pending'
FROM users u1
JOIN users u2 ON u1.username = 'kathryn' AND u2.username = 'davidlynch'
ON CONFLICT DO NOTHING;

INSERT INTO user_friends (user1_id, user2_id, status)
SELECT
    u1.id,
    u2.id,
    'pending'
FROM users u1
JOIN users u2 ON u1.username = 'gorgelucas' AND u2.username = 'davidlynch'
ON CONFLICT DO NOTHING;
