import PostCardWrapper from "../components/posts/PostCardWrapper";
import { useAuth } from "../context/AuthContext";
import { usePost } from "../context/PostContext";

function ProfilePage() {
  const { user } = useAuth();
  const { posts } = usePost();

  // Filtra solo i post dell'utente loggato.
  const getTotalPosts = posts.filter((post) => post.author_id === user?.id);

  // Somma i like di tutti i post dell'utente, Supabase restituisce i like come [{count: N}]
  const getTotalLike = getTotalPosts.reduce(
    (tot, post) => tot + (post.likes[0]?.count ?? 0),
    0,
  );

  // Se non sei loggato non mostrare nulla.
  if (!user) return <p>Accedi per visualizzare il profilo</p>;

  return (
    <div className="page">
      <main className="profile">
        <header className="profile__header">
          {/* Se presente mostra l'avatar, altrimenti la prima lettera dell'username */}
          {user.avatar_url ? (
            <img
              className="profile__avatar"
              src={user.avatar_url}
              alt="Avatar"
            />
          ) : (
            <div className="profile__avatar-placeholder">
              {user.username[0].toUpperCase()}
            </div>
          )}

          <div>
            <h2 className="profile__username">{user.username}</h2>
            <div className="profile__stats">
              <div className="profile__stat">
                <span className="profile__stat-number">
                  {getTotalPosts.length}
                </span>
                <span className="profile__stat-label">Post</span>
              </div>
              <div className="profile__stat">
                <span className="profile__stat-number">{getTotalLike}</span>
                <span className="profile__stat-label">Like ricevuti</span>
              </div>
            </div>
          </div>
        </header>

        {getTotalPosts.length === 0 ? (
          <p className="profile__empty">Ancora nessun post</p>
        ) : (
          getTotalPosts.map((post) => (
            <PostCardWrapper key={post.id} post={post} />
          ))
        )}
      </main>
    </div>
  );
}

export default ProfilePage;
