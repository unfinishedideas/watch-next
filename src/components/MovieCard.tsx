import './MovieCard.css'
import Movie from '../classes/Movie.ts'

interface MovieCardProps {
    data: movie;
    index: number;
}

const MovieCard: React.FC<MovieCardProps> = ({data, index} : MovieCardProps) =>
{
    return(
        <div className="movie-card-container" key={index}>
            <h2>{data.title}</h2>
            <p>Year: {data.year}</p>
            <p>Director: {data.director}</p>
            <p>Rating: {data.rating}</p>
        </div>
    )
}

export default MovieCard;
