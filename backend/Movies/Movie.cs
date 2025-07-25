namespace WatchNext.Movies
{
	public sealed class Movie
	{
		required public Guid movie_id { get; set; }
		required public string movie_title { get; set; }
		required public string imdb_id { get; set; }
		required public int year { get; set; }
		required public string director { get; set; }
		required public float rating { get; set; }
	}
}
