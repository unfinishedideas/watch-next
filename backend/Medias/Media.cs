namespace WatchNext.Medias
{
	public class Media
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
	// Public facing media object so users can order their lists
	public sealed class WatchListMedia : Media
	{
		required public int media_order { get; set; }
		required public bool watched { get; set; }
	}
	// Used when reordering medias in the database
	public sealed class WatchListMediaUpdate
	{
		required public Guid media_id { get; set; }
		required public Guid list_id { get; set; }
		public int media_order { get; set; }
		public bool watched { get; set; }
	}
	public sealed class MediaRegister
	{
		required public string title { get; set; }
		required public DateTime release_date { get; set; }
		required public string director { get; set; }
		required public string genre { get; set; }
	}
	public class UpdateMediaRequest()
	{
		required public Guid id { get; set; }
		public string? title { get; set; }
		public DateTime? release_date { get; set; }
		public string? director { get; set; }
		public string? genre { get; set; }
	}
}
