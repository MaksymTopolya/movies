import { FC, useEffect, useState } from 'react';
import { firestore } from '../../Firebase';
import css from './RenderComments.module.scss';
import ReplyComments from '../ReplyComments/ReplyComments';
import { useUser } from '../../context';

interface RenderCommentsProps {
  movieId: string;
  isUpdate: number;
}

interface Comment {
  id: string;
  text: string;
  user: string;
  userImg: string;
  timestamp: { seconds: number };
  userEmail: string;
}

const RenderComments: FC<RenderCommentsProps> = ({ movieId, isUpdate }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyTarget, setReplyTarget] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsSnapshot = await firestore
          .collection('MoviesComments')
          .doc(movieId)
          .collection('comments')
          .orderBy('timestamp', 'asc')
          .get();
        const commentsData: Comment[] = commentsSnapshot.docs.map((doc) => {
          const { text, user, userImg, timestamp, userEmail } =
            doc.data() as Comment;
          return { id: doc.id, text, user, userImg, timestamp, userEmail };
        });
        setComments(commentsData.reverse());
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [movieId, isUpdate]);

  const handleDelete = async (commentId: string) => {
    try {
      await firestore
        .collection('MoviesComments')
        .doc(movieId)
        .collection('comments')
        .doc(commentId)
        .delete();
      console.log('Comment deleted');
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId),
      );
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const toggleReply = (commentId: string) => {
    setReplyTarget(commentId === replyTarget ? null : commentId);
  };

  return (
    <div className={css.commentsContainer}>
      {comments.length === 0 ? <h3>No Comments</h3> : <h3>Movie Comments</h3>}
      <ul className={css.commentsList}>
        {comments.map((comment) => (
          <div key={comment.id}>
            <li>
              <img src={comment.userImg} alt={comment.user} />
              <div>
                <p>{comment.user}</p>
                <p>{comment.text}</p>
                <p>
                  {new Date(comment.timestamp.seconds * 1000).toLocaleString()}
                </p>
              </div>
              {comment.userEmail === user?.email && (
                <button
                  onClick={() => handleDelete(comment.id)}
                  className={css.deleteBtn}
                >
                  Delete
                </button>
              )}
              <button
                onClick={() => toggleReply(comment.id)}
                className={css.replyBtn}
              >
                Open Replies
              </button>
            </li>
            {replyTarget === comment.id && <ReplyComments id={comment.id} />}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default RenderComments;
