using WatchNext.Users;

namespace WatchNext.DB;

// TODO: Implement this - send back only what the frontend needs
public record UserFrontend
{
	required public Guid user_id { get; set; }
	required public string user_name { get; set; }
	required public string primary_email { get; set; }
	required public bool deleted { get; set; }	// don't know if we want this or not? Might be nice for lists to persist after user deleted
}

public record User
{
	required public Guid user_id { get; set; }
	required public string user_name { get; set; }
	required public string primary_email { get; set; }
	required public string password_hash { get; set; }
	required public bool deleted { get; set; }
}

public record Movie
{
	required public Guid movie_id { get; set; }
	required public string movie_title { get; set; }
	required public string imdb_id { get; set; }
	required public int year { get; set; }
	required public string director { get; set; }
	required public float rating { get; set; }
}

public record MovieList
{
	required public Guid list_id { get; set; }
	required public string list_title { get; set; }
	required public Guid[] movie_ids { get; set; }
	required public Guid[] owner_ids { get; set; }
	required public Guid creator_id { get; set; }
}

// Temporary in memory DB and test data to use to test connection to frontend app
public class WatchNextDB
{
	// Test data ---------------------------------------------------------------
	private static List<User> _users = new List<User>()
	{
		new User{ user_id=Guid.NewGuid(), user_name="SaraConnor01", primary_email="saraconnor@netscape.com", deleted=false, password_hash="123" },
			new User{ user_id=Guid.NewGuid(), user_name="Paul42069", primary_email="bigsmoke@aol.com", deleted=false, password_hash="123" },
			new User{ user_id=Guid.NewGuid(), user_name="LaurenLikesMooovs", primary_email="laurenlikesmovies@gmail.com", deleted=false, password_hash="123" },
	};
	private static List<Movie> _movies = new List<Movie>()
	{
		new Movie{ movie_id=Guid.NewGuid(), movie_title="Test Movie 1", year=2002, director="Jim directorMan", rating=3.5f, imdb_id="aaaa"},
			new Movie{ movie_id=Guid.NewGuid(), movie_title="Test Movie 2", year=2003, director="Jim directorMan's Son", rating=1.75f, imdb_id="bbbb"},
			new Movie{ movie_id=Guid.NewGuid(), movie_title="Lame Movie 1", year=1995, director="Penny Marshall", rating=1.5f, imdb_id="cccc"},
			new Movie{ movie_id=Guid.NewGuid(), movie_title="Lame Movie 2", year=2001, director="George Lucas", rating=0.25f, imdb_id="dddd"},
			new Movie{ movie_id=Guid.NewGuid(), movie_title="The Spiral Notebook", year=2015, director="David Lynch", rating=5.0f, imdb_id="eeee"},
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

	public static User? GetUser(Guid id)
	{
		User? user = _users.SingleOrDefault(user => user.user_id == id && user.deleted == false);
		if (user == null)
		{
			throw new Exception("User not found");
		}
		return user;
	}

	public static User? GetUserByEmail(string email)
	{
		User? user = _users.SingleOrDefault(user => user.primary_email == email && user.deleted == false);
		if (user == null)
		{
			throw new Exception("User not found");
		}
		return user;
	}

	public static User? CreateUser(User user, IPasswordHasher passwordHasher)
	{
		User? existingUser = _users.SingleOrDefault(u => u.user_id == user.user_id);
		if (existingUser != null)
		{
			throw new Exception("User already exists");
		}
		user.password_hash = passwordHasher.Hash(user.password_hash);
		_users.Add(user);
		return user;
	}

	public static User UpdateUser(User update)
	{
		bool foundUser = false;
		_users = _users.Select(user =>
		{
			if (user.user_id == update.user_id)
			{
				user = update with { }; // weird way I have to call the copy constructor ¯\_(ツ)_/¯
				foundUser = true;
			}
			return user;
		}).ToList();
		if (foundUser == false)
			throw new Exception("User not found!");
		return update;
	}

	public static void DeleteUser(Guid id)
	{
		User? toUpdate = _users.Find(user => user.user_id == id);
		if (toUpdate == null)
		{
			throw new Exception("User not found");
		}
		toUpdate.deleted = true;
		UpdateUser(toUpdate);
	}

	public static User? LoginUser(string email, string password, PasswordHasher passwordHasher)
	{
		User? user = GetUserByEmail(email);
        if (user == null)
        {
            throw new Exception("User was not found");
        }
		bool verified = passwordHasher.Verify(password, user.password_hash);
		if (!verified)
		{
			throw new Exception("Password is incorrect");
		}
		return user;
	}

	// Movies ------------------------------------------------------------------
	public static List<Movie> GetMovies()
	{
		return _movies;
	}

	public static Movie? GetMovie(Guid id)
	{
		Movie? movie = _movies.SingleOrDefault(movie => movie.movie_id == id);
		if (movie == null)
		{
			throw new Exception("Movie not found");
		}
		return movie;
	}

	public static Movie? CreateMovie(Movie movie)
	{
		Movie? existingMovie = _movies.SingleOrDefault(m => m.movie_id == movie.movie_id);
		if (existingMovie != null)
		{
			throw new Exception("Movie already exists");
		}
		_movies.Add(movie);
		return movie;
	}

	public static Movie UpdateMovie(Movie update)
	{
		bool foundMovie = false;
		_movies = _movies.Select(movie =>
		{
			if (movie.movie_id == update.movie_id)
			{
				movie = update with { }; // weird way I have to call the copy constructor ¯\_(ツ)_/¯
				foundMovie = true;
			}
			return movie;
		}).ToList();
		if (foundMovie == false)
		{
			throw new Exception("Movie not found");
		}
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

	public static MovieList? GetMovieList(Guid id)
	{
		MovieList? list = _movieLists.SingleOrDefault(list => list.list_id == id);
		if (list == null)
		{
			throw new Exception("MovieList not found");
		}
		return list;
	}

	public static MovieList? CreateMovieList(MovieList list)
	{
		MovieList? existingList = _movieLists.SingleOrDefault(l => l.list_id == list.list_id);
		if (existingList != null)
		{
			throw new Exception("MovieList already exists");
		}
		_movieLists.Add(list);
		return list;
	}

	public static MovieList UpdateMovieList(MovieList update)
	{
		bool foundList = false;
		_movieLists = _movieLists.Select(list =>
		{
			if (list.list_id == update.list_id)
			{
				list = update with { }; // weird way I have to call the copy constructor ¯\_(ツ)_/¯
				foundList = true;
			}
			return list;
		}).ToList();
		if (foundList == false)
		{
			throw new Exception("MovieList not found");
		}
		return update;
	}

	public static void DeleteMovieList(Guid id)
	{
		_movieLists = _movieLists.FindAll(list => list.list_id != id).ToList();
	}
}
