/* eslint-disable jsx-a11y/anchor-is-valid */
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
    return (
      <tr>
        <td>{codigoProduto}</td>
        <td>{descricaoProduto}</td>
        <td>{qtdeUnitaria}</td>
        <td>{qtdeCaixa}</td>
        <td>{custoUnitProduto}</td>
        <td>{custoCaixaProduto}</td>
        <td>{precoUnitProduto}</td>
        <td>{precoCaixaProduto}</td>
        <td>{barraCodigo}</td>
        <td style={{ textAlign: 'center' }}>
          <button onClick={onRemove}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </td>
      </tr>
    );
  };

  useEffect(() => {
    const btnModoEdicaoEntProduto = document.getElementById('btnModoEdicaoEntProduto');
    const btnCancelarModoEdicaoProduto = document.getElementById('btnCancelarModoEdicaoProduto');
    const btnConfirmaEntradaProduto = document.getElementById('btnConfirmaEntradaProduto');
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
      onRemove: (event: any) => { excluiItem(event.currentTarget) }
    };
    setLinhasTabela([...linhasTabela, novaLinha]);
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

  function excluiItem(indexRow: HTMLTableRowElement) {
    const tableBody = document.getElementById('tabelaTBody') as HTMLTableSectionElement;
    const indiceRemover = indexRow.rowIndex;
    tableBody.deleteRow(indiceRemover);
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
      const response = await api.post('entradaestoque/novaentrada', objBarraPesquisa);
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
        onRemove: (event) => { excluiItem(event.currentTarget) }
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
                      className="form-control"
                      id="inputQtdeUnitariaEntradaProduto"
                      placeholder="Quantidade Unit."
                      disabled={!estaEditando}
                    />
                  </div>
                  <div className="col-sm-3">
                    <input
                      type="number"
                      className="form-control"
                      id="inputQtdeCaixaEntradaProduto"
                      placeholder="Quantidade Caixa"
                      disabled={!estaEditando}
                    />
                  </div>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      id="inputCustoUnitarioEntradaProduto"
                      placeholder="Custo Unit."
                      disabled={!estaEditando}
                    />
                  </div>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      className="form-control"
                      id="inputCustoCaixaEntradaProduto"
                      placeholder="Custo em Caixa"
                      disabled={!estaEditando}
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
                    className="form-control"
                    id="inputPrecoUnitarioEntradaProduto"
                    placeholder="Preço Unit."
                    disabled={!estaEditando}
                  />
                </div>
                <div className="col-sm-4">
                  <input
                    type="number"
                    className="form-control"
                    id="inputPrecoCaixaEntradaProduto"
                    placeholder="Preço Caixa"
                    disabled={!estaEditando}
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
                  onClick={() => {
                    setEstaEditando(false);
                    handleLimpaTabela();
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
                  }}
                >
                  Cancelar
                </button>
              </div>
              <div className='row col-sm-12 mt-2'>
                <table id="tabelaEntradaEstoque" className="table table-sm table-bordered" style={{ whiteSpace: 'nowrap', backgroundColor: '#343a44', marginLeft: 9 }}>
                  <thead>
                    <th>Prod.</th>
                    <th>Descrição</th>
                    <th>Qtd. Unit.</th>
                    <th>Qtd. Caixas</th>
                    <th>Custo Unit.</th>
                    <th>Custo Caixas</th>
                    <th>Preço Unit.</th>
                    <th>Preço Caixas</th>
                    <th>Cód. Barras</th>
                    <th style={{ textAlign: 'center' }}>Ações</th>
                  </thead>
                  <tbody id="tabelaTBody">
                    {linhasTabela.map((linha: TableRowProps) => (
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
                        onRemove={(event: any) => { excluiItem(event.currentTarget) }}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-footer">
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EntradaProduto;
