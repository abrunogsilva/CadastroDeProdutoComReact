import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {API_URL} from "../Config";
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText} from "@material-ui/core";

export default class ListarProdutos extends React.Component{
    state = {
        produtos: [],
        open: false,
    };

    fecharModal = () => {
        this.setState({open: false});
    };

    abrirModal = () => {
        this.setState({open: true});
    };

    buscarProdutos = event => {
        fetch(API_URL+'/produto.json', {
            method: 'GET',
        }).then(resposta => {
            return resposta.json();
        }).then(respostaEmJson => {
            let linhas = [];

            for (let id in respostaEmJson) {
                respostaEmJson[id].id = id;
                linhas.push(respostaEmJson[id]);
            }

            this.setState({produtos: linhas});
        });
    };

    componentDidMount() {
        this.buscarProdutos();
    }

    excluir = (id) => event => {
        fetch(API_URL + `/produto/${id}.json`, {
            method: 'DELETE'
        })
        .then(resposta => resposta.json())
        .then(resposta => {
            this.buscarProdutos();
        })
    };

    render () {
        return (
            <>
                <table className={"table table-striped table-hover"}>
                    <thead className={"thead-dark"}>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Quantidade</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.produtos.map((produto) => {
                            return (
                                <tr>
                                    <td>{produto.nome}</td>
                                    <td>{produto.descricao}</td>
                                    <td>{produto.valor}</td>
                                    <td>{produto.quantidade}</td>
                                    <td>
                                        <button onClick={this.abrirModal} className={"btn btn-danger"}>
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>

                <Dialog
                    open={this.state.open}
                    onClose={this.fecharModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Let Google help apps determine location. This means sending anonymous location data to
                            Google, even when no apps are running.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.fecharModal} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.fecharModal} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}
