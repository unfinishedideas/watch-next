namespace WatchNext.Movies
{
	public sealed class Movie
	{
		required public Guid Id{ get; set; }
		required public string Movie_Title { get; set; }
		required public DateTime Created_At { get; set; }
		// TODO: Reintroduce these
		//required public string imdb_id { get; set; }
		//required public int year { get; set; }
		//required public string director { get; set; }
		//required public float rating { get; set; }
	}
	public sealed class MovieRegister
	{
		required public string movie_title { get; set; }
	}
}
