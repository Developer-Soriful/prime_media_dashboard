import { createBrowserRouter } from "react-router";
import SignIn from "../auth/LoginSection";
import ForgotPassword from "../auth/ForgotPassword";
import OTPVerification from "../auth/OTPVerification";
import ResetPassword from "../auth/ResetPassword";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardPage from "../pages/DashboardPage";
import UserListPage from "../pages/UserListPage";
import ServicesPage from "../pages/ServicesPage";
import PromotionPage from "../pages/PromotionPage";
import SettingsPage from "../pages/SettingsPage";
import ProfilePage from "../pages/ProfilePage";
import PasswordPage from "../pages/PasswordPage";
import VerificationSection from "../components/VerificationSection";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "otp-verification",
    element: <OTPVerification />
  },
  {
    path: "reset-password",
    element: <ResetPassword />
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>,
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: "users",
        element: <UserListPage />
      },
      {
        path: "services",
        element: <ServicesPage />
      },
      {
        path: "promotion",
        element: <PromotionPage />
      },
      {
        path: "verification",
        element: <VerificationSection />
      },
      {
        path: "settings",
        element: <SettingsPage />
      },
      {
        path: "profile",
        element: <ProfilePage />
      },
      {
        path: "password",
        element: <PasswordPage />
      },
    ]
  }
]);

export default router;
