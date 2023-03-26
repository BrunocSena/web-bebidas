import React, { useEffect, useRef, useState } from 'react';
import { ContentHeader } from '@components';
import { api } from '@app/lib/axios';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.min.css'

const CadProduto = () => {

  const [estaIncluindo, setEstaIncluindo] = useState(false);
  const [estaAlterando, setEstaAlterando] = useState(false);
  const [existeQtdeCaixa, setExisteQtdeCaixa] = useState(false);
  const refInputCodigoProduto = useRef<HTMLInputElement>(null);
  const refDescricaoProduto = useRef<HTMLInputElement>(null);
  const refQtdeUnitarioProduto = useRef<HTMLInputElement>(null);
  const refQtdeCaixaProduto = useRef<HTMLInputElement>(null);
  const refPrecoUnitarioItem = useRef<HTMLInputElement>(null);
  const refPrecoCaixaItem = useRef<HTMLInputElement>(null);
  const refCustoUnitarioItem = useRef<HTMLInputElement>(null);
  const refCustoCaixaItem = useRef<HTMLInputElement>(null);
  const refBarraUnitariaItem = useRef<HTMLInputElement>(null);
  const refBarraCaixaItem = useRef<HTMLInputElement>(null);
  const refBarraPesquisa = useRef<HTMLInputElement>(null);

  const handleQtdeCaixa = () => {
    const cbUsaCaixa = document.getElementById('cbUsaCaixa') as HTMLInputElement;
    if (cbUsaCaixa.checked) {
      setExisteQtdeCaixa(true);
    } else {
      setExisteQtdeCaixa(false);
    }
  };

  useEffect(() => {
    const divsInputUnitario = document.querySelectorAll('.inputUnitario');
    const divsInputCaixa = document.querySelectorAll('.inputCaixa');

    if (existeQtdeCaixa) {

      for (let i = 0; i < divsInputUnitario.length; i++) {
        divsInputUnitario[i].classList.remove('col-sm-6');
        divsInputUnitario[i].classList.add('col-sm-3');
      }

      for (let j = 0; j < divsInputCaixa.length; j++) {
        divsInputCaixa[j].classList.remove('d-none');
      }

    } else {

      for (let i = 0; i < divsInputUnitario.length; i++) {
        divsInputUnitario[i].classList.remove('col-sm-3');
        divsInputUnitario[i].classList.add('col-sm-6');
      }

      for (let j = 0; j < divsInputCaixa.length; j++) {
        divsInputCaixa[j].classList.add('d-none');
      }
    }

  }, [existeQtdeCaixa]);

  async function alteraProduto() {
    const cbUsaCaixa = document.getElementById('cbUsaCaixa') as HTMLInputElement;
    const codigoProduto = refInputCodigoProduto.current?.value;
    const descricaoProd = refDescricaoProduto.current?.value;
    const qtdeUnitariaItem = refQtdeUnitarioProduto.current?.value == '' ? 0 : parseFloat(refQtdeUnitarioProduto.current?.value ?? '0');
    const qtdeCaixaItem = refQtdeCaixaProduto.current?.value == '' ? 0 : parseFloat(refQtdeCaixaProduto.current?.value ?? '0');
    const precoUnitarioItem = refPrecoUnitarioItem.current?.value == '' ? 0 : parseFloat(refPrecoUnitarioItem.current?.value ?? '0');
    const precoCaixaItem = refPrecoCaixaItem.current?.value == '' ? 0 : parseFloat(refPrecoCaixaItem.current?.value ?? '0');
    const custoUnitarioItem = refCustoUnitarioItem.current?.value == '' ? 0 : parseFloat(refCustoUnitarioItem.current?.value ?? '0');
    const custoCaixaItem = refCustoCaixaItem.current?.value == '' ? 0 : parseFloat(refCustoCaixaItem.current?.value ?? '0');
    const barraUnitariaItem = refBarraUnitariaItem.current?.value == '' ? '' : refBarraUnitariaItem.current?.value;
    const barraCaixaItem = refBarraCaixaItem.current?.value == '' ? '' : refBarraCaixaItem.current?.value;
    const usaQtdeEmCaixa = cbUsaCaixa.checked;

    if (descricaoProd == '') {
      toast.error('Descrição do produto não informada! Favor informar');
      return;
    }

    if (usaQtdeEmCaixa) {
      if (qtdeCaixaItem == 0) {
        toast.error('Não foi informada a quantidade em caixas! Favor informar.');
        return;
      }
      if (precoCaixaItem == 0) {
        toast.error('Não foi informado o preço da caixa do produto! Favor informar.');
        return;
      }
      if (custoCaixaItem == 0) {
        toast.error('Não foi informado o custo da caixa do produto! Favor informar.');
        return;
      }
      if (barraCaixaItem == '') {
        toast.error('Não foi informado o código de barras de caixa! Favor informar.')
      }

      try {
        const produtoAlterado = {
          "codigoDoProduto": codigoProduto,
          "descricaoProd": descricaoProd,
          "qtdeUnitariaItem": qtdeUnitariaItem,
          "qtdeCaixaItem": qtdeCaixaItem,
          "precoUnitarioItem": precoUnitarioItem,
          "precoCaixaItem": precoCaixaItem,
          "custoUnitarioItem": custoUnitarioItem,
          "custoCaixaItem": custoCaixaItem,
          "barraUnitariaItem": barraUnitariaItem,
          "barraCaixaItem": barraCaixaItem,
          "usaQtdeEmCaixa": usaQtdeEmCaixa,
        }
        const response = await api.post('cadastroproduto/alteraproduto', produtoAlterado);
        toast.success('Produto alterado com sucesso!');
        const inputCodigoProduto = document.getElementById('inputCodigo') as HTMLInputElement;
        inputCodigoProduto.value = response.data.codigoDoProduto;
      } catch (error) {
        console.error(error);
        toast.error('Erro ao alterar o produto! Verifique');
      }
    };
  }


  async function criaProduto() {
    const cbUsaCaixa = document.getElementById('cbUsaCaixa') as HTMLInputElement;
    const descricaoProd = refDescricaoProduto.current?.value;
    const qtdeUnitariaItem = refQtdeUnitarioProduto.current?.value == '' ? 0 : parseFloat(refQtdeUnitarioProduto.current?.value ?? '0');
    const qtdeCaixaItem = refQtdeCaixaProduto.current?.value == '' ? 0 : parseFloat(refQtdeCaixaProduto.current?.value ?? '0');
    const precoUnitarioItem = refPrecoUnitarioItem.current?.value == '' ? 0 : parseFloat(refPrecoUnitarioItem.current?.value ?? '0');
    const precoCaixaItem = refPrecoCaixaItem.current?.value == '' ? 0 : parseFloat(refPrecoCaixaItem.current?.value ?? '0');
    const custoUnitarioItem = refCustoUnitarioItem.current?.value == '' ? 0 : parseFloat(refCustoUnitarioItem.current?.value ?? '0');
    const custoCaixaItem = refCustoCaixaItem.current?.value == '' ? 0 : parseFloat(refCustoCaixaItem.current?.value ?? '0');
    const barraUnitariaItem = refBarraUnitariaItem.current?.value == '' ? '' : refBarraUnitariaItem.current?.value;
    const barraCaixaItem = refBarraCaixaItem.current?.value == '' ? '' : refBarraCaixaItem.current?.value;
    const usaQtdeEmCaixa = cbUsaCaixa.checked;

    if (descricaoProd == '') {
      toast.error('Descrição do produto não informada! Favor informar');
      return;
    }

    if (usaQtdeEmCaixa) {
      if (qtdeCaixaItem == 0) {
        toast.error('Não foi informada a quantidade em caixas! Favor informar.');
        return;
      }
      if (precoCaixaItem == 0) {
        toast.error('Não foi informado o preço da caixa do produto! Favor informar.');
        return;
      }
      if (custoCaixaItem == 0) {
        toast.error('Não foi informado o custo da caixa do produto! Favor informar.');
        return;
      }
      if (barraCaixaItem == '') {
        toast.error('Não foi informado o código de barras de caixa! Favor informar.')
      }
    }

    try {
      const produtoACriarJson = {
        "descricaoProd": descricaoProd,
        "qtdeUnitariaItem": qtdeUnitariaItem,
        "qtdeCaixaItem": qtdeCaixaItem,
        "precoUnitarioItem": precoUnitarioItem,
        "precoCaixaItem": precoCaixaItem,
        "custoUnitarioItem": custoUnitarioItem,
        "custoCaixaItem": custoCaixaItem,
        "barraUnitariaItem": barraUnitariaItem,
        "barraCaixaItem": barraCaixaItem,
        "usaQtdeEmCaixa": usaQtdeEmCaixa,
      }
      const response = await api.post('cadastroproduto/novoproduto', produtoACriarJson);
      toast.success('Produto criado com sucesso!');
      const inputCodigoProduto = document.getElementById('inputCodigo') as HTMLInputElement;
      inputCodigoProduto.value = response.data.codigoProdCreated;
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  function limpaCampos() {
    const txtCodigoProduto = document.getElementById('inputCodigo') as HTMLInputElement;
    const txtDescricaoProd = document.getElementById('inputsProduto') as HTMLInputElement;
    const txtQtdeUnitaria = document.getElementById('inputQtdeUnitaria') as HTMLInputElement;
    const txtQtdeCaixa = document.getElementById('inputQtdeCaixa') as HTMLInputElement;
    const txtCustoUnitario = document.getElementById('inputCustoUnitario') as HTMLInputElement;
    const txtCustoCaixa = document.getElementById('inputCustoCaixa') as HTMLInputElement;
    const txtBarraUnitaria = document.getElementById('inputBarraUnitariaProduto') as HTMLInputElement;
    const txtBarraCaixa = document.getElementById('inputBarraCaixaProduto') as HTMLInputElement;
    const txtPesquisa = document.getElementById('inputPesquisaProduto') as HTMLInputElement;
    const txtPrecoUnitario = document.getElementById('inputPrecoUnit') as HTMLInputElement;
    const txtPrecoCaixa = document.getElementById('inputPrecoCaixa') as HTMLInputElement;
    const cbUsaCaixaProduto = document.getElementById('cbUsaCaixa') as HTMLInputElement;


    txtCodigoProduto.value = '';
    txtDescricaoProd.value = '';
    txtQtdeUnitaria.value = '1';
    txtQtdeCaixa.value = '';
    txtCustoUnitario.value = '';
    txtCustoCaixa.value = '';
    txtBarraUnitaria.value = '';
    txtBarraCaixa.value = '';
    txtPrecoUnitario.value = '';
    txtPrecoCaixa.value = '';
    cbUsaCaixaProduto.checked = false;
    txtPesquisa.value = '';

    setExisteQtdeCaixa(false);
  }

  async function consultaProduto() {
    try {
      const consultaPorBarra = {
        "barraConsultada": refBarraPesquisa.current?.value
      }
      const response = await api.post('cadastroproduto/consultaproduto', consultaPorBarra);
      const txtCodigoProduto = document.getElementById('inputCodigo') as HTMLInputElement;
      const txtDescricaoProd = document.getElementById('inputsProduto') as HTMLInputElement;
      const txtQtdeUnitaria = document.getElementById('inputQtdeUnitaria') as HTMLInputElement;
      const txtQtdeCaixa = document.getElementById('inputQtdeCaixa') as HTMLInputElement;
      const txtCustoUnitario = document.getElementById('inputCustoUnitario') as HTMLInputElement;
      const txtCustoCaixa = document.getElementById('inputCustoCaixa') as HTMLInputElement;
      const txtBarraUnitaria = document.getElementById('inputBarraUnitariaProduto') as HTMLInputElement;
      const txtBarraCaixa = document.getElementById('inputBarraCaixaProduto') as HTMLInputElement;
      const txtPesquisa = document.getElementById('inputPesquisaProduto') as HTMLInputElement;
      const txtPrecoUnitario = document.getElementById('inputPrecoUnit') as HTMLInputElement;
      const txtPrecoCaixa = document.getElementById('inputPrecoCaixa') as HTMLInputElement;
      const cbUsaCaixaProduto = document.getElementById('cbUsaCaixa') as HTMLInputElement;

      const produtoEncontrado = response.data[0];

      txtCodigoProduto.value = produtoEncontrado.codigoProduto;
      txtDescricaoProd.value = produtoEncontrado.descricaoProduto;
      txtQtdeUnitaria.value = produtoEncontrado.qtdeUnitaria;
      txtQtdeCaixa.value = produtoEncontrado.qtdeCaixa;
      txtCustoUnitario.value = produtoEncontrado.custoUnitProduto;
      txtCustoCaixa.value = produtoEncontrado.custoCaixaProduto;
      txtBarraUnitaria.value = produtoEncontrado.barraUnitariaProduto;
      txtBarraCaixa.value = produtoEncontrado.barraCaixaProduto;
      txtPrecoUnitario.value = produtoEncontrado.precoUnitProduto;
      txtPrecoCaixa.value = produtoEncontrado.precoCaixaProduto;
      cbUsaCaixaProduto.checked = produtoEncontrado.usaQtdeCaixa == '1' ? true : false;
      txtPesquisa.value = '';
      setExisteQtdeCaixa(produtoEncontrado.usaQtdeCaixa == '1' ? true : false)

    } catch (error: any) {
      console.error(error);
      toast.error('Erro ao consulta barra, por favor verifique!');
    }
  }

  useEffect(() => {

    const btnIncluir = document.getElementById('btnIncluirCadProduto');
    const btnCancelar = document.getElementById('btnCancelarCadProduto');
    const btnAlterar = document.getElementById('btnAlterarCadProduto');
    const btnExcluir = document.getElementById('btnExcluirCadProduto');
    const btnConfirmar = document.getElementById('btnConfirmaCadProduto');

    if (!estaAlterando && !estaIncluindo) {

      btnIncluir?.classList.remove('d-none');
      btnAlterar?.classList.remove('d-none');
      btnExcluir?.classList.remove('d-none');
      btnCancelar?.classList.add('d-none');
      btnConfirmar?.classList.add('d-none');

    } else {
      btnIncluir?.classList.add('d-none');
      btnAlterar?.classList.add('d-none');
      btnExcluir?.classList.add('d-none');
      btnCancelar?.classList.remove('d-none');
      btnConfirmar?.classList.remove('d-none');
    }
  }, [estaAlterando, estaIncluindo]);

  return (
    <div>
      <ContentHeader title="Cadastro de Produto" />
      <section className="content">
        <div className="container-fluid">
          <div className='row' style={{ marginLeft: 1 }}>
            <div className='input-group'>
              <label htmlFor="inputsProduto" className="col-sm-12">
                Pesquisa Produto:
              </label>
              <input
                id='inputPesquisaProduto'
                className="form-control col-sm-2 mb-1"
                ref={refBarraPesquisa}
                onKeyDown={async (event) => {
                  if (event.key === 'Enter') {
                    const inputElementPesquisa = event.target as HTMLInputElement;
                    inputElementPesquisa.blur();
                  }
                }}
                onBlur={async () => {
                  consultaProduto();
                }}
              >
              </input>
              <i className="fa fa-search ml-2 pt-2" />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="form-group row col-sm-12">
                <div className="row col-sm-12">
                  <div className='col-sm-10'>
                    <label htmlFor="inputsProduto" className="col-sm-12">
                      Produto:
                    </label>
                  </div>
                  <div className='col-sm-2'>
                    <label style={{ textAlign: 'center' }} htmlFor="cbUsaCaixa" className="col-sm-12">
                      Tem Qtde em Caixa?
                    </label>
                  </div>
                </div>
                <div className="row col-sm-12">
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      id="inputCodigo"
                      placeholder="Código"
                      ref={refInputCodigoProduto}
                      disabled={true}
                    />
                  </div>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      className="form-control"
                      ref={refDescricaoProduto}
                      id="inputsProduto"
                      placeholder="Descrição"
                      disabled={!estaIncluindo && !estaAlterando}
                    />
                  </div>
                  <div className="col-sm-2">
                    <input
                      type="checkbox"
                      className="form-control"
                      id="cbUsaCaixa"
                      onChange={handleQtdeCaixa}
                      disabled={!estaIncluindo && !estaAlterando}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group row col-sm-12">
                <div className="row col-sm-12">
                  <label htmlFor="inputQtdeUnitaria" className="col-sm-3 inputUnitario">
                    Quantidade Unitária:
                  </label>
                  <label htmlFor="inputQtdeCaixa" className="col-sm-3 inputCaixa">
                    Quantidade em Caixa:
                  </label>
                  <label htmlFor="inputQtdeCaixa" className="col-sm-3 inputUnitario">
                    Preço Unitário:
                  </label>
                  <label htmlFor="inputQtdeCaixa" className="col-sm-3 inputCaixa">
                    Preço em Caixa:
                  </label>
                  <div className="col-sm-3 inputUnitario">
                    <input
                      type="number"
                      className="form-control"
                      id="inputQtdeUnitaria"
                      ref={refQtdeUnitarioProduto}
                      defaultValue="1"
                      placeholder="Quantidade Unit."
                      disabled={!estaIncluindo && !estaAlterando}
                    />
                  </div>
                  <div className="col-sm-3 inputCaixa">
                    <input
                      type="number"
                      className="form-control"
                      id="inputQtdeCaixa"
                      ref={refQtdeCaixaProduto}
                      placeholder="Quantidade Caixa"
                      disabled={!estaIncluindo && !estaAlterando}
                    />
                  </div>
                  <div className="col-sm-3 inputUnitario">
                    <input
                      type="text"
                      className="form-control"
                      id="inputPrecoUnit"
                      ref={refPrecoUnitarioItem}
                      placeholder="Preço Unitário"
                      disabled={!estaIncluindo && !estaAlterando}
                    />
                  </div>
                  <div className="col-sm-3 inputCaixa">
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
                  <label htmlFor="inputCustoUnitario" className="col-sm-3 inputUnitario">
                    Custo Unitário:
                  </label>
                  <label htmlFor="inputCustoCaixa" className="col-sm-3 inputCaixa">
                    Custo em Caixa:
                  </label>
                  <label htmlFor="inputBarraUnitariaProduto" className="col-sm-3 inputUnitario">
                    Barra Unitária:
                  </label>
                  <label htmlFor="inputBarraCaixaProduto" className="col-sm-3 inputCaixa">
                    Barra Caixa:
                  </label>
                  <div className="col-sm-3 inputUnitario">
                    <input
                      type="text"
                      className="form-control"
                      id="inputCustoUnitario"
                      ref={refCustoUnitarioItem}
                      placeholder="Custo Unit."
                      disabled={!estaIncluindo && !estaAlterando}
                    />
                  </div>
                  <div className="col-sm-3 inputCaixa">
                    <input
                      type="text"
                      className="form-control"
                      ref={refCustoCaixaItem}
                      id="inputCustoCaixa"
                      placeholder="Custo em Caixa"
                      disabled={!estaIncluindo && !estaAlterando}
                    />
                  </div>
                  <div className="col-sm-3 inputUnitario">
                    <input
                      type="text"
                      className="form-control"
                      id="inputBarraUnitariaProduto"
                      ref={refBarraUnitariaItem}
                      placeholder="Barra Unitária"
                      disabled={!estaIncluindo && !estaAlterando}
                    />
                  </div>
                  <div className="col-sm-3 inputCaixa">
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
            </div>
            <div className="card-footer">
              <button
                className="btn btn-warning mr-1"
                id="btnIncluirCadProduto"
                onClick={() => {
                  setEstaIncluindo(true);
                  setEstaAlterando(false);
                  limpaCampos();
                }}
              >
                Incluir
              </button>
              <button
                className="btn btn-info mr-1"
                id="btnAlterarCadProduto"
                onClick={() => {
                  setEstaAlterando(true);
                  setEstaIncluindo(false);
                }}
              >
                Alterar
              </button>
              <button
                className="btn btn-warning mr-1 d-none"
                id="btnConfirmaCadProduto"
                onClick={async () => {
                  if (estaAlterando) {
                    await alteraProduto()
                  } else {
                    await criaProduto()
                  }
                  setEstaAlterando(false);
                  setEstaIncluindo(false);
                }}
              >
                Confirmar
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
