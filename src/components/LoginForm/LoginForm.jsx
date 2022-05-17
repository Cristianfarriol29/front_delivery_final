import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { API } from "../../shared/services/api";
import { Link, useNavigate } from "react-router-dom";
import { JwtContext } from "../../shared/contexts/JwtContext";
import "./_LoginForm.scss";

export const LoginForm = () => {
  let navigate = useNavigate();
  const { setJwt } = useContext(JwtContext);
  const { register, handleSubmit } = useForm();

  const onSubmit = (formData) => {
    API.post("users/login", formData).then((response) => {
      console.log(response);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.userData));

      setJwt(response.data);
      let user = JSON.parse(localStorage.getItem('user'));
      console.log(user.role);
      if (user.role === 'admin') {
        navigate("/admin");
        window.location.reload(true);
      } else if (user.role === 'basic') {
         navigate("/");
      }
    });
  };

  return (
    <section className="container-fluid">
      <section className="row justify-content-center">
        <section className="col-12 col-sm-6 col-md-3">
          <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                name="email"
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                })}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                name="password"
                {...register("password", {
                  required: true,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/,
                })}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="form-group">
              Aun no estas registrado? <Link to="/register">Registrate!</Link>
            </div>
            <button className="btn btn-primary btn-block">Login</button>
          </form>
        </section>
      </section>
    </section>
  );
};
