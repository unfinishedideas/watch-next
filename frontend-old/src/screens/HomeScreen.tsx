import "./Screen.css";
import { Link } from "react-router";
import { useUser } from "../hooks/UserHooks.ts";
import UserFeedScreen from "./UserFeedScreen.tsx";

function HomeScreen() {
  const { user, setUser } = useUser();

  return (
    <div className="screen-container">
      <p>
        Welcome to Watch Next! a convenient way to create and share lists of
        movies you want to watch with your friends!
      </p>
      {user ? (
        <UserFeedScreen />
      ) : (
        <div>
          <h2 className="screen-title">Home screen</h2>
          <Link className="screen-link" to="/login">
            Login
          </Link>
          <br />
          <Link className="screen-link" to="/signup">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
