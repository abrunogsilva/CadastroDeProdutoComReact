import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {API_URL} from "../Config";

export default class NovoProduto extends React.Component{
    state = {
        nome: '',
        quantidade: '',
        descricao: '',
        valor: '',
    };

    alterarDados = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    inserir = event => {
        event.preventDefault();

        fetch(API_URL + '/produto.json', {
            method: 'POST',
            body: JSON.stringify({
                nome: this.state.nome,
                descricao: this.state.descricao,
                quantidade: this.state.quantidade,
                valor: this.state.valor,
            })
        }).then(resposta => {
            this.props.history.push('/listar-produtos');
        })
    };

    render() {
        return (
            <>
                <form onSubmit={this.inserir}>
                    <label htmlFor="nome">Nome</label>
                    <input onChange={this.alterarDados} value={this.state.nome} type="text" id={"nome"} className={"form-control"}/>
                    <br/>

                    <label htmlFor="descricao">Descrição</label>
                    <textarea id={"descricao"} className={"form-control"} onChange={this.alterarDados}>{this.state.descricao}</textarea>
                    <br/>

                    <label htmlFor="valor">Valor</label>
                    <input onChange={this.alterarDados} value={this.state.valor} type="text" id={"valor"} className={"form-control"}/>
                    <br/>

                    <label htmlFor="quantidade">Quantidade</label>
                    <input onChange={this.alterarDados} value={this.state.quantidade} type="text" id={"quantidade"} className={"form-control"}/>
                    <br/>

                    <button className={"btn btn-primary"}>Enviar</button>
                </form>
            </>
        );
    }
}
