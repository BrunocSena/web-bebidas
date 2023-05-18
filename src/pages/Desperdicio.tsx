/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react';
import { ContentHeader } from '@components';
import format from 'date-fns/format';
import { toast } from 'react-toastify';
import { api } from '@app/lib/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const Desperdicio = () => {
  const [dateHoje, setDateHoje] = useState('');
  const inputBarraPesquisa = useRef<HTMLInputElement>(null);
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

  function excluiItem(indexRow: number) {
    setLinhasTabela(linhasTabela.filter((_, i) => i !== indexRow));
  };

  const adicionaItem = async (produtoAdiciona: TableRowProps, codigoBarras: string) => {
    if (produtoAdiciona == undefined) {
      toast.error('Não foi encontrado item nenhum com esse código de barras! Favor verificar.')
      return;
    }
    const novaLinha: TableRowProps = {
      codigoProduto: produtoAdiciona.codigoProduto,
      descricaoProduto: produtoAdiciona.descricaoProduto,
      precoUnitProduto: produtoAdiciona.precoUnitProduto,
      precoCaixaProduto: produtoAdiciona.precoCaixaProduto,
      custoUnitProduto: produtoAdiciona.custoUnitProduto,
      custoCaixaProduto: produtoAdiciona.custoCaixaProduto,
      qtdeUnitaria: produtoAdiciona.qtdeUnitaria,
      qtdeCaixa: produtoAdiciona.qtdeCaixa,
      barraCodigo: codigoBarras,
      onRemove: () => { },
    };

    const indiceEncontrado = linhasTabela.findIndex(index => index.codigoProduto == novaLinha.codigoProduto);

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

  async function consultaProduto() {
    const inputBarraPesquisa = document.getElementById('inputBarraEntradaProduto') as HTMLInputElement;
    if (inputBarraPesquisa.value == '' || inputBarraPesquisa.value == undefined) {
      return;
    };
    try {
      const barraPesquisa = inputBarraPesquisa.value == '' ? '' : inputBarraPesquisa.value;
      const objBarraPesquisa = {
        "codigoBarras": barraPesquisa
      }
      const response = await api.post('desperdicio/selectproduto', objBarraPesquisa);
      const produtoEntrada = response.data[0];
      adicionaItem(produtoEntrada, inputBarraPesquisa.value);
      inputBarraPesquisa.value = '';
      inputBarraPesquisa.focus();
    } catch (error) {
      console.error(error);
      toast.error('Produto não encontrado ou não cadastrado para registrar desperdício! Favor verificar.');
    };
  };

  async function gravaDesperdicio () {
    
  };

  const buscaDatadeHoje = () => {
    const dataDeHoje = new Date();
    const formataData = format(dataDeHoje, 'dd/MM/yyyy');
    setDateHoje(formataData);
  };

  const handleLimpaTabela = () => {
    setLinhasTabela([]);
  };

  useEffect(() => {
    const btnConfirmaDesp = document.getElementById('btnConfirmaDesp') as HTMLButtonElement;
    if (linhasTabela.length > 0) {
      btnConfirmaDesp.classList.remove('d-none');
    } else {
      btnConfirmaDesp.classList.add('d-none');
    }
  }, [linhasTabela]);

  useEffect(() => {
    buscaDatadeHoje();
    inputBarraPesquisa.current?.focus();
  }, []);

  return (
    <div>
      <ContentHeader title="Desperdício de Produto" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title"><strong> Cadastro de Desperdício</strong></h3>
              <div className="card-tools">
                <input className='form-control' style={{ textAlign: 'end', width: 120, height: 25 }} type='string' value={dateHoje} disabled={true} />
              </div>
            </div>
            <div className="card-body">
              <div className='row col-sm-12'>
                <label htmlFor="inputBarraEntradaProduto" style={{ textAlign: 'center', marginTop: 5, marginLeft: -20 }} className="col-sm-1">
                  Barra:
                </label>
                <input
                  type="text"
                  className="form-control col-sm-3"
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
                />
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
              <button
                className="btn btn-info d-none"
                id="btnConfirmaDesp"
                onClick={() => {
                }}
              >
                Confirmar Desp.
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Desperdicio;
