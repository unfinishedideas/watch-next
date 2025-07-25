/*
namespace WatchNext.Users
{
	public sealed class RegisterUser(IUserRepository userRepo, IPasswordHasher passwordHasher)
	{
		public sealed record Request(string Email, string Username, string Password);

		public async Task<User> Handle(Request request)
		{
			if (await userRepo.Exists(request.Email))
			{
				throw new Exception("User email already exists");
			}

			var user = new User
			{
				user_id = Guid.NewGuid(),
				primary_email = request.Email,
				user_name = request.Username,
				password_hash = passwordHasher.Hash(request.Password),
				deleted = false
			};

			await userRepo.Insert(user);

			// Email verification?
			// Access token?

			return user;
		}
	}
}
*/
