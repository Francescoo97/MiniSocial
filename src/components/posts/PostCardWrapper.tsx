import { useLike } from "../../hooks/useLike";
import type { Post } from "../../types";
import PostCard from "../ui/PostCard";

type PostCardWrapperProps = {
  post: Post;
};

// Questo componente fa da 'ponte' tra logica e UI; creato perchè non è possibile chiamare hook dentro .map()
// Chiama useLike per ottenere i dati dei like
// e passarli come props a PostCard
// Ottiene il conteggio dei like, stato dei like dell'utente e funzione HandleLike.
function PostCardWrapper({ post }: PostCardWrapperProps) {
  const { likesCount, hasLiked, handleLike } = useLike(post.id);

  return (
    <PostCard
      post={post}
      likesCount={likesCount}
      hasLiked={hasLiked}
      onLike={handleLike}
    />
  );
}

export default PostCardWrapper;
