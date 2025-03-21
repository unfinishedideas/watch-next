import './MovieCard.css'
import Movie from '../classes/Movie.ts'
import Logo from '../assets/test-movie-poster-jaws.jpg'

interface MovieCardProps {
    data: Movie;
    index: number;
}

const MovieCard: React.FC<MovieCardProps> = ({data, index} : MovieCardProps) =>
{
    function RemoveMovie()
    {
        console.log("Remove DAT MOVIE");
    }

    return(
        <div className="movie-card-container">
            <h3 className="movie-title-text">{index+1}: {data.movie_title}</h3>
            <img src={Logo} className="movie-poster-preview"/>
            <p className="info-small">Director: {data.director}</p>
            <p className="info-small">Year: {data.year}</p>
            <p className="info-small">Rating: {data.rating}</p>
            <button type="button" onClick={RemoveMovie}>Remove Movie</button>
        </div>
    )
}

export default MovieCard;
