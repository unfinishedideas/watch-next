namespace WatchNext.DB;

public record User
{
    required public string UserId {get; set;}
    required public string Username {get; set;}
    required public string PrimaryEmail {get; set;}
}

public record Movie
{
    required public string MovieId {get; set;}
    required public string Title {get; set;}
    required public int Year {get; set;}
    required public string Director {get; set;}
    required public float Rating {get; set;}
}

public record MovieList
{
    required public string ListId {get; set;}
    required public string Title {get; set;}
    required public string[] MovieIds {get; set;}
    required public string[] UserIds {get; set;}
}

// Temporary in memory DB and test data to use to test connection to frontend app
public class WatchNextDB
{

    private static List<User> _users = new List<User>()
    {
        new User{ UserId="001", Username="SaraConnor01", PrimaryEmail="saraconnor@netscape.com" },
            new User{ UserId="002", Username="Paul42069", PrimaryEmail="bigsmoke@aol.com" },
            new User{ UserId="003", Username="LaurenLikesMooovs", PrimaryEmail="laurenlikesmovies@gmail.com" },
    };
    private static List<Movie> _movies = new List<Movie>()
    {
        new Movie{ MovieId="0001", Title="Test Movie 1", Year=2002, Director="Jim DirectorMan", Rating=3.5f},
            new Movie{ MovieId="0002", Title="Test Movie 2", Year=2003, Director="Jim DirectorMan's Son", Rating=1.75f},
            new Movie{ MovieId="0003", Title="Lame Movie 1", Year=1995, Director="Penny Marshall", Rating=1.5f},
            new Movie{ MovieId="0004", Title="Lame Movie 2", Year=2001, Director="George Lucas", Rating=0.25f},
            new Movie{ MovieId="0005", Title="The Spiral Notebook", Year=2015, Director="David Lynch", Rating=5.0f},
    };
    private static List<MovieList> _movieLists = new List<MovieList>()
    {
        new MovieList{ ListId="00001", Title="Super Movie List", MovieIds=[_movies[0].MovieId,_movies[1].MovieId], UserIds=[_users[0].UserId] },
            new MovieList{ ListId="00002", Title="Lame Movie List", MovieIds=[_movies[2].MovieId,_movies[3].MovieId,_movies[4].MovieId], UserIds=[_users[1].UserId,_users[2].UserId] },
    };

    // Users -------------------------------------------------------------------
    public static List<User> GetUsers()
    {
        return _users;
    }

    public static User ? GetUser(string id)
    {
        return _users.SingleOrDefault(user => user.UserId == id);
    }

    public static User ? CreateUser(User user)
    {
        _users.Add(user);
        return user;
    }

    public static User UpdateUser(User update)
    {
        _users = _users.Select(user =>
        {
            if (user.UserId == update.UserId)
            {
                user.Username = update.Username;
                user.PrimaryEmail = update.PrimaryEmail;
            }
            return user;
        }).ToList();
        return update;
    }

    public static void DeleteUser(int id)
    {
        _users = _users.FindAll(user => user.UserId != id.ToString()).ToList();
    }

    // Movies ------------------------------------------------------------------
    public static List<Movie> GetMovies()
    {
        return _movies;
    }

    public static Movie ? GetMovie(string id)
    {
        return _movies.SingleOrDefault(movie => movie.MovieId == id);
    }

    public static Movie ? CreateMovie(Movie movie)
    {
        _movies.Add(movie);
        return movie;
    }

    public static Movie UpdateMovie(Movie update)
    {
        _movies = _movies.Select(movie =>
        {
            if (movie.MovieId == update.MovieId)
            {
               movie.Title = update.Title;
               movie.Year = update.Year;
               movie.Director = update.Director;
               movie.Rating = update.Rating;
            }
            return movie;
        }).ToList();
        return update;
    }

    public static void DeleteMovie(int id)
    {
        _movies = _movies.FindAll(movie => movie.MovieId != id.ToString()).ToList();
    }

    // Lists -------------------------------------------------------------------
    public static List<MovieList> GetMovieLists()
    {
        return _movieLists;
    }

    public static MovieList ? GetMovieList(string id)
    {
        return _movieLists.SingleOrDefault(list => list.ListId == id);
    }

    public static MovieList ? CreateMovieList(MovieList list)
    {
        _movieLists.Add(list);
        return list;
    }

    public static MovieList UpdateMovieList(MovieList update)
    {
        _movieLists = _movieLists.Select(list =>
        {
            if (list.ListId == update.ListId)
            {
                list.Title = update.Title;
                list.MovieIds = update.MovieIds;
                list.UserIds = update.UserIds;
            }
            return list;
        }).ToList();
        return update;
    }

    public static void DeleteMovieList(int id)
    {
        _movieLists = _movieLists.FindAll(list => list.ListId != id.ToString()).ToList();
    }
}
