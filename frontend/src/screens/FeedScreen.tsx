import './FeedScreen.css';

import { useState, useEffect } from 'react';

//import List from '../classes/List.ts';
import ListCard from '../components/ListCard.tsx';


const FeedScreen: React.FC = () =>
{
    const [lists, setLists] = useState([]);

    return(
        <div className="feed-screen-container">
        </div>
    )
}

export default FeedScreen;
