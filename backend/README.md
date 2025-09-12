# Watch Next! - Backend Service

[Back to home](../README.md)

## Setup and Running (Backend)

- clone the repo if not already cloned: `git clone git@github.com:unfinishedideas/watch-next.git`
- navigate to the backend directory `./backend` with a shell
- install and configure [C# / ASP.NET](https://dotnet.microsoft.com/en-us/download) (Alternative: Use [Visual Studio](https://visualstudio.microsoft.com/) to install C# dependencies)
- create new `appsettings.json` file based on `./backend/example.appsettings.json` in the same location
- ensure the [database service is setup and working first](../database/README.md)
- build and run the backend with `dotnet run`
- I recommend using an API client like [Bruno](https://www.usebruno.com/) to test the various API endpoints

### Set TVDB API Key (Required)

In order to access the TVDB Api, you must set an api key. In production this is done with an Environment Variable named `TVDBKey`.

- For user-secret (preferred for development builds)
- Navigate to the root folder for the backend in terminal `cd [project root]/backend`
- Run the following:
  1. `dotnet user-secrets init`
  2. `dotnet user-secrets set "TVDB:Key" "YOUR TVDB API KEY HERE"`

## Technology

- [ASP.NET 9.0](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
