namespace WatchNext.Users
{
	public record User_PROTO
	{
		required public Guid user_id { get; set; }
		required public string user_name { get; set; }
		required public string primary_email { get; set; }
		required public string password_hash { get; set; }
		required public bool deleted { get; set; }
	}
}
