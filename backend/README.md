# Watch Next! - Backend Service

## What it is

This is a basic backend service for the Watch Next! application

## Configuration

### Setup and Running (Backend)

- clone the repo if not already cloned: `git clone git@github.com:unfinishedideas/watch-next.git`
- navigate to the backend directory `./backend` with a shell
- Create new `appsettings.json` file based on `./backend/example.appsettings.json` in the same location
- build and run the backend with `dotnet run`

### Set TVDB API Key (DEVELOPMENT)

In order to access the TVDB Api, you must set the key. In production this is done with Environment Variables

- Navigate to the root folder for the backend in terminal `cd [project root]/backend`
- Run the following:
  1. `dotnet user-secrets init`
  2. `dotnet user-secrets set "TVDB:Key" "YOUR TVDB API KEY HERE"`

## Technology

- [ASP.NET 9.0](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
