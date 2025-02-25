import Header from './components/Header.tsx'
import LoginScreen from './screens/LoginScreen.tsx'
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
        </div>
    )
}

export default App;

