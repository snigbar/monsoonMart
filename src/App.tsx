import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import HomePage from "./pages/HomePage/HomePage";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Register from "./pages/Auth/Register";
import VerifyUserPage from "./pages/Auth/VerifyUserPage";
import { ForgotPasswordForm } from "./pages/Auth/ForgotPasswordForm";
import ResetPasswordForm from "./pages/Auth/ResetPasswordForm";
import { useAppDispatch, useAppSelector } from "./store/hooks/hooks";
import { useEffect } from "react";
import { fetchUser } from "./store/slices/AuthSlice/auth.slice";
import BecomeSeller from "./pages/BecomeSeller/BecomeSeller";
import ProtectedRoute from "./components/ProtectedRoute";
import AddProduct from "./pages/seller/AddProduct/AddProduct";
import { LoadingSpinner } from "./components/ui/spinner";

function App() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);

  useEffect(() => {
    // Dispatch fetchUser on mount
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      {loading && (
        <div className="h-full w-full bg-white/60 fixed z-50 flex justify-center items-center">
          <LoadingSpinner className="h-16 w-16" />
        </div>
      )}
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

        <Route
          path="/become-seller"
          element={
            <ProtectedRoute role={["user"]}>
              <MainLayout>
                <BecomeSeller></BecomeSeller>
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-product"
          element={
            <ProtectedRoute role={["user"]}>
              <MainLayout>
                <AddProduct></AddProduct>
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
