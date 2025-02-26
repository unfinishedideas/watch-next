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
    let testMovies2 :MovieCard[] = [
            new Movie("Lame Movie 1", 1995, "Donald Dumbass", 1.5),
            new Movie("Lame Movie 2: In Space!", 2001, "George Lucas", 0.5),
            new Movie("The Spiral Notebook", 2015, "David Lynch", 5.0),
    ];

    return(
        <div className="feed-screen-container">
            <ListCard listName="Super Movie List" movies={testMovies}/>
            <ListCard listName="Lame Movie List" movies={testMovies2}/>
        </div>
    )
}

export default FeedScreen;
