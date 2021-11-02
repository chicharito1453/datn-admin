import React from "react";
import CTV from "../component/ctv/CTV";
import NCC from "../component/ncc/NCC";
import Product from "../component/products/Products";
import Orders from "../component/orders/Orders";
import Categories from "../component/categories/Categories";
import Reports from "../component/reports/Reports";
import Home from "../component/home/Home";
import NotFound from "../component/notFound/NotFound";
import Brand from "../component/brand/Brand";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Home />,
  },
  {
    path: "/admin/category",
    exact: true,
    main: () => <Categories />,
  },
  {
    path: "/admin/brand",
    exact: true,
    main: () => <Brand />,
  },
  {
    path: "/admin/ctv",
    exact: true,
    main: () => <CTV />,
  },
  {
    path: "/admin/ncc",
    exact: true,
    main: () => <NCC />,
  },
  {
    path: "/admin/product",
    exact: true,
    main: () => <Product />,
  },
  {
    path: "/admin/order",
    exact: true,
    main: () => <Orders />,
  },
  {
    path: "/admin/report",
    exact: true,
    main: () => <Reports />,
  },
  {
    path: "",
    exact: false,
    main: () => <NotFound />,
  },
];
export default routes;
