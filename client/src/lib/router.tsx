import { createBrowserRouter } from "react-router-dom";

import { DashboardPage } from "@/pages/dashboard/dashboard";
import { dashboardLoader } from "@/pages/dashboard/dashboard.loader";
import { LandingPage } from "@/pages/landing/landing";
import { AppLayout } from "@/pages/layouts/AppLayout";
import { ProfilePage } from "@/pages/profile/profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: "app",
        element: <DashboardPage />,
        loader: dashboardLoader,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);
