// import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { GetListById, GetListMediasById } from "../api/ListAPI";
import { useQueries } from "@tanstack/react-query";

const ListViewScreen: React.FC = () => {
  // TODO: Use listData sent by route if available, useLocation()
  const { listId } = useParams();
  let statusText = "";
  const screenData = useQueries({
    queries: [
        {queryKey: [`list_data`, listId], queryFn: () => GetListById(listId!), staleTime: Infinity},
        {queryKey: [`list_movies`, listId], queryFn: () => GetListMediasById(listId!), staleTime: Infinity},
    ]
  })

  return (
    <div>
      {/* <p>{screenData?.title}</p> */}
      <p>List View Screen: {listId}</p>
      <p>{statusText}</p>
    </div>
  );
};

export default ListViewScreen;
