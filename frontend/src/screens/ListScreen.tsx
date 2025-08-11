import './Screen.css';
import Movie from '../classes/movie.ts';
import { useQuery } from '@tanstack/react-query';
import { NavLink, useLocation } from "react-router";
import { GetMovieListMovies } from '../api/ListApi.ts';



const ListScreen: React.FC = () =>
{
    const location = useLocation();
    const listData = location.state?.listData;
    const users = location.state?.users;

    const listMovies = useQuery({
        queryKey: [`list_movies_${listData.id}`],
        queryFn: () => GetMovieListMovies(listData.id),
    });

  if (listMovies.isPending) {
    return(
        <div className="screen-container">
            <h2 className="screen-title">{listData.title}</h2>
            <h3>Loading list...</h3>
        </div>
    )
  }
  if (listMovies.error) {
    return(
        <div className="screen-container">
            <h2 className="screen-title">{listData.title}</h2>
            <h3>Unable to load list!</h3>
        </div>
    )
  } else {
    return(
        <div className="screen-container">
            <h2 className="screen-title">{listData.title}</h2>
            <p>Created By:</p>
            {users.map((user, index) => (
                <div key={index}>
                  <NavLink to={`user/${user.username}`}>
                    {user.username}&nbsp;&nbsp;&nbsp;
                  </NavLink>
                </div>
            ))}
            <h3>Movies</h3>
            {listMovies.data.map((movie: Movie, index: number) => 
            {
                const release_string = new Date(movie.release_date).getFullYear();
                return(    
                <div key={index}>
                    <h3 className="screen-subheading">{movie.title}</h3>
                    <p className="info-text">Release: {release_string}</p>
                    <p className="info-text">Genre: {movie.genre}</p>
                    <p className="info-text">Director: {movie.director}</p>
                </div>
                )
            }
            )}
        </div>
    )
  }
}

export default ListScreen;