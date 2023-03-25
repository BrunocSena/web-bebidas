import React, { useEffect, useRef, useState } from 'react';
import { ContentHeader } from '@components';
import { api } from '@app/lib/axios';

const CadProduto = () => {

  const [estaIncluindo, setEstaIncluindo] = useState(false);
  const [estaAlterando, setEstaAlterando] = useState(false);
  const refDescricaoProduto = useRef<HTMLInputElement>(null);
  const refQtdeUnitarioProduto = useRef<HTMLInputElement>(null);
  const refQtdeCaixaProduto = useRef<HTMLInputElement>(null);
  const refPrecoUnitarioItem = useRef<HTMLInputElement>(null);
  const refPrecoCaixaItem = useRef<HTMLInputElement>(null);
  const refCustoUnitarioItem = useRef<HTMLInputElement>(null);
  const refCustoCaixaItem = useRef<HTMLInputElement>(null);
  const refBarraUnitariaItem = useRef<HTMLInputElement>(null);
  const refBarraCaixaItem = useRef<HTMLInputElement>(null);


  async function criaProduto() {
    try {
      const response = await api.post('/cadastroproduto', {
        codigoProduto: '',
        descricaoProduto: refDescricaoProduto,
        qtdeUnitariaItem: refQtdeUnitarioProduto.current?.value == '' ? 0 : parseFloat(refQtdeUnitarioProduto.current?.value ?? '0'),
        qtdeCaixaItem: refQtdeCaixaProduto.current?.value == '' ? 0 : parseFloat(refQtdeCaixaProduto.current?.value ?? '0'),
        precoUnitarioItem: refPrecoUnitarioItem.current?.value == '' ? 0 : parseFloat(refPrecoUnitarioItem.current?.value ?? '0'),
        precoCaixaItem: refPrecoCaixaItem.current?.value == '' ? 0 : parseFloat(refPrecoCaixaItem.current?.value ?? '0'),
        custoUnitarioItem: refCustoUnitarioItem.current?.value == '' ? 0 : parseFloat(refCustoUnitarioItem.current?.value ?? '0'),
        custoCaixaItem: refCustoCaixaItem.current?.value == '' ? 0 : parseFloat(refCustoCaixaItem.current?.value ?? '0'),
        barraUnitariaItem: refBarraUnitariaItem.current?.value == '' ? '' : refBarraUnitariaItem.current?.value,
        barraCaixaItem: refBarraCaixaItem.current?.value == '' ? '' : refBarraCaixaItem.current?.value,
      });

      alert('Produto criado com sucesso!');
    } catch (error) {
      console.log(error)
      alert('Falha ao cadastrar o produto!');
      return;
    }
    
  }

  useEffect (() => {

    const btnIncluir =  document.getElementById('btnIncluirCadProduto');
    const btnCancelar = document.getElementById('btnCancelarCadProduto');
    const btnAlterar = document.getElementById('btnAlterarCadProduto');
    const btnExcluir = document.getElementById('btnExcluirCadProduto');

    if (!estaAlterando && !estaIncluindo) {

      btnIncluir?.classList.remove('d-none');
      btnAlterar?.classList.remove('d-none');
      btnExcluir?.classList.remove('d-none');
      btnCancelar?.classList.add('d-none');

    } else {
      btnIncluir?.classList.add('d-none');
      btnAlterar?.classList.add('d-none');
      btnExcluir?.classList.add('d-none');
      btnCancelar?.classList.remove('d-none');
    }
  }, [estaAlterando, estaIncluindo]);

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
                      disabled={true}
                    />
                  </div>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      ref={refDescricaoProduto}
                      id="inputsProduto"
                      placeholder="Descrição"
                      disabled={!estaIncluindo && !estaAlterando}
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
                      ref={refQtdeUnitarioProduto}
                      placeholder="Quantidade Unit."
                      disabled={true}
                    />
                  </div>
                  <div className="col-sm-3">
                    <input
                      type="number"
                      className="form-control"
                      id="inputQtdeCaixa"
                      ref={refQtdeCaixaProduto}
                      placeholder="Quantidade Caixa"
                      disabled={true}
                    />
                  </div>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      id="inputPrecoUnit"
                      ref={refPrecoUnitarioItem}
                      placeholder="Preço Unitário"
                      disabled={!estaIncluindo && !estaAlterando}
                    />
                  </div>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      ref={refPrecoCaixaItem}
                      id="inputPrecoCaixa"
                      placeholder="Preço Caixa"
                      disabled={!estaIncluindo && !estaAlterando}
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
                      ref={refCustoUnitarioItem}
                      placeholder="Custo Unit."
                      disabled={!estaIncluindo && !estaAlterando}
                    />
                  </div>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      ref={refCustoCaixaItem}
                      id="inputCustoCaixa"
                      placeholder="Custo em Caixa"
                      disabled={!estaIncluindo && !estaAlterando}
                    />
                  </div>
                </div>
              </div>
              <label htmlFor="inputBarraUnitariaProduto" className="col-sm-6">
                Barra Unitária:
              </label>
              <label htmlFor="inputBarraCaixaProduto" className="col-sm-6">
                Barra Caixa:
              </label>
              <div className="row col-sm-12">
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    id="inputBarraUnitariaProduto"
                    ref={refBarraUnitariaItem}
                    placeholder="Barra Unitária"
                    disabled={!estaIncluindo && !estaAlterando}
                  />
                </div>
              </div>
              <div className="row col-sm-12">
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    id="inputBarraCaixaProduto"
                    ref={refBarraCaixaItem}
                    placeholder="Barra Caixa"
                    disabled={!estaIncluindo && !estaAlterando}
                  />
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-warning mr-1"
                id="btnIncluirCadProduto"
                onClick={() => {
                  setEstaIncluindo(true)
                  criaProduto();
                }}
              >
                Incluir
              </button>
              <button
                className="btn btn-info mr-1"
                id="btnAlterarCadProduto"
                onClick={() => {
                  setEstaAlterando(true)
                }}
              >
                Alterar
              </button>
              <button
                className="btn btn-danger mr-1 d-none"
                id="btnCancelarCadProduto"
                onClick={() => {
                  setEstaAlterando(false);
                  setEstaIncluindo(false);
                }}
              >
                Cancelar
              </button>
              <button
                id="btnExcluirCadProduto"
                className="btn btn-dark mr-1">
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
