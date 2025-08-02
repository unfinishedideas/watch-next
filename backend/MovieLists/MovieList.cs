namespace WatchNext.MovieLists
{
	public class MovieList
	{
		required public Guid Id { get; set; }
		required public string List_Title { get; set; }
		required public DateTime Created_At { get; set; }
	}

	public class UpdateMovieListRequest()
	{
		public required Guid id { get; set; }
		public required string listTitle { get; set; }
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
