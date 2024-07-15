import { useParams } from 'react-router-dom';
import { actorInfo } from '../../redux/selectors';
import { useTypedDispatch, useTypedSelector } from '../../hooks';
import { FC, useEffect } from 'react';
import { getActorDetails, getActorMovies } from '../../MoviesApi';
import {
  actorInfoDefault,
  clearActorInfo,
  clearActorMovies,
} from '../../redux/movieSlice';
import ActorDetailsMovieRender from '../ActorDetailsMovieRender/ActorDetailsMovieRender';
import { ActorInfo } from '../../types';
import css from './ActorDetailsRender.module.scss';

const ActorDetailsRender: FC = () => {
  const { actorId } = useParams<{ actorId: string }>();
  const info: ActorInfo = useTypedSelector(actorInfo);
  const dispatch = useTypedDispatch();
  useEffect(() => {
    dispatch(getActorDetails(Number(actorId)));
    dispatch(getActorMovies(Number(actorId)));
    return () => {
      dispatch(clearActorInfo(actorInfoDefault));
      dispatch(clearActorMovies([]));
    };
  }, [dispatch, actorId]);

  return (
    <div className={css.container}>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${info.profile_path}`}
          alt={info.name}
        ></img>
        <h2>{info.name}</h2>
      </div>
      <div>
        <h4>{info.birthday}</h4>
        <h4>{info.place_of_birth}</h4>
      </div>
      <ActorDetailsMovieRender />
    </div>
  );
};
export default ActorDetailsRender;
