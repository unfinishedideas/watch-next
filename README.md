# Watch Next!

-- This is currently a prototype under construction! --

## Concept

Watch Next! is a collaborative Watch List application where users can sign up, share and manage lists of TV Shows and Movies they want to watch.

They can leave reviews, comments and share lists publicly or privately.

## Setup and Running (Frontend)

- clone the repo if not already cloned: `git clone git@github.com:unfinishedideas/watch-next.git`
- navigate to the frontend directory `./frontend` with a shell and run `npm i` to install packages
- create new `.env` file based on `frontend/example.env` in the same location
- start with `npm run dev`

## Setup and Running (Backend)

- clone the repo if not already cloned: `git clone git@github.com:unfinishedideas/watch-next.git`
- navigate to the backend directory `./backend` with a shell 
- Create new `appsettings.json` file based on `./backend/example.appsettings.json` in the same location
- build and run the backend with `dotnet run`

## Setup database (Database)

- install postgreSQL on server
- install python (I use chocolatey on windows) and install psycopg2 with `pip install psycopg2`
- start the postgres server
- create new `.env` file based on `./database/example.env` in the same location
- run `python ./database/init.py` to setup a database and follow prompts

## Technologies

- React + Vite
- Typescript + SWC
- Tailwind.css + DaisyUI
- ASP.NET Core / C#
- PostgreSQL
- Python
- psycopg2

## Created by Peter Wells

[Contact me](petewellspdx@gmail.com)
