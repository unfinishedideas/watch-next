import './FeedScreen.css'
import ListCard from '../components/ListCard.tsx'
import Movie from '../classes/Movie.ts'

interface FeedScreenProps{}

const FeedScreen: React.FC<FeedScreenProps> = () =>
{
    let testMovies :MovieCard[] = [
            new Movie("Test Movie 1", 2002, "Jim DirectorMan", 3.5),
            new Movie("Test Movie 2 - The Revenge", 2003, "Jim DirectorMan's Son", 1.5),
    ];

    return(
        <div className="feed-screen-container">
            <p>Feed screen goes here</p>
            <ListCard listName="Super Movie List" movies={testMovies}/>
        </div>
    )
}

export default FeedScreen;
