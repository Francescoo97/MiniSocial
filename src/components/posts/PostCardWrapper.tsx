import { useComments } from "../../hooks/useComments";
import { useLike } from "../../hooks/useLike";
import type { Post } from "../../types";
import PostCard from "../ui/PostCard";

type PostCardWrapperProps = {
  post: Post;
};

// Questo componente fa da 'ponte' tra logica e UI; creato perchè non è possibile chiamare hook dentro .map()
// Chiama useLike per ottenere i dati dei like e dei commenti
// e passarli come props a PostCard
// Ottiene il conteggio dei like, stato dei like dell'utente e funzione HandleLike.
// Per i commenti ottiene il conteggio commenti, stato della lista aperta/chiusa (handleOpen) e funzione addComment.
function PostCardWrapper({ post }: PostCardWrapperProps) {
  const { likesCount, hasLiked, handleLike } = useLike(post.id);
  const {
    commentsCount,
    comments,
    isOpen,
    newComment,
    handleOpen,
    setNewComment,
    addComment,
  } = useComments(post.id);

  return (
    <PostCard
      post={post}
      likesCount={likesCount}
      hasLiked={hasLiked}
      onLike={handleLike}
      commentsCount={commentsCount}
      comments={comments}
      isOpen={isOpen}
      newComment={newComment}
      handleOpen={handleOpen}
      addComment={addComment}
      setNewComment={setNewComment}
    />
  );
}

export default PostCardWrapper;
