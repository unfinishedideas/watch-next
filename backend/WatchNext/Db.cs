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
    required public Movie[] Movies {get; set;}
    required public User[] CreatedBy {get; set;}
}

// Temporary DB and test data to use to test connection to frontend app
public class WatchNextDB
{

    private static List<User> _users = new List<User>()
    {
        new User{ UserId="001", Username="SaraConnor01", PrimaryEmail="saraconnor@netscape.com" },
            new User{ UserId="002", Username="Paul42069", PrimaryEmail="bigsmoke@aol.com" },
            new User{ UserId="003", Username="SaraConnor01", PrimaryEmail="laurenlikesmovies@gmail.com" },
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
        new MovieList{ ListId="00001", Title="Super Movie List", Movies=[_movies[0],_movies[1]], CreatedBy=[_users[0]] },
            new MovieList{ ListId="00002", Title="Lame Movie List", Movies=[_movies[2],_movies[3],_movies[4]], CreatedBy=[_users[1],_users[2]] },
    };

    // Users -------------------------------------------------------------------
    public static List<User> GetUsers()
    {
        return _users;
    }

    public static User ? GetUser(int id)
    {
        return _users.SingleOrDefault(user => user.UserId == id.ToString());
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

    public static void RemoveUser(int id)
    {
        _users = _users.FindAll(user => user.UserId != id.ToString()).ToList();
    }

    // Movies ------------------------------------------------------------------
    // Lists -------------------------------------------------------------------
}
