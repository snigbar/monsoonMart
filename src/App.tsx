import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import HomePage from "./pages/HomePage/HomePage";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Register from "./pages/Auth/Register";
import VerifyUserPage from "./pages/Auth/VerifyUserPage";

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
