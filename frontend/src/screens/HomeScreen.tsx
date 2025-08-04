import './Screen.css'
import { useContext, useState } from 'react'
import { Link } from 'react-router';
import UserContext from '../context/UserContext.ts'
import UserFeedScreen from './UserFeedScreen.tsx'


function HomeScreen()
{
    const [user, setUser] = useContext(UserContext);

    return(
        <div className='screen-container'>
            <h2 className='screen-title'>Home screen</h2>
            <p>Welcome to Watch Next! a convenient way to create and share lists of movies you want to watch with your friends!</p>
            {user ? 
                <UserFeedScreen/>
                :
                <div>
                    <Link className="screen-link" to="/login">Login</Link>
                    <br/>
                    <Link className="screen-link" to="/signup">Sign Up</Link>
                </div>
            }
        </div>
    )
}

export default HomeScreen;
