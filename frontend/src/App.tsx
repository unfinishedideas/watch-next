import './App.css'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import UserContext from './context/UserContext.ts'
import Header from './components/Header.tsx'
import LoginScreen from './screens/LoginScreen.tsx'
import FeedScreen from './screens/FeedScreen.tsx'

const queryClient = new QueryClient();

function App()
{
    const [user, setUser] = useState(null);
//<FeedScreen/> : <LoginScreen/>
    
    return(
        <QueryClientProvider client={queryClient}>
            <UserContext.Provider value={[user, setUser]}>
                <div className="app-container">
                    <Header/>
                    {user ? 
                        <div/> : <LoginScreen/>
                    }
                </div>
            </UserContext.Provider>
        </QueryClientProvider>
    )
}

export default App;

