import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import PersistLogin from "./components/PersistLogin";
import MealsPage from "./pages/MealsPage";
import LoginPage from "./pages/LoginPage";
import PromoPage from "./pages/PromoPage";
import UserPageLayout from "./components/UserPageLayout";
import UserCabinet from "./pages/UserCabinet";
import RecipesPage from "./pages/RecipesPage";
import ErrorPage from "./pages/ErrorPage";
import RegisterPage from "./pages/RegisterPage";
import InfoPage from "./pages/InfoPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="*" element={<ErrorPage />} />

        {/* public routes */}
        <Route index element={<PromoPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route path="userpage" element={<UserPageLayout />}>
            <Route index element={<MealsPage />} />
            <Route path="cabinet" element={<UserCabinet />} />
            <Route path="recipes" element={<RecipesPage />} />
            <Route path="info" element={<InfoPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
