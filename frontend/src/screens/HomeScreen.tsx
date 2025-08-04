import { useState } from 'react'
import { useContext } from 'react'
import UserContext from '../context/UserContext.ts'
import './Screen.css'

import { Link } from 'react-router';

function HomeScreen()
{
    const [user, setUser] = useContext(UserContext);

    return(
        <div className='screen-container'>
            <h2 className='screen-title'>Home screen</h2>
            <p>Welcome to Watch Next! a convenient way to create and share lists of movies you want to watch with your friends!</p>
            {user ? 
                <div/> 
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
