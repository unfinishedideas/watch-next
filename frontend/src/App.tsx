import './App.css'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Routes, Route } from "react-router";

import UserContext from './context/UserContext.ts'
import Header from './components/Header.tsx'

// Screens
import HomeScreen from './screens/HomeScreen.tsx'
import LoginScreen from './screens/LoginScreen.tsx'
import SignUpScreen from './screens/SignUpScreen.tsx'

const queryClient = new QueryClient();

function App()
{
    const [user, setUser] = useState(null);
    return(
        <QueryClientProvider client={queryClient}>
            <UserContext.Provider value={[user, setUser]}>
                <div className="app-container">
                    <Header/>
                    <Routes>
                        <Route path="home" element={<HomeScreen/>}/>
                        <Route path="login" element={<LoginScreen/>}/>
                        <Route path="signup" element={<SignUpScreen/>}/>
                    </Routes>
                </div>
            </UserContext.Provider>
        </QueryClientProvider>
    )
}

export default App;
