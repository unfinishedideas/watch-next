# WatchNext! - Database

[Back to home](../README.md)

## Setup and Running (Database)

- install [postgreSQL](https://www.postgresql.org/) on server
- install [python](https://www.python.org/downloads/) 
- install required packages either with `pip install -r requirements.txt` or by installing them manually (see below)
    - install [psycopg2](https://pypi.org/project/psycopg2/) with `pip install psycopg2`
    - install [dotenv](https://pypi.org/project/python-dotenv/) with `pip install dotenv`
- restart the machine or start the [postgres database server manually](https://www.postgresql.org/docs/current/server-start.html)
- create new `.env` file based on `./database/example.env` in the same location
- run `python ./database/init.py` to setup a database and follow prompts
- you can now check the database by running `psql -d dbname -U postgres` and running SQL commands (you may need to add psql to PATH environment variable)
- for example: Use `\dt` to confirm all the tables were added to the database properly.

## Technology

- PostgreSQL
- Python
- psycopg2

## ERD Diagram

![ERD Diagram](./erd.png)
