import React from "react";
import styled from "styled-components";

export default class Header extends React.Component {
    render() {
      return (
        <div>
         <BotaoHome>
           <button onClick={() => this.props.changePage("paginaHome")}>
            Home
           </button>
         </BotaoHome>
         <BotaoCarrinho>
           <button onClick={() => this.props.changePage("paginaCarrinho")}>
            Carrinho
           </button>
         </BotaoCarrinho>
        </div>
      )}
}

