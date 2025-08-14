# Database

## Technology

- PostgreSQL
- Python
- psycopg2

## Setup

- Install postgreSQL on server
- Install python (I use chocolatey on windows) and install psycopg2 with `pip install psycopg2`
- Start the postgres server
- Create new `.env` file based on `example.env`
- Run `python ./database/init.py` to setup a database and follow prompts

## ERD Diagram

![ERD Diagram](./erd.png)
