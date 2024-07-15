import { FC } from 'react';
import { getUpcomingMovies } from '../../MoviesApi';
import { useTypedDispatch } from '../../hooks';
import { clearUpcomingMovies } from '../../redux/movieSlice';
import { upcomingMovies, upcomingMoviesPages } from '../../redux/selectors';
import MoviesRender from '../MoviesRender/MoviesRender';

const UpcomingMovies: FC = () => {
  const dispatch = useTypedDispatch();
  const clearPage = () => {
    dispatch(clearUpcomingMovies([]));
  };
  return (
    <div>
      <MoviesRender
        selector={upcomingMovies}
        onDispatch={getUpcomingMovies}
        clear={clearPage}
        pages={upcomingMoviesPages}
      />
    </div>
  );
};

export default UpcomingMovies;
