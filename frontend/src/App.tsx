import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router";

import Header from "./components/Header.tsx";

// Screens
import HomeScreen from "./screens/HomeScreen.tsx";
import LoginScreen from "./screens/LoginScreen.tsx";
import SignUpScreen from "./screens/SignUpScreen.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="home" element={<HomeScreen />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="signup" element={<SignUpScreen />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
