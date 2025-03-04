import './ListCard.css'
import MovieCard from './MovieCard.tsx'
import List from '../classes/List.ts'

interface ListCardProps {
   listData: List, 
}

const ListCard : React.FC<ListCardProps> = ({listData} : ListCardProps) =>
{
    function GetUsernames()
    {
        let result:string = "";
        listData.createdBy.forEach((currentUser:User) => result = result.concat(currentUser.username, ", "));
        return result.substring(0, result.length - 2);
    }

    return(
        <div className="list-card-container">
            <h2>{listData.title}</h2> 
            <h3>By: {GetUsernames()}</h3>
            <div className="movies-container">
            { listData.movies.map((movie, index) => (
                <MovieCard data={movie} index={index} key={index}/> 
            ))}
            </div>
        </div>
    )
}

export default ListCard;
