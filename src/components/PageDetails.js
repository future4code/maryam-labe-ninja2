
import React from "react";
import styled from "styled-components";
import axios from "axios"


const DetalheContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

`;

const NomeDaPagina = styled.h1`
  font-family: "hamster";
  font-size: 8vh;
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
  state = {
    cadaJob: {}
  }

  componentDidMount = ()=>{
    this.getJobById()
  }
  
  getJobById = ()=>{
    const url = `https://labeninjas.herokuapp.com/jobs/${this.props.jobId}`
    
    axios.get(url, {
      headers:{
        Authorization: "c43362f5-2583-4aca-b697-473c96f57416"
      }
    })
    .then((res)=>{
      this.setState({cadaJob: res.data})
    })
    .catch((err)=>{
      console.log(err.response)
    })
  }
    render (){
        return (
            <DetalheContainer>
                <p>header</p>
                <button onClick={() => this.props.changePage("cardJobs", "")}>
                  Voltar
                </button>
                <NomeDaPagina>detalhes</NomeDaPagina>
                <DelathesCard>
                <h3>{this.state.cadaJob.title}</h3>
                <p>{this.state.cadaJob.description}</p>
                <p>R${this.state.cadaJob.price ? this.state.cadaJob.price.toFixed(2) : "0,0"}</p>
                <p>Formas de pagamento: {this.state.cadaJob.paymentMethods? this.state.cadaJob.paymentMethods.join(" / "):""}</p>
                <p>Prazo: {this.state.cadaJob.dueDate?this.state.cadaJob.dueDate.slice(0, 10): ""}</p>
                </DelathesCard>
                <button>ADICIONAR AO CARRINHO</button>
            </DetalheContainer>
        )
    }
}