import React, { useEffect, useRef } from 'react';
import { FaYoutube } from 'react-icons/fa';
import { useTypedDispatch, useTypedSelector } from '../../hooks';
import { getYoutubeVideoTrailer } from '../../MoviesApi';
import { youtubeVideoTrailer } from '../../redux/selectors';
import { useParams } from 'react-router-dom';
import css from './YouTubePlayer.module.scss';

interface MyYouTubePlayerProps {
  movieId: string;
  myDispatch: (id: number) => Promise<{ key: string }>;
  mySelector: (state: []) => { key: string }[];
}

const MyYouTubePlayer: React.FC<MyYouTubePlayerProps> = ({
  movieId,
  myDispatch,
  mySelector,
}) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const dispatch = useTypedDispatch();
  const video = useTypedSelector(mySelector)[0];

  useEffect(() => {
    const fetchVideoTrailer = async () => {
      try {
        await dispatch(myDispatch(Number(movieId)));
      } catch (error) {
        console.error('Error fetching video trailer:', error);
      }
    };

    fetchVideoTrailer();
  }, [dispatch, movieId]);

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
