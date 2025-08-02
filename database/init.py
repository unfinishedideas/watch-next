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
    
    print("Running schema.sql...")
    run_sql_file("schema.sql", conn)

    # Optional: seed data
    if os.path.exists("seed.sql"):
        print("Running seed.sql...")
        run_sql_file("./seed/seed_users.sql", conn)
        run_sql_file("./seed/seed_movies.sql", conn)
        run_sql_file("./seed/seed_movie_lists.sql", conn)
        run_sql_file("seed.sql", conn)

    print("Database initialized successfully.")
    conn.close()

if __name__ == "__main__":
    main()
