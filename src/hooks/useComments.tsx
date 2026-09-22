import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import type { Comment } from "../types";

// Hook chhe gestisce tutta la logica dei commenti per un singolo post.

export function useComments(postId: string) {
  const [commentsCount, setCommentsCount] = useState<number>(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { user } = useAuth();

  // Al caricamento carica solo il contatore e non tutta la lista (lazy loading).
  // Se ci sono molti post nel feed evita query eccessive al montaggio.
  useEffect(() => {
    if (!user) return;

    const fetchCount = async () => {
      const { count } = await supabase
        .from("comments")
        .select("*", { count: "exact", head: true })
        .eq("post_id", postId);

      setCommentsCount(count ?? 0);
    };

    fetchCount();
  }, [postId, user]);

  // Aggiunge un commento nella tabella 'comments' Supabase, ricarica la lista aggiornata e svuota l'input.
  const addComment = async () => {
    // Se non sei loggato o non c'è un nuovo commento si ferma.
    if (!user || !newComment.trim()) return;

    await supabase
      .from("comments")
      .insert({ post_id: postId, user_id: user!.id, content: newComment });

    // Ricarica i commenti aggiornati.
    const { data } = await supabase
      .from("comments")
      .select("*, author:profiles(*)")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (data) {
      setComments(data);
      setCommentsCount(data.length);
    }

    // Svuota l'input.
    setNewComment("");
  };

  // Apre la lista commenti caricando i dati da Supabase.
  const handleOpen = async () => {
    //Se non sei loggato si ferma.
    if (!user) return;

    if (!isOpen) {
      //Conta i commenti totali nel post.
      const { count } = await supabase
        .from("comments")
        .select("*", { count: "exact", head: true })
        .eq("post_id", postId);

      setCommentsCount(count ?? 0);

      const { data } = await supabase
        .from("comments")
        .select("*, author: profiles(*)")
        .eq("post_id", postId)
        .order("created_at", { ascending: true });

      if (data) {
        setComments(data);
      }
    }
    //toggle che apre/chiude la lista commenti.
    setIsOpen((prev) => !prev);
  };

  return {
    commentsCount,
    comments,
    isOpen,
    newComment,
    setNewComment,
    addComment,
    handleOpen,
  };
}
