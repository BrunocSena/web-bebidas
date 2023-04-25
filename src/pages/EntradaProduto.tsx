import React, { useEffect, useRef, useState } from 'react';
import { ContentHeader } from '@components';
import { api } from '@app/lib/axios';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const EntradaProduto = () => {
  const inputBarraPesquisa = useRef<HTMLInputElement>(null);
  const [estaEditando, setEstaEditando] = useState(false);
  const [dateHoje, setDateHoje] = useState('');
  const [linhasTabela, setLinhasTabela] = useState<TableRowProps[]>([]);
  const [qtdeTotUnit, setQtdeTotUnit] = useState(0);
  const [qtdeTotCaixa, setQtdeTotCaixa] = useState(0);
  let contadorId = 0;

  interface TableRowProps {
    codigoProduto: string;
    descricaoProduto: string;
    precoUnitProduto: number;
    precoCaixaProduto: number;
    custoUnitProduto: number;
    custoCaixaProduto: number;
    qtdeUnitaria: number;
    qtdeCaixa: number;
    barraCodigo: string;
    onRemove: (event: any) => void;
  };

  const TableRow = ({
    codigoProduto,
    descricaoProduto,
    precoUnitProduto,
    precoCaixaProduto,
    custoUnitProduto,
    custoCaixaProduto,
    qtdeUnitaria,
    qtdeCaixa,
    barraCodigo,
    onRemove
  }: TableRowProps) => {
    const idtxtQtdeUnitario = 'txtQuantidadeUnitario' + String(contadorId);
    const idtxtQtdeCaixa = 'txtQuantidadeCaixa' + String(contadorId);
    const idtxtCustoUnitario = 'txtCustoUnitario' + String(contadorId);
    const idtxtCustoCaixa = 'txtCustoCaixa' + String(contadorId);
    const idtxtPrecoUnitario = 'txtPrecoUnitario' + String(contadorId);
    const idtxtPrecoCaixa = 'txtPrecoCaixa' + String(contadorId);
    contadorId = contadorId + 1;
    return (
      <tr>
        <td style={{ textAlign: 'center' }}>{codigoProduto}</td>
        <td>{descricaoProduto}</td>
        <td id={idtxtQtdeUnitario} style={{ textAlign: 'right' }}>{qtdeUnitaria}</td>
        <td id={idtxtQtdeCaixa} style={{ textAlign: 'right' }}>{qtdeCaixa}</td>
        <td id={idtxtCustoUnitario} style={{ textAlign: 'right' }}>R$ {custoUnitProduto.toFixed(2).replace('.', ',')}</td>
        <td id={idtxtCustoCaixa} style={{ textAlign: 'right' }}>R$ {custoCaixaProduto.toFixed(2).replace('.', ',')}</td>
        <td id={idtxtPrecoUnitario} style={{ textAlign: 'right' }}>R$ {precoUnitProduto.toFixed(2).replace('.', ',')}</td>
        <td id={idtxtPrecoCaixa} style={{ textAlign: 'right' }}>R$ {precoCaixaProduto.toFixed(2).replace('.', ',')}</td>
        <td style={{ textAlign: 'center' }}>{barraCodigo}</td>
        <td style={{ textAlign: 'center' }}>
          <button onClick={onRemove}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </td>
      </tr>
    );
  };

  useEffect(() => {
    const btnModoEdicaoEntProduto = document.getElementById('btnModoEdicaoEntProduto') as HTMLButtonElement;
    const btnCancelarModoEdicaoProduto = document.getElementById('btnCancelarModoEdicaoProduto') as HTMLButtonElement;
    const btnConfirmaEntradaProduto = document.getElementById('btnConfirmaEntradaProduto') as HTMLButtonElement;
    if (!estaEditando) {
      btnModoEdicaoEntProduto?.classList.remove('d-none');
      btnCancelarModoEdicaoProduto?.classList.add('d-none');
      btnConfirmaEntradaProduto?.classList.add('d-none');
    } else {
      btnModoEdicaoEntProduto?.classList.add('d-none');
      btnCancelarModoEdicaoProduto?.classList.remove('d-none');
      btnConfirmaEntradaProduto?.classList.remove('d-none');
    }
  }, [estaEditando]);

  const adicionaItem = async (produtoAdiciona: TableRowProps) => {
    const novaLinha: TableRowProps = {
      codigoProduto: produtoAdiciona.codigoProduto,
      descricaoProduto: produtoAdiciona.descricaoProduto,
      precoUnitProduto: produtoAdiciona.precoUnitProduto,
      precoCaixaProduto: produtoAdiciona.precoCaixaProduto,
      custoUnitProduto: produtoAdiciona.custoUnitProduto,
      custoCaixaProduto: produtoAdiciona.custoCaixaProduto,
      qtdeUnitaria: produtoAdiciona.qtdeUnitaria,
      qtdeCaixa: produtoAdiciona.qtdeCaixa,
      barraCodigo: produtoAdiciona.barraCodigo,
      onRemove: () => { },
    };

    const indiceEncontrado = linhasTabela.findIndex(index => index.barraCodigo == novaLinha.barraCodigo);

    if (indiceEncontrado == -1) {
      setLinhasTabela([...linhasTabela, novaLinha]);
      setQtdeTotCaixa(qtdeTotCaixa + (novaLinha.qtdeCaixa == null ? 0 : novaLinha.qtdeCaixa));
      setQtdeTotUnit(qtdeTotUnit+ (novaLinha.qtdeUnitaria == null ? 0 : novaLinha.qtdeUnitaria));
    } else {
      const qtdeCaixa = linhasTabela[indiceEncontrado].qtdeCaixa + (novaLinha.qtdeCaixa == null ? 0 : novaLinha.qtdeCaixa);
      const qtdeUnitaria = linhasTabela[indiceEncontrado].qtdeUnitaria + (novaLinha.qtdeUnitaria == null ? 0 : novaLinha.qtdeUnitaria);
      linhasTabela[indiceEncontrado].qtdeCaixa = qtdeCaixa;
      linhasTabela[indiceEncontrado].qtdeUnitaria = qtdeUnitaria;
      const txtQuantidadeCaixa = document.getElementById(('txtQuantidadeCaixa' + String(indiceEncontrado))) as HTMLTableCellElement;
      const txtQuantidadeUnitaria = document.getElementById(('txtQuantidadeUnitario' + String(indiceEncontrado))) as HTMLTableCellElement;
      txtQuantidadeCaixa.innerHTML = String(qtdeCaixa);
      txtQuantidadeUnitaria.innerHTML = String(qtdeUnitaria);
      setQtdeTotCaixa(qtdeTotCaixa + (novaLinha.qtdeCaixa == null ? 0 : novaLinha.qtdeCaixa));
      setQtdeTotUnit(qtdeTotUnit + (novaLinha.qtdeUnitaria == null ? 0 : novaLinha.qtdeUnitaria));
    };
  };

  async function gravaEntrada() {
    if (linhasTabela.length == 0) {
      toast.error('Nenhum item foi dado entrada! Impossível gravar entrada. Verifique!');
      const btnCancelarEntrada = document.getElementById('btnCancelarModoEdicaoProduto') as HTMLButtonElement;
      const click = new Event('click', { bubbles: true })
      btnCancelarEntrada.dispatchEvent(click);
    };
    try {
      const ArrayProdutos = [];
      for (let k in linhasTabela) {
        const newProduto = {
          "codigoProdutoEntrada": linhasTabela[k].codigoProduto,
          "descricaoProdutoEntrada": linhasTabela[k].descricaoProduto,
          "precoUnitarioItemEntrada": linhasTabela[k].precoUnitProduto,
          "precoCaixaItemEntrada": linhasTabela[k].precoCaixaProduto,
          "barraCodigoEntrada": linhasTabela[k].barraCodigo,
          "qtdeUnitariaEntrada": linhasTabela[k].qtdeUnitaria,
          "qtdeCaixaEntrada": linhasTabela[k].qtdeCaixa
        }
        ArrayProdutos.push(newProduto);
      };
      const response = await api.post('entradaestoque/novaentrada', ArrayProdutos);
      toast.success(response.data.message);
      return true
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
      return false
    }
  };

  function limpaCampos() {
    const txtBarraEntrada = document.getElementById('inputBarraEntradaProduto') as HTMLInputElement;
    const txtCodigoEntrada = document.getElementById('inputCodigoEntradaProduto') as HTMLInputElement;
    const txtDescricaoEntrada = document.getElementById('inputsProdutoEntradaProduto') as HTMLInputElement;
    const txtQtdeUnitEntrada = document.getElementById('inputQtdeUnitariaEntradaProduto') as HTMLInputElement;
    const txtQtdeCaixaEntrada = document.getElementById('inputQtdeCaixaEntradaProduto') as HTMLInputElement;
    const txtCustoUnitEntrada = document.getElementById('inputCustoUnitarioEntradaProduto') as HTMLInputElement;
    const txtCustoCaixaEntrada = document.getElementById('inputCustoCaixaEntradaProduto') as HTMLInputElement;
    const txtPrecoUnitarioEntrada = document.getElementById('inputPrecoUnitarioEntradaProduto') as HTMLInputElement;
    const txtPrecoCaixaEntrada = document.getElementById('inputPrecoCaixaEntradaProduto') as HTMLInputElement;
    txtBarraEntrada.value = '';
    txtCodigoEntrada.value = '';
    txtDescricaoEntrada.value = '';
    txtQtdeUnitEntrada.value = '';
    txtQtdeCaixaEntrada.value = '';
    txtCustoUnitEntrada.value = '';
    txtCustoCaixaEntrada.value = '';
    txtPrecoUnitarioEntrada.value = '';
    txtPrecoCaixaEntrada.value = '';
  };

  function excluiItem(indexRow: number) {
    setLinhasTabela(linhasTabela.filter((_, i) => i !== indexRow))
  };

  async function consultaProduto() {
    if (inputBarraPesquisa.current?.value == '' || inputBarraPesquisa.current?.value == undefined) {
      limpaCampos();
      return;
    };
    const txtBarraEntrada = document.getElementById('inputBarraEntradaProduto') as HTMLInputElement;
    const txtCodigoEntrada = document.getElementById('inputCodigoEntradaProduto') as HTMLInputElement;
    const txtDescricaoEntrada = document.getElementById('inputsProdutoEntradaProduto') as HTMLInputElement;
    const txtQtdeUnitEntrada = document.getElementById('inputQtdeUnitariaEntradaProduto') as HTMLInputElement;
    const txtQtdeCaixaEntrada = document.getElementById('inputQtdeCaixaEntradaProduto') as HTMLInputElement;
    const txtCustoUnitEntrada = document.getElementById('inputCustoUnitarioEntradaProduto') as HTMLInputElement;
    const txtCustoCaixaEntrada = document.getElementById('inputCustoCaixaEntradaProduto') as HTMLInputElement;
    const txtPrecoUnitarioEntrada = document.getElementById('inputPrecoUnitarioEntradaProduto') as HTMLInputElement;
    const txtPrecoCaixaEntrada = document.getElementById('inputPrecoCaixaEntradaProduto') as HTMLInputElement;
    try {
      const barraPesquisa = inputBarraPesquisa.current?.value == '' ? '' : inputBarraPesquisa.current?.value;
      const objBarraPesquisa = {
        "codigoBarras": barraPesquisa
      }
      const response = await api.post('entradaestoque/consultaproduto', objBarraPesquisa);
      const produtoEntrada = response.data[0];
      if (produtoEntrada.barraCaixaProduto == barraPesquisa) {
        txtCodigoEntrada.value = produtoEntrada.codigoProduto;
        txtDescricaoEntrada.value = produtoEntrada.descricaoProduto;
        txtQtdeUnitEntrada.value = produtoEntrada.qtdeUnitaria;
        txtQtdeCaixaEntrada.value = produtoEntrada.qtdeCaixa;
        txtCustoUnitEntrada.value = produtoEntrada.custoUnitProduto;
        txtCustoCaixaEntrada.value = produtoEntrada.custoCaixaProduto;
        txtPrecoUnitarioEntrada.value = produtoEntrada.precoUnitProduto;
        txtPrecoCaixaEntrada.value = produtoEntrada.precoCaixaProduto;
      } else {
        txtCodigoEntrada.value = produtoEntrada.codigoProduto;
        txtDescricaoEntrada.value = produtoEntrada.descricaoProduto;
        txtQtdeUnitEntrada.value = produtoEntrada.qtdeUnitaria;
        txtQtdeCaixaEntrada.value = produtoEntrada.qtdeCaixa;
        txtCustoUnitEntrada.value = produtoEntrada.custoUnitProduto;
        txtCustoCaixaEntrada.value = produtoEntrada.custoCaixaProduto;
        txtPrecoUnitarioEntrada.value = produtoEntrada.precoUnitProduto;
        txtPrecoCaixaEntrada.value = produtoEntrada.precoCaixaProduto;
      };
      let produtoFormatado: TableRowProps = {
        codigoProduto: produtoEntrada.codigoProduto,
        descricaoProduto: produtoEntrada.descricaoProduto,
        qtdeUnitaria: produtoEntrada.qtdeUnitaria,
        qtdeCaixa: produtoEntrada.qtdeCaixa,
        custoUnitProduto: produtoEntrada.custoUnitProduto,
        custoCaixaProduto: produtoEntrada.custoCaixaProduto,
        precoUnitProduto: produtoEntrada.precoUnitProduto,
        precoCaixaProduto: produtoEntrada.precoCaixaProduto,
        barraCodigo: barraPesquisa,
        onRemove: () => { },
      };
      adicionaItem(produtoFormatado);
      limpaCampos();
    } catch (error) {
      console.error(error);
      toast.error('Produto não encontrado ou não cadastrado para dar entrada! Favor verificar.');
      limpaCampos();
    };
  };

  const handleLimpaTabela = () => {
    setLinhasTabela([]);
  };

  const buscaDatadeHoje = () => {
    const dataDeHoje = new Date();
    const formataData = format(dataDeHoje, 'dd/MM/yyyy');
    setDateHoje(formataData);
  };

  useEffect(() => {
    buscaDatadeHoje();
  }, []);

  return (
    <div>
      <ContentHeader title="Entrada de Produto" />
      <section className="content">
        <div className="container-fluid">
          <div className='row' style={{ marginLeft: 1 }}>
          </div>
          <div className="card">
            <div className="card-header">
              <div className='card-tools'>
                <input className='form-control' style={{ textAlign: 'end', width: 120 }} type='string' value={dateHoje} disabled={true} />
              </div>
            </div>
            <div className="card-body">
              <div className="form-group row col-sm-12">
                <div className='row col-sm-12'>
                  <label htmlFor="inputBarraEntradaProduto" className="col-sm-3">
                    Barra:
                  </label>
                </div>
                <div className='row col-sm-12'>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      ref={inputBarraPesquisa}
                      id="inputBarraEntradaProduto"
                      onKeyDown={async (event) => {
                        if (event.key === 'Enter') {
                          const inputElementPesquisa = event.target as HTMLInputElement;
                          inputElementPesquisa.blur();
                        }
                      }}
                      onBlur={async () => {
                        consultaProduto();
                      }}
                      placeholder="Barra"
                      disabled={!estaEditando}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group row col-sm-12">
                <div className="row col-sm-12">
                  <label htmlFor="inputCodigoEntradaProduto" className="col-sm-12">
                    Produto:
                  </label>
                </div>
                <div className="row col-sm-12">
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      id="inputCodigoEntradaProduto"
                      placeholder="Código"
                      disabled={true}
                    />
                  </div>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="inputsProdutoEntradaProduto"
                      placeholder="Descrição"
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group row col-sm-12">
                <div className="row col-sm-12">
                  <label htmlFor="inputQtdeUnitariaEntradaProduto" className="col-sm-3">
                    Quantidade Unitária:
                  </label>
                  <label htmlFor="inputQtdeCaixaEntradaProduto" className="col-sm-3">
                    Quantidade em Caixa:
                  </label>
                  <label htmlFor="inputCustoUnitarioEntradaProduto" className="col-sm-3">
                    Custo Unitário:
                  </label>
                  <label htmlFor="inputCustoCaixaEntradaProduto" className="col-sm-3">
                    Custo em Caixa:
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="number"
                      className="form-control text-right"
                      id="inputQtdeUnitariaEntradaProduto"
                      placeholder="0"
                      disabled={true}
                    />
                  </div>
                  <div className="col-sm-3">
                    <input
                      type="number"
                      className="form-control text-right"
                      id="inputQtdeCaixaEntradaProduto"
                      placeholder="0"
                      disabled={true}
                    />
                  </div>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control text-right"
                      id="inputCustoUnitarioEntradaProduto"
                      placeholder="R$ 0,00"
                      disabled={true}
                    />
                  </div>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control text-right"
                      id="inputCustoCaixaEntradaProduto"
                      placeholder="R$ 0,00"
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
              <label htmlFor="inputPrecoUnitarioEntradaProduto" className="col-sm-4">
                Preço Unitário:
              </label>
              <label htmlFor="inputPrecoCaixaEntradaProduto" className="col-sm-4">
                Preço em Caixa:
              </label>
              <label htmlFor="inputTipoEntrada" className="col-sm-4">
                Tipo Entrada:
              </label>
              <div className="row col-sm-12">
                <div className="col-sm-4">
                  <input
                    type="number"
                    className="form-control text-right"
                    id="inputPrecoUnitarioEntradaProduto"
                    placeholder="R$ 0,00"
                    disabled={true}
                  />
                </div>
                <div className="col-sm-4">
                  <input
                    type="number"
                    className="form-control text-right"
                    id="inputPrecoCaixaEntradaProduto"
                    placeholder="R$ 0,00"
                    disabled={true}
                  />
                </div>
                <div className="col-sm-4">
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
              <div className='row col-sm-12 mt-2' style={{ marginLeft: 1 }}>
                <button
                  className="btn btn-info"
                  id="btnModoEdicaoEntProduto"
                  onClick={() => {
                    setEstaEditando(true)
                  }}
                >
                  Modo Edição
                </button>
                <button
                  className="btn btn-info mr-1 d-none"
                  id="btnConfirmaEntradaProduto"
                  onClick={async () => {
                    if(await gravaEntrada()) {
                      handleLimpaTabela();
                      setQtdeTotCaixa(0);
                      setQtdeTotUnit(0);
                      setEstaEditando(false);
                    };
                  }}
                >
                  Confirma
                </button>
                <button
                  className="btn btn-danger d-none"
                  id="btnCancelarModoEdicaoProduto"
                  onClick={() => {
                    setEstaEditando(false);
                    limpaCampos();
                    handleLimpaTabela();
                    setQtdeTotCaixa(0);
                    setQtdeTotUnit(0);
                  }}
                >
                  Cancelar
                </button>
              </div>
              <div className='row col-sm-12 mt-2 table-sm-responsive'>
                <table id="tabelaEntradaEstoque" className="table table-sm table-bordered" style={{ whiteSpace: 'nowrap', backgroundColor: '#343a44', marginLeft: 9 }}>
                  <thead>
                    <th style={{ textAlign: 'center' }}>Produto</th>
                    <th>Descrição</th>
                    <th style={{ textAlign: 'right' }}>Qtd. Unit.</th>
                    <th style={{ textAlign: 'right' }}>Qtd. Caixas</th>
                    <th style={{ textAlign: 'right' }}>Custo Unit.</th>
                    <th style={{ textAlign: 'right' }}>Custo Caixas</th>
                    <th style={{ textAlign: 'right' }}>Preço Unit.</th>
                    <th style={{ textAlign: 'right' }}>Preço Caixas</th>
                    <th style={{ textAlign: 'center' }}>Cód. Barras</th>
                    <th style={{ textAlign: 'center' }}>Ações</th>
                  </thead>
                  <tbody id="tabelaEntradaEstoque">
                    {linhasTabela.map((linha: TableRowProps, index: number) => (
                      <TableRow
                        codigoProduto={linha.codigoProduto}
                        descricaoProduto={linha.descricaoProduto}
                        precoUnitProduto={linha.precoUnitProduto}
                        precoCaixaProduto={linha.precoCaixaProduto}
                        custoUnitProduto={linha.custoUnitProduto}
                        custoCaixaProduto={linha.custoCaixaProduto}
                        qtdeUnitaria={linha.qtdeUnitaria}
                        qtdeCaixa={linha.qtdeCaixa}
                        barraCodigo={linha.barraCodigo}
                        onRemove={() => { excluiItem(index) }}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-footer">
              <div className='row col-sm-12'>
                <label htmlFor="inputQtdeTotalUnitEntrada" className="col-sm-2">
                  Total Qtde Unitária:
                </label>
                <label htmlFor="inputQtdeTotalCaixaEntrada" className="col-sm-2">
                  Total Qtde Caixa:
                </label>
              </div>
              <div className="row col-sm-12">
                <div className="col-sm-2">
                  <input
                    type="number"
                    className="form-control text-right"
                    id="inputQtdeTotalUnitEntrada"
                    placeholder="0"
                    value={qtdeTotUnit}
                    disabled={true}
                  />
                </div>
                <div className="col-sm-2">
                  <input
                    type="number"
                    className="form-control text-right"
                    id="inputQtdeTotalCaixaEntrada"
                    placeholder="0"
                    value={qtdeTotCaixa}
                    disabled={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EntradaProduto;
