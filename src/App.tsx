import Header from './components/Header.tsx'
import LoginScreen from './screens/LoginScreen.tsx'
import FeedScreen from './screens/FeedScreen.tsx'

import { useState } from 'react'

function App()
{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    return(
        <div>
            <Header/>
            {isLoggedIn ? 
            <div/> : <LoginScreen setIsLoggedIn={setIsLoggedIn}/>
            }
            <FeedScreen/>
        </div>
    )
}

export default App;

