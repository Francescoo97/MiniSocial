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
  // Supabase restituisce i like come array quando viene usato likes(count) nella query.
  likes: { count: number }[];
};

export type Like = {
  id: string;
  user_id: string;
  post_id: string;
  created_at: string;
};
