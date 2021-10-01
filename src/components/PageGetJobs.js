import React from "react";
import PageDetails from "./PageDetails";
import CardJobs from "./CardJobs";
import axios from "axios";
import Hamster from "../font/Hamster.otf";
import styled from "styled-components";

const Main = styled.main`
  @font-face {
    font-family: "Hamster";
    src: url("${Hamster}");
  }
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px;
`;
const FonteTitulo = styled.div`
  text-align: center;
  font-family: "Hamster";
  font-size: 9vh;
`;
const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const headers = {
  headers: { Authorization: "c43362f5-2583-4aca-b697-473c96f57416" },
};

export default class PageGetJobs extends React.Component {
  state = {
    currentPage: "cardJobs",
    jobs: [],
    query: "",
    minPrice: "",
    maxPrice: "",
    sort:"title",
    order:1,
  };

  componentDidMount = () => {
    this.GetJobs();
  };

  updateQuery = (event) => {
    this.setState({ query: event.target.value });
  };

  updateMinPrice = (event) => {
    this.setState({minPrice: event.target.value});
  }

  updateMaxPrice = (event) => {
    this.setState({maxPrice: event.target.value})
  }
  updateSort = (event) => {
    this.setState({sort:event.target.value})
  }
  updateOrder = (event) => {
    this.setState({order:event.target.value})
  }

  changePage = (nomeDaPagina) => {
    this.setState({ currentPage: nomeDaPagina });
  };

  GetJobs = () => {
    const url = "https://labeninjas.herokuapp.com/jobs";
    axios
      .get(url, headers)
      .then((response) => {
        this.setState({ jobs: response.data.jobs });
      })
      .catch((error) => {
        alert(error.response);
      });
  };

  render() {
    const renderCurrentPage = () => {
      if (this.state.currentPage === "cardJobs") {
        const jobs = this.state.jobs

          .filter((cadaJob) => {
            return (
              cadaJob.title
                .toLowerCase()
                .includes(this.state.query.toLowerCase()) ||
              cadaJob.description
                .toLowerCase()
                .includes(this.state.query.toLowerCase())
            );
          })
          .filter ((cadaJob)=> {
            return this.state.minPrice === "" || cadaJob.price >= this.state.minPrice
          })
          .filter ((cadaJob)=> {
            return this.state.maxPrice === "" || cadaJob.price <= this.state.maxPrice
          })
          .sort((jobAtual, proximoJob)=> {
            switch (this.state.sort){
              case "title":
                return this.state.order * jobAtual.title.localeCompare(proximoJob.title)
              case "dueData":
                return this.state.order * (new Date(jobAtual.dueDate).getTime() - new Date(proximoJob.dueDate).getTime())
              default:
              return this.state.order * (jobAtual.price - proximoJob.price)
            }
            
          })
          .map((cadaJob) => {
            return (
              <CardJobs
                changePage={this.changePage}
                key={cadaJob.id}
                titulo={cadaJob.title}
                prazo={cadaJob.dueDate}
                preco={cadaJob.price}
              />
            );
          });

        return (
          <div>
            <FonteTitulo>
          <h1>Contrate</h1>
        </FonteTitulo>
        <FiltersContainer>
          <input
            placeholder="Pesquisa"
            value={this.state.query}
            onChange={this.updateQuery}
          />
          <input
            type="number"
            placeholder="Preço mínimo"
            value={this.state.minPrice}
            onChange={this.updateMinPrice}
          />
          <input
            type="number"
            placeholder="Preço máximo"
            value={this.state.maxPrice}
            onChange={this.updateMaxPrice}
          />
          <div>
            <label for="sort">Ordenação: </label>
          <select 
          name="sort"
          value={this.state.sort}
          onChange={this.updateSort}>
            <option value="title">Título</option>
            <option value="price">Preço</option>
            <option value="dueData">Prazo</option>
          </select>
          </div>
          <div>
          <select 
          name="order"
          value={this.state.order}
          onChange={this.updateOrder}>
            <option value={1}>Crescente</option>
            <option value={-1}>Decrescente</option>
          </select>
          </div>
        </FiltersContainer>
        <Main>{jobs}</Main>
          </div>
        )
      } else if (this.state.currentPage === "paginaDetalhe") {
        const jobs = this.state.jobs.map((cadaJob) => {
          return (
            <PageDetails
              changePage={this.changePage}
              key={cadaJob.id}
              titulo={cadaJob.title}
              prazo={cadaJob.dueDate}
              preco={cadaJob.price}
              descricao={cadaJob.description}
              pagamento={cadaJob.paymentMethods}
            />
          );
        });
        return jobs;
      } else {
        return "Página não encontrada";
      }
    };
    return (
      <div>
        <Main>{renderCurrentPage()}</Main>
      </div>
    );
  }
}
