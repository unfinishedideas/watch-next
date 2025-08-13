DROP TABLE IF EXISTS watch_list_movies, watch_lists, movies, user_watch_lists, users;

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS watch_lists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_private BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS user_watch_lists (
    user_id UUID NOT NULL,
    list_id UUID NOT NULL,
    PRIMARY KEY (user_id, list_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (list_id) REFERENCES watch_lists(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS movies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(50) NOT NULL,
    release_date DATE NOT NULL,
    director VARCHAR(50) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS watch_list_movies (
    movie_id UUID NOT NULL,
    list_id UUID NOT NULL,
    movie_order INT NOT NULL DEFAULT 0,
    watched BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (movie_id, list_id),
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (list_id) REFERENCES watch_lists(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
