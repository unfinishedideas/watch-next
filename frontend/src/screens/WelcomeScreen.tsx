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
    let noLists = false;
    if (isPending) {
      statusText = "Loading your watch lists!";
    }
    else if (error) {
      statusText = "Failed to load watch lists!";
    }
    else {
      statusText = ""
      if (data.length === 0)
      {
        noLists = true;
      }
    }
    return(
      <div className="w-full">
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
          Welcome, {user.username}
        </h1>
        <div className="mb-8">
          <h2 className="text-2xl tracking-wide mb-2">
            Here's what people have been watching
          </h2>
          <p>~~ COMING SOON ~~</p>
        </div>
        <div className="mb-8 w-auto">
          <h2 className="text-2xl tracking-wide mb-6">Your Watch Lists</h2>
          <p>{statusText}</p>
          {
            noLists ? (
              <div>
                <p>You currently have no watch lists.</p>
                <a className="link link-primary">Let's create one and get watching!</a>
              </div>
            ): (
              <div className="w-full">
                <WatchListPreviewCarousel listsData={data} rowLength={5}/>
                <br/>
                <a className="link link-primary">Create new list?</a>
              </div>

            )
          }

        </div>
      </div>
    );
  }
};

export default WelcomeScreen;
