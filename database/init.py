import psycopg2
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

def run_sql_file(filename, conn):
    with open(filename, 'r') as f:
        sql = f.read()
    with conn.cursor() as cur:
        cur.execute(sql)
        conn.commit()

def main():
    print("Connecting to database...")
    conn = psycopg2.connect(DATABASE_URL)
    
    if os.path.exists("./seed/init_seed.sql"):
        print("Erasing previous database...")
        run_sql_file("./seed/init_seed.sql", conn)

    print("Running schema.sql...")
    run_sql_file("schema.sql", conn)

    if os.path.exists("./seed/init_seed.sql"):
        print("Running users seed...")
        run_sql_file("./seed/seed_users.sql", conn)
        print("Running movies seed...")
        run_sql_file("./seed/seed_movies.sql", conn)
        print("Running movie_lists seed...")
        run_sql_file("./seed/seed_movie_lists.sql", conn)
        print("Running user_movie_lists seed...")
        run_sql_file("./seed/seed_user_movie_lists.sql", conn)
        print("Running movie_list_movies seed...")
        run_sql_file("./seed/seed_movie_list_movies.sql", conn)

    print("Database initialized successfully.")
    conn.close()

if __name__ == "__main__":
    main()
