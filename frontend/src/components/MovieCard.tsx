import "./MovieCard.css";
import Movie from "../classes/Movie.ts";
import Poster from "../assets/NoPoster.png";
import { AsyncApiFunc } from "../api/ListApi.ts";
import { useState } from "react";

interface MovieCardProps {
  data: Movie;
  index: number;
}
const MovieCard: React.FC<MovieCardProps> = ({
  data,
  index,
}: MovieCardProps) => {
  const release_string = new Date(data.release_date).getFullYear();
  return (
    <div className={"movie-card-default"}>
      <div className={"movie-card-poster"}>
        <img src={Poster} className="movie-poster-preview" />
      </div>
      <div className={"movie-card-info-panel"}>
        <h3 className="movie-title-text">{data.title}</h3>
        <p className="info-small">Released: {release_string}</p>
        <p className="info-small">Genre: {data.genre}</p>
        <p className="info-small">Director: {data.director}</p>
        {/* <p className="info-small">Rank: {data.movie_order}</p> */}
      </div>
    </div>
  );
};

export default MovieCard;

//<button type="button" onClick={() => removeMovie(data)}>Remove Movie</button>
//<img src={Logo} className="movie-poster-preview" />
//<p className="info-small">Rating: {data.rating}</p>

/*
// DRAG AND DROP VERSION USING MOUSE EVENTS, CUMBERSOME.
// Leaving this here for reference until I replace it with something better
const MovieCard: React.FC<MovieCardProps> = ({
  data,
  index,
  handleRemoveMovie,
}: MovieCardProps) => {
    const [currentStyle, setCurrentStyle] = useState(MovieCardStyles.default)

    enum MovieCardStyles {
        default = "movie-card-default",
        under = "movie-card-under",
        over = "movie-card-over",
        dragged = "movie-card-dragged",
        hover = "movie-card-hover"
    }

    function handleDragMovieStart()
    {
        //console.log(`we picked ${data.title} up`);
        setCurrentStyle(MovieCardStyles.dragged);
    }

    function handleDragMovieEnd()
    {
        //console.log(`we dropped ${data.title}`);
        setCurrentStyle(MovieCardStyles.default);
    }

    function handleDragMovieEnter(event: Event)
    {
        //event.stopPropogation();
        event.preventDefault();
        console.log(`we entered ${data.title} ;)`);
    }

    function handleDragMovieOver(event: Event)
    {
        //event.stopPropogation();
        event.preventDefault();
        console.log(`we are over ${data.title}`); 
        setCurrentStyle(MovieCardStyles.over);
    }

    function handleDragMovieLeave(event: Event)
    {
        //event.stopPropogation();
        event.preventDefault();
        console.log(`we left ${data.title}`);
        setCurrentStyle(MovieCardStyles.default);
    }

    function handleDropMovie(event: Event)
    {
        event.preventDefault();
        console.log(`we dropped ${data.title}`);
    }

    const release_string = new Date(data.release_date).getFullYear();
  return (
    <div 
        className={currentStyle}
        draggable="true"
        onDragStart={handleDragMovieStart} 
        onDragEnd={handleDragMovieEnd}
        onDragEnter={handleDragMovieEnter}
        onDragOver={handleDragMovieOver}
        onDragLeave={handleDragMovieLeave}
    >
      <h3 className="movie-title-text">
        {data.title}
      </h3>

      <p className="info-small">Released: {release_string}</p>
      <p className="info-small">Genre: {data.genre}</p>
      <p className="info-small">Director: {data.director}</p>

      <button type="button" onClick={() => handleRemoveMovie(data.movie_id)}>
        Remove Movie
      </button>
    </div>
  );
};
*/
