import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router";

import HomeScreen from "./screens/HomeScreen.tsx";
import UserLoginScreen from "./screens/UserLoginScreen.tsx";
import WelcomeScreen from "./screens/WelcomeScreen.tsx";
import UserSignupScreen from './screens/UserSignupScreen.tsx';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <div>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<UserLoginScreen />} />
            <Route path="/register" element={<UserSignupScreen />} />
            <Route path="/welcome" element={<WelcomeScreen />} />
            {/* <Route path="/profile/:userId" element={<UserProfileScreen/>} */}
            {/* <Route path="/profile/:userId/lists" element={<UserListsScreen />} */}
            {/* <Route path="/profile/:userId/settings" element={<UserSettingsScreen />} */}
            {/* <Route path="/profile/:userId/friends" element={<UserFriendsScreen />} */}
            {/* <Route path="/lists/:listId" element={<ListViewScreen />} */}
            {/* <Route path="/lists/:listId/:movieId" element={<ListViewMovieScreen />} */}
            {/* <Route path="/movies/:movieId" element={<MovieViewScreen />} */}
          </Routes>
        </QueryClientProvider>
      </div>
    </>
  );
}

export default App;
