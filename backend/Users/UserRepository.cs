/*
// This is under construction - here is reference for it
// https://www.youtube.com/watch?v=J4ix8Mhi3rs
// 9:44

using WatchNext.DB;
using WatchNext.Database;

namespace WatchNext.Users
{
	public sealed class UserRepository(AppDbContext dbContext) : IUserRepository
	{
		public async Task<bool> Exists(string email)
		{
			//return await dbContext.Users.AnyAsync(u => u.Email == email);
			throw new NotImplementedException();
		}

		async Task IUserRepository.Insert(User user)
		{
			//dbContext.Users.Add(user);
			//await dbContext.SaveChangesAsync();
			throw new NotImplementedException();
		}

		async Task<User?> IUserRepository.GetByEmail(string email)
		{
			//return await dbContext.Users.SingleOrDefaultAsync(u => u.Email == email);
			throw new NotImplementedException();
		}
	}
}
*/
