namespace WatchNext.Movies
{
	public sealed class Movie
	{
		required public Guid Id{ get; set; }
		required public DateTime Created_At { get; set; }
		required public string Title { get; set; }
		required public DateTime Release_Date { get; set; }
		required public string Director { get; set; }
		required public string Genre { get; set; }
		// TODO: Reintroduce these
		//required public string imdb_id { get; set; }
	}
	public sealed class MovieRegister
	{
		required public string Title { get; set; }
		required public DateTime Release_Date { get; set; }
		required public string Director { get; set; }
		required public string Genre { get; set; }
	}
	public class UpdateMovieRequest()
	{
		required public Guid Id { get; set; }
		public string? Title { get; set; }
		public DateTime? Release_Date { get; set; }
		public string? Director { get; set; }
		public string? Genre { get; set; }
	}
}
