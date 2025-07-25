namespace WatchNext.MovieLists
{
	public class MovieList
	{
		required public Guid list_id { get; set; }
		required public string list_title { get; set; }
		required public Guid[] movie_ids { get; set; }
		required public Guid[] owner_ids { get; set; }
		required public Guid creator_id { get; set; }
	}
}
