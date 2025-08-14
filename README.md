# Watch Next!

-- This is currently a prototyper under construction! --

## Concept

Watch Next! is a collaborative Watch List application where users can sign up, share and manage lists of TV Shows and Movies they want to watch.

They can leave reviews, comments and share lists publicly or privately.

## Setup and Running (Frontend)

- clone the repo if not already cloned: `git clone git@github.com:unfinishedideas/watch-next.git`
- navigate to the frontend directory `./frontend` with a shell and run `npm i` to install packages
- start with `npm run dev`

## Setup and Running (Backend)

- clone the repo if not already cloned: `git clone git@github.com:unfinishedideas/watch-next.git`
- navigate to the backend directory `./backend` with a shell 
- Create new `appsettings.json` file based on `example.appsettings.json`
- build and run the backend with `dotnet run`

## Setup database (Database)

- Install postgreSQL on server
- Install python (I use chocolatey on windows) and install psycopg2 with `pip install psycopg2`
- Start the postgres server
- Create new `.env` file based on `example.env`
- Run `python ./database/init.py` to setup a database and follow prompts

## Technologies

- React + Vite
- Typescript + SWC
- ASP.NET Core / C#
- PostgreSQL
- Python
- psycopg2

## Created by Peter Wells

[Contact me](petewellspdx@gmail.com)
