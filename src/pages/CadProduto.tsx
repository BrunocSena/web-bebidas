/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { ContentHeader } from '@components';

const CadProduto = () => {
  return (
    <div>
      <ContentHeader title="Cadastro de Produto" />
      <section className="content">
        <div className="container-fluid">
          <div className='row' style={{marginLeft: 1}}>
            <div className='input-group'>
              <input
                className="form-control col-sm-2 mb-1">
              </input>
              <i className="fa fa-search ml-2 pt-2" />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-widget="collapse"
                  data-toggle="tooltip"
                  title="Collapse"
                >
                  <i className="fa fa-minus" />
                </button>
                <button
                  type="button"
                  className="btn btn-tool"
                  data-widget="remove"
                  data-toggle="tooltip"
                  title="Remove"
                >
                  <i className="fa fa-times" />
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="form-group row col-sm-12">
                <div className="row col-sm-12">
                  <label htmlFor="inputsProduto" className="col-sm-12">
                    Produto:
                  </label>
                </div>
                <div className="row col-sm-12">
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      id="inputCodigo"
                      placeholder="Código"
                      disabled={true}
                    />
                  </div>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="inputsProduto"
                      placeholder="Descrição"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group row col-sm-12">
                <div className="row col-sm-12">
                  <label htmlFor="inputQtdeUnitaria" className="col-sm-3">
                    Quantidade Unitária:
                  </label>
                  <label htmlFor="inputQtdeCaixa" className="col-sm-3">
                    Quantidade em Caixa:
                  </label>
                  <label htmlFor="inputQtdeCaixa" className="col-sm-3">
                    Preço Unitário:
                  </label>
                  <label htmlFor="inputQtdeCaixa" className="col-sm-3">
                    Preço em Caixa:
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="number"
                      className="form-control"
                      id="inputQtdeUnitaria"
                      placeholder="Quantidade Unit."
                    />
                  </div>
                  <div className="col-sm-3">
                    <input
                      type="number"
                      className="form-control"
                      id="inputQtdeCaixa"
                      placeholder="Quantidade Caixa"
                    />
                  </div>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      id="inputPrecoUnit"
                      placeholder="Preço Unitário"
                    />
                  </div>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      id="inputPrecoCaixa"
                      placeholder="Preço Caixa"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group row col-sm-12">
                <div className="row col-sm-12">
                  <label htmlFor="inputCustoUnitario" className="col-sm-6">
                    Custo Unitário:
                  </label>
                  <label htmlFor="inputCustoCaixa" className="col-sm-6">
                    Custo em Caixa:
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      id="inputCustoUnitario"
                      placeholder="Custo Unit."
                    />
                  </div>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      id="inputCustoCaixa"
                      placeholder="Custo em Caixa"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-warning mr-1">
                Incluir
              </button>
              <button
                className="btn btn-info mr-1">
                Alterar
              </button>
              <button
                className="btn btn-danger btn-md mr-1">
                Excluir
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CadProduto;
