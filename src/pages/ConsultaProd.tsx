
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from 'react';
import { ContentHeader } from '@components';
import { toast } from 'react-toastify';
import { api } from '@app/lib/axios';

const ConsultaProd = () => {
    const inputBarraProduto = useRef<HTMLInputElement>(null);

    async function consultaProduto() {
        const myTableItensVendaBody = document.getElementById('tabelaTBody') as HTMLTableSectionElement;
        myTableItensVendaBody.innerHTML = '';
        const inputBarra = document.getElementById('txtBarraProdutoConsulta') as HTMLInputElement;
        if (inputBarraProduto.current?.value == '' || inputBarraProduto.current?.value == null || inputBarraProduto.current?.value == undefined) {
            inputBarra.value = '';
            return;
        }
        try {
            const barraConsultada = inputBarra.value
            const objBarraConsultada = {
                "barraConsultada": barraConsultada
            }
            const response = await api.post('consultaprod/consulta', objBarraConsultada)
            inputBarra.value = '';
            if(response.data.length <= 0) {
                toast.error('Nenhum produto encontrado! Verifique.')
                return;
            }
            toast.success('Produto encontrado com sucesso!');
            const produto = response.data;
            addInfoDataTable([produto.codigoProd, produto.descricaoProd, produto.qtdeUnitariaEstoque.qtdeEstoqueUnitaria, produto.qtdeCaixaEstoque.qtdeEstoqueCaixa, produto.precoUnit.toFixed(2).replace('.', ','), produto.precoCaixa.toFixed(2).replace('.', ','), produto.custoUnit.toFixed(2).replace('.', ','), produto.custoCaixa.toFixed(2).replace('.', ',')])
        } catch (error: any) {
            console.error(error)
            toast.error(error.response.data.message);
            inputBarra.value = '';
        }
    };

    function addInfoDataTable(data: any[]) {

        const myTableItensVenda = document.getElementById('tabelaConsultaProd') as HTMLTableElement;
        const myTableItensVendaBody = document.getElementById('tabelaTBody') as HTMLTableSectionElement;

        const sData = myTableItensVendaBody.insertRow();
        data.forEach((itemConsulta) => {
            const itemRetornado = sData.insertCell();
            itemRetornado.innerHTML = itemConsulta;
        });

        myTableItensVenda.appendChild(myTableItensVendaBody);
    };

    return (
        <div>
            <ContentHeader title="Consulta Produto - Preço/Estoque" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <input
                                className='form-control col-sm-2'
                                ref={inputBarraProduto}
                                id="txtBarraProdutoConsulta"
                                type="text"
                                onKeyDown={async (event) => {
                                    if (event.key === 'Enter') {
                                        const inputElementPesquisa = event.target as HTMLInputElement;
                                        inputElementPesquisa.blur();
                                    }
                                }}
                                onBlur={async () => {
                                    consultaProduto();
                                }}
                                placeholder="Código de Barras"
                            />
                        </div>
                        <div className="card-body">
                            <table id="tabelaConsultaProd" className="table table-lg-responsive table-bordered" style={{ whiteSpace: 'nowrap', backgroundColor: '#343a44' }}>
                                <thead>
                                    <th>Código</th>
                                    <th>Produto</th>
                                    <th>Qtde Unit. em Estoque</th>
                                    <th>Qtde Caixas em Estoque</th>
                                    <th>Preço Unit.</th>
                                    <th>Preço Caixas</th>
                                    <th>Custo Unit.</th>
                                    <th>Custo Caixas</th>
                                </thead>
                                <tbody id="tabelaTBody">
                                    <tr>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ConsultaProd;
