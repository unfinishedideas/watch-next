import { useUser } from "../hooks/UserHooks.ts";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetUserLists } from "../api/UserApi.ts";
import WatchListPreviewCarousel from "../components/WatchListPreviewCarousel.tsx";

const WelcomeScreen: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { isPending, error, data } = useQuery({
    queryKey: [`user_lists`, user?.id],
    queryFn: () => GetUserLists(user!.id),
    enabled: !!user
  });
  useEffect(() => {
    if (!user) {
      navigate("/logout");
    }
  });
  if (user) {
    let statusText = "";
    if (isPending) {
      statusText = "Loading your watch lists!";
    }
    else if (error) {
      statusText = "Failed to load watch lists!";
    }
    else {
      console.log(data)
    }
    return (
      <div>
        <h1
          className="
          mb-8 
          text-4xl 
          font-extrabold 
          leading-none 
          tracking-tight 
          text-gray-900 
          md:text-5xl 
          lg:text-6xl 
          dark:text-white"
        >
          Welcome to movie night, {user.username}
        </h1>
        <div className="mb-8">
          <h2 className="text-2xl tracking-wide mb-2">
            Here's what people have been watching
          </h2>
          <p>~~ COMING SOON ~~</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl tracking-wide mb-2">Your Watch Lists</h2>
          <p>{statusText}</p>
          <WatchListPreviewCarousel listsData={data}/>
        </div>
      </div>
    );
  }
};

export default WelcomeScreen;
