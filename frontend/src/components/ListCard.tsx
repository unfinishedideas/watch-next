import './ListCard.css'
import MovieCard from './MovieCard.tsx'
import List from '../classes/List.ts'
import User from '../classes/User.ts'
import API from '../api/Api.ts'
import { useState } from 'react'


interface ListCardProps {
   listData: List, 
}

const ListCard : React.FC<ListCardProps> = ({listData} : ListCardProps) =>
{
    const [movies, setMovies] = useState([]);

    // TODO: When user page is made, have this generate links to their pages instead
    function GetUsernames()
    {
        let result:string = "";
        listData.UserIds.forEach((userId) => result = result.concat(
            API.GetUser(userId).username
        )); 
        return result.substring(0, result.length - 2);
    }

    function GetMovies()
    {
        let movies = [];
        listData.MovieIds.forEach((movieId) => {
            const movie = API.GetMovie(movieId);
            movies.push(new Movie(movie.Title, movie.year, movie.director, movie.rating, movie.movieId));
        });
        setMovies(movies);
    }

    return(
        <div className="list-card-container">
            <h2 className="list-card-title">{listData.title}</h2> 
            <h3 className="list-card-users">By: {GetUsernames()}</h3>
            <div className="movies-container">
            { movies.map((id, index) => (
                <MovieCard data={movie} index={index} key={index}/> 
            ))}
            </div>
        </div>
    )
}

export default ListCard;
