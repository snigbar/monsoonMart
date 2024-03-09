import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import HomePage from "./pages/HomePage/HomePage";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Register from "./pages/Auth/Register";
import VerifyUserPage from "./pages/Auth/VerifyUserPage";
import { ForgotPasswordForm } from "./pages/Auth/ForgotPasswordForm";
import ResetPasswordForm from "./pages/Auth/ResetPasswordForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* homepage */}
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage></HomePage>
            </MainLayout>
          }
        />

        {/* Auth - login */}

        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        {/* forgot password request */}
        <Route
          path="/forgot-password"
          element={
            <AuthLayout>
              <ForgotPasswordForm />
            </AuthLayout>
          }
        />

        {/* reset password form */}
        <Route
          path="/reset-pass/:forgotPassToken/:id"
          element={
            <AuthLayout>
              <ResetPasswordForm />
            </AuthLayout>
          }
        />
        {/* Auth - register */}

        <Route
          path="/register"
          element={
            <AuthLayout>
              <Register></Register>
            </AuthLayout>
          }
        />

        <Route
          path="/activate/:activationToken/:id"
          element={
            <AuthLayout>
              <VerifyUserPage></VerifyUserPage>
            </AuthLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
