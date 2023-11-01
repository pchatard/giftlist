import { createBrowserRouter } from "react-router-dom";

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
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);
