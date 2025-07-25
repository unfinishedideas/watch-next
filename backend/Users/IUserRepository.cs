using System.Runtime.CompilerServices;
using WatchNext.DB;

// THIS IS ALL UNDER CONSTRUCTION
// https://www.youtube.com/watch?v=J4ix8Mhi3rs

namespace WatchNext.Users
{
	public interface IUserRepository
	{
		Task<bool> Exists(string email);
		Task Insert(User user);
		Task<User?> GetByEmail(string email);
	}
}
