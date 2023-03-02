/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import {ContentHeader} from '@components';

const EntradaProduto = () => {
 
  const [estaEditando, setEstaEditando] = useState(false);

  useEffect (() => {

    const btnModoEdicaoEntProduto =  document.getElementById('btnModoEdicaoEntProduto');
    const btnCancelarModoEdicaoProduto = document.getElementById('btnCancelarModoEdicaoProduto');

    if (!estaEditando) {

      btnModoEdicaoEntProduto?.classList.remove('d-none');
      btnCancelarModoEdicaoProduto?.classList.add('d-none');

    } else {

      btnModoEdicaoEntProduto?.classList.add('d-none');
      btnCancelarModoEdicaoProduto?.classList.remove('d-none');

    }
  }, [estaEditando])

  return (
    <div>
      <ContentHeader title="Entrada de Produto" />
      <section className="content">
        <div className="container-fluid">
          <div className='row' style={{ marginLeft: 1 }}>
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
                      disabled={true}
                    />
                  </div>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="inputsProduto"
                      placeholder="Descrição"
                      disabled={true}
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
                    Custo Unitário:
                  </label>
                  <label htmlFor="inputQtdeCaixa" className="col-sm-3">
                    Custo em Caixa:
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="number"
                      className="form-control"
                      id="inputQtdeUnitaria"
                      placeholder="Quantidade Unit."
                      disabled={!estaEditando}
                    />
                  </div>
                  <div className="col-sm-3">
                    <input
                      type="number"
                      className="form-control"
                      id="inputQtdeCaixa"
                      placeholder="Quantidade Caixa"
                      disabled={!estaEditando}
                    />
                  </div>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      id="inputCustoUnitario"
                      placeholder="Custo Unit."
                      disabled={!estaEditando}
                    />
                  </div>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      id="inputCustoCaixa"
                      placeholder="Custo em Caixa"
                      disabled={!estaEditando}
                    />
                  </div>
                </div>
              </div>
              <label htmlFor="inputsProduto" className="col-sm-6">
                Barra:
              </label>
              <label htmlFor="inputsProduto" className="col-sm-6">
                Tipo Entrada:
              </label>
              <div className="row col-sm-12">
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    id="inputBarraCadProduto"
                    placeholder="Barra"
                    disabled={!estaEditando}
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    id="inputTipoEntrada"
                    placeholder="Tipo de Entrada do Produto"
                    disabled={true}
                    defaultValue="Entrada de Mercadoria"
                  />
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-warning"
                id="btnModoEdicaoEntProduto"
                onClick={() => {
                  setEstaEditando(true)
                }}
              >
                Incluir
              </button>
              <button
                className="btn btn-danger d-none"
                id="btnCancelarModoEdicaoProduto"
                onClick={() => {
                  setEstaEditando(false);
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EntradaProduto;
