import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./_UserProfile.scss";
import { useForm } from "react-hook-form";
import { API } from "../../shared/services/api";

export const UserProfile = () => {
  let navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  let userToken = localStorage.getItem("token");
  let user = JSON.parse(localStorage.getItem("user"));

  const onSubmitImg = (data) => {
    const formData = new FormData();
    formData.append("img", data.img[0]);

    API.patch(`/users/${user._id}/`, formData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }).then((response) => {
      API.get(`/users/${user._id}/`).then((respuesta) => {
        localStorage.setItem("user", JSON.stringify(respuesta.data));
      });

      if (response.status === 200) {
        Swal.fire(
          "Correcto",
          "La imagen se actualizó correctamente.",
          "success"
        ).then(() => window.location.reload(true));
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un problema al subir el archivo.",
        });
      }
      navigate("/profile");
    });
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("img", user.img);
    if (data.name !== "") {
      formData.append("name", data.name);
    }
    if (data.email !== "") {
      formData.append("email", data.email);
    }

    API.patch(`/users/${user._id}/`, formData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }).then((response) => {
      API.get(`/users/${user._id}/`).then((respuesta) => {
        localStorage.setItem("user", JSON.stringify(respuesta.data));
      });

      if (response.status === 200) {
        Swal.fire(
          "Correcto",
          "El cambio se realizo correctamente en la base de datos.",
          "success"
        ).then(() => window.location.reload(true));
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un problema a la hora de la subida de archivo.",
        });
      }
    });
  };

  return (
    <div className="containerProfile">
      <h1>PERFIL:</h1>

      {/* <div className="dataProfile"> */}
      <div className="data mb-5">
        <div className="data_name">
          <h1 className="text-light bg-dark p-1">NOMBRE: </h1>
          <h2>{user.name.toUpperCase()}</h2>
        </div>
        <div className="data_email">
          <h1 className="text-light bg-dark p-1">EMAIL: </h1>
          <h2>{user.email.toUpperCase()}</h2>
        </div>
      </div>
      <div className="imageProfile mb-5">
        <img src={user.img} alt="" height={250} width={250} />
      </div>
      {/* </div> */}
      <div className="formProfile">
        <form onSubmit={handleSubmit(onSubmitImg)} className="form">
          <h2>Subir nueva imagen:</h2>
          <input
            type="file"
            name="img"
            className="formInput"
            {...register("img", { required: false })}
          />
          <button className="buttonProfile">Subir imagen</button>
        </form>

        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h2>Cambiar nombre:</h2>
          <input
            type="text"
            name="name"
            className="formInput"
            {...register("name", { required: false })}
          />
          <h2>Cambiar email:</h2>
          <input
            type="email"
            name="email"
            className="formInput"
            {...register("email", { required: false })}
          />

          <button className="buttonProfile">Subir</button>
        </form>
      </div>
    </div>
  );
};
