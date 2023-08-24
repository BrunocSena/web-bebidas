
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from 'react';
import { ContentHeader } from '@components';
import { toast } from 'react-toastify';
import { api } from '@app/lib/axios';

const ConsultaProdutosVendidos = () => {
    const inputBarraProduto = useRef<HTMLInputElement>(null);

    async function consultaProduto() {
        const myTableItensVendaBody = document.getElementById('tabelaTBody') as HTMLTableSectionElement;
        myTableItensVendaBody.innerHTML = '';
        try {
            const response = await api.post('relprodutomaisvendido/consulta')
            if (response.data.length <= 0) {
                toast.error('Nenhum produto encontrado! Verifique.')
                return;
            }
            toast.success('Consulta efetuada com sucesso!');
            const produtos = response.data;
            for (let i in produtos) {
                addInfoDataTable([produtos[i].codVen, produtos[i].codigoProduto, produtos[i].descricaoProduto, produtos[i]._sum.precoCaixaItem, produtos[i]._sum[2], produtos[i]._sum[3], produtos[i]._sum[1]])
            }

        } catch (error: any) {
            console.error(error)
            toast.error(error.response.data.message);
            return;
        }
    };

    function addInfoDataTable(data: any[]) {

        const myTableItensVenda = document.getElementById('tabelaProdutosVendidos') as HTMLTableElement;
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
            <ContentHeader title="Relatório de Produtos Vendidos" />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <button
                                className='btn btn-lg btn-primary'
                                onClick={consultaProduto}
                            >
                                Consultar
                            </button>
                        </div>
                        <div className="card-body">
                            <table id="tabelaProdutosVendidos" className="table table-lg-responsive table-bordered" style={{ whiteSpace: 'nowrap', backgroundColor: '#343a44' }}>
                                <thead>
                                    <th>Venda</th>
                                    <th>Código</th>
                                    <th>Produto</th>
                                    <th className='text-right'>Qtde Unit. Vendida</th>
                                    <th className='text-right'>Valor Total Unit. Vendidos</th>
                                    <th className='text-right'>Qtde Caixas Vendidas</th>
                                    <th className='text-right'>Valor Total Caixas Vendidos</th>
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

export default ConsultaProdutosVendidos;
