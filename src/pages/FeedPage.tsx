import { usePost } from "../context/PostContext";
import FormPost from "../components/forms/FormPost";
import PostCardWrapper from "../components/posts/PostCardWrapper";

// Pagina principale dell'app, mostra feed e form per nuovi post
function FeedPage() {
  // I post provengono da PostContext
  const { posts, isLoading } = usePost();

  return (
    <div className="page">
      <main className="feed">
        {/* Form per creare nuovo post */}
        <FormPost />
        {/* Mappa ogni post in PostCardWrapper che gestisce i like. */}
        {isLoading ? (
          <p style={{ textAlign: "center", color: "#888" }}>Caricamento...</p>
        ) : (
          posts.map((post) => <PostCardWrapper key={post.id} post={post} />)
        )}
      </main>
    </div>
  );
}

export default FeedPage;
