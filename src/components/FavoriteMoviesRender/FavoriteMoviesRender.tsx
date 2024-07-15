import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context';
import { firestore } from '../../Firebase';
import { useTypedSelector, useTypedDispatch } from '../../hooks';
import { setFavoriteMovies } from '../../redux/movieSlice';
import { favoriteMovies } from '../../redux/selectors';
import css from './FavoriteMoviesRender.module.scss';
const FavoriteMoviesRender: FC = () => {
  const { user } = useUser();
  const movies = useTypedSelector(favoriteMovies);
  const dispatch = useTypedDispatch();
  const isLoading = useTypedSelector((state) => state.isLoading);
  useEffect(() => {
    const fetchMovies = async () => {
      if (!user) return;

      try {
        const moviesSnapshot = await firestore
          .collection('users')
          .doc(user!.uid!)
          .collection('movies')
          .get();

        const moviesList = moviesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data().movie,
        }));

        dispatch(setFavoriteMovies(moviesList));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [user, dispatch]);

  const handleDeleteMovie = async (movieId: number) => {
    try {
      await firestore
        .collection('users')
        .doc(user!.uid!)
        .collection('movies')
        .doc(movieId.toString())
        .delete();

      const updatedMovies = movies.filter((movie) => movie.id !== movieId);
      dispatch(setFavoriteMovies(updatedMovies));
      console.log('Movie deleted successfully');
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
    <div className={css.container}>
      {isLoading ? (
        <p>Loading...</p>
      ) : movies.length === 0 ? (
        <p>No favorite movies found.</p>
      ) : (
        <ul className={css.list}>
          {movies.map((movie, i) => (
            <li key={movie.id + i}>
              <Link to={`/details/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={
                    movie.original_title
                      ? movie.original_title
                      : movie.original_name
                  }
                  className={css.img}
                />
              </Link>
              <h2 className={css.title}>
                {movie.original_title
                  ? movie.original_title
                  : movie.original_name}
              </h2>
              <button onClick={() => handleDeleteMovie(movie.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoriteMoviesRender;
