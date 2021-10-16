import React from "react";
import CTV from "../component/ctv/CTV";
import NCC from "../component/ncc/NCC";
import Product from "../component/products/Products";
import Orders from "../component/orders/Orders";
import Categories from "../component/categories/Categories";
import Reports from "../component/reports/Reports";
import Home from "../component/home/Home";
import NotFound from "../component/notFound/NotFound";

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
