namespace WatchNext
{
	public interface IPasswordHasher
	{
		public string Hash(string password);
	}
}
