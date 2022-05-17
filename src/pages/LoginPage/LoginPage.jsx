import React from "react";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import "./_LoginPage.scss";

export const LoginPage = () => {
  return (
    <div className="login-container">
      <LoginForm />;
    </div>
  );
};
