import React, { useEffect, useState } from 'react';
import { ContentHeader } from '@components';

const CadProduto = () => {

  const [estaIncluindo, setEstaIncluindo] = useState(false);
  const [estaAlterando, setEstaAlterando] = useState(false);

  return (
    <div>
      <ContentHeader title="Cadastro de Produto" />
      <section className="content">
        <div className="container-fluid">
          <div className='row' style={{ marginLeft: 1 }}>
            <div className='input-group'>
              <input
                className="form-control col-sm-2 mb-1">
              </input>
              <i className="fa fa-search ml-2 pt-2" />
            </div>
          </div>
          <div className="card">
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
                      disabled={!estaIncluindo || !estaAlterando}
                    />
                  </div>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="inputsProduto"
                      placeholder="Descrição"
                      disabled={!estaIncluindo || !estaAlterando}
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
                      disabled={!estaIncluindo || !estaAlterando}
                    />
                  </div>
                  <div className="col-sm-3">
                    <input
                      type="number"
                      className="form-control"
                      id="inputQtdeCaixa"
                      placeholder="Quantidade Caixa"
                      disabled={!estaIncluindo || !estaAlterando}
                    />
                  </div>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      id="inputPrecoUnit"
                      placeholder="Preço Unitário"
                      disabled={!estaIncluindo || !estaAlterando}
                    />
                  </div>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      id="inputPrecoCaixa"
                      placeholder="Preço Caixa"
                      disabled={!estaIncluindo || !estaAlterando}
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
                      disabled={!estaIncluindo || !estaAlterando}
                    />
                  </div>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      id="inputCustoCaixa"
                      placeholder="Custo em Caixa"
                      disabled={!estaIncluindo || !estaAlterando}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-warning mr-1"
                onClick={() => {
                  setEstaIncluindo(true)
                }}
                >
                Incluir
              </button>
              <button
                className="btn btn-info mr-1"
                onClick={() => {
                  setEstaAlterando(true)
                }}
                >
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
