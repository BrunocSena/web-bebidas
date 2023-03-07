/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { ContentHeader } from '@components';

const Venda = () => {
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
                    <input className='form-control' id="txtBarraProduto" type="text" />
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
                  <label htmlFor='txtDescontoValor' className='col-sm-3'>
                    Desconto(R$):
                  </label>
                  <label htmlFor='txtDescontoPorcentagem' className='col-sm-3'>
                    Desconto(%):
                  </label>
                  <div className='col-sm-3'>
                    <input className='form-control' id="txtQtdeUnitaria" type="number" />
                  </div>
                  <div className='col-sm-3'>
                    <input className='form-control' id="txtQtdeCaixas" type="number" />
                  </div>
                  <div className='col-sm-3'>
                    <input className='form-control' id="txtDescontoValor" type="number" />
                  </div>
                  <div className='col-sm-3'>
                    <input className='form-control' id="txtDescontoPorcentagem" type="number" />
                  </div>
                </div>
              </div>
              <div className="form-group row col-sm-12">
                <div className="row col-sm-12">
                  <label htmlFor='txtAcrescimoValor' className='col-sm-3'>
                    Acréscimo(R$):
                  </label>
                  <label htmlFor='txtAcrescimoPorcentagem' className='col-sm-3'>
                    Acréscimo(%):
                  </label>
                  <label htmlFor='estilizacao' className='col-sm-3'>
                  </label>
                  <label htmlFor='estilizacao' className='col-sm-3'>
                  </label>
                  <div className='col-sm-3'>
                    <input className='form-control mt-1' disabled id="txtAcrescimoValor" type="number" />
                  </div>
                  <div className='col-sm-3'>
                    <input className='form-control mt-1' disabled id="txtAcrescimoValor" type="number" />
                  </div>
                  <div className='col-sm-6'>
                    <button className="btn btn-info btn-lg pb-1" id="btnAdicionaItem">Adicionar</button>
                  </div>
                </div>
              </div>
              <table id="tabelaItensVenda" className="table table-lg-responsive" style={{ whiteSpace: 'nowrap' }}>
                <thead>
                  <th>Produto</th>
                  <th>Qtde Unit.</th>
                  <th>Qtde Caixas</th>
                  <th>Preço Unit.</th>
                  <th>Preço Caixas</th>
                  <th>Valor Total</th>
                </thead>
                <tbody>
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
