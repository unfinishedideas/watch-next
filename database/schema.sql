CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS movie_lists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    list_title VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_movie_lists (
    user_id UUID NOT NULL,
    list_id UUID NOT NULL,
    PRIMARY KEY (user_id, list_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (list_id) REFERENCES movie_lists(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS movies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    movie_title VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS movie_list_movies (
    movie_id UUID NOT NULL,
    list_id UUID NOT NULL,
    PRIMARY KEY (movie_id, list_id),
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (list_id) REFERENCES movie_lists(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
