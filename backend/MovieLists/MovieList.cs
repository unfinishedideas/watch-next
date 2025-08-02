namespace WatchNext.MovieLists
{
	public class MovieList
	{
		required public Guid Id { get; set; }
		required public string List_Title { get; set; }
		required public DateTime Created_At { get; set; }
	}
}
