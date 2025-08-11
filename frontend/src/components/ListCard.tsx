import './ListCard.css'
import MovieCard from './MovieCard.tsx'
import Button from './Button.tsx'
import List from '../classes/List.ts'
import { GetMovie } from '../api/MovieApi.ts'
import { GetUser } from '../api/UserApi.ts'
import { RemoveMovieFromList, AsyncApiFunc } from '../api/ListApi.ts'
import { useQueries, useMutation } from '@tanstack/react-query'

interface ListCardProps {
    listData: List, 
    handleRemoveMovie: AsyncApiFunc;
}

const ListCard : React.FC<ListCardProps> = ({listData} : ListCardProps) =>
{
    /*
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

    const mutation = useMutation({
        mutationFn: RemoveMovieFromList,
        /*onSuccess: (data) => { },
    })

    const handleRemoveMovie: AsyncApiFunc = (id: string) =>
    {
        mutation.mutate({list: listData, id: id});
    }

    function getUsernames() {
        if (!listUserIds.pending) {
            let names: string = "";
            for (const user of listUserIds.data) {
                names += user.username + ", ";
            }
            return names.substring(0, names.length - 2);
        }
        return "Loading usernames..."
    }

    function loadListScreen() {
        // TODO: Make list screen :)
        console.log("LOAD LIST SCREEN");
    }

    if (listMovies.isPending || listUserIds.isPending) return (
        <div>
            <h2 className="list-card-title">{listData.list_title}</h2> 
            <h3>Loading List...</h3>
        </div>
    )
    if (listMovies.error || listMovies.error) return (
        <div>
            <h2 className="list-card-title">{listData.list_title}</h2> 
            <h3> Failed to Load List!</h3>
        </div>
    )

    const canLoad: boolean = !listMovies.pending && !listUserIds.pending && 
                           !listMovies.error && !listMovies.error;
    if (canLoad)
    {
        return(
            <div className="list-card-container">
                <Button btnText={listData.list_title} btnCallback={loadListScreen}/>
                <h3 className="list-card-users">By: {getUsernames()}</h3>
                <div className="movies-container">
                { listMovies.data.map((movie, index) => (
                    <MovieCard data={movie} handleRemoveMovie={handleRemoveMovie} index={index} key={index}/> 
                ))}
                </div>
            </div>
        )
    }
    */
    return(
        <div className="list-card-container">
            <Button btnText={listData.title}/>
        </div>
    )
}

export default ListCard;
