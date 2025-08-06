namespace WatchNext.Users
{
	public record User
	{
		required public Guid id { get; set; }
		required public string username { get; set; } = "";
		required public string email { get; set; } = "";
		required public string password_hash { get; set; } = "";
		required public bool deleted { get; set; } = false;
		required public DateTime created_at { get; set; }

		// Lowercase string fields before updating / creating users
		public void LowercaseFields()
		{
			username = username.ToLower();
			email = email.ToLower();
		}
	}

	public record UserRegister
	{
		required public string username { get; set; } = "";
		required public string email { get; set; } = "";
		required public string Password { get; set; } = "";

		// Lowercase string fields before creating users
		public void LowercaseFields()
		{
			username = username.ToLower();
			email = email.ToLower();
			Password = Password.ToLower();
		}
	}

	public record UserFrontend
	{
		required public Guid id { get; set; }
		required public string username { get; set; } = "";
		required public string email { get; set; } = "";
		required public bool deleted { get; set; } = false;
		public DateTime created_at { get; set; }
	}

	public class LoginUserRequest
	{
		public required string email { get; set; }
		public required string password { get; set; }
	}

	public class UpdateUserRequest
	{
		public required Guid id { get; set; }
		public required string password { get; set; }
		public string? email { get; set; }
		public string? username { get; set; }
		public bool? deleted { get; set; }
		public string? new_password { get; set; }

		public void LowercaseFields()
		{
			if (email != null)
			{
				email = email.ToLower();
			}
			if (username != null)
			{
				username = username.ToLower();
			}
			if (new_password != null)
			{
				new_password = new_password.ToLower();
			}
		}
	}
}
