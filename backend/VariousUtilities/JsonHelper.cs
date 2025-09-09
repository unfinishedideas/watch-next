using System.Text.Json;

namespace WatchNext.VariousUtilities
{
	public static class JsonHelper
	{
		/// <summary>
		/// Returns the first object in the "data" array and deserializes it into type T.
		/// Handles "yyyy-MM-dd" formatted dates automatically.
		/// </summary>
		public static T? DeserializeFirstDataObject<T>(string jsonString)
		{
			using JsonDocument doc = JsonDocument.Parse(jsonString);
			JsonElement root = doc.RootElement;

			if (!root.TryGetProperty("data", out JsonElement dataElement))
				throw new Exception("JSON does not contain a 'data' property.");

			if (dataElement.ValueKind != JsonValueKind.Array || dataElement.GetArrayLength() == 0)
				throw new Exception("'data' array is empty or not an array.");

			JsonElement firstItemElement = dataElement[0];

			var options = new JsonSerializerOptions
			{
				PropertyNameCaseInsensitive = true,
				Converters = { new ShortDateConverter() }
			};

			return JsonSerializer.Deserialize<T>(firstItemElement.GetRawText(), options);
		}
	}
}
