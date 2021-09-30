
import React from "react";
import styled from "styled-components";

const DetalheContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

`;

const NomeDaPagina = styled.h1`
  font-family: "hamster";
`;

const DelathesCard = styled.div`
  width: 500px;
  height: 500px;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export default class PageDetails extends React.Component {
    render (){
        return (
            <DetalheContainer>
                <p>header</p>
                <button onClick={() => this.props.changePage("cardJobs")}>
                  Voltar
                </button>
                <NomeDaPagina>detalhes</NomeDaPagina>
                <DelathesCard>
                      <h3>{this.props.titulo}</h3>
                      <p>{this.props.descricao}</p>
                      <p>R${this.props.preco}</p>
                      <p>{this.props.pagamento}</p>
                      <p>{this.props.prazo}</p>
                </DelathesCard>
            </DetalheContainer>
        )
    }
}