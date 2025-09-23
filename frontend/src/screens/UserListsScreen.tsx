import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { GetUserLists, GetUserById } from "../api/UserApi";
import WatchListPreviewContainer from "../components/WatchListPreviewContainer";

const UserListsScreen: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { isPending, error, data } = useQuery({
    queryKey: [`user_lists`, params.userId],
    queryFn: () => GetUserLists(params.userId),
    enabled: !!params.userId,
  });
  const userQuery = useQuery({
    queryKey: ["users", params.userId],
    queryFn: () => GetUserById(params.userId),
  });

  if (isPending) {
    return (
      <div>
        <p>Loading User Lists Screen</p>
      </div>
    );
  } else if (error) {
    return (
      <div>
        <p>Error loading User Lists Screen!</p>
      </div>
    );
  } else {
    // TODO: FIGURE OUT WHY THIS IS GIVING ME GRIEF!
    console.log(userQuery);
    return (
      <div>
        {/* <h1>{userQuery.user.username}'s Watch Lists</h1> */}
        <div className="w-full">
          <WatchListPreviewContainer listsData={data} />
        </div>
        <a className="link" onClick={() => navigate("/welcome")}>
          Home
        </a>
      </div>
    );
  }
};

export default UserListsScreen;
