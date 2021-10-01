import React from "react";
import styled from "styled-components";


const CardContainer = styled.div`
  width: 200px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const CardProduct = styled.div`
  height: 180px;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export default class CardJobs extends React.Component {
  render() {
    return (
      <div>
        <CardContainer>
          <CardProduct>
            <h3>{this.props.titulo}</h3>
            <p>{this.props.prazo}</p>
            <p>R${this.props.preco}</p>
          </CardProduct>
          <button onClick={() => this.props.changePage("paginaDetalhe")}>
            Detalhe do Produto
          </button>
          <button>Adicionar ao carrinho</button>
        </CardContainer>
      </div>
    );
  }
}
