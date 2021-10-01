import React from "react";
import PageDetails from "./PageDetails";
import CardJobs from "./CardJobs";
import axios from "axios";
import Hamster from "../font/Hamster.otf"
import styled from "styled-components";

const StyleFonte = styled.div`
  @font-face {
      font-family:'Hamster';
      src:url('${Hamster}')}
`
const FonteTitulo = styled.div`
  font-family: "Hamster";
  font-size: 8vh;
`;


const headers = {
  headers: { Authorization: "c43362f5-2583-4aca-b697-473c96f57416" },
};

export default class PageGetJobs extends React.Component {
  state = {
    currentPage: "cardJobs",
    idDoJob: "",
    jobs: [
      {
        id: "",
        title: "",
        description: "",
        price: 0,
        paymentMethods: [],
        dueDate: "",
        taken: false,
      },
    ],
  };

  componentDidMount = () => {
    this.GetJobs();
  };

  changePage = (nomeDaPagina, jobId) => {
    this.setState({ currentPage: nomeDaPagina, idDoJob: jobId });
  };

  GetJobs = () => {
    const url = "https://labeninjas.herokuapp.com/jobs";
    axios
      .get(url, headers)
      .then((response) => {
        // console.log(response.data.jobs);
        this.setState({ jobs: response.data.jobs });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const renderCurrentPage = () => {
      if (this.state.currentPage === "cardJobs") {
        const jobs = this.state.jobs.map((cadaJob) => {
          return (
            <CardJobs
              changePage={this.changePage}
              key={cadaJob.id}
              titulo={cadaJob.title}
              prazo={cadaJob.dueDate}
              preco={cadaJob.price}
              jobId={cadaJob.id}
            />
          );
        });
        return jobs;
      } else if (this.state.currentPage === "paginaDetalhe") {
        return <PageDetails changePage={this.changePage} jobId={this.state.idDoJob}/>
      } else {
        return "Página não encontrada";
      }
    };
    return (
      <StyleFonte>
        <p>header</p>
        <FonteTitulo>
          <h1>Contrate</h1>
        </FonteTitulo>
        {renderCurrentPage()}
      </StyleFonte>
    );
  }
}

