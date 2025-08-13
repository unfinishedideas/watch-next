namespace WatchNext.WatchLists
{
	public class WatchList
	{
		required public Guid id { get; set; }
		required public string title { get; set; }
		required public DateTime created_at { get; set; }
		required public bool is_private { get; set; }
	}
	public class RegisterWatchListRequest()
	{
		required public string title { get; set; }
		required public bool is_private { get; set; }
	}
	public class UpdateWatchListRequest()
	{
		public required Guid id { get; set; }
		public string? title { get; set; }
		public bool? is_private { get; set; }
	}
}
