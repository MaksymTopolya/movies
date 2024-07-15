import { getTopRatedMovies } from '../../MoviesApi';
import { useTypedDispatch } from '../../hooks';
import { clearTopRatedMovies } from '../../redux/movieSlice';
import { topRatedMovies, topRatedMoviesPages } from '../../redux/selectors';
import MoviesRender from '../MoviesRender/MoviesRender';

const TopRatedMovies = () => {
  const dispatch = useTypedDispatch();
  const clearPage = () => {
    dispatch(clearTopRatedMovies([]));
  };
  return (
    <div>
      <MoviesRender
        selector={topRatedMovies}
        onDispatch={getTopRatedMovies}
        clear={clearPage}
        pages={topRatedMoviesPages}
      />
    </div>
  );
};

export default TopRatedMovies;
