import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../hooks';
import { actorsMovies } from '../../redux/selectors';
import css from './ActorDetailsMovieRender.module.scss';
import { FC } from 'react';
import { Movie } from '../../types';
const ActorDetailsMovieRender: FC = () => {
  const movies: Movie[] = useTypedSelector(actorsMovies);
  const moviesWithPoster: Movie[] = movies.filter(
    (movie) => movie.poster_path !== null,
  );
  console.log(moviesWithPoster);

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {moviesWithPoster.map((movie) => (
          <li key={movie.id}>
            {movie.poster_path ? (
              <Link to={`/details/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.original_title}
                  className={css.img}
                />
              </Link>
            ) : (
              <div>
                <div className={css.noImage}></div>
                <h2 className={css.title}></h2>
              </div>
            )}
            <h2 className={css.title}>{movie.original_title}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActorDetailsMovieRender;
