import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Signin from "./app/auth/components/Signin.tsx";
import Signup from "./app/auth/components/Signup.tsx";
import ResetPassword from "./app/auth/components/ResetPassword.tsx";
import EnterEmail from "./app/auth/components/EnterEmail.tsx";
import CheckEmail from "./app/auth/components/CheckEmail.tsx";
import ChangePassword from "./app/auth/components/ChangePassword.tsx";
import DashBoard from "./app/auth/components/DashBorad.tsx";
// import DashBoard from "./app/auth/components/DashBoard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/signin", element: <Signin /> },
      { path: "/signup", element: <Signup /> },
      { path: "/dashboard", element: <DashBoard /> },
      {
        path: "/reset-password",
        element: <ResetPassword />,
        children: [
          { path: "enter-email", element: <EnterEmail /> },
          { path: "check-email", element: <CheckEmail /> },
          { path: "change-password", element: <ChangePassword /> }
        ]
      }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
