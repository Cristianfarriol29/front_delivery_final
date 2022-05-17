import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import { useCartContext } from "../../contexts/CartContext";

const CheckOut = ({ subtotal, cartProducts }) => {
  const { setCartItems } = useCartContext();

  function getToken(token) {
    console.log("1", token, subtotal, cartProducts);

    const sendCheckOut = async (token, subtotal, cartProducts) => {
      let userData = JSON.parse(localStorage.getItem("user"));

      let user = {
        name: userData.name,
        email: userData.email,
        _id: userData._id,
      };

      console.log(user);

      try {
        console.log("2", token, subtotal);
        const response = await axios.post(
          "http://localhost:8000/api/orders/checkout",
          { token, subtotal, cartProducts, user }
        );

        console.log(response);
        if (response.data === "Payment done") {
          Swal.fire("Correcto", "Su pago se realizó correctamente", "success");
          setCartItems([]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    sendCheckOut(token, parseInt(subtotal), cartProducts);
  }

  return (
    <div>
      <StripeCheckout
        amount={subtotal * 100}
        shippingAddress
        token={getToken}
        stripeKey={
          "pk_test_51KubPTDR9kHMYlDcVQVuEQhOSH2dE8pW7ynTtxR8IcEEbmaV0P1DbvJ0vdmpi9paBKjSnLHX1VhRyxpPLJKMUbRU00g1kOAOaV"
        }
        currency="EUR"
      >
        <button className="btn btn-danger">Pay</button>
      </StripeCheckout>
    </div>
  );
};

export default CheckOut;
