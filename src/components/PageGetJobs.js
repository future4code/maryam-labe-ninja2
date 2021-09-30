import React from "react";
import PageDetails from "./PageDetails"
import CardJobs from "./CardJobs";


export default class PageGetJobs extends React.Component {
    state = {
        currentPage: "cardJobs",
        jobs: [
          {
            id: "92522ecb-4299-4fd9-b110-0a7de54efded",
            title: "Cortar a grama",
            description: "Manutenção em áreas verdes de até 1000 metros quadrados.",
            price: 40,
            paymentMethods: ["PayPal", "boleto"],
            dueDate: "2021-12-30T00:00:00.000Z",
            taken: false
          }
        ]
      };

      changePage = (nomeDaPagina) => {
        this.setState({ currentPage: nomeDaPagina });
      };
    render (){

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
                  />
                );
              });
              return jobs;
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
        return(
            <div>
                {renderCurrentPage()}
            </div>
        )
    } 
}
