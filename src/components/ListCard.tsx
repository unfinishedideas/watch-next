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
            { movies.map((movie, index) => (
                <MovieCard data={movie} index={index} key={index}/> 
            ))}
        </div>
    )
}

export default ListCard;
