import Movie from "./Movie";

function MovieList({ movies, setSelectedMovieId }) {
  console.log(movies);
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          key={movie.imdbID}
          movie={movie}
          setSelectedMovieId={setSelectedMovieId}
        ></Movie>
      ))}
    </ul>
  );
}

export default MovieList;
