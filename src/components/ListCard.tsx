import './ListCard.css'
import Movie from '../classes/MovieClass.ts'
import MovieCard from './MovieCard.tsx'

interface ListCardProps {
    listName: string;
    movies: Movie[];    
}

const ListCard : React.FC<ListCardProps> = ({listName, movies} : ListCardProps) =>
{
    return(
        <div className="list-card-container">
            <h1>{listName}</h1> 
            { movies.map((movie, index) => (
                <MovieCard data={movie} index={index}/> 
            ))}
        </div>
    )
}

export default ListCard;
