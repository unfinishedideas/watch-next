import { useState } from "react";
import SearchBar from "./SearchBar.tsx";
import { GetMoviesByPartialTitle } from "../api/MovieApi.ts";

interface AddMovieBoxProps {
    onAdd: (mov_id: string) => void;
}

const AddMovieBox: React.FC = ({onAdd}:AddMovieBoxProps) => {
  enum BoxState {
    searching,
    waiting,
  }
  const [boxState, setBoxState] = useState(BoxState.waiting);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  async function SearchForMovie(value: string) {
    value = value.trim();
    if (value === "") {
      setOptions([]);
      return;
    }
    setLoading(true);
    try {
      let res = await GetMoviesByPartialTitle(value);
      setOptions(res);
      console.log(res); // TODO: Remove this
    } catch (err: unknown) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function AddMovie(value: string)
  {
    console.log(value)
  }

  if (boxState === BoxState.waiting) {
    return (
      <div>
        <button
          className="search-movie-btn"
          onClick={() => {
            setBoxState(BoxState.searching);
          }}
        >
          Search for Movie
        </button>
      </div>
    );
  } else if (boxState === BoxState.searching) {
    return (
      <div>
        <SearchBar onSearch={SearchForMovie} title={"Search for Movie"} />
        <div>
          <select onChange={AddMovie}>
            <option value="">--Please choose an option--</option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.title}
              </option>
            ))}
          </select>
          <br/>
          <button className="add-movie-btn">Add Movie</button>
        </div>
      </div>
    );
  }
};

export default AddMovieBox;

/*
        <select>
          <option value="">--Please choose an option--</option>
          {tempOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.title}
            </option>
          ))}
        </select>
*/
