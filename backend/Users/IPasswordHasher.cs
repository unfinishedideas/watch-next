namespace WatchNext.Users
{
	public interface IPasswordHasher
	{
		public string Hash(string password);
	}
}
