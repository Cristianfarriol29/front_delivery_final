import React, {useContext} from 'react'
import {useCartContext} from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { JwtContext } from '../../contexts/JwtContext';

export const ButtonLogout = () => {
    let navigate = useNavigate();
    const {setJwt} = useContext(JwtContext);
    const {setCartItems} = useCartContext()
    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // localStorage.removeItem('carrito');
        setCartItems([])
      
        setJwt(null);
        navigate('/login');
    }
  return (
    <button onClick={logOut}>Log Out</button>
  )
}