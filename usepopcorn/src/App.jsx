import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/MainLayout/Main";
import Search from "./components/Search/Search";
import Numresult from "./components/Navbar/Numresult";
import Box from "./components/MainLayout/Box";
import Summary from "./components/MainLayout/Summary";
import WatchedList from "./components/MainLayout/WatchedList";
import MovieList from "./components/MovieList-c/MovieList";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessages/ErrorMessage";
import MovieDetails from "./components/MovieDetails/MovieDetails";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [query, setQuery] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  function handleCloseMovieDetails() {
    setSelectedMovieId(null);
  }

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsloading(true);
        setErrorMessage("");
        const res = await fetch(
          `https://www.omdbapi.com/?i=tt3896198&apikey=418f0745&s=${query}`,

          { signal: controller.signal }
        );
        if (!res.ok) {
          throw new Error("you lost you conection");
        }

        const data = await res.json();

        if (data.Response === "False") {
          throw new Error("Movie not found!");
        }

        setIsloading(false);
        setMovies(data.Search);
      } catch (err) {
        if (err.name !== "AbortError") setErrorMessage(err.message);
      } finally {
        setIsloading(false);
      }
    }
    if (query.length > 3) fetchMovies();
    else setMovies([]);
    // cleanup
    return () => controller.abort();
  }, [query]);

  return (
    <>
      <Navbar>
        <Search
          query={query}
          setQuery={setQuery}
          handleCloseMovieDetails={handleCloseMovieDetails}
        ></Search>
        <Numresult movies={movies}></Numresult>
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader></Loader>}
          {!isLoading && errorMessage && (
            <ErrorMessage>{errorMessage}</ErrorMessage>
          )}
          {!isLoading && !errorMessage && (
            <MovieList
              movies={movies}
              setSelectedMovieId={setSelectedMovieId}
            ></MovieList>
          )}
        </Box>
        <Box>
          {selectedMovieId ? (
            <MovieDetails
              selectedMovieId={selectedMovieId}
              handleCloseMovieDetails={handleCloseMovieDetails}
            ></MovieDetails>
          ) : (
            <>
              <Summary watched={watched}></Summary>
              <WatchedList watched={watched}></WatchedList>
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
