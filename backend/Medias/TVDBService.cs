namespace WatchNext.Medias
{
	public class TVDBLoginResponse
	{
		public string Status { get; set; } = string.Empty;
		public TVDBLoginData Data { get; set; } = new();
	}

	public class TVDBLoginData
	{
		public string Token { get; set; } = string.Empty;
	}

	public class TVDBService
	{
		private readonly HttpClient _httpClient;
		private readonly string _apiKey;
		private string? _token;
		private DateTime _tokenExpiry = DateTime.MinValue;

		public TVDBService(HttpClient httpClient, IConfiguration config)
		{
			_httpClient = httpClient;
			_apiKey = config["TVDB:Key"]
					  ?? throw new InvalidOperationException("TVDB API key missing");
		}

		private async Task EnsureAuthenticatedAsync()
		{
			if (!string.IsNullOrEmpty(_token) && _tokenExpiry > DateTime.UtcNow)
			{
				return;
			}
			if (string.IsNullOrEmpty(_token))
			{
				await LoginAsync();
			}
			else
			{
				var refreshed = await RefreshTokenAsync();
				if (!refreshed)
				{
					await LoginAsync();
				}
			}
		}

		private async Task LoginAsync()
		{
			var payload = new { apikey = _apiKey };
			var response = await _httpClient.PostAsJsonAsync("login", payload);
			response.EnsureSuccessStatusCode();

			var loginResponse = await response.Content.ReadFromJsonAsync<TVDBLoginResponse>();
			_token = loginResponse?.Data?.Token
					 ?? throw new InvalidOperationException("TVDB token missing in login response");

			_httpClient.DefaultRequestHeaders.Authorization =
				new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _token);

			// tokens last 1 month
			_tokenExpiry = DateTime.UtcNow.AddHours(710);
		}

		private async Task<bool> RefreshTokenAsync()
		{
			try
			{
				var response = await _httpClient.GetAsync("refresh_token");
				if (!response.IsSuccessStatusCode) return false;

				var refreshResponse = await response.Content.ReadFromJsonAsync<TVDBLoginResponse>();
				_token = refreshResponse?.Data?.Token;
				if (string.IsNullOrEmpty(_token)) return false;

				_httpClient.DefaultRequestHeaders.Authorization =
					new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _token);

				// tokens last 1 month
				_tokenExpiry = DateTime.UtcNow.AddHours(710);
				return true;
			}
			catch
			{
				return false;
			}
		}

		public async Task<string> SearchSeriesAsync(string query)
		{
			await EnsureAuthenticatedAsync();

			var response = await _httpClient.GetAsync($"search?query={Uri.EscapeDataString(query)}");
			response.EnsureSuccessStatusCode();

			return await response.Content.ReadAsStringAsync();
		}
	}
}
