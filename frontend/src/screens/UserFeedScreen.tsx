import "./FeedScreen.css";
import { useUser } from "../hooks/UserHooks.ts";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";
import { GetUserLists } from "../api/UserApi.ts";
import List from "../classes/List.ts";
import ListPreview from "../components/ListPreview.tsx";

const UserFeedScreen: React.FC = () => {
  const { user, setUser } = useUser();
  // TODO: Make this more generic so users can view other user's feeds, feed in userID instead of
  // using context user object. Conditionally render title based on if looking at own feed

  const { isPending, error, data } = useQuery({
    queryKey: ["user_id"],
    queryFn: () => GetUserLists(user.id),
  });

  if (isPending) {
    return (
      <div>
        <h2>User Feed Screen Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>User Feed Screen Failed to Load!</h2>
      </div>
    );
  }

  return (
    <div className="feed-container">
      <h2 className="feed-title">{user.username}'s saved lists</h2>
      {data.map((list: List, index: number) => (
        <ListPreview listData={list} key={index} prevId={index.toString()} />
      ))}
    </div>
  );
};

export default UserFeedScreen;
