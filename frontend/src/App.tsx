import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from 'react-router';

import HomeScreen from './screens/HomeScreen.tsx';
import UserLoginScreen from './screens/UserLoginScreen.tsx';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <div>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path='/' element={<HomeScreen/>}/>
            <Route path='/login' element={<UserLoginScreen/>}/>
          </Routes>
        </QueryClientProvider>
      </div>
    </>
  );
}

export default App;
