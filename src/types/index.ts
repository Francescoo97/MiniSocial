export type Profile = {
  id: string;
  username: string;
  avatar_url: string | null;
  created_at: string;
};

export type Post = {
  id: string;
  author_id: string;
  author?: Profile;
  content: string;
  image_url: string | null;
  created_at: string;
  // Supabase restituisce i like e i commenti come array quando viene usato likes(count) e comments(count) nella query.
  likes: { count: number }[];
  comments: { count: number }[];
};

export type Like = {
  id: string;
  user_id: string;
  post_id: string;
  created_at: string;
};

export type Comment = {
  id: string;
  user_id: string;
  post_id: string;
  created_at: string;
  content: string;
  author?: Profile;
};
