import './MovieCard.css'
import Movie from '../classes/Movie.ts'

interface MovieCardProps {
    data: Movie;
    index: number;
}

const MovieCard: React.FC<MovieCardProps> = ({data, index} : MovieCardProps) =>
{
    return(
        <div className="movie-card-container">
            <h3>{index+1}: {data.title}</h3>
            <p>Year: {data.year}</p>
            <p>Director: {data.director}</p>
            <p>Rating: {data.rating}</p>
        </div>
    )
}

export default MovieCard;
