import './FeedScreen.css';
import List from '../classes/List.ts';
import ListCard from '../components/ListCard.tsx';
import { GetLists } from '../api/ListApi.ts'
import { useQuery } from '@tanstack/react-query'

const FeedScreen: React.FC = () =>
{
    const { isPending, error, data } = useQuery({
        queryKey: ['listData'],
        queryFn: GetLists,
    });

    if (isPending) return(
        <div>   
            <h2>Feed Screen Loading...</h2>
        </div>
    )

    if (error) return(
        <div>   
            <h2>Feed Screen Failed to Load!</h2>
        </div>
    )

    return(
        <div className="feed-screen-container">
            { data.map((list: List, index: number) => (
                <ListCard listData={list} key={index}/>
            ))}
        </div>
    )
}

export default FeedScreen;
