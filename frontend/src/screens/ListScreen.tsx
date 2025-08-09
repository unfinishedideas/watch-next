import './Screen.css';
import User from '../classes/user.ts';
import Movie from '../classes/movie.ts';
import List from '../classes/list.ts';
import { UseQuery } from '@tanstack/react-query';

interface ListScreenProps {
    listData: List,
    users: User[],
}

const ListScreen: React.FC = ({listData, users}: ListScreenProps) =>
{
    const listMovies = useQuery({
        queryKey: [`list_movies_${listData.id}`],
        queryFn: () => GetMovieListMovies(listData.id),
    });

  if (listMovies.isPending) {
        <div className="screen-container">
            <h2 className="screen-title">{listData.title}</h2>
            <h3>Loading list...</h3>
        </div>
  }
  if (listMovies.error) {
        <div className="screen-container">
            <h2 className="screen-title">{listData.title}</h2>
            <h3>Unable to load list!<h3>
        </div>
  } else {
    return(
        <div className="screen-container">
            <h2 className="screen-title">{listData.title}</h2>
            <p>Created By:<p>
            {users.map((user, index) => (
                <div key={index}>
                  <NavLink to={`user/${user.username}`}>
                    {user.username}&nbsp;&nbsp;&nbsp;
                  </NavLink>
                </div>
            )}
            <h3>Movies</h3>
            {listMovies.map((movie: Movie, index: number) => (
                <h3> className="screen-subheading">{movie.title}</h3>
                <p className="info-text">{movie.release_date}</p>
                <p className="info-text">{movie.director}</p>
                <p className="info-text">{movie.genre}</p>
            ))}
        </div>
    )
  }
}
