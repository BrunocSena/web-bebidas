/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from 'react';
import { ContentHeader } from '@components';
import { format } from 'date-fns';
import { api } from '@app/lib/axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const SaidaProduto = () => {
  const [estaEditando, setEstaEditando] = useState(false);
  const [dateHoje, setDateHoje] = useState('');
  const inputBarraPesquisa = useRef<HTMLInputElement>(null);
  const [qtdeTotUnit, setQtdeTotUnit] = useState(0);
  const [qtdeTotCaixa, setQtdeTotCaixa] = useState(0);
  const [linhasTabela, setLinhasTabela] = useState<TableRowProps[]>([]);
  let contadorId = 0;

  interface TableRowProps {
    codigoProduto: string;
    descricaoProduto: string;
    qtdeUnitaria: number;
    qtdeCaixa: number;
    barraCodigo: string;
    onRemove: (event: any) => void;
  };

  const TableRow = ({
    codigoProduto,
    descricaoProduto,
    qtdeUnitaria,
    qtdeCaixa,
    barraCodigo,
    onRemove
  }: TableRowProps) => {
    const idtxtQtdeUnitario = 'txtQuantidadeUnitario' + String(contadorId);
    const idtxtQtdeCaixa = 'txtQuantidadeCaixa' + String(contadorId);
    contadorId = contadorId + 1;
    return (
      <tr>
        <td style={{ textAlign: 'center' }}>{codigoProduto}</td>
        <td>{descricaoProduto}</td>
        <td id={idtxtQtdeUnitario} style={{ textAlign: 'right' }}>{qtdeUnitaria}</td>
        <td id={idtxtQtdeCaixa} style={{ textAlign: 'right' }}>{qtdeCaixa}</td>
        <td style={{ textAlign: 'center' }}>{barraCodigo}</td>
        <td style={{ textAlign: 'center' }}>
          <button onClick={onRemove}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </td>
      </tr>
    );
  };

  const handleLimpaTabela = () => {
    setLinhasTabela([]);
  };

  async function gravaSaida() {
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
          "barraCodigoEntrada": linhasTabela[k].barraCodigo,
          "qtdeUnitariaEntrada": linhasTabela[k].qtdeUnitaria,
          "qtdeCaixaEntrada": linhasTabela[k].qtdeCaixa
        }
        ArrayProdutos.push(newProduto);
      };
      const response = await api.post('saidaestoque/novasaida', ArrayProdutos);
      toast.success(response.data.message);
      return true
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
      return false
    }
  };

  useEffect(() => {
    const btnModoEdicaoSaidaProduto = document.getElementById('btnModoEdicaoSaidaProduto') as HTMLButtonElement;
    const btnCancelarModoEdicaoProduto = document.getElementById('btnCancelarModoEdicaoProduto') as HTMLButtonElement;
    const btnConfirmaModoEdicaoProduto = document.getElementById('btnConfirmaModoEdicaoProduto') as HTMLButtonElement;
    const inputPesquisa = document.getElementById('inputBarraSaidaProduto') as HTMLInputElement;
    if (!estaEditando) {
      btnModoEdicaoSaidaProduto?.classList.remove('d-none');
      btnCancelarModoEdicaoProduto?.classList.add('d-none');
      btnConfirmaModoEdicaoProduto?.classList.add('d-none');
    } else {
      btnModoEdicaoSaidaProduto?.classList.add('d-none');
      btnCancelarModoEdicaoProduto?.classList.remove('d-none');
      btnConfirmaModoEdicaoProduto?.classList.remove('d-none');
      inputPesquisa.focus();
    }
  }, [estaEditando]);

  function limpaCampos() {
    const txtCodigoProdSaida = document.getElementById('inputCodigoSaidaProduto') as HTMLInputElement;
    const txtDescProdSaida = document.getElementById('inputsProdutoSaida') as HTMLInputElement;
    const txtQtdeUnitSaida = document.getElementById('inputQtdeUnitariaSaidaProduto') as HTMLInputElement;
    const txtQtdeCaixaSaida = document.getElementById('inputQtdeCaixaSaidaProduto') as HTMLInputElement;
    const txtBarraSaida = document.getElementById('inputBarraSaidaProduto') as HTMLInputElement;
    txtCodigoProdSaida.value = '';
    txtDescProdSaida.value = '';
    txtQtdeUnitSaida.value = '';
    txtQtdeCaixaSaida.value = '';
    txtBarraSaida.value = '';
  };

  const adicionaItem = async (produtoAdiciona: TableRowProps) => {
    const novaLinha: TableRowProps = {
      codigoProduto: produtoAdiciona.codigoProduto,
      descricaoProduto: produtoAdiciona.descricaoProduto,
      qtdeUnitaria: produtoAdiciona.qtdeUnitaria,
      qtdeCaixa: produtoAdiciona.qtdeCaixa,
      barraCodigo: produtoAdiciona.barraCodigo,
      onRemove: () => { },
    };

    const indiceEncontrado = linhasTabela.findIndex(index => index.barraCodigo == novaLinha.barraCodigo);

    if (indiceEncontrado == -1) {
      setLinhasTabela([...linhasTabela, novaLinha]);
      setQtdeTotCaixa(qtdeTotCaixa + (novaLinha.qtdeCaixa == null ? 0 : novaLinha.qtdeCaixa));
      setQtdeTotUnit(qtdeTotUnit + (novaLinha.qtdeUnitaria == null ? 0 : novaLinha.qtdeUnitaria));
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

  function excluiItem(indexRow: number) {
    setLinhasTabela(linhasTabela.filter((_, i) => i !== indexRow))
  };

  async function consultaProduto() {
    if (inputBarraPesquisa.current?.value == '' || inputBarraPesquisa.current?.value == undefined) {
      limpaCampos();
      return;
    };
    const txtBarraEntrada = document.getElementById('inputBarraSaidaProduto') as HTMLInputElement;
    const txtCodigoEntrada = document.getElementById('inputCodigoSaidaProduto') as HTMLInputElement;
    const txtDescricaoEntrada = document.getElementById('inputsProdutoSaida') as HTMLInputElement;
    const txtQtdeUnitEntrada = document.getElementById('inputQtdeUnitariaSaidaProduto') as HTMLInputElement;
    const txtQtdeCaixaEntrada = document.getElementById('inputQtdeCaixaSaidaProduto') as HTMLInputElement;
    try {
      const barraPesquisa = inputBarraPesquisa.current?.value == '' ? '' : inputBarraPesquisa.current?.value;
      const objBarraPesquisa = {
        "codigoBarras": barraPesquisa
      }
      const response = await api.post('saidaestoque/consultaprodutosaida', objBarraPesquisa);
      const produtoSaida = response.data[0];
      if (produtoSaida.barraCaixaProduto == barraPesquisa) {
        txtCodigoEntrada.value = produtoSaida.codigoProduto;
        txtDescricaoEntrada.value = produtoSaida.descricaoProduto;
        txtQtdeUnitEntrada.value = produtoSaida.qtdeUnitaria;
        txtQtdeCaixaEntrada.value = produtoSaida.qtdeCaixa;
      } else {
        txtCodigoEntrada.value = produtoSaida.codigoProduto;
        txtDescricaoEntrada.value = produtoSaida.descricaoProduto;
        txtQtdeUnitEntrada.value = produtoSaida.qtdeUnitaria;
        txtQtdeCaixaEntrada.value = produtoSaida.qtdeCaixa;
      };
      let produtoFormatado: TableRowProps = {
        codigoProduto: produtoSaida.codigoProduto,
        descricaoProduto: produtoSaida.descricaoProduto,
        qtdeUnitaria: produtoSaida.qtdeUnitaria,
        qtdeCaixa: produtoSaida.qtdeCaixa,
        barraCodigo: barraPesquisa,
        onRemove: () => { },
      };
      adicionaItem(produtoFormatado);
      limpaCampos();
      inputBarraPesquisa.current?.focus();
    } catch (error) {
      console.error(error);
      toast.error('Produto não encontrado ou não cadastrado para dar saída! Favor verificar.');
      limpaCampos();
      inputBarraPesquisa.current?.focus();
    };
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
      <ContentHeader title="Saída de Produto" />
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
                      id="inputBarraSaidaProduto"
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
                  <div className="col-sm-6">
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
                  <div className='row col-sm-12'>
                    <label htmlFor="inputQtdeUnitariaSaidaProduto" className="col-sm-3">
                      Quantidade Unitária:
                    </label>
                    <label htmlFor="inputQtdeCaixaSaidaProduto" className="col-sm-3">
                      Quantidade em Caixa:
                    </label>
                    <label htmlFor="inputTipoSaida" className="col-sm-3">
                      Tipo Saída:
                    </label>
                  </div>
                  <div className='row col-sm-12'>
                    <div className="col-sm-3">
                      <input
                        type="number"
                        className="form-control text-right"
                        id="inputQtdeUnitariaSaidaProduto"
                        placeholder="0"
                        disabled={true}
                      />
                    </div>
                    <div className="col-sm-3">
                      <input
                        type="number"
                        className="form-control text-right"
                        id="inputQtdeCaixaSaidaProduto"
                        placeholder="0"
                        disabled={true}
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
              </div>
              <div className="form-group row col-sm-12" style={{ marginLeft: 1 }}>
                <div className='row col-sm-12'>
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
                    className="btn btn-info mr-1 d-none"
                    id="btnConfirmaModoEdicaoProduto"
                  onClick={async () => {
                    if (await gravaSaida()) {
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
              </div>
              <div className='row col-sm-12 mt-2 table-sm-responsive'>
                <table id="tabelaEntradaEstoque" className="table table-sm table-bordered" style={{ whiteSpace: 'nowrap', backgroundColor: '#343a44', marginLeft: 9 }}>
                  <thead>
                    <th style={{ textAlign: 'center' }}>Produto</th>
                    <th>Descrição</th>
                    <th style={{ textAlign: 'right' }}>Qtd. Unit.</th>
                    <th style={{ textAlign: 'right' }}>Qtd. Caixas</th>
                    <th style={{ textAlign: 'center' }}>Cód. Barras</th>
                    <th style={{ textAlign: 'center' }}>Ações</th>
                  </thead>
                  <tbody id="tabelaEntradaEstoque">
                    {linhasTabela.map((linha: TableRowProps, index: number) => (
                      <TableRow
                        codigoProduto={linha.codigoProduto}
                        descricaoProduto={linha.descricaoProduto}
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

export default SaidaProduto;
