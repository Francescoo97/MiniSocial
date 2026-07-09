import type { Post } from "../../types";

// Props con numero totale dei like, controllo se utente ha già messo like e funzione chiamata al click sul bottone.
type PostCardProps = {
  post: Post;
  likesCount: number;
  hasLiked: boolean;
  onLike: () => void;
};

// Questa funzione prende la data in formato stringa e la restituisce come testo formattato secondo le convenzioni italiane.
function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
}

// Questo componente è esclusivamente UI, riceve tutto come props e si occupa solo del render.
function PostCard({ post, likesCount, hasLiked, onLike }: PostCardProps) {
  return (
    <article className="post-card">
      <header className="post-card__header">
        <div className="post-card__avatar">
          {/* Mostra l'avatar utente, altrimenti solo le iniziali dello username. */}
          {post.author?.avatar_url ? (
            <img
              src={post.author.avatar_url}
              alt={post.author.username}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            ></img>
          ) : (
            post.author?.username[0].toUpperCase()
          )}
        </div>
        <div>
          <p className="post-card__author">{post.author?.username}</p>
          <time className="post-card__date" dateTime={post.created_at}>
            {formatDate(post.created_at)}
          </time>
        </div>
      </header>

      {post.image_url && (
        <img
          className="post-card__image"
          src={post.image_url}
          alt={`Post di ${post.author?.username}`}
        />
      )}

      <p className="post-card__content">{post.content}</p>

      <footer className="post-card__footer">
        <button
          className={`post-card__like-btn ${hasLiked ? "post-card__like-btn--liked" : ""}`}
          onClick={onLike}
          aria-label={hasLiked ? "Rimuovi like" : "Metti like"}
        >
          {hasLiked ? "❤️" : "🤍"} {likesCount}
        </button>
      </footer>
    </article>
  );
}

export default PostCard;
