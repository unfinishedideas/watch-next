using System.Security.Cryptography;

namespace WatchNext.Users
{
	public sealed class PasswordHasher : IPasswordHasher
	{
		private const int SaltSize = 16;
		private const int HashSize = 32;
		private const int Iterations = 100000;

		private readonly HashAlgorithmName Algorithm = HashAlgorithmName.SHA512;

		public string Hash(string password)
		{
			byte[] salt = RandomNumberGenerator.GetBytes(SaltSize);                                         // array of crypto strong random values
			byte[] hash = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, Algorithm, HashSize);       // password-based key derivation function
			return $"{Convert.ToHexString(hash)}-{Convert.ToHexString(salt)}";
		}
	}
}
