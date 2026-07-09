import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

// Schema di validazione zod, definisce regole per username, email e password.
const registerSchema = z.object({
  username: z.string().min(3, "Username di almeno 3 caratteri!"),
  email: z.string().email("Inserisci un email valida!"),
  password: z
    .string()
    .min(8, "La password deve avere almeno 8 caratteri")
    .regex(/[0-9]/, "La password deve contenere almeno un numero"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    // Crea l'utente in auth.users gestito da supabase.
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (authError) {
      console.error(authError.message);
      return;
    }

    // Crea il profilo in profiles usando stesso id di auth.users
    if (authData.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: authData.user.id,
        username: data.username,
      });

      if (profileError) {
        console.error(profileError.message);
        return;
      }
    }

    navigate(ROUTES.FEED);
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="auth-form__title">Crea account</h2>

        <div className="auth-form__field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Scegli un nome utente"
            {...register("username")}
          />
          {errors.username && (
            <p className="auth-form__error">{errors.username.message}</p>
          )}
        </div>

        <div className="auth-form__field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            placeholder="Inserisci email"
            {...register("email")}
          />
          {errors.email && (
            <p className="auth-form__error">{errors.email.message}</p>
          )}
        </div>

        <div className="auth-form__field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Inserisci password"
            {...register("password")}
          />
          {errors.password && (
            <p className="auth-form__error">{errors.password.message}</p>
          )}
        </div>

        <button
          className="auth-form__btn"
          type="submit"
          disabled={isSubmitting}
        >
          Registrati
        </button>

        <p className="auth-form__link">
          <Link to={ROUTES.LOGIN}>Hai già un account? Accedi</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
