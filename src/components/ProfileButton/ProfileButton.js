import * as React from "react";
import { useContext } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useCartContext } from "../../shared/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { JwtContext } from "../../shared/contexts/JwtContext";
import { useUserContext } from "../../shared/contexts/UserContext";

export default function ProfileButton() {
  let user = JSON.parse(localStorage.getItem("user"));

  const { userRole } = useUserContext();

  function handleClose(action) {
    if (action === "perfil") {
      navigate("profile");
      setAnchorEl(null);
    } else if (action === "pedidos") {
      navigate("orders");
      setAnchorEl(null);
    } else if (action === "cerrar") {
      setAnchorEl(null);
    } else if (action === "crearPizza") {
      navigate("/admin/post/pizzas");
    } else if (action === "crearBeverage") {
      navigate("/admin/post/beverages");
    } else if (action === "crearDessert") {
      navigate("/admin/post/desserts");
    }
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  let navigate = useNavigate();
  const { setJwt } = useContext(JwtContext);
  const { setCartItems } = useCartContext();
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // localStorage.removeItem('carrito');
    setCartItems([]);

    setJwt(null);
    navigate("/login");
    window.location.reload(true);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <img src={user.img} alt="userImage" width="50px" height="50px" />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => handleClose("perfil")}>Profile</MenuItem>
        <MenuItem onClick={() => handleClose("pedidos")}>Mis Pedidos</MenuItem>

        {userRole === "admin" && (
          <MenuItem onClick={() => handleClose("crearPizza")}>
            Crear pizza
          </MenuItem>
        )}
        {userRole === "admin" && (
          <MenuItem onClick={() => handleClose("crearBeverage")}>
            Crear bebida
          </MenuItem>
        )}
        {userRole === "admin" && (
          <MenuItem onClick={() => handleClose("crearDessert")}>
            Crear postre
          </MenuItem>
        )}
        <MenuItem onClick={logOut}>LogOut</MenuItem>
        <MenuItem onClick={() => handleClose("cerrar")}>Cerrar x</MenuItem>
      </Menu>
    </div>
  );
}
