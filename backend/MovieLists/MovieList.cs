namespace WatchNext.MovieLists
{
	public class MovieList
	{
		required public Guid id { get; set; }
		required public string list_title { get; set; }
		required public DateTime created_at { get; set; }
		required public bool is_private { get; set; }
	}
	public class RegisterMovieListRequest()
	{
		required public string list_title { get; set; }
		required public bool is_private { get; set; }
	}
	public class UpdateMovieListRequest()
	{
		public required Guid id { get; set; }
		public string? list_title { get; set; }
		public bool? is_private { get; set; }
	}

	public class UpdateUserMovieListRequest()
	{
		public required Guid list_id { get; set; }
		public required Guid user_id { get; set; }
	}

	public class UpdateMoviesMovieListRequest()
	{
		public required Guid list_id { get; set; }
		public required Guid movie_id { get; set; }
	}

}
