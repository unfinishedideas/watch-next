import { useState } from "react";
import SearchBar from "./SearchBar.tsx";
import { GetMoviesByTitle } from "../api/MovieApi.ts";

const AddMovieBox: React.FC = () => {
  enum BoxState {
    searching,
    waiting,
  }
  const [boxState, setBoxState] = useState(BoxState.waiting);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  async function SearchForMovie(value: string) {
    value = value.trim()
    if (value === "") {
        setOptions([]);
        return;
    }
    setLoading(true);
    try {
        let res = await GetMoviesByTitle(value);
        setOptions(res);
        console.log(res);           // TODO: Remove this
    } catch(err: unknown) {
        console.log(err);
    } finally {
        setLoading(false);
    }
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
        <SearchBar onSearch={SearchForMovie} />
        <button className="add-movie-btn">Add Movie</button>
        {loading ? (
          <div>
            <option value="">--Please choose an option--</option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.title}
              </option>
            ))}
          </div>
        ) : (
          <div />
        )}
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
