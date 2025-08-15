import { useUser } from "../hooks/UserHooks.ts";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const WelcomeScreen: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/logout");
    }
  });

  if (user) {
    return (
      <div>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Welcome, {user.username}, to your movie night
        </h1>
      </div>
    );
  }
};

export default WelcomeScreen;
