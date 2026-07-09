import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../context/AuthContext";
import { usePost } from "../../context/PostContext";
import { supabase } from "../../lib/supabase";

// Schema di validazione zod, richiede solo del contenuto per il post.
const formSchema = z.object({
  content: z.string().min(1, "Scrivi qualcosa!"),
});

type FormPostData = z.infer<typeof formSchema>;

function FormPost() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormPostData>({
    resolver: zodResolver(formSchema),
  });

  const { isAuthenticated, user } = useAuth();

  // fetchPost chiamata per aggiornare il feed.
  const { fetchPosts } = usePost();

  const onSubmit = async (data: FormPostData) => {
    // Controllo di sicurezza
    if (!user) return;

    // Inserisce il nuovo post in Supabase
    // id e created_id vengono generati dal database.
    const { error } = await supabase.from("posts").insert({
      author_id: user.id,
      content: data.content,
    });

    if (error) {
      console.log(error.message);
      return;
    }

    // Ricarica il feed aggiornato con il nuovo post e svuota il form dopo l'invio.
    await fetchPosts();
    reset();
  };

  // Se non sei loggato, non mostra il form.
  if (!isAuthenticated) return null;

  return (
    <form className="form-post" onSubmit={handleSubmit(onSubmit)}>
      <textarea
        className="form-post__textarea"
        {...register("content")}
        placeholder="Crea un nuovo post..."
        aria-label="Contenuto del post"
      ></textarea>
      {errors.content && (
        <p className="form-post__error">{errors.content.message}</p>
      )}
      <button className="form-post__btn" type="submit" disabled={isSubmitting}>
        Pubblica
      </button>
    </form>
  );
}

export default FormPost;
