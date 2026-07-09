import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Post } from "../types";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

type PostContextType = {
  posts: Post[];
  fetchPosts: () => Promise<void>; //Ricarica il feed dopo un nuovo post.
  isLoading: boolean;
};

const PostContext = createContext<PostContextType | undefined>(undefined);

export function PostProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();

  // Query per prendere tutti i post con autore e conteggio like.
  const fetchPosts = async () => {
    // Inizia il caricamento.
    setIsLoading(true);

    const { data, error } = await supabase
      .from("posts")
      .select("*, author:profiles(*), likes(count)")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error.message);
      setIsLoading(false);
      return;
    }

    if (data) {
      setPosts(data);
    }

    // Fine del caricamento.
    setIsLoading(false);
  };

  // I post vengono caricati solo se sei loggato.
  useEffect(() => {
    if (user)
      // eslint-disable-next-line
      fetchPosts();
  }, [user]); //Si riesegue quando cambia l'utente

  return (
    <PostContext.Provider value={{ posts, fetchPosts, isLoading }}>
      {children}
    </PostContext.Provider>
  );
}

// eslint-disable-next-line
export function usePost() {
  const context = useContext(PostContext);
  if (!context)
    throw new Error("usePost deve essere usato dentro PostProvider");
  return context;
}
