namespace WatchNext.MovieLists
{
	public class MovieList
	{
		required public Guid id { get; set; }
		required public string title { get; set; }
		required public DateTime created_at { get; set; }
		required public bool is_private { get; set; }
	}
	public class RegisterMovieListRequest()
	{
		required public string title { get; set; }
		required public bool is_private { get; set; }
	}
	public class UpdateMovieListRequest()
	{
		public required Guid id { get; set; }
		public string? title { get; set; }
		public bool? is_private { get; set; }
	}
}
