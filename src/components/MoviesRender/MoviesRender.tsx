import { FC, useEffect, useRef, useState } from 'react';
import { RootState } from '../../redux/selectors';
import { Movie } from '../../types';
import { useTypedDispatch, useTypedSelector } from '../../hooks';
import css from './MoviesRender.module.scss';
import { Link } from 'react-router-dom';

import { Action, ThunkAction } from '@reduxjs/toolkit';
interface MoviesRenderProps {
  selector: (state: RootState) => Movie[];
  pages: (state: RootState) => number;
  onDispatch: (
    page: number,
  ) => ThunkAction<void, RootState, unknown, Action<string>>;
  clear: () => void;
}

const MoviesRender: FC<MoviesRenderProps> = ({
  selector,
  pages,
  onDispatch,
  clear,
}) => {
  const dispatch = useTypedDispatch();
  const movies = useTypedSelector(selector);
  const totalPages = useTypedSelector(pages);
  const [page, setPage] = useState(1);
  const moviesWithPoster = movies.filter((movie) => movie.poster_path !== null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      dispatch(onDispatch(page));
    } else {
      isFirstRender.current = false;
    }
    return () => {
      clear();
    };
  }, [dispatch, onDispatch, isFirstRender, clear]);

  const loadMore = () => {
    setPage(page + 1);
    dispatch(onDispatch(page + 1));
  };

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {moviesWithPoster.map((movie, i) => (
          <li key={movie.id + i}>
            {movie.poster_path ? (
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
      {totalPages > page ? (
        <button onClick={loadMore} className={css.loadMore}>
          Load More
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default MoviesRender;
