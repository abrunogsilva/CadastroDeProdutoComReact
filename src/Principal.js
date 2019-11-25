import React from 'react';
import ListarProdutos from "./produtos/ListarProdutos";
import NovoProduto from "./produtos/NovoProduto";
import Navbar from "./Navbar";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PaginaNaoEncontrada from "./PaginaNaoEncontrada";

function Principal() {
    return (
        <BrowserRouter>
            <Navbar/>

            <div className={"container"} style={{paddingTop: '100px'}}>
                <Switch>
                    <Route exact path={"/"} component={ListarProdutos}/>
                    <Route path={"/listar-produtos"} component={ListarProdutos}/>
                    <Route path={"/novo-produto"} component={NovoProduto}/>
                    <Route path={"/*"} component={PaginaNaoEncontrada}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default Principal;
