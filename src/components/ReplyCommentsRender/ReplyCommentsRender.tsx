import React, { useEffect, useState } from 'react';
import { firestore } from '../../Firebase';

import css from './ReplyCommentsRender.module.scss';
interface Reply {
  id: string;
  text: string;
  time: { seconds: number };
  userName: string;
  userPhoto: string;
}

interface ReplyCommentsRenderProps {
  movieId: string;
  commentId: string;
  isUpdate: number;
  collection: string;
}

export const ReplyCommentsRender: React.FC<ReplyCommentsRenderProps> = ({
  movieId,
  commentId,
  isUpdate,
  collection,
}) => {
  const [replies, setReplies] = useState<Reply[]>([]);

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const commentRef = firestore
          .collection(collection)
          .doc(movieId)
          .collection('comments')
          .doc(commentId);

        const commentDoc = await commentRef.get();

        if (commentDoc.exists) {
          const commentData = commentDoc.data();
          if (commentData?.replies) {
            setReplies(commentData.replies.reverse());
          } else {
            console.log('No replies found for this comment.');
          }
        } else {
          console.log('No such comment exists.');
        }
      } catch (error) {
        console.error('Error fetching replies:', error);
      }
    };

    fetchReplies();
  }, [movieId, commentId, isUpdate, collection]);

  return (
    <div className={css.commentsContainer}>
      {replies.length === 0 ? (
        <h3>No Replies</h3>
      ) : (
        <ul className={css.commentsList}>
          {replies && replies.length > 0 ? (
            replies.map((reply, index) => (
              <div key={index}>
                <img src={reply.userPhoto} alt={reply.userName} />
                <div>
                  <p>{reply.userName}</p>
                  <p>{reply.text}</p>
                  <p>{new Date(reply.time.seconds * 1000).toLocaleString()}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No replies found</p>
          )}
        </ul>
      )}
    </div>
  );
};
