import './ListCard.css'
import MovieClass from '../classes/MovieClass.ts'
import MovieCard from './MovieCard.tsx'

interface ListCardProps {
    listName: string;
    movies: MovieClass[];    
}

const ListCard : React.FC<ListCardProps> = ({listName, movies} : ListCardProps) =>
{
    return(
        <div className="list-card-container">
            <h1>{listName}</h1> 
        </div>
    )
}

export default ListCard;
