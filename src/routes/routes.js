import React from "react";
import CTV from "../content/ctv/CTV";
import NCC from "../content/ncc/NCC";
import Product from "../content/products/Products";
import Orders from "../content/orders/Orders";
import Categories from "../content/categories/Categories";
import Reports from "../content/reports/Reports";
import Home from "../content/home/Home";
import NotFound from "../content/notFound/NotFound";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Home />,
  },
  {
    path: "/admin/ctv",
    exact: false,
    main: () => <CTV />,
  },
  {
    path: "/admin/ncc",
    exact: false,
    main: () => <NCC />,
  },
  {
    path: "/admin/product",
    exact: false,
    main: () => <Product />,
  },
  {
    path: "/admin/order",
    exact: false,
    main: () => <Orders />,
  },
  {
    path: "/admin/category",
    exact: false,
    main: () => <Categories />,
  },
  {
    path: "/admin/report",
    exact: false,
    main: () => <Reports />,
  },
  {
    path: "",
    exact: false,
    main: () => <NotFound />,
  },
];
export default routes;
