namespace WatchNext.DB;

public record User
{
    required public Guid user_id {get; set;}
    required public string user_name {get; set;}
    required public string primary_email {get; set;}
    required public bool deleted {get; set;}
}

public record Movie
{
    required public Guid movie_id {get; set;}
    required public string movie_title {get; set;}
    required public string imdb_tag {get; set;}
    required public int year {get; set;}
    required public string director {get; set;}
    required public float rating {get; set;}
}

public record MovieList
{
    required public Guid list_id {get; set;}
    required public string list_title {get; set;}
    required public Guid[] movie_ids {get; set;}
    required public Guid[] owner_ids {get; set;}
    required public Guid creator_id {get; set;}
}

// Temporary in memory DB and test data to use to test connection to frontend app
public class WatchNextDB
{
    // Test data ---------------------------------------------------------------
    private static List<User> _users = new List<User>()
    {
        new User{ user_id=Guid.NewGuid(), user_name="SaraConnor01", primary_email="saraconnor@netscape.com", deleted=false },
            new User{ user_id=Guid.NewGuid(), user_name="Paul42069", primary_email="bigsmoke@aol.com", deleted=false },
            new User{ user_id=Guid.NewGuid(), user_name="LaurenLikesMooovs", primary_email="laurenlikesmovies@gmail.com", deleted=false },
    };
    private static List<Movie> _movies = new List<Movie>()
    {
        new Movie{ movie_id=Guid.NewGuid(), movie_title="Test Movie 1", year=2002, director="Jim directorMan", rating=3.5f, imdb_tag="aaaa"},
            new Movie{ movie_id=Guid.NewGuid(), movie_title="Test Movie 2", year=2003, director="Jim directorMan's Son", rating=1.75f, imdb_tag="bbbb"},
            new Movie{ movie_id=Guid.NewGuid(), movie_title="Lame Movie 1", year=1995, director="Penny Marshall", rating=1.5f, imdb_tag="cccc"},
            new Movie{ movie_id=Guid.NewGuid(), movie_title="Lame Movie 2", year=2001, director="George Lucas", rating=0.25f, imdb_tag="dddd"},
            new Movie{ movie_id=Guid.NewGuid(), movie_title="The Spiral Notebook", year=2015, director="David Lynch", rating=5.0f, imdb_tag="eeee"},
    };
    private static List<MovieList> _movieLists = new List<MovieList>()
    {
        new MovieList{ list_id=Guid.NewGuid(), list_title="Super Movie List", movie_ids=[_movies[0].movie_id,_movies[1].movie_id], owner_ids=[_users[0].user_id], creator_id=_users[0].user_id },
            new MovieList{ list_id=Guid.NewGuid(), list_title="Lame Movie List", movie_ids=[_movies[2].movie_id,_movies[3].movie_id,_movies[4].movie_id], owner_ids=[_users[1].user_id,_users[2].user_id], creator_id=_users[1].user_id },
    };

    // Users -------------------------------------------------------------------
    public static List<User> GetUsers()
    {
        return _users.FindAll(user => user.deleted == false);
    }

    public static User ? GetUser(Guid id)
    {
        return _users.SingleOrDefault(user => user.user_id == id && user.deleted == false);
    }

    public static User ? CreateUser(User user)
    {
        _users.Add(user);
        return user;
    }

    public static User UpdateUser(User Rupdate)
    {
        _users = _users.Select(user =>
        {
            if (user.user_id == Rupdate.user_id)
            {
                user = Rupdate with { }; // weird way I have to call the copy constructor ¯\_(ツ)_/¯
            }
            return user;
        }).ToList();
        return Rupdate;
    }

    public static void DeleteUser(Guid id)
    {
        User? toUpdate = _users.Find(user => user.user_id == id);
        if (toUpdate != null)
        {
            toUpdate.deleted = true;
            UpdateUser(toUpdate);
        }
    }

    // Movies ------------------------------------------------------------------
    public static List<Movie> GetMovies()
    {
        return _movies;
    }

    public static Movie ? GetMovie(Guid id)
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
                movie = update with { }; // weird way I have to call the copy constructor ¯\_(ツ)_/¯
            }
            return movie;
        }).ToList();
        return update;
    }

    public static void DeleteMovie(Guid id)
    {
        _movies = _movies.FindAll(movie => movie.movie_id != id).ToList();
    }

    // Lists -------------------------------------------------------------------
    public static List<MovieList> GetMovieLists()
    {
        return _movieLists;
    }

    public static MovieList ? GetMovieList(Guid id)
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
                list = update with { }; // weird way I have to call the copy constructor ¯\_(ツ)_/¯
            }
            return list;
        }).ToList();
        return update;
    }

    public static void DeleteMovieList(Guid id)
    {
        _movieLists = _movieLists.FindAll(list => list.list_id != id).ToList();
    }
}
