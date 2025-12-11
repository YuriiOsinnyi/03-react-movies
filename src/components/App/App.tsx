import { useState } from "react";
import { fetchMovies } from "../../services/movieService";
import Loader from "../../components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../../components/SearchBar/SearchBar";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieGrid from "../../components/MovieGrid/MovieGrid";
import MovieModal from "../../components/MovieModal/MovieModal";
import type { Movie } from "../../types/movie";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function onFound(query: string) {
    setLoading(true);
    setError(false);
    setMovies([]);

    try {
      fetchMovies(query).then((response) => {
        if (!response.length) {
          toast.error("No movies found for your request.");
        }
        setMovies(response);
      });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SearchBar onSubmit={onFound} />
      {loading && <Loader />}
      {!loading && !error && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}
      {error && <ErrorMessage />}
      <Toaster />
      {selectedMovie && (
        <MovieModal
          onClose={() => setSelectedMovie(null)}
          movie={selectedMovie}
        />
      )}
    </>
  );
}
