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
    # Seed DB
    inputCheck = False
    while (inputCheck == False):
        print("Seed test data? (y / n)")
        shouldSeed = input()
        if (shouldSeed == 'y' or shouldSeed == 'n'):
            inputCheck = True
        else:
            print("Please enter 'y' or 'n'")

    if (shouldSeed == 'y'):
        print("Running users seed...")
        run_sql_file("./seed/seed_users.sql", conn)
        print("Running user_friends seed...")
        run_sql_file("./seed/seed_user_friends.sql", conn)
        print("Running medias seed...")
        run_sql_file("./seed/seed_medias.sql", conn)
        print("Running watch_lists seed...")
        run_sql_file("./seed/seed_watch_lists.sql", conn)
        print("Running user_watch_lists seed...")
        run_sql_file("./seed/seed_user_watch_lists.sql", conn)
        print("Running watch_list_medias seed...")
        run_sql_file("./seed/seed_watch_list_medias.sql", conn)

    print("Database initialized successfully.")
    conn.close()

if __name__ == "__main__":
    main()
