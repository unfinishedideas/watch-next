import './ListCard.css'
import MovieCard from './MovieCard.tsx'
import List from '../classes/List.ts'
import User from '../classes/User.ts'


interface ListCardProps {
   listData: List, 
}

const ListCard : React.FC<ListCardProps> = ({listData} : ListCardProps) =>
{
    // TODO: When user page is made, have this generate links to their pages instead
    function GetUsernames()
    {
        let result:string = "";
        // FIXME: eslint hates this and thinks it's an "error" type, not sure why
        listData.createdBy.forEach((currentUser:User) => result = result.concat(currentUser.username, ", "));
        return result.substring(0, result.length - 2);
    }

    return(
        <div className="list-card-container">
            <h2 className="list-card-title">{listData.title}</h2> 
            <h3 className="list-card-users">By: {GetUsernames()}</h3>
            <div className="movies-container">
            { listData.movies.map((movie, index) => (
                <MovieCard data={movie} index={index} key={index}/> 
            ))}
            </div>
        </div>
    )
}

export default ListCard;
