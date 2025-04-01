import './MovieCard.css'
import Movie from '../classes/Movie.ts'
import Logo from '../assets/test-movie-poster-jaws.jpg'
import { AsyncApiFunc } from '../api/ListApi.ts'

interface MovieCardProps {
    data: Movie;
    index: number;
    handleRemoveMovie: AsyncApiFunc;
}

const MovieCard: React.FC<MovieCardProps> = ({data, index, handleRemoveMovie} : MovieCardProps) =>
{
    return(
        <div className="movie-card-container">
            <h3 className="movie-title-text">{index+1}: {data.movie_title}</h3>
            <img src={Logo} className="movie-poster-preview"/>
            <p className="info-small">Director: {data.director}</p>
            <p className="info-small">Year: {data.year}</p>
            <p className="info-small">Rating: {data.rating}</p>
            <button type="button" onClick={() => handleRemoveMovie(data.movie_id)}>Remove Movie</button>
        </div>
    )
}

export default MovieCard;
            /*<button type="button" onClick={() => removeMovie(data)}>Remove Movie</button>*/
