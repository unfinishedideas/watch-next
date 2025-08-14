import "./ListPreview.css";
import List from "../classes/List.ts";
import { NavLink } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { GetMovieListMovies, GetMovieListUsers } from "../api/ListApi.ts";
import User from '../classes/User.ts'

interface ListPreviewProps {
  listData: List;
  prevId: string; // necessary to avoid duplicate queries when there are multiple lists
}

const ListPreview: React.FC<ListPreviewProps> = ({
  listData,
  prevId,
}: ListPreviewProps) => {
  const listUsers = useQuery({
    queryKey: [`list_id_users_${prevId}`],
    queryFn: () => GetMovieListUsers(listData.id),
  });

  if (listUsers.isPending) {
    return (
      <div className="list-preview-container">
        <NavLink className="list-preview-title" to={`list/${listData.id}`}>
          {listData.title}
        </NavLink>
        <h3> Loading List Data...</h3>
      </div>
    );
  }
  if (listUsers.error) {
    return (
      <div className="list-preview-container">
        <NavLink className="list-preview-title" to={`list/${listData.id}`}>
          {listData.title}
        </NavLink>
        <h3> Failed to Load List!</h3>
      </div>
    );
  } else {
    //TODO: Display deleted users differently (or not at all)
    const manyUsers: boolean = listUsers.data.length > 20;
    let previewUsers: Array<User> = listUsers.data;
    if (manyUsers) {
      previewUsers = previewUsers.slice(20);
    }
    return (
      <div className="list-preview-container">
        <NavLink 
            className="list-preview-title" 
            to={`list/${listData.id}`}
            state={{listData: listData, users: listUsers.data}}
        >
          {listData.title}
        </NavLink>
        <div className="list-preview-userlist-container">
          {previewUsers.map((user, index) => (
            <div className="list-preview-user-container" key={index}>
              {index % 4 === 0 && index !== 0 && <br />}
              <NavLink className="list-preview-username" to={`user/${user.username}`}>
                {user.username}&nbsp;&nbsp;&nbsp;
              </NavLink>
            </div>
          ))}
          {manyUsers && <p>and more!</p>}
        </div>
      </div>
    );
  }
};

export default ListPreview;
