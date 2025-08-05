using System.Security.Cryptography;

namespace WatchNext.Users
{
	public sealed class PasswordHasher : IPasswordHasher
	{
		// Note: Do not change these values unless you want to account for old passwords using these values in addition to the new ones
		private const int SaltSize = 16;
		private const int HashSize = 32;
		private const int Iterations = 100000;
		private readonly HashAlgorithmName Algorithm = HashAlgorithmName.SHA512;

		public string Hash(string password)
		{
			byte[] salt = RandomNumberGenerator.GetBytes(SaltSize);                                         // array of crypto strong random values
			byte[] hash = Rfc2898DeriveBytes.Pbkdf2(password.ToLower(), salt, Iterations, Algorithm, HashSize);       // password-based key derivation function
			return $"{Convert.ToHexString(hash)}-{Convert.ToHexString(salt)}";
		}

		public bool Verify(string password, string passwordHash)
		{
			string[] parts = passwordHash.Split('-');
			byte[] hash = Convert.FromHexString(parts[0]);
			byte[] salt = Convert.FromHexString(parts[1]);

			byte[] inputHash = Rfc2898DeriveBytes.Pbkdf2(password.ToLower(), salt, Iterations, Algorithm, HashSize);
			return CryptographicOperations.FixedTimeEquals(hash, inputHash);	// we use this instead of hash.SequenceEqual(inputHash) to avoid timing attacks
		}
	}
}
