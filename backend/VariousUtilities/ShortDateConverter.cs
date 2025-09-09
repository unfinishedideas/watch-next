using System.Text.Json;
using System.Text.Json.Serialization;

namespace WatchNext.VariousUtilities
{
	// Override DateTime.Read() and Write() in order to properly read the date
	public class ShortDateConverter : JsonConverter<DateTime>
	{
		private readonly string _format = "yyyy-MM-dd";

		public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
		{
			string? value = reader.GetString();
			if (DateTime.TryParseExact(value, _format, null, System.Globalization.DateTimeStyles.None, out DateTime date))
				return date;

			throw new JsonException($"Invalid date format: {value}");
		}

		public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
		{
			writer.WriteStringValue(value.ToString(_format));
		}
	}
}
