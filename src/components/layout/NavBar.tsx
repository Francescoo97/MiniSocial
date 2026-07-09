import { NavLink } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../context/AuthContext";

function NavBar() {
  // Legge l'utente loggato e la funzione di logout dal Context.
  const { user, logout } = useAuth();

  return (
    <div className="navbar">
      <h1 className="navbar__logo">MiniSocial</h1>

      <nav>
        <ul className="navbar__links">
          <li>
            <NavLink to={ROUTES.FEED}>Feed</NavLink>
          </li>

          {user ? (
            <>
              <li>
                <NavLink to={`/profile/${user?.id}`}>Profilo</NavLink>
              </li>

              <li>
                <button className="navbar__logout" onClick={logout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLink to={ROUTES.LOGIN}>Accedi</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
