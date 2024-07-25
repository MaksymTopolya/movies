import { useParams } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from '../../hooks';
import { FC, useEffect } from 'react';
import { getCast, getMovieById, getYoutubeVideoTrailer } from '../../MoviesApi';
import {
  cast,
  movieDetailsById,
  youtubeVideoTrailer,
} from '../../redux/selectors';
import { Movie } from '../../types';
import css from './MovieDetails.module.scss';
import CastRender from '../CastRender/CastRender';
import {
  clearCast,
  clearMovieDetailsById,
  defaultMovie,
} from '../../redux/movieSlice';
import { firestore } from '../../Firebase';
import { useUser } from '../../context';
import Comments from '../Comments/Comments';
import MyYouTubePlayer from '../YouTubePlayer/YouTubePlayer';

const MovieDetails: FC = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const dispatch = useTypedDispatch();
  const details: Movie = useTypedSelector(movieDetailsById);
  const { user } = useUser();
  useEffect(() => {
    const fetchFilm = async () => {
      try {
        if (movieId) {
          await dispatch(getMovieById(Number(movieId)));
          await dispatch(getCast(Number(movieId)));
        }
      } catch (error) {
        console.error('Error fetching film:', error);
      }
    };
    if (movieId) {
      fetchFilm();
    }
    return () => {
      dispatch(clearMovieDetailsById(defaultMovie));
      dispatch(clearCast([]));
    };
  }, [dispatch, movieId]);

  if (!details) {
    return <p className={css.loading}>Loading...</p>;
  }

  const addMovieToFavorite = async (userId: string, movie: Movie) => {
    try {
      const userMoviesRef = firestore
        .collection('users')
        .doc(userId)
        .collection('movies')
        .doc(movieId);
      await userMoviesRef.set({ movie });
      console.log('Movie added successfully');
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const {
    original_title,
    tagline,
    poster_path,
    release_date,
    overview,
    genres,
    original_language,
    popularity,
    vote_average,
  }: Movie = details;

  const genreList = genres?.map((genre: { id: number; name: string }) => (
    <li key={genre.id}>{genre.name}</li>
  ));

  return (
    <div className={css.details}>
      <h2 className={css.title}>{original_title}</h2>
      <h4 className={css.tagline}>{tagline}</h4>
      <div className={css.detailsContainer}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={original_title}
          className={css.poster}
        />
        <div className={css.detailsContent}>
          <p>
            <span className={css.label}>Release Date:</span> {release_date}
          </p>
          <p>
            <span className={css.label}>Overview:</span> {overview}
          </p>
          {genres && genres.length > 0 && (
            <>
              <h4 className={css.genreTitle}>Genres:</h4>
              <ul className={css.genreList}>{genreList}</ul>
            </>
          )}
          <p>
            <span className={css.label}>Language:</span> {original_language}
          </p>
          <p>
            <span className={css.label}>Popularity:</span> {popularity}
          </p>
          <p>
            <span className={css.label}>Rating:</span> {vote_average}
          </p>
          <h3 className={css.label}>Cast:</h3>
          <CastRender selector={cast} />
          {user && user.uid !== null ? (
            <button
              onClick={() => addMovieToFavorite(user!.uid!, details)}
              className={css.favoriteBtn}
            >
              Add to favorite
            </button>
          ) : (
            <div></div>
          )}
          <MyYouTubePlayer
            movieId={movieId!}
            myDispatch={getYoutubeVideoTrailer}
            mySelector={youtubeVideoTrailer}
          />
          <Comments movieId={movieId!} collection="MoviesComments" />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
