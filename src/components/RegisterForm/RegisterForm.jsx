import React from "react";
import { useForm } from "react-hook-form";
import { API } from "../../shared/services/api";
import { Link, useNavigate } from "react-router-dom";
import "./_RegisterForm.scss";

export const RegisterForm = () => {
  let navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = (formData) => {
    API.post("/users/register", formData).then((response) => {
      console.log(response);
      navigate("/login");
    });
  };

  return (
    <section className="container-fluid">
      <section className="row justify-content-center">
        <section className="col-12 col-sm-6 col-md-3">
          <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="exampleInputUser">Username</label>
              <input
                type="text"
                name="name"
                {...register("name", { required: true })}
                className="form-control"
                aria-describedby="emailHelp"
                id="exampleInputUser"
              />
            </div>
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
              Ya estas registrado? <Link to="/login">Logeate!</Link>
            </div>
            <button className="btn btn-primary btn-block">Register</button>
          </form>
        </section>
      </section>
    </section>
  );
};
