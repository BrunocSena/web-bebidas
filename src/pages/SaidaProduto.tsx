/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import {ContentHeader} from '@components';

const SaidaProduto = () => {
   
  const [estaEditando, setEstaEditando] = useState(false);

  useEffect (() => {

    const btnModoEdicaoSaidaProduto =  document.getElementById('btnModoEdicaoSaidaProduto');
    const btnCancelarModoEdicaoProduto = document.getElementById('btnCancelarModoEdicaoProduto');

    if (!estaEditando) {

      btnModoEdicaoSaidaProduto?.classList.remove('d-none');
      btnCancelarModoEdicaoProduto?.classList.add('d-none');

    } else {

      btnModoEdicaoSaidaProduto?.classList.add('d-none');
      btnCancelarModoEdicaoProduto?.classList.remove('d-none');

    }
  }, [estaEditando])

  return (
    <div>
      <ContentHeader title="Saída de Produto" />
      <section className="content">
        <div className="container-fluid">
          <div className='row' style={{ marginLeft: 1 }}>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="form-group row col-sm-12">
                <div className="row col-sm-12">
                  <label htmlFor="inputsProdutoSaida" className="col-sm-12">
                    Produto:
                  </label>
                </div>
                <div className="row col-sm-12">
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      id="inputCodigoSaidaProduto"
                      placeholder="Código"
                      disabled={true}
                    />
                  </div>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="inputsProdutoSaida"
                      placeholder="Descrição"
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group row col-sm-12">
                <div className="row col-sm-12">
                  <label htmlFor="inputQtdeUnitariaSaidaProduto" className="col-sm-6">
                    Quantidade Unitária:
                  </label>
                  <label htmlFor="inputQtdeCaixaSaidaProduto" className="col-sm-6">
                    Quantidade em Caixa:
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="number"
                      className="form-control"
                      id="inputQtdeUnitariaSaidaProduto"
                      placeholder="Quantidade Unit."
                      disabled={!estaEditando}
                    />
                  </div>
                  <div className="col-sm-6">
                    <input
                      type="number"
                      className="form-control"
                      id="inputQtdeCaixaSaidaProduto"
                      placeholder="Quantidade Caixa"
                      disabled={!estaEditando}
                    />
                  </div>
                </div>
              </div>
              <label htmlFor="inputBarraSaidaProduto" className="col-sm-6">
                Barra:
              </label>
              <label htmlFor="inputTipoSaida" className="col-sm-6">
                Tipo Saída:
              </label>
              <div className="row col-sm-12">
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    id="inputBarraSaidaProduto"
                    placeholder="Barra"
                    disabled={!estaEditando}
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    id="inputTipoSaida"
                    placeholder="Tipo de Saída do Produto"
                    disabled={true}
                    defaultValue="Saída de Mercadoria"
                  />
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-info"
                id="btnModoEdicaoSaidaProduto"
                onClick={() => {
                  setEstaEditando(true)
                }}
              >
                Modo Edição
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

export default SaidaProduto;
