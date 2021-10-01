import React from "react";
import axios from "axios";
import styled from "styled-components";
import Hamster from "../font/Hamster.otf"

// TRECHO DOS CÓDIGOS ESTILOS

const FonteTitulo = styled.div`
  font-family: "Hamster";
  font-size: 6vh;
`;
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  @font-face {
      font-family:'Hamster';
      src:url('${Hamster}')}
`

const Formulario = styled.form`
  height: 200px;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-family: "Roboto";
`;

// TRECHO DOS CÓDIGOS ESTILOS

const headers = {headers:{Authorization:'c43362f5-2583-4aca-b697-473c96f57416'}}

export default class PageCreateJob extends React.Component {
  state = {
    inputTitulo: "",
    inputDescricao: "",
    inputPreco: 0,
    inputOpcaoPagt: [],
    inputDataServico: "",
  };
  // TRECHO DOS CÓDIGOS PARA INPUT
  onChangeInputTitulo = (event) => {
    this.setState({ inputTitulo: event.target.value });
  };
  onChangeInputDescricao = (event) => {
    this.setState({ inputDescricao: event.target.value });
  };
  onChangeInputPreco = (event) => {
    this.setState({ inputPreco: event.target.value });
  };
  onChangeOpcaoPagt = (event) => {
      let value = Array.from(
          event.target.selectedOptions          ,
          (option) => option.value
      )
    this.setState({ inputOpcaoPagt:value });
  };
  onChangeDataServico = (event) => {
    this.setState({ inputDataServico: event.target.value });
  };
  // TRECHO DOS CÓDIGOS PARA INPUT

  // TRECHO DOS CÓDIGOS PARA API
  
  enviarInputs = () => {
      const url = "https://labeninjas.herokuapp.com/jobs"
      const body = {
          title: this.state.inputTitulo,
          description: this.state.inputDescricao,
          price: Number(this.state.inputPreco),
          paymentMethods: this.state.inputOpcaoPagt,
          dueDate: this.state.inputDataServico
      }

      axios.post(url, body, headers)
      .then((response) => {
          alert(response.data.message)
      })
      .catch((error)=> {
          alert(error.response.data.message)
      })
  }

  render() {
    return (
      <FormContainer>
        <FonteTitulo>
          <h1>cadastre-se</h1>
        </FonteTitulo>
        <Formulario>
          <input
            placeholder="Título"
            type="Text"
            value={this.state.inputTitulo}
            onChange={this.onChangeInputTitulo}
          />
          <input
            placeholder="Descrição"
            type="Text"
            value={this.state.inputDescricao}
            onChange={this.onChangeInputDescricao}
          />
          <input
            placeholder="Preço"
            type="Number"
            value={this.state.inputPreco}
            onChange={this.onChangeInputPreco}
          />
          <select
            value={this.state.inputOpcaoPagt}
            onChange={this.onChangeOpcaoPagt}
          >
            <option>Boleto</option>
            <option>Cartão de Crédito</option>
            <option>Cartão de Débito</option>
            <option>Pix</option>
          </select>
          <input id="date" type="date" 
          value = {this.state.inputDataServico}
          onChange={this.onChangeDataServico}/>
        </Formulario>
            <button
            onClick={this.enviarInputs}>Cadastrar serviço</button>
      </FormContainer>
    );
  }
}
