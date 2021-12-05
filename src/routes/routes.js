import React from "react";
import CTV from "../views/ctv/CTV";
import NCC from "../views/ncc/NCC";
import Product from "../views/products/Products";
import Orders from "../views/orders/Orders";
import Categories from "../views/categories/Categories";
import Reports from "../views/reports/Reports";
import Home from "../views/home/Home";
import NotFound from "../views/notFound/NotFound";
import Brand from "../views/brand/Brand";
import Admin from "../views/admin/Admin";
import Properties from "../views/properties/Properties";
import Post from "../views/post/Post";

const routes = [
  {
    path: "/",
    exact: true,
    main: <Home />,
  },
  {
    path: "/admin/post",
    exact: true,
    main: <Post />,
  },
  {
    path: "/admin/category",
    exact: true,
    main: <Categories />,
  },
  {
    path: "/admin/brand",
    exact: true,
    main: <Brand />,
  },
  {
    path: "/admin/ncc",
    exact: true,
    main: <NCC />,
  },
  {
    path: "/admin/ctv",
    exact: true,
    main: <CTV />,
  },
  {
    path: "/admin/qtv",
    exact: true,
    main: <Admin />,
  },
  {
    path: "/admin/product",
    exact: true,
    main: <Product />,
  },
  {
    path: "/admin/property",
    exact: true,
    main: <Properties />,
  },
  {
    path: "/admin/order",
    exact: true,
    main: <Orders />,
  },
  {
    path: "/admin/report",
    exact: true,
    main: <Reports />,
  },
  {
    path: "",
    exact: false,
    main: <NotFound />,
  },
];
export default routes;
