import type { Post } from "../../types";
import type { Comment } from "../../types";

// Props con numero totale dei like, controllo se utente ha già messo like e funzione chiamata al click sul bottone.
// Per i commenti ha numero totale dei commenti, controllo della lista (aperta/chiusa) e funzione per aggiungere nuovo commento.
type PostCardProps = {
  post: Post;
  likesCount: number;
  hasLiked: boolean;
  onLike: () => void;
  comments: Comment[];
  commentsCount: number;
  newComment: string;
  setNewComment: (value: string) => void;
  isOpen: boolean;
  handleOpen: () => void;
  addComment: () => void;
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
function PostCard({
  post,
  likesCount,
  hasLiked,
  onLike,
  comments,
  commentsCount,
  newComment,
  setNewComment,
  isOpen,
  handleOpen,
  addComment,
}: PostCardProps) {
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

      {/*Immagine del post.*/}
      {post.image_url && (
        <img
          className="post-card__image"
          src={post.image_url}
          alt={`Post di ${post.author?.username}`}
        />
      )}

      <p className="post-card__content">{post.content}</p>

      {/*Like e commenti del post.*/}
      <footer className="post-card__footer">
        <button
          className={`post-card__like-btn ${hasLiked ? "post-card__like-btn--liked" : ""}`}
          onClick={onLike}
          aria-label={hasLiked ? "Rimuovi like" : "Metti like"}
        >
          {hasLiked ? "❤️" : "🤍"} {likesCount}
        </button>

        {/*Al click apre e chiude la lista commenti.*/}
        <button
          className={`post-card__comment-btn ${isOpen ? "post-card__comment-btn--open" : ""}`}
          onClick={handleOpen}
          aria-label={isOpen ? "Nascondi commenti" : "Mostra commenti"}
        >
          💬{commentsCount}
        </button>
      </footer>

      {/* Lista visibile solo quando isOpen è true. */}
      {isOpen && (
        <ul className="post-card__comments">
          {comments.map((c) => (
            <li className="post-card__comment" key={c.id}>
              <strong className="post-card__comment-author">
                {c.author?.username}
              </strong>
              <p className="post-card__comment-content">{c.content}</p>
            </li>
          ))}
        </ul>
      )}

      {/*Input per commentare visibile solo se isOpen è true. */}
      {isOpen && (
        <div className="post-card__comment-input">
          <input
            type="text"
            placeholder="Aggiungi un commento..."
            aria-label="Aggiungi un nuovo commento"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          {/* Invia il commento e svuota il campo input. */}
          <button onClick={addComment}>Invia</button>
        </div>
      )}
    </article>
  );
}

export default PostCard;
