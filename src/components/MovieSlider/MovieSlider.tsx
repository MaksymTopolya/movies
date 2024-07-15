import { FC, useEffect, useRef } from 'react';
import { useTypedSelector } from '../../hooks';
import { loadMoreMovies, recommendedMovies } from '../../redux/selectors';
import { useRandomRecommendedMovies } from '../../hooks';
import css from './MovieSlider.module.scss';
import { Movie } from '../../types';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MovieSlider: FC = () => {
  const movies: Movie[] = useTypedSelector(recommendedMovies);
  const dispatch = useRandomRecommendedMovies();
  const loadMore: boolean = useTypedSelector(loadMoreMovies);
  const sliderRef = useRef<Slider>(null);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      dispatch();
    }
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    ref: sliderRef,
  };

  const handleClick = async () => {
    dispatch();
    sliderRef.current?.slickGoTo(0);
  };

  return (
    <div className={css.sliderContainer}>
      <Slider {...settings}>
        {movies.map((movie: Movie) => (
          <div key={movie.id} className={css.slide}>
            <Link to={`/details/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.original_title}
                id={movie.id.toString()}
              />
            </Link>
          </div>
        ))}
      </Slider>
      {loadMore && (
        <button className={css.newFilms} onClick={handleClick}>
          Search new films
        </button>
      )}
    </div>
  );
};

export default MovieSlider;
