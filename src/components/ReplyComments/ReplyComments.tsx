import { FC, useState } from 'react';
import { firestore } from '../../Firebase';
import { useUser } from '../../context';
import { useParams } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { ReplyCommentsRender } from '../ReplyCommentsRender/ReplyCommentsRender';
import css from './ReplyComments.module.scss';
import { generateRandomId } from '../../Uttilities';
interface ReplyCommentsProps {
  id: string;
  collection: string;
}

const ReplyComments: FC<ReplyCommentsProps> = ({ id, collection }) => {
  const { serialId, movieId } = useParams<{
    serialId?: string;
    movieId?: string;
  }>();
  const movieOrSerialId = serialId || movieId;
  const { user } = useUser();
  const [value, setValue] = useState<string>('');
  const [update, setUpdate] = useState<number>(0);

  const replyId = generateRandomId();
  const addMovieCommentsReply = async (
    movieOrSerialId: string,
    comment: string,
  ) => {
    try {
      const movieCommentsReplyRef = firestore
        .collection(collection)
        .doc(movieOrSerialId)
        .collection('comments')
        .doc(id);

      await movieCommentsReplyRef.update({
        replies: firebase.firestore.FieldValue.arrayUnion({
          id: replyId,
          text: comment,
          time: new Date(),
          userName: user?.displayName || 'Anonymous',
          userPhoto:
            user?.photoURL ||
            'https://iptc.org/wp-content/uploads/2018/05/avatar-anonymous-300x300.png',
        }),
      });

      console.log('Reply added');
      setValue('');
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user === null) {
      return alert('Please login to write comments');
    }
    if (value.trim() === '') return;

    addMovieCommentsReply(movieOrSerialId!, value);
    setUpdate(update + 1);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          placeholder="Write a reply"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Send
        </button>
      </form>
      <ReplyCommentsRender
        movieId={movieOrSerialId!}
        commentId={id}
        isUpdate={update}
        collection={collection}
      />
    </div>
  );
};

export default ReplyComments;
