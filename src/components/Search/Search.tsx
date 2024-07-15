import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import css from './Search.module.scss';
import { useTypedDispatch, useTypedSelector } from '../../hooks';
import { queryValue, searchedMoviesPages } from '../../redux/selectors';
import { clearSearchedMovies, setQueryValue } from '../../redux/movieSlice';
import { searchMovies } from '../../MoviesApi';
import SearchedMoviesRender from '../SearchedMoviesRender/SearchedMoviesRender';

const Search: FC = () => {
  const query = useTypedSelector(queryValue);
  const pages = useTypedSelector(searchedMoviesPages);
  const dispatch = useTypedDispatch();
  const [page, setPage] = useState(1);
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setQueryValue(e.target.value));
  };

  console.log(pages);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    dispatch(clearSearchedMovies([]));
    e.preventDefault();
    dispatch(searchMovies({ query, page: 1 }));
  };

  const loadMore = () => {
    setPage(page + 1);
    dispatch(searchMovies({ query, page: page + 1 }));
  };

  useEffect(() => {
    return () => {
      dispatch(clearSearchedMovies([]));
      dispatch(setQueryValue(''));
    };
  }, [dispatch]);

  return (
    <div>
      <div className={css.container}>
        <form onSubmit={handleSubmit} className={css.form}>
          <input
            type="text"
            placeholder="Search film"
            name="query"
            aria-label="Search film"
            value={query}
            onChange={handleChange}
            className={css.input}
          />
          <button type="submit" className={css.button}>
            Search
          </button>
        </form>
      </div>
      <SearchedMoviesRender />
      {pages > page ? (
        <button onClick={loadMore} className={css.loadMore}>
          Load More
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Search;
