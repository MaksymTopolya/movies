import { FC } from 'react';
import { useTypedSelector } from '../../hooks';
import { searchedMovies } from '../../redux/selectors';
import css from './SearchedMoviesRender.module.scss';
import { Link } from 'react-router-dom';
const SearchedMoviesRender: FC = () => {
  const movies = useTypedSelector(searchedMovies);
  const moviesWithPoster = movies.filter((movie) => movie.poster_path !== null);
  console.log(movies);
  return (
    <div className={css.container}>
      <ul className={css.list}>
        {moviesWithPoster.map((movie, i) => (
          <li key={movie.id + i}>
            {movie.poster_path ? (
              <Link
                to={
                  movie.original_title
                    ? `/details/${movie.id}`
                    : `/serials/${movie.id}`
                }
              >
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
            ) : (
              <div>
                <div className={css.noImage}></div>
                <h2 className={css.title}></h2>
              </div>
            )}
            <h2 className={css.title}>
              {movie.original_title
                ? movie.original_title
                : movie.original_name}
            </h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchedMoviesRender;
