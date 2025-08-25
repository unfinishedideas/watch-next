// import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { useParams } from "react-router";
import { GetListById } from "../api/ListAPI";
import { useQueries, useQuery } from "@tanstack/react-query";

const ListViewScreen: React.FC = () => {
  const { listId } = useParams();
  //   const navigate = useNavigate();
  const location = useLocation();
//   let navData = location.state;
//   const { isPending, error, data } = useQuery({
//     queryKey: [`list_view`, listId],
//     queryFn: () => GetListById(listId!),
//     enabled: !!listId && navData === null,
//   });

//   let statusText = "";
//   if (isPending) {
//     console.log('loading list view') // TODO: ERASE
//     statusText = "Loading list view...";
//   } else if (error) {
//     console.log('failed to load list view') // TODO: ERASE
//     statusText = "Failed to load list view!";
//   } else {
//     statusText = "";
//   }
  return (
    <div>
      <p>{data?.title}</p>
      <p>List View Screen: {listId}</p>
      <p>{statusText}</p>
    </div>
  );
};

export default ListViewScreen;
