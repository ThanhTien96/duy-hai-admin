import { pagePaths } from "constants";
import { Navigate, Outlet, RouteObject } from "react-router";
import React from "react";
import { MainLayout } from "components/layouts";
import { NotFoundPage } from "pages";
import PrivateRoute from "./PrivateRoute";
import { IS_AUTH } from "constants/auth.constant";

const Home = React.lazy(() => import("pages/HomePage"));
const Login = React.lazy(() => import("pages/LoginPage"));
const Setting = React.lazy(() => import("pages/SettingPage"));
const Appearence = React.lazy(
  () => import("pages/SettingPage/subsContent/AppearanceSetting")
);
const Account = React.lazy(
  () => import("pages/SettingPage/subsContent/AccountSetting")
);
const Profile = React.lazy(() => import("pages/ProfilePage"));
const Menu = React.lazy(() => import("pages/MenuPage"));
const Product = React.lazy(() => import("pages/ProductPage"));
const AddProduct = React.lazy(
  () => import("pages/ProductPage/AddProductPage/AddProductPage")
);
const EditProduct = React.lazy(
  () => import("pages/ProductPage/EditProductPage")
);
const ProductDetail = React.lazy(
  () => import("pages/ProductPage/ProductDetail")
);
const Post = React.lazy(() => import("pages/PostPage"));
const PostDetail = React.lazy(() => import("pages/PostPage/PostDetail"));
const YoutubeBanner = React.lazy(() => import("pages/YoutubeBannerPage"));
const User = React.lazy(() => import('pages/UserPage'))

const extendedRoutes: RouteObject[] = [
  {
    index: true,
    path: pagePaths.home,
    element: <Home />,
  },
  {
    path: pagePaths.setting,
    element: (
      <Setting>
        <Outlet />
      </Setting>
    ),
    children: [
      {
        index: true,
        path: pagePaths.account,
        element: <Account />,
      },
      {
        path: pagePaths.appearance,
        element: <Appearence />,
      },
    ],
  },
  {
    path: pagePaths.profile,
    element: <Profile />,
  },
  {
    path: pagePaths.menu,
    element: <Menu />,
  },
  {
    path: pagePaths.product,
    element: <Outlet />,
    children: [
      {
        index: true,
        path: "",
        element: <Product />,
      },
      {
        path: pagePaths.addProduct,
        element: <AddProduct />,
      },
      {
        path: `${pagePaths.updateProduct}/:id`,
        element: <EditProduct />,
      },
      {
        path: `${pagePaths.productDetail}/:id`,
        element: <ProductDetail />,
      },
    ],
  },
  {
    path: pagePaths.news,
    children: [
      {
        index: true,
        path: "",
        element: <Post />,
      },
      {
        path: `${pagePaths.newsDetail}/:id`,
        element: <PostDetail />,
      },
    ],
  },
  {
    path: pagePaths.youtubePost,
    element: <YoutubeBanner />,
  },
  {
    path: pagePaths.user,
    element: <User />
  }
];

const routes: RouteObject[] = [
  {
    path: pagePaths.default,
    element: (
      <PrivateRoute
        renderIfTrue={(state) => state.common.auth.status === IS_AUTH.auth}
        fallbackComponent={<Navigate to={`/${pagePaths.login}`} />}
      >
        <MainLayout>
          <Outlet />
        </MainLayout>
      </PrivateRoute>
    ),
    children: [
      ...extendedRoutes,
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: pagePaths.login,
    element: <Login />,
  },
];

export default routes;
