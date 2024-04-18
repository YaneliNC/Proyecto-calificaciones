import React from "react";
import styled from "styled-components";
import "./Burguer.css"; // Importa los estilos CSS

// Styled div para el icono de hamburguesa
const Burguer = styled.div`
  /* No necesitas definir los estilos aquí */
`;

function BurguerButton(props) {
  return (
    <Burguer onClick={props.handleClick} className={`icon nav-icon-5 ${props.clicked ? 'open' : ''}`}>
      <span></span>
      <span></span>
      <span></span>
    </Burguer>
  );
}

export default BurguerButton;
