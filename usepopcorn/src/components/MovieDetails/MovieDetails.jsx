import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessages/ErrorMessage";

function MovieDetails({ selectedMovieId, handleCloseMovieDetails }) {
  const [currentMovie, setcurrentMovie] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    Genre: genre,
    Poster: poster,
    Released: released,
    Runtime: runtime,
    Title: title,
    imdbRating,
    Plot: plot,
    Actors: actors,
    Director: director,
  } = currentMovie;

  useEffect(() => {
    async function fetchMovie() {
      try {
        setErrorMessage("");
        setIsloading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=418f0745&i=${selectedMovieId}`
        );
        const data = await res.json();
        setcurrentMovie(data);
        if (data.Response === "False") {
          throw new Error(data.Error);
        }
      } catch (err) {
        setErrorMessage(err.message);
      } finally {
        setIsloading(false);
      }
    }
    fetchMovie();
  }, [selectedMovieId]);

  useEffect(() => {
    if (title) document.title = title;
    // cleanup
    return () => (document.title = "popcorn🍿");
  }, [selectedMovieId, title]);
  return (
    <>
      {isLoading && <Loader></Loader>}
      {isLoading && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {!isLoading && !errorMessage && (
        <div className="details">
          <header>
            <button className="btn-back" onClick={handleCloseMovieDetails}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </div>
      )}
    </>
  );
}

export default MovieDetails;
