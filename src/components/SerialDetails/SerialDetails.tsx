import { useEffect } from 'react';
import css from './SerialDetails.module.scss';
import { useParams } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from '../../hooks';
import { getCast, getYoutubeVideoTrailer } from '../../SerialsApi';
import { defaultMovie, clearCast } from '../../redux/movieSlice';
import {
  serialCast,
  serialDetailsById,
  youtubeVideoTrailerSerial,
} from '../../redux/selectors';
import { clearSerialDetailsById } from '../../redux/serialsSlice';
import { getSerialById } from '../../SerialsApi';
import { Movie } from '../../types';
import CastRender from '../CastRender/CastRender';
import { firestore } from '../../Firebase';
import { useUser } from '../../context';
import Comments from '../Comments/Comments';
import MyYouTubePlayer from '../YouTubePlayer/YouTubePlayer';

export const SerialDetails = () => {
  const { serialId } = useParams<{ serialId: string }>();
  const dispatch = useTypedDispatch();
  const details: Movie = useTypedSelector(serialDetailsById);
  const { user } = useUser();
  console.log(serialId);
  useEffect(() => {
    const fetchFilm = async () => {
      try {
        if (serialId) {
          await dispatch(getSerialById(Number(serialId)));
          await dispatch(getCast(Number(serialId)));
        }
      } catch (error) {
        console.error('Error fetching film:', error);
      }
    };
    if (serialId) {
      fetchFilm();
    }
    return () => {
      dispatch(clearSerialDetailsById(defaultMovie));
      dispatch(clearCast([]));
    };
  }, [dispatch, serialId]);

  if (!details) {
    return <p className={css.loading}>Loading...</p>;
  }

  const {
    original_name,
    tagline,
    poster_path,
    release_date,
    overview,
    genres,
    original_language,
    popularity,
    vote_average,
  }: Movie = details;

  const addMovieToFavorite = async (userId: string, movie: Movie) => {
    try {
      const userMoviesRef = firestore
        .collection('users')
        .doc(userId)
        .collection('movies')
        .doc(serialId);
      await userMoviesRef.set({ movie });
      console.log('Movie added successfully');
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const genreList = genres?.map((genre: { id: number; name: string }) => (
    <li key={genre.id}>{genre.name}</li>
  ));

  return (
    <div className={css.details}>
      <h2 className={css.title}>{original_name}</h2>
      <h4 className={css.tagline}>{tagline}</h4>
      <div className={css.detailsContainer}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={original_name}
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
          <CastRender selector={serialCast} />
          <button
            onClick={() => addMovieToFavorite(user!.uid!, details)}
            className={css.favoriteBtn}
          >
            Add to favorite
          </button>
          <MyYouTubePlayer
            movieId={serialId!}
            myDispatch={getYoutubeVideoTrailer}
            mySelector={youtubeVideoTrailerSerial}
          />
          <Comments movieId={serialId!} collection="serialsComments" />
        </div>
      </div>
    </div>
  );
};
export default SerialDetails;
