namespace WatchNext.DB;

public record User
{
    required public string user_id {get; set;}
    required public string user_name {get; set;}
    required public string primary_email {get; set;}
}

public record Movie
{
    required public string movie_id {get; set;}
    required public string movie_title {get; set;}
    required public string imdb_tag {get; set;}
    required public int year {get; set;}
    required public string director {get; set;}
    required public float rating {get; set;}
}

public record MovieList
{
    required public string list_id {get; set;}
    required public string list_title {get; set;}
    required public string[] movie_ids {get; set;}
    required public string[] user_ids {get; set;}
}

// Temporary in memory DB and test data to use to test connection to frontend app
public class WatchNextDB
{

    private static List<User> _users = new List<User>()
    {
        new User{ user_id="001", user_name="SaraConnor01", primary_email="saraconnor@netscape.com" },
            new User{ user_id="002", user_name="Paul42069", primary_email="bigsmoke@aol.com" },
            new User{ user_id="003", user_name="LaurenLikesMooovs", primary_email="laurenlikesmovies@gmail.com" },
    };
    private static List<Movie> _movies = new List<Movie>()
    {
        new Movie{ movie_id="0001", movie_title="Test Movie 1", year=2002, director="Jim directorMan", rating=3.5f, imdb_tag="aaaa"},
            new Movie{ movie_id="0002", movie_title="Test Movie 2", year=2003, director="Jim directorMan's Son", rating=1.75f, imdb_tag="bbbb"},
            new Movie{ movie_id="0003", movie_title="Lame Movie 1", year=1995, director="Penny Marshall", rating=1.5f, imdb_tag="cccc"},
            new Movie{ movie_id="0004", movie_title="Lame Movie 2", year=2001, director="George Lucas", rating=0.25f, imdb_tag="dddd"},
            new Movie{ movie_id="0005", movie_title="The Spiral Notebook", year=2015, director="David Lynch", rating=5.0f, imdb_tag="eeee"},
    };
    private static List<MovieList> _movieLists = new List<MovieList>()
    {
        new MovieList{ list_id="00001", list_title="Super Movie List", movie_ids=[_movies[0].movie_id,_movies[1].movie_id], user_ids=[_users[0].user_id] },
            new MovieList{ list_id="00002", list_title="Lame Movie List", movie_ids=[_movies[2].movie_id,_movies[3].movie_id,_movies[4].movie_id], user_ids=[_users[1].user_id,_users[2].user_id] },
    };

    // Users -------------------------------------------------------------------
    public static List<User> GetUsers()
    {
        return _users;
    }

    public static User ? GetUser(string id)
    {
        return _users.SingleOrDefault(user => user.user_id == id);
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
            if (user.user_id == update.user_id)
            {
                user.user_name = update.user_name;
                user.primary_email = update.primary_email;
            }
            return user;
        }).ToList();
        return update;
    }

    public static void DeleteUser(int id)
    {
        _users = _users.FindAll(user => user.user_id != id.ToString()).ToList();
    }

    // Movies ------------------------------------------------------------------
    public static List<Movie> GetMovies()
    {
        return _movies;
    }

    public static Movie ? GetMovie(string id)
    {
        return _movies.SingleOrDefault(movie => movie.movie_id == id);
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
            if (movie.movie_id == update.movie_id)
            {
               movie.movie_title = update.movie_title;
               movie.year = update.year;
               movie.director = update.director;
               movie.rating = update.rating;
            }
            return movie;
        }).ToList();
        return update;
    }

    public static void DeleteMovie(int id)
    {
        _movies = _movies.FindAll(movie => movie.movie_id != id.ToString()).ToList();
    }

    // Lists -------------------------------------------------------------------
    public static List<MovieList> GetMovieLists()
    {
        return _movieLists;
    }

    public static MovieList ? GetMovieList(string id)
    {
        return _movieLists.SingleOrDefault(list => list.list_id == id);
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
            if (list.list_id == update.list_id)
            {
                list.list_title = update.list_title;
                list.movie_ids = update.movie_ids;
                list.user_ids = update.user_ids;
            }
            return list;
        }).ToList();
        return update;
    }

    public static void DeleteMovieList(int id)
    {
        _movieLists = _movieLists.FindAll(list => list.list_id != id.ToString()).ToList();
    }
}
