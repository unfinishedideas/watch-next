import './FeedScreen.css';
import { useContext } from 'react'
import UserContext from '../context/UserContext.ts'
import { useQuery } from '@tanstack/react-query'

import { GetUserLists } from '../api/UserApi.ts'
import List from '../classes/List.ts';
import ListCard from '../components/ListCard.tsx';

const UserFeedScreen: React.FC = () =>
{
    const[user, setUser] = useContext(UserContext);
    if (user === null){
        return(<h2>Must be logged in to see user feed. Please log in</h2>)
    }

    const { isPending, error, data } = useQuery({
        queryKey: ['user_id'],
        queryFn: () => GetUserLists(user.user_id),
    });

    if (isPending) {
        return(
            <div>   
                <h2>User Feed Screen Loading...</h2>
            </div>
    )}

    if (error) {
        return(
            <div>   
                <h2>User Feed Screen Failed to Load!</h2>
            </div>
    )}

    return(
        <div className="user-feed-container">
            <h3>{user.username}</h3>
            { data.map((list: List, index: number) => (
                <ListCard listData={list} key={index}/>
            ))}
        </div>
    )
}

export default UserFeedScreen;
