namespace WatchNext.Movies
{
	public sealed class Movie
	{
		required public Guid id{ get; set; }
		required public DateTime created_at { get; set; }
		required public string title { get; set; }
		required public DateTime release_date { get; set; }
		required public string director { get; set; }
		required public string genre { get; set; }
		// TODO: Reintroduce these
		//required public string imdb_id { get; set; }
	}
	public sealed class MovieListMovie
	{
		required public Guid id{ get; set; }
		required public DateTime created_at { get; set; }
		required public string title { get; set; }
		required public DateTime release_date { get; set; }
		required public string director { get; set; }
		required public string genre { get; set; }
		required public int movie_order { get; set; }	// this is so users can order their lists
		// TODO: Reintroduce these
		//required public string imdb_id { get; set; }
	}
	public sealed class MovieListMovieReorder
	{
		required public Guid movie_id { get; set; }
		required public Guid list_id { get; set; }
		required public int movie_order { get; set; }
	}
	public sealed class MovieRegister
	{
		required public string title { get; set; }
		required public DateTime release_date { get; set; }
		required public string director { get; set; }
		required public string genre { get; set; }
	}
	public class UpdateMovieRequest()
	{
		required public Guid id { get; set; }
		public string? title { get; set; }
		public DateTime? release_date { get; set; }
		public string? director { get; set; }
		public string? genre { get; set; }
	}
}
