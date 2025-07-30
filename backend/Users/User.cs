namespace WatchNext.Users
{
	public record User
	{
		required public Guid Id { get; set; }
		required public string Username { get; set; } = "";
		required public string Email { get; set; } = "";
		required public string Password_Hash { get; set; } = "";
		required public bool Deleted { get; set; } = false;
		required public DateTime Created_At { get; set; }
	}

	public record UserRegister
	{
		required public string Username { get; set; } = "";
		required public string Email { get; set; } = "";
		required public string Password { get; set; } = "";
	}

	public record UserFrontend
	{
		required public Guid Id { get; set; }
		required public string Username { get; set; } = "";
		required public string Email { get; set; } = "";
		required public bool Deleted { get; set; } = false;
		public DateTime CreatedAt { get; set; }
	}
}
