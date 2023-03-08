/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react';
import { ContentHeader } from '@components';

const Venda = () => {

  const [barraProduto, setBarraProduto] = useState('');
  const [qtdeUnitaria, setQtdeUnitaria] = useState(0);
  const [qtdeCaixas, setQtdeCaixas] = useState(0);
  const [descontoValor, setDescontoValorItem] = useState(0);
  const [descontoPorcentagem, setDescontoPorcetagemItem] = useState(0);
  const [acrescimoValor, setAcrescimoValorItem] = useState(0);
  const [acrescimoPorcentagem, setAcrescimoPorcentagemItem] = useState(0);
  const [descricaoItem, setDescricaoItem] = useState('');
  const [precoUnitarioItem, setPrecoUnitarioItem] = useState(0);
  const [precoCaixaItem, setPrecoCaixaItem] = useState(0);

  const pegaInfosProduto = () => {

    const txtDescricaoProd = document.getElementById('txtDescricaoProduto') as HTMLInputElement;
    const txtPrecoUnitario = document.getElementById('txtPrecoUnitario') as HTMLInputElement;
    const txtPrecoCaixa = document.getElementById('txtPrecoCaixas') as HTMLInputElement;

    setDescricaoItem(txtDescricaoProd.value);
    setPrecoCaixaItem(+txtPrecoUnitario.value);
    setPrecoUnitarioItem(+txtPrecoCaixa.value);
    
  };

  function addInfoDataTable(data: any[]) {

    const myTableItensVenda = document.getElementById('tabelaItensVenda') as HTMLTableElement;
    const myTableItensVendaBody = document.getElementById('tabelaTBody') as HTMLTableSectionElement;

    const sData = myTableItensVendaBody.insertRow();
    data.forEach((itemVenda) => {
      const itemNovo = sData.insertCell();
      itemNovo.innerHTML = itemVenda;
    });
    myTableItensVenda.appendChild(myTableItensVendaBody)
  };

  const adicionaItem = () => {
    const maisItem = [descricaoItem, qtdeUnitaria, qtdeCaixas, precoUnitarioItem.toFixed(2).replace('.', ','), precoCaixaItem.toFixed(2).replace('.', ','), '86,00'];
    addInfoDataTable(maisItem)
  };

  const handleBarraProduto = (barraProduto: string) => {
    setBarraProduto(barraProduto);
  };

  const handleQtdeUnitaria = (qtdeUnit: number) => {
    setQtdeUnitaria(qtdeUnit);
  };

  const handleQtdeCaixas = (qtdeCx: number) => {
    setQtdeCaixas(qtdeCx);
  };

  const handleDescontoValorItem = (descValorItem: number) => {
    setDescontoValorItem(descValorItem);
  };

  const handleDescontoPorcentagemItem = (descPorcentagemItem: number) => {
    setDescontoPorcetagemItem(descPorcentagemItem);
  };

  const handleAcrescimoValorItem = (acrescValorItem: number) => {
    setAcrescimoValorItem(acrescValorItem);
  };

  const handleAcrescimoPorcentagemItem = (acrescPorcentagemItem: number) => {
    setAcrescimoPorcentagemItem(acrescPorcentagemItem);
  };

  return (
    <div>
      <ContentHeader title="Venda" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title pt-2"><strong>Venda: 1</strong></h3>
              <div className='card-tools'>
                <input className='form-control' type='date' value='2023-03-02' disabled={true} />
              </div>
            </div>
            <div className="card-body">
              <div className="form-group row col-sm-12">
                <div className="row col-sm-12">
                  <label htmlFor='inputCodigoProd' className='col-sm-3'>
                    Barra:
                  </label>
                  <label htmlFor='inputCodigoProd' className='col-sm-9'>
                    Produto:
                  </label>
                  <div className='col-sm-3'>
                    <input
                      className='form-control'
                      value="987654321"
                      onBlur={(event) => {
                        handleBarraProduto(event.target.value)
                      }}
                      id="txtBarraProduto"
                      type="text" />
                  </div>
                  <div className='col-sm-9'>
                    <input className='form-control' id="txtDescricaoProduto" type="text" />
                  </div>
                </div>
              </div>
              <div className="form-group row col-sm-12">
                <div className="row col-sm-12">
                  <label htmlFor='txtQtdeUnitaria' className='col-sm-3'>
                    Qtde Unitária:
                  </label>
                  <label htmlFor='txtQtdeCaixas' className='col-sm-3'>
                    Qtde em Caixas:
                  </label>
                  <label htmlFor='txtPrecoUnitario' className='col-sm-3'>
                    Preço Unitário:
                  </label>
                  <label htmlFor='txtPrecoCaixas' className='col-sm-3'>
                    Preço Caixa:
                  </label>
                  <div className='col-sm-3'>
                    <input className='form-control' onBlur={(event) => { handleQtdeUnitaria(+event.target.value), pegaInfosProduto() }} id="txtQtdeUnitaria" type="number" />
                  </div>
                  <div className='col-sm-3'>
                    <input className='form-control' onBlur={(event) => { handleQtdeCaixas(+event.target.value),   pegaInfosProduto() }} id="txtQtdeCaixas" type="number" />
                  </div>
                  <div className='col-sm-3'>
                    <input className='form-control'  disabled={true} value="12.35" id="txtPrecoUnitario" type="number" />
                  </div>
                  <div className='col-sm-3'>
                    <input className='form-control'  disabled={true} value="63.14" id="txtPrecoCaixas" type="number" />
                  </div>
                </div>
              </div>
              <div className='form-group row col-sm-12'>
                <div className='row col-sm-12'>
                  <label htmlFor='txtDescontoValor' className='col-sm-3'>
                    Desconto(R$):
                  </label>
                  <label htmlFor='txtDescontoPorcentagem' className='col-sm-3'>
                    Desconto(%):
                  </label>
                  <label htmlFor='txtAcrescimoValor' className='col-sm-3'>
                    Acréscimo(R$):
                  </label>
                  <label htmlFor='txtAcrescimoPorcentagem' className='col-sm-3'>
                    Acréscimo(%):
                  </label>
                  <div className='col-sm-3'>
                    <input className='form-control' onBlur={(event) => { handleDescontoValorItem(+event.target.value) }} id="txtDescontoValor" type="number" />
                  </div>
                  <div className='col-sm-3'>
                    <input className='form-control' onBlur={(event) => { handleDescontoPorcentagemItem(+event.target.value) }} id="txtDescontoPorcentagem" type="number" />
                  </div>
                  <div className='col-sm-3'>
                    <input className='form-control mt-1' onBlur={(event) => { handleAcrescimoValorItem(+event.target.value) }} id="txtAcrescimoValor" type="number" />
                  </div>
                  <div className='col-sm-3'>
                    <input className='form-control mt-1' onBlur={(event) => { handleAcrescimoPorcentagemItem(+event.target.value) }} id="txtAcrescimoPorcentagem" type="number" />
                  </div>
                </div>
              </div>
              <div className="form-group row col-sm-12">
                <div className="row col-sm-12">
                  <div className='col-sm-6'>
                    <button
                      className="btn btn-info btn-lg pb-1 mr-2"
                      onClick={() => {
                        adicionaItem()
                      }}
                      id="btnAdicionaItem">
                      Adicionar Item
                    </button>
                    <button className="btn btn-danger btn-lg pb-1" id="btnExcluiItem">Excluir Item</button>
                  </div>
                </div>
              </div>
              <table id="tabelaItensVenda" className="table table-lg-responsive table-bordered" style={{ whiteSpace: 'nowrap', backgroundColor: '#343a44' }}>
                <thead>
                  <th>Produto</th>
                  <th>Qtde Unit.</th>
                  <th>Qtde Caixas</th>
                  <th>Preço Unit.</th>
                  <th>Preço Caixas</th>
                  <th>Valor Total</th>
                </thead>
                <tbody id="tabelaTBody">
                  <tr>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="card-footer">Footer</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Venda;
