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

