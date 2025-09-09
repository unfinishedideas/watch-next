namespace WatchNext.Medias
{
	public class TVDBService
	{
		private readonly string Key = "";

		public TVDBService(string key)
		{
			if (key == null)
			{
				Console.Error.WriteLine("TVDBService key not set, please confirm environment variables or UserSecrets is configured properly");
				throw new ArgumentNullException(nameof(key));
			}
			this.Key = key;
		}

		public void ShoutStuff()
		{
			Console.WriteLine(Key);
		}
	}
}
