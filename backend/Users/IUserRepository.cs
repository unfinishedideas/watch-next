using System.Runtime.CompilerServices;
using WatchNext.DB;

// THIS IS ALL UNDER CONSTRUCTION
/*

namespace WatchNext.Users
{
	public interface IUserRepository
	{
		private static List<User> UserPool = new List<User>();

		public async Task<bool> Exists(string email)
		{
			foreach (User user in UserPool)
			{
				if (user.primary_email == email)
					return true;
			}
			return false;
		}

		public async Task Insert(User user)
		{
			if (!await Exists(user.primary_email))
			{
				UserPool.Add(user);
			}
		}

		public async Task Delete(Guid id)
		{
			User? toUpdate = UserPool.Find(user => user.user_id == id);
			if (toUpdate != null)
			{
				toUpdate.deleted = true;
				await Update(toUpdate);
			}
		}

		public async Task<User> Update(User update)
		{
			UserPool = UserPool.Select(user =>
			{
				if (user.user_id == update.user_id)
				{
					user = update with { }; // weird way I have to call the copy constructor ¯\_(ツ)_/¯
				}
				return user;
			}).ToList();
			return update;

		}

		public async Task<User> Get(Guid id)
		{
			return UserPool.SingleOrDefault(user => user.user_id == id);
		}

		public async Task<List<User>> GetUsers()
		{
			return UserPool;
		}
	}
}
*/
