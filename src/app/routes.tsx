import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/layout";
import { Discover } from "./pages/discover";
import { RecipeDetail } from "./pages/recipe-detail";
import { Profile } from "./pages/profile";
import { Notebook } from "./pages/notebook";
import { MyRecipes } from "./pages/my-recipes";
import { SettingsPage } from "./pages/settings";
import { CategoryPage } from "./pages/category";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { ProtectedRoute } from "./components/protected-route";
import { MyComments } from "./pages/my-comments";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/",
    Component: ProtectedRoute,
    children: [
      {
        path: "",
        Component: Layout,
        children: [
          {
            index: true,
            Component: Discover,
          },
          {
            path: "discover",
            Component: Discover,
          },
          {
            path: "recipe/:id",
            Component: RecipeDetail,
          },
          {
            path: "category/:id",
            Component: CategoryPage,
          },
          {
            path: "my-recipes",
            Component: MyRecipes,
          },
          {
            path: "notebook",
            Component: Notebook,
          },
          {
            path: "profile",
            Component: Profile,
          },
          {
            path: "settings",
            Component: SettingsPage,
          },
          {
            path: "my-comments",
            Component: MyComments,
          },
        ],
      },
    ],
  },
  {
    path: "/discover",
    Component: ProtectedRoute,
    children: [
      {
        path: "",
        Component: Layout,
        children: [
          {
            index: true,
            Component: Discover,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
