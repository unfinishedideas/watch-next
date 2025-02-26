import './ListCard.css'
import MovieCard from './MovieCard.tsx'
import Movie from '../classes/MovieClass.ts'

interface ListCardProps {
    listName: string;
    movies: Movie[];    
}

const ListCard : React.FC<ListCardProps> = ({listName, movies} : ListCardProps) =>
{
    return(
        <div className="list-card-container">
            <h2>{listName}</h2> 
            <div className="movies-container">
            { movies.map((movie, index) => (
                <MovieCard data={movie} index={index} key={index}/> 
            ))}
            </div>
        </div>
    )
}

export default ListCard;
