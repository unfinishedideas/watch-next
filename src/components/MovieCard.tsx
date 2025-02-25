import './MovieCard.css'
import MovieClass from '../classes/MovieClass.ts'

interface MovieCardProps {
    
}

const MovieCard: React.FC<MovieCardProps> = ({title, year, director, rating} : MovieCardProps) =>
{
    return(
        <div className="movie-card-container">
            <h2>{title}</h2>
            <p>Year: {year}</p>
            <p>Director: {director}</p>
            <p>Rating: {rating}</p>
        </div>
    )
}

export default MovieCard;
