import './App.css'

import Header from './components/Header.tsx'
import LoginScreen from './screens/LoginScreen.tsx'
import FeedScreen from './screens/FeedScreen.tsx'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserContext from './context/UserContext.ts'


const queryClient = new QueryClient();

function App()
{
    const [user, setUser] = useState(null);
    
    return(
        <QueryClientProvider client={queryClient}>
            <UserContext.Provider value={[user, setUser]}>
                <div className="app-container">
                    <Header/>
                    {user ? 
                        <FeedScreen/> : <LoginScreen/>
                    }
                </div>
            </UserContext.Provider>
        </QueryClientProvider>
    )
}

export default App;

