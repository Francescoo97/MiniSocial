import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import NavBar from "./components/layout/NavBar";
import ProtectedRoutes from "./components/layout/ProtectedRoutes";
import PublicRoutes from "./components/layout/PublicRoutes";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to={ROUTES.FEED} />} />

        {/* Rotte pubbliche accessibili solo se NON sei loggato. */}
        <Route
          path={ROUTES.LOGIN}
          element={
            <PublicRoutes>
              {" "}
              <LoginPage />{" "}
            </PublicRoutes>
          }
        />

        <Route
          path={ROUTES.REGISTER}
          element={
            <PublicRoutes>
              {" "}
              <RegisterPage />{" "}
            </PublicRoutes>
          }
        />

        {/*Rotte protette accessibili solo se sei loggato.  */}
        <Route
          path={ROUTES.FEED}
          element={
            <ProtectedRoutes>
              <FeedPage />
            </ProtectedRoutes>
          }
        />

        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoutes>
              <ProfilePage />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
