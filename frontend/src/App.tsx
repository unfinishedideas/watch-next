import './App.css'

import Header from './components/Header.tsx'
import LoginScreen from './screens/LoginScreen.tsx'
import FeedScreen from './screens/FeedScreen.tsx'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

function App()
{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    return(
        <QueryClientProvider client={queryClient}>
            <div className="app-container">
                <Header/>
                {isLoggedIn ? 
                    <FeedScreen/> : <LoginScreen setIsLoggedIn={setIsLoggedIn}/>
                }

            </div>
        </QueryClientProvider>
    )
}

export default App;

