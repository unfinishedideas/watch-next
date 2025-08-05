import "./ListPreview.css";
import List from "../classes/List.ts";
import { NavLink } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { GetMovieListMovies, GetMovieListUsers } from "../api/ListApi.ts";

interface ListPreviewProps {
  listData: List;
}

const ListPreview: React.FC<ListPreviewProps> = ({
  listData,
}: ListPreviewProps) => {

    const listMovies = useQuery({
      queryKey: ["list_id_movies"],
      queryFn: () => GetMovieListMovies(listData.id),
    });
    const listUsers = useQuery({
      queryKey: ["list_id_users"],
      queryFn: () => GetMovieListUsers(listData.id),
    });

  if (listMovies.isPending || listUsers.isPending) {
    return (
      <div className="list-preview-container">
        <NavLink className="list-preview-title" to={`list/${listData.id}`}>
          {listData.list_Title}
        </NavLink>
        <h3> Loading List Data...</h3>
      </div>
    );
  }
  if (listMovies.error || listUsers.error) {
    return (
      <div className="list-preview-container">
        <NavLink className="list-preview-title" to={`list/${listData.id}`}>
          {listData.list_Title}
        </NavLink>
        <h3> Failed to Load List!</h3>
      </div>
    );
  } else {
    return (
      <div className="list-preview-container">
        <NavLink className="list-preview-title" to={`list/${listData.id}`}>
          {listData.list_Title}
        </NavLink>
        <div className="list-preview-users-container">
          {listUsers.data.map((user, index) => (
            <NavLink
              className="list-preview-username"
              to={`user/${user.id}`}
              key={index}
            >
              {user.username}&nbsp;&nbsp;&nbsp;
            </NavLink>
          ))}
        </div>
      </div>
    );
  }
};

export default ListPreview;
