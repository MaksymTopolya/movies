import { FC } from 'react';
import MoviesRender from '../MoviesRender/MoviesRender';
import { newMovies, newMoviesPages } from '../../redux/selectors';
import { getNewMovies } from '../../MoviesApi';
import { useTypedDispatch } from '../../hooks';
import { clearNewMovies } from '../../redux/movieSlice';
import css from './NewMovies.module.scss';
const NewMovies: FC = () => {
  const dispatch = useTypedDispatch();
  const clearPage = () => {
    dispatch(clearNewMovies([]));
  };

  return (
    <div className={css.container}>
      <MoviesRender
        selector={newMovies}
        pages={newMoviesPages}
        onDispatch={getNewMovies}
        clear={clearPage}
      />
    </div>
  );
};

export default NewMovies;
