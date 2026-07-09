import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Schema di validazione zod, definisce le regole per email e password.
const loginSchema = z.object({
  email: z.string().email("Inserisci un email valida!"),
  password: z.string().min(8, "La password deve avere almeno 8 caratteri"),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Chiama Supabase Auth tramite AuthContext.
      await login(data.email, data.password);
      // Dopo login, naviga al feed.
      navigate(ROUTES.FEED);
    } catch {
      // Se login fallisce, mostra messaggio di errore.
      setError("root", { message: "Email o password errate, riprovare" });
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
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
          {errors.root && (
            <p className="auth-form__error">{errors.root.message}</p>
          )}
        </div>

        {/* Disabilitato durante il submit per evitare invii multipli. */}
        <button
          className="auth-form__btn"
          type="submit"
          disabled={isSubmitting}
        >
          Accedi
        </button>

        <p className="auth-form__link">
          <Link to={ROUTES.REGISTER}>Non hai un account? Registrati</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
