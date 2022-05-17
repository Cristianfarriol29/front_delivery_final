import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import AdminPage from "../pages/AdminPage/AdminPage";
import BeveragesPage from "../pages/BeveragesPage/BeveragesPage";
import CartPage from "../pages/CartPage/CartPage";
import ClientsOrdersPage from "../pages/ClientsOrdersPage/ClientsOrdersPage";
import DessertsPage from "../pages/DessertsPage/DessertsPage";
import { HomePage } from "../pages/HomePage/HomePage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import CreateYourOwnPizza from "../shared/components/CreatePizza/CreateYourOwnPizza";
import { RequireAuth } from "../shared/components/RequireAuth/RequireAuth";
import { RegisterBeverage } from "../components/RegisterBeverage/RegisterBeverage";
import { RegisterDessert } from "../components/RegisterDesserts/RegisterDessert";
import { RegisterPizza } from "../components/RegisterPizza/RegisterPizza";
import AdminDeleteProd from "../pages/AdminDeleteProd/AdminDeleteProd";
import AdminDeleteDessert from "../pages/AdminDeleteProd/AdminDeleteDessert";
import AdminDeleteBeverage from "../pages/AdminDeleteProd/AdminDeleteBeverage";
import { UserProfile } from "../pages/UserProfile/UserProfile";

const AppRoutes = ({ jwt }) => {
  let user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Navbar jwt={jwt} />

      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          exact
          path="/admin"
          element={
            <RequireAuth>
              {user !== null && user.role === "admin" ? (
                <AdminPage />
              ) : (
                <Navigate to="/" />
              )}
            </RequireAuth>
          }
        />

        <Route
          exact
          path="/admin/deleteproduct/pizza/:id"
          element={
            <RequireAuth>
              {user !== null && user.role === "admin" ? (
                <AdminDeleteProd />
              ) : (
                <Navigate to="/" />
              )}
            </RequireAuth>
          }
        />

        <Route
          exact
          path="/admin/deleteproduct/dessert/:id"
          element={
            <RequireAuth>
              {user !== null && user.role === "admin" ? (
                <AdminDeleteDessert />
              ) : (
                <Navigate to="/" />
              )}
            </RequireAuth>
          }
        />

        <Route
          exact
          path="/admin/deleteproduct/beverage/:id"
          element={
            <RequireAuth>
              {user !== null && user.role === "admin" ? (
                <AdminDeleteBeverage />
              ) : (
                <Navigate to="/" />
              )}
            </RequireAuth>
          }
        />

        <Route
          path="/admin/post/beverages"
          element={
            <RequireAuth>
              {user !== null && user.role === "admin" ? (
                <RegisterBeverage />
              ) : (
                <Navigate to="/" />
              )}
            </RequireAuth>
          }
        />

        <Route
          path="/admin/post/desserts"
          element={
            <RequireAuth>
              {user !== null && user.role === "admin" ? (
                <RegisterDessert />
              ) : (
                <Navigate to="/" />
              )}
            </RequireAuth>
          }
        />

        <Route
          path="/admin/post/pizzas"
          element={
            <RequireAuth>
              {user !== null && user.role === "admin" ? (
                <RegisterPizza />
              ) : (
                <Navigate to="/" />
              )}
            </RequireAuth>
          }
        />

        <Route path="/beverages" element={<BeveragesPage />} />

        <Route
          path="/cart"
          element={
            <RequireAuth>
              {user !== null && jwt && user.role !== "admin" ? (
                <CartPage />
              ) : (
                <Navigate to="/" />
              )}
            </RequireAuth>
          }
        />

        <Route
          path="/orders"
          element={
            <RequireAuth>
              <ClientsOrdersPage />
            </RequireAuth>
          }
        />

        <Route
          path="/profile"
          element={<RequireAuth>{jwt && <UserProfile />}</RequireAuth>}
        />

        <Route path="/createpizza" element={<CreateYourOwnPizza />} />
        <Route path="/desserts" element={<DessertsPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
