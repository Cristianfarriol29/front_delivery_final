import React from "react";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import "./_Footer.scss";

const Footer = () => {
  return (
    <div className="footerPage">
      <div className="dataFooter">
        <h1 className="cecTitle">Pizzeria CEC</h1>
        <p>C/ Marcelo Gallardo, 9/12 - CP 18000 MADRID</p>
        <p>Reservas: 91 000 00 00</p>
        <p>WWW.PIZZERIACEC.COM</p>
      </div>
      <div className="IconsFooter">
        <BsTelephoneFill style={{ fontSize: "30px" }} />
        <MdEmail style={{ fontSize: "30px" }} />
        <BsFacebook style={{ fontSize: "30px" }} />
        <BsInstagram style={{ fontSize: "30px" }} />
      </div>
      <hr></hr>
      <div className="dataRights">
        <p>PIZZERIACEC © 2022 TODOS LOS DERECHOS RESERVADOS</p>
        <p>POLITICA DE COOKIES</p>
        <p>AVISO LEGAL</p>
        <p>DISEÑO ALBERT.COM</p>
      </div>
    </div>
  );
};

export default Footer;
