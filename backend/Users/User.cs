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

		// Lowercase string fields before updating / creating users
		public void LowercaseFields()
		{
			Username = Username.ToLower();
			Email = Email.ToLower();
		}
	}

	public record UserRegister
	{
		required public string Username { get; set; } = "";
		required public string Email { get; set; } = "";
		required public string Password { get; set; } = "";

		// Lowercase string fields before creating users
		public void LowercaseFields()
		{
			Username = Username.ToLower();
			Email = Email.ToLower();
			Password = Password.ToLower();
		}
	}

	public record UserFrontend
	{
		required public Guid Id { get; set; }
		required public string Username { get; set; } = "";
		required public string Email { get; set; } = "";
		required public bool Deleted { get; set; } = false;
		public DateTime Created_At { get; set; }
	}
}
