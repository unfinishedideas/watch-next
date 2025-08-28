// import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { GetListContentById } from "../api/WatchListAPI";
import { useQuery } from "@tanstack/react-query";
import User from "../classes/User";
import Media from "../classes/Media";

const ListViewScreen: React.FC = () => {
  // TODO: Use listData sent by route if available, useLocation()
  const { listId } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: [`list_content`, listId],
    queryFn: () => GetListContentById(listId!),
    enabled: !!listId,
  });

  if (isPending) {
    return(
    <div>
      <p>Loading list info...</p>
    </div>
    );
  } else if (error) {
    return (
    <div>
      <p>Error loading list!</p>
    </div>
    );
  } else {
    return (
      <div>
        <p>List View Screen: {listId}</p>
        <p>{data.watchList.title}</p>
        <p>Created by:</p>
        {
          data.users.map((user: User) => (<p>{user.username}</p>))
        }
        <br/>
        <p>Media</p>
        {
          data.medias.map((media: Media) => (<p>{media.title}</p>))
        }
      </div>
    );
  }
};

export default ListViewScreen;
