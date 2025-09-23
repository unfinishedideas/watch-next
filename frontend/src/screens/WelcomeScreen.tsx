import { useUser } from "../hooks/UserHooks.ts";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetLimitedUserLists } from "../api/UserApi.ts";
import WatchListPreviewContainer from "../components/WatchListPreviewContainer.tsx";

const WelcomeScreen: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { isPending, error, data } = useQuery({
    queryKey: [`user_lists`, user?.id],
    queryFn: () => GetUserLimitedLists(user!.id),
    enabled: !!user,
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
    } else if (error) {
      statusText = "Failed to load watch lists!";
    } else {
      statusText = "";
    }
    return (
      <div className="w-full">
        <div className="mb-10 w-auto">
          <div className="mb-8 flex flex-col items-center justify-center">
            <p className="text-2xl mb-10">
              Watch Lists are the perfect way to plan your next movie night!
            </p>
            <a className="btn btn-primary text-xl">Create New Watch List</a>
          </div>
          <h2 className="text-2xl tracking-wide mb-2 mt-0">Your Watch Lists</h2>
          <hr className="mb-6" />
          <p>{statusText}</p>
          <div className="w-full">
            <WatchListPreviewContainer listsData={data} />
          </div>
        </div>
      </div>
    );
  }
};

export default WelcomeScreen;
