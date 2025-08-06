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
