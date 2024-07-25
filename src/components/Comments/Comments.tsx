import { FC, useState } from 'react';
import css from './Comments.module.scss';
import { firestore } from '../../Firebase';
import RenderComments from '../RenderComments/RenderComments';
import { useUser } from '../../context';
import { generateRandomId } from '../../Uttilities';

interface Comments {
  movieId: string;
  collection: string;
}

const Comments: FC<Comments> = ({ movieId, collection }) => {
  const [update, setUpdate] = useState<number>(0);
  const [comment, setComment] = useState('');
  const { user } = useUser();
  const commentId = generateRandomId();

  const addMovieComments = async (movieId: string, comment: string) => {
    try {
      const movieCommentsRef = firestore
        .collection(collection)
        .doc(movieId)
        .collection('comments')
        .doc(commentId);
      await movieCommentsRef.set({
        id: commentId,
        text: comment,
        timestamp: new Date(),
        user: user?.displayName || 'Anonymous',
        userImg:
          user?.photoURL ||
          'https://iptc.org/wp-content/uploads/2018/05/avatar-anonymous-300x300.png',
        userEmail: user?.email,
      });
      console.log('Comment added');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user === null) {
      return alert('Please login to write comments');
    }
    await addMovieComments(movieId, comment);
    setComment('');
    setUpdate(update + 1);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          name="comment"
          placeholder="Add comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Submit
        </button>
      </form>
      <RenderComments
        movieId={movieId}
        isUpdate={update}
        collection={collection}
      />
    </div>
  );
};

export default Comments;
