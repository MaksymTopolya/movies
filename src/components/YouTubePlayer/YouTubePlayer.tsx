import React, { useEffect, useRef } from 'react';
import { FaYoutube } from 'react-icons/fa';
import { useTypedDispatch, useTypedSelector } from '../../hooks';
import { getYoutubeVideoTrailer } from '../../MoviesApi';
import { youtubeVideoTrailer } from '../../redux/selectors';
import { useParams } from 'react-router-dom';
import css from './YouTubePlayer.module.scss';
interface MyYouTubePlayerProps {
  movieId: string;
}

const MyYouTubePlayer: React.FC<MyYouTubePlayerProps> = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const playerRef = useRef<HTMLDivElement>(null);
  const dispatch = useTypedDispatch();
  const video = useTypedSelector(youtubeVideoTrailer)[0];

  useEffect(() => {
    const fetchVideoTrailer = async () => {
      try {
        await dispatch(getYoutubeVideoTrailer(Number(movieId)));
      } catch (error) {
        console.error('Error fetching video trailer:', error);
      }
    };

    fetchVideoTrailer();
  }, [dispatch, movieId, video?.key]);

  if (!video?.key) {
    return <div id="player" ref={playerRef}></div>;
  }

  return (
    <div className={css.player}>
      <a
        href={`https://www.youtube.com/watch?v=${video.key}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaYoutube style={{ fontSize: '92px', verticalAlign: 'middle' }} />
      </a>
    </div>
  );
};

export default MyYouTubePlayer;
