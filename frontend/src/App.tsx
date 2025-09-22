import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router";

import Header from "./components/Header.tsx";
import HealthBanner from "./components/HealthBanner.tsx";

import { ApiHealthProvider } from "./context/APIHealthContext.tsx";

import HomeScreen from "./screens/HomeScreen.tsx";
import UserLoginScreen from "./screens/UserLoginScreen.tsx";
import WelcomeScreen from "./screens/WelcomeScreen.tsx";
import UserSignupScreen from './screens/UserSignupScreen.tsx';
import LogoutScreen from "./screens/LogoutScreen.tsx";
import ListViewScreen from "./screens/ListViewScreen.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ApiHealthProvider>
        <Header />
        <HealthBanner />
        <div className="mx-5 md:mx-20 lg:mx-50 xl:mx-50 2xl:mx-100 mt-10 flex justify-center items-center">
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/login" element={<UserLoginScreen />} />
              <Route path="/register" element={<UserSignupScreen />} />
              <Route path="/welcome" element={<WelcomeScreen />} />
              <Route path="/logout" element={<LogoutScreen />} />
              {/* <Route path="/profile/:userId" element={<UserProfileScreen/>} */}
              {/* <Route path="/profile/:userId/lists" element={<UserListsScreen />} */}
              {/* <Route path="/profile/:userId/settings" element={<UserSettingsScreen />} */}
              {/* <Route path="/profile/:userId/friends" element={<UserFriendsScreen />} */}
              <Route path="/lists/:listId" element={<ListViewScreen />} />
              {/* <Route path="/lists/:listId/:movieId" element={<ListViewMovieScreen />} */}
              {/* <Route path="/movies/:movieId" element={<MovieViewScreen />} */}
            </Routes>
          </QueryClientProvider>
        </div>
      </ApiHealthProvider>
    </>
  );
}

export default App;
