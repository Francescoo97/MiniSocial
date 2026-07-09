import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

// Hook per gestire la logica dei like per un singolo post.
export function useLike(postId: string) {
  const [likesCount, setLikesCount] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  const { user } = useAuth();

  // Carica i dati dei like, quando cambia postId, user o al caricamento.
  useEffect(() => {
    // Se non sei loggato si ferma.
    if (!user) return;

    const fetchLikeData = async () => {
      // conta i like totali del post.
      const { count } = await supabase
        .from("likes")
        .select("*", { count: "exact", head: true })
        .eq("post_id", postId);

      setLikesCount(count ?? 0);

      // controlla se l'utente ha già messo like al post.
      const { data } = await supabase
        .from("likes")
        .select("id")
        .eq("post_id", postId)
        .eq("user_id", user!.id)
        .maybeSingle();

      // !!data converte in boolean: null è false e oggetto è true.
      setHasLiked(!!data);
    };

    fetchLikeData();
  }, [postId, user]); //se cambia il post o l'utente loggato si riesegue.

  // Aggiunge un like nella tabella 'likes' Supabase.
  const addLike = async () => {
    await supabase.from("likes").insert({ post_id: postId, user_id: user!.id });
  };

  // Rimuove il like al post.
  const removeLike = async () => {
    await supabase
      .from("likes")
      .delete()
      .eq("post_id", postId)
      .eq("user_id", user!.id);
  };

  // Questa funzione decide se aggiungere o rimuovere il like
  // Aggiorna lo stato locale per una UI migliore senza aspettare la risposta di Supababase (ottimistic update).
  const handleLike = async () => {
    if (hasLiked) {
      await removeLike();
      setHasLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      await addLike();
      setHasLiked(true);
      setLikesCount((prev) => prev + 1);
    }
  };

  return { likesCount, hasLiked, handleLike };
}
