namespace WatchNext.MovieLists
{
	public class MovieList
	{
		required public Guid Id { get; set; }
		required public string List_Title { get; set; }
		required public DateTime Created_At { get; set; }
		required public bool Is_Private { get; set; }
	}
	public class RegisterMovieListRequest()
	{
		required public string List_Title { get; set; }
		required public bool Is_Private { get; set; }
	}
	public class UpdateMovieListRequest()
	{
		public required Guid Id { get; set; }
		public string? List_Title { get; set; }
		public bool? Is_Private { get; set; }
	}

	public class UpdateUserMovieListRequest()
	{
		public required Guid List_Id { get; set; }
		public required Guid User_Id { get; set; }
	}

	public class UpdateMoviesMovieListRequest()
	{
		public required Guid List_Id { get; set; }
		public required Guid Movie_Id { get; set; }
	}

}
