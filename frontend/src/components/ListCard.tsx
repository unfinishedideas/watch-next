import './ListCard.css'
import MovieCard from './MovieCard.tsx'
import List from '../classes/List.ts'
import { GetMovie } from '../api/MovieApi.ts'
import { GetUser } from '../api/UserApi.ts'
import { useQueries } from '@tanstack/react-query'

interface ListCardProps {
   listData: List, 
}

const ListCard : React.FC<ListCardProps> = ({listData} : ListCardProps) =>
{
    const listMovies = useQueries({
        queries: listData.movie_ids.map((id: string) => ({
            queryKey: ['listMovies', id],
            queryFn: () => GetMovie(id),
            staleTime: Infinity,
        })),
        combine: (results) => {
            return {
                data: results.map((result) => result.data),
                pending: results.some((result) => result.isPending),
            }
        }
    })
    const listUserIds = useQueries({
        queries: listData.owner_ids.map((id: string) => ({
            queryKey: ['listUser', id],
            queryFn: () => GetUser(id), 
            staleTime: Infinity,
        })),
        combine: (results) => {
            return {
                data: results.map((result) => result.data),
                pending: results.some((result) => result.isPending),
            }
        }
    })

    function GetUsernames()
    {
        if (!listUserIds.pending)
        {
            let names: string = "";
            for (const user of listUserIds.data) {
                names += user.user_name + ", ";
            }
            return names.substring(0, names.length - 2);
        }
        return "Loading usernames..."
    }

    if (listMovies.isPending || listUserIds.isPending) return (
        <div>
            <h2 className="list-card-title">{listData.title}</h2> 
            <h3>Loading List...</h3>
        </div>
    )
    if (listMovies.error || listMovies.error) return (
        <div>
            <h2 className="list-card-title">{listData.title}</h2> 
            <h3> Failed to Load List!</h3>
        </div>
    )

    const canLoad: boolean = !listMovies.pending && !listUserIds.pending && 
                           !listMovies.error && !listMovies.error;
    if (canLoad)
    {
        return(
            <div className="list-card-container">
                <h2 className="list-card-title">{listData.title}</h2> 
                <h3 className="list-card-users">By: {GetUsernames()}</h3>
                <div className="movies-container">
                { listMovies.data.map((movie, index) => (
                    <MovieCard data={movie} index={index} key={index}/> 
                ))}
                </div>
            </div>
        )
    }
}

export default ListCard;
