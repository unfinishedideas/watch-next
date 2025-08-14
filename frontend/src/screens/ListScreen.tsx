import "./Screen.css";
import Movie from "../classes/Movie.ts";
import MovieCard from "../components/MovieCard.tsx";
import AddMovieBox from "../components/AddMovieBox.tsx";
import { useQuery } from "@tanstack/react-query";
import { NavLink, useLocation } from "react-router";
import { GetMovieListMovies } from "../api/ListApi.ts";
import { useUser } from "../hooks/UserHooks.ts";

const ListScreen: React.FC = () => {
  const location: Location<any> = useLocation();
  const listData: List[] = location.state?.listData;
  const users: User[] = location.state?.users;
  const { user, setUser } = useUser();
  let ownedList: Boolean = false;

  const listMovies = useQuery({
    queryKey: [`list_movies_${listData.id}`],
    queryFn: () => GetMovieListMovies(listData.id),
  });

  if (listMovies.isPending) {
    return (
      <div className="screen-container">
        <h2 className="screen-title">{listData.title}</h2>
        <h3>Loading list...</h3>
      </div>
    );
  }
  if (listMovies.error) {
    return (
      <div className="screen-container">
        <h2 className="screen-title">{listData.title}</h2>
        <h3>Unable to load list!</h3>
      </div>
    );
  } else {
    const fetchedMovies: Movie[] = listMovies.data.sort(
      (a, b) => a.movie_order - b.movie_order
    );
    let usersToList = users;
    if (user !== undefined) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].id === user.id) {
          ownedList = true;
          usersToList = usersToList.filter((usr) => usr.id !== user.id);
          break;
        }
      }
    }
    return (
      <div className="screen-container">
        <h2 className="screen-title">{listData.title}</h2>
        <p>Created By:</p>
        <div className="user-card-container">
          {ownedList ? (
            <div className="home-user-container">
              <NavLink to={`user/${user.username}`}>
                {user.username}&nbsp;&nbsp;&nbsp;
              </NavLink>
            </div>
          ) : (
            <div />
          )}
          {usersToList.map((usr: User, index: number) => (
            <div className="list-user-container" key={index}>
              {index % 4 === 0 && index !== 0 && <br />}
              <NavLink to={`user/${usr.username}`}>
                {usr.username}&nbsp;&nbsp;&nbsp;
              </NavLink>
            </div>
          ))}
        </div>
        <h3 className="screen-subtitle">Movies</h3>
        {ownedList ? <AddMovieBox /> : <div />}
        {fetchedMovies.map((movie: Movie, index: number) => {
          return <MovieCard data={movie} key={index} />;
        })}
      </div>
    );
  }
};

export default ListScreen;

/*
   <div 
   key={index} 
   className="movie-card-container" 
   draggable="true" 
   onDragStart={handleDragMovieStart} 
   onDragEnd={handleDragMovieEnd}
   onDragEnter={handleDragMovieEnter}
   onDragOver={handleDragMovieOver}
   onDragLeave={handleDragMovieLeave}
   >
   <h3 className="screen-subheading">{movie.title}</h3>
   <p className="info-text">Release: {release_string}</p>
   <p className="info-text">Genre: {movie.genre}</p>
   <p className="info-text">Director: {movie.director}</p>
   </div>
*/
