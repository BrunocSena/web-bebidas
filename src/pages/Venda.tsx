/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { HTMLProps, useEffect, useRef, useState } from 'react';
import { ContentHeader } from '@components';
import { Nav } from 'react-bootstrap';
import { format } from 'date-fns'

const Venda = () => {
  const inputDescricaoItem = useRef<HTMLInputElement>(null);
  const inputPrecoUnitarioItem = useRef<HTMLInputElement>(null);
  const inputPrecoCaixaItem = useRef<HTMLInputElement>(null);
  const inputBarraProduto = useRef<HTMLInputElement>(null);
  const qtdeUnitariaDoItem = useRef<HTMLInputElement>(null);
  const qtdeCaixaDoItem = useRef<HTMLInputElement>(null);
  const descontoValorDoItem = useRef<HTMLInputElement>(null);
  const descontoPorcentagemDoItem = useRef<HTMLInputElement>(null);
  const acrescimoValorDoItem = useRef<HTMLInputElement>(null);
  const acrescimoPorcentagemDoItem = useRef<HTMLInputElement>(null);
  const totalDescontoValorVenda = useRef<HTMLInputElement>(null);
  const totalDescontoPercVenda = useRef<HTMLInputElement>(null);
  const totalAcrescimoValorVenda = useRef<HTMLInputElement>(null);
  const totalAcrescimoPercVenda = useRef<HTMLInputElement>(null);
  const [totalValorLiqTudo, setTotalValorLiq] = useState(0);
  const [totalDescontoTudo, setTotalValorDesc] = useState(0);
  const [totalAcrescimo, setTotalAcrescimo] = useState(0);
  const [totalQtdeUnitTudo, setTotalQtdeUnit] = useState(0);
  const [totalQtdeCaixasTudo, setTotalQtdeCaixas] = useState(0);
  const [totalValorBrutoTudo, setTotalValorBruto] = useState(0);
  const [totalValorBrutoVenda, setTotalValorBrutoVendaText] = useState("");
  const [totalValorLiquidoVenda, setTotalValorLiquidoVendaText] = useState("");
  const [totalValorBrutoValor, setTotalValorBrutoVendaValor] = useState(0);
  const [totalValorLiquidoValor, setTotaLValorLiquidoVendaValor] = useState(0);
  const [valorAntigoDescVenda, setValorAntigoDescVenda] = useState(0);
  const [percAntigoDescVenda, setPercAntigoDescVenda] = useState(0);
  const [valorAntigoAcrescVenda, setValorAntigoAcrescVenda] = useState(0);
  const [percAntigoAcrescVenda, setPercAntigoAcrescVenda] = useState(0);
  const [indiceLinhaExclusao, setIndiceLinhaExclusao] = useState('');
  const [activeTab, setActiveTab] = useState("tab1");
  const [dateHoje, setDateHoje] = useState('');

  const verificaSeTotalDescontoValorVendaTaVazio = () => {
    const vlrDescEhZero = totalDescontoValorVenda.current?.value == '0';

    if (vlrDescEhZero) {
      const inputVlrDescVenda = document.getElementById('txtTotalDescontoValorVenda') as HTMLInputElement;
      inputVlrDescVenda.value = '';
    };
  };

  const verificaSeTotalDescontoPercVendaTaVazio = () => {
    const percDescEhZero = totalDescontoPercVenda.current?.value == '0';

    if (percDescEhZero) {
      const inputPercDescVenda = document.getElementById('txtTotalDescontoPercVenda') as HTMLInputElement;
      inputPercDescVenda.value = '';
    };
  };

  const verificaSeTotalAcrescValorVendaTaVazio = () => {
    const vlrAcrescEhZero = totalAcrescimoValorVenda.current?.value == '0';

    if (vlrAcrescEhZero) {
      const inputVlrAcrescVenda = document.getElementById('txtTotalAcrescimoValorVenda') as HTMLInputElement;
      inputVlrAcrescVenda.value = '';
    };
  };

  const verificaSeTotalAcrescPercVendaTaVazio = () => {
    const percAcrescEhZero = totalAcrescimoPercVenda.current?.value == '0';

    if (percAcrescEhZero) {
      const inputPercAcrescVenda = document.getElementById('txtTotalAcrescimoPercVenda') as HTMLInputElement;
      inputPercAcrescVenda.value = '';
    };
  };

  const verificaQtdeUnitItemTaVazio = () => {
    const qtdeUnitariaItemEhZero = qtdeUnitariaDoItem.current?.value == '0';

    if (qtdeUnitariaItemEhZero) {
      const inputQtdeUnitariaItem = document.getElementById('txtQtdeUnitaria') as HTMLInputElement;
      inputQtdeUnitariaItem.value = '';
    };
  };

  const verificaQtdeCaixaItemTaVazio = () => {
    const qtdeCaixaItemEhZero = qtdeCaixaDoItem.current?.value == '0';

    if (qtdeCaixaItemEhZero) {
      const inputQtdeCaixaItem = document.getElementById('txtQtdeCaixas') as HTMLInputElement;
      inputQtdeCaixaItem.value = '';
    };
  };

  const verificaDescontoValorTaVazio = () => {
    const descValorEhZero = descontoValorDoItem.current?.value == '0';

    if (descValorEhZero) {
      const inputDescValor = document.getElementById('txtDescontoValor') as HTMLInputElement;
      inputDescValor.value = '';
    };
  }

  const verificaDescontoPercTaVazio = () => {
    const descPercEhZero = descontoPorcentagemDoItem.current?.value == '0';

    if (descPercEhZero) {
      const inputDescPerc = document.getElementById('txtDescontoPorcentagem') as HTMLInputElement;
      inputDescPerc.value = '';
    };
  }

  const verificaAcrescValorTaVazio = () => {
    const acrescValorEhZero = acrescimoValorDoItem.current?.value == '0';

    if (acrescValorEhZero) {
      const inputAcrescValor = document.getElementById('txtAcrescimoValor') as HTMLInputElement;
      inputAcrescValor.value = '';
    };
  }

  const verificaAcrescPercTaVazio = () => {
    const acrescPercEhZero = acrescimoPorcentagemDoItem.current?.value == '0';

    if (acrescPercEhZero) {
      const inputAcrescPerc = document.getElementById('txtAcrescimoPorcentagem') as HTMLInputElement;
      inputAcrescPerc.value = '';
    };
  }

  const handleTabSelect = (selectedTab: any) => {
    if (selectedTab) {
      if(totalValorLiqTudo <= 0) {
        alert('Não tem nenhum item na venda! Verifique.');
        return;
      } else {
        setActiveTab(selectedTab);
      }
    };
  };

  async function descontaValorAoExcluirItem () {

  };

  const handleBlurDescontoVenda = () => {
    const desconto = totalDescontoValorVenda.current?.value == '' ? 0 : parseFloat(totalDescontoValorVenda.current?.value ?? '0');
    const varConformeValorDescMuda = (totalValorLiquidoValor + valorAntigoDescVenda);
    setValorAntigoDescVenda(desconto);
    const totComDescontoVenda = (varConformeValorDescMuda - desconto); 
    setTotaLValorLiquidoVendaValor(+totComDescontoVenda);
    setTotalValorLiquidoVendaText(`R$ `+totComDescontoVenda.toFixed(2).replace('.', ','));
  }

  const handleBlurDescontoVendaPerc = () => {
    const percDesc = totalDescontoPercVenda.current?.value == '' ? 0 : parseFloat(totalDescontoPercVenda.current?.value ?? '0');
    const varConformePercDescMuda = (totalValorLiquidoValor + percAntigoDescVenda);
    const totalDesconto = (varConformePercDescMuda * (percDesc/100));
    setPercAntigoDescVenda(totalDesconto);
    const totalComDescontoVendaPerc = (varConformePercDescMuda - totalDesconto);
    setTotaLValorLiquidoVendaValor(+totalComDescontoVendaPerc);
    setTotalValorLiquidoVendaText(`R$ `+ totalComDescontoVendaPerc.toFixed(2).replace('.', ','));
  }

  const handleBlurAcrescimoVenda = () => {
    const acrescimo = totalAcrescimoValorVenda.current?.value == '' ? 0 : parseFloat(totalAcrescimoValorVenda.current?.value ?? '0');
    const varConformeValorAcrescMuda = (totalValorLiquidoValor - valorAntigoAcrescVenda);
    setValorAntigoAcrescVenda(acrescimo);
    const totComAcrescimoVenda = (varConformeValorAcrescMuda + acrescimo); 
    setTotaLValorLiquidoVendaValor(+totComAcrescimoVenda);
    setTotalValorLiquidoVendaText(`R$ `+totComAcrescimoVenda.toFixed(2).replace('.', ','));
  }

  const handleBlurAcrescimoVendaPerc = () => {
    const percAcresc = totalAcrescimoPercVenda.current?.value == '' ? 0 : parseFloat(totalAcrescimoPercVenda.current?.value ?? '0');
    const varConformePercAcrescMuda = (totalValorLiquidoValor - percAntigoAcrescVenda);
    const totalAcrescimoPerc = (varConformePercAcrescMuda * (percAcresc/100));
    setPercAntigoAcrescVenda(totalAcrescimoPerc);
    const totalComAcrescimoVendaPerc = (varConformePercAcrescMuda + totalAcrescimoPerc);
    setTotaLValorLiquidoVendaValor(+totalComAcrescimoVendaPerc);
    setTotalValorLiquidoVendaText(`R$ `+ totalComAcrescimoVendaPerc.toFixed(2).replace('.', ','));
  }

  function excluiRowDataTable () {
    if(indiceLinhaExclusao == '') {
      alert('Nenhum item para retirar da venda!');
      return;
    }
    const meuTableBodyVenda = document.getElementById('tabelaTBody') as HTMLTableSectionElement;
    const linhaSelecionada = document.getElementsByClassName('selected')[0] as HTMLTableRowElement | undefined;

    if (linhaSelecionada) {
      const valorARetirar = linhaSelecionada.cells[5].textContent;
      const valorTotVenda = (totalValorLiquidoValor - Number(valorARetirar));
      setTotaLValorLiquidoVendaValor(+valorTotVenda);
      setTotalValorLiquidoVendaText(`R$ `+ valorTotVenda.toFixed(2).replace('.', ',0'));
    }

    meuTableBodyVenda.deleteRow(parseInt(indiceLinhaExclusao));

    setIndiceLinhaExclusao('')
  };

  function addInfoDataTable(data: any[]) {

    const myTableItensVenda = document.getElementById('tabelaItensVenda') as HTMLTableElement;
    const myTableItensVendaBody = document.getElementById('tabelaTBody') as HTMLTableSectionElement;

    const sData = myTableItensVendaBody.insertRow();
    data.forEach((itemVenda) => {
      const itemNovo = sData.insertCell();
      itemNovo.innerHTML = itemVenda;
    });

    sData.addEventListener('click', (event) => {
      const linhaSelecionada = event.currentTarget as HTMLTableRowElement;
      const indiceLinhaSelecionada = linhaSelecionada.rowIndex;
      const linhaQueJaEstavaSelecionada = document.querySelector('.selected');

      if (linhaQueJaEstavaSelecionada) {
        linhaQueJaEstavaSelecionada.classList.remove('selected');
      };

      linhaSelecionada.classList.add('selected');
      linhaSelecionada.style.backgroundColor = 'blue';
      setIndiceLinhaExclusao(String(indiceLinhaSelecionada));
    });

    myTableItensVenda.appendChild(myTableItensVendaBody)
  };

  async function atualizaTotais(totalAcresc: number, totalDesconto: number, totalValorBruto: number, totalValorLiq: number, totalQtdeUnit: number, totalQtdeCaixas: number) {
    const totListaItensAcresc = (totalAcresc + totalAcrescimo);
    const totListaItensDesc = (totalDesconto + totalDescontoTudo);
    const totValorBruto = (totalValorBruto + totalValorBrutoTudo);
    const totValorLiq = (totalValorLiq + totalValorLiqTudo);
    const totQtdeUnit = (totalQtdeUnit + totalQtdeUnitTudo);
    const totQtdeCaixas = (totalQtdeCaixas + totalQtdeCaixasTudo);
    setTotalQtdeUnit(+totQtdeUnit);
    setTotalQtdeCaixas(+totQtdeCaixas);
    setTotalValorBruto(+totValorBruto);
    setTotalAcrescimo(+totListaItensAcresc);
    setTotalValorDesc(+totListaItensDesc);
    setTotalValorLiq(+totValorLiq);
  };

  const adicionaItem = async () => {
    const descricaoDoItem = inputDescricaoItem.current?.value;
    const precoUnitarioDoItem = inputPrecoUnitarioItem.current?.value == '' ? 0 : parseFloat(inputPrecoUnitarioItem.current?.value ?? '0');
    const qtdeUnitariaItem = qtdeUnitariaDoItem.current?.value == '' ? 0 : parseFloat(qtdeUnitariaDoItem.current?.value ?? '0');
    const qtdeCaixaItem = qtdeCaixaDoItem.current?.value == '' ? 0 : parseFloat(qtdeCaixaDoItem.current?.value ?? '0');

    if (qtdeUnitariaItem == 0 && qtdeCaixaItem == 0) {
      alert('Produto não existe quantidade informada! Verifique.');
      return;
    };

    const precoCaixaDoItem = inputPrecoCaixaItem.current?.value == '' ? 0 : parseFloat(inputPrecoCaixaItem.current?.value ?? '0');
    const descontoPorcentagemItem = descontoPorcentagemDoItem.current?.value == '' ? 0 : parseFloat(descontoPorcentagemDoItem.current?.value ?? '0');
    const descontoValorItem = descontoValorDoItem.current?.value == '' ? 0 : parseFloat(descontoValorDoItem.current?.value ?? '0');
    const acrescValorItem = acrescimoValorDoItem.current?.value == '' ? 0 : parseFloat(acrescimoValorDoItem.current?.value ?? '0');
    const acrescPercItem = acrescimoPorcentagemDoItem.current?.value == '' ? 0 : parseFloat(acrescimoPorcentagemDoItem.current?.value ?? '0');
    const valorTotDoItem = await calculaValorTotal(qtdeUnitariaItem, precoUnitarioDoItem, qtdeCaixaItem, precoCaixaDoItem, descontoPorcentagemItem, descontoValorItem, acrescValorItem, acrescPercItem);
    const maisItem = [descricaoDoItem, qtdeUnitariaItem, qtdeCaixaItem, precoUnitarioDoItem.toFixed(2).replace('.', ','), precoCaixaDoItem.toFixed(2).replace('.', ','), valorTotDoItem.toFixed(2).replace('.', ',')];
    addInfoDataTable(maisItem)
  };

  async function calculaValorTotal(qtdeUnitaria: number,
    precoUnitarioItem: number,
    qtdeCaixas: number,
    precoCaixaItem: number,
    descontoPorcentagemItem: number,
    descontoValorItem: number,
    acrescimoValorItem: number,
    acrescimoPorcenItem: number) {
    const totSemDescontoUnitario = (qtdeUnitaria * precoUnitarioItem);
    const totSemDescontoCaixa = (qtdeCaixas * precoCaixaItem);
    const totSemDesconto = (totSemDescontoCaixa + totSemDescontoUnitario);
    const totValorDescPorcentagemItem = (totSemDesconto * (descontoPorcentagemItem / 100));
    const totValorAcrescPorcentagemItem = (totSemDesconto * (acrescimoPorcenItem / 100));
    const totAcrescimo = (acrescimoValorItem + totValorAcrescPorcentagemItem);
    const totDesconto = (descontoValorItem + totValorDescPorcentagemItem);
    const totValorComDesconto = ((totSemDesconto + totAcrescimo) - totDesconto);
    await atualizaTotais(totAcrescimo, totDesconto, totSemDesconto, totValorComDesconto, qtdeUnitaria, qtdeCaixas);
    const totTodosItensValorBruto = (totValorComDesconto + totalValorBrutoValor);
    const totTodosItensValorLiquido = (totValorComDesconto + totalValorLiquidoValor);
    
    setTotaLValorLiquidoVendaValor(totTodosItensValorLiquido);
    setTotalValorBrutoVendaValor(totTodosItensValorBruto);
    setTotalValorBrutoVendaText(`R$ `+totTodosItensValorBruto.toFixed(2).replace('.', ','));
    setTotalValorLiquidoVendaText(`R$ `+totTodosItensValorLiquido.toFixed(2).replace('.', ','));

    return totValorComDesconto;
  };

  const buscaDatadeHoje = () => {
    const dataDeHoje = new Date();
    const formataData = format(dataDeHoje, 'dd/MM/yyyy');
    setDateHoje(formataData);
  };

  useEffect(() => {
    buscaDatadeHoje();
  }, [])

  return (
    <div>
      <ContentHeader title="Venda" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title pt-2"><strong>Venda: 1</strong></h3>
              <div className='card-tools'>
                <input className='form-control' style={{textAlign: 'end', width: 120}} type='string' value={ dateHoje } disabled={true} />
              </div>
            </div>
            <div className="card-body">
              {activeTab === 'tab1' && (
                <div>
                  <div className="form-group row col-sm-12">
                    <div className="row col-sm-12">
                      <label htmlFor='inputCodigoProd' className='col-sm-3'>
                        Barra:
                      </label>
                      <label htmlFor='inputCodigoProd' className='col-sm-9'>
                        Produto:
                      </label>
                      <div className='col-sm-3'>
                        <input
                          className='form-control'
                          value="987654321"
                          ref={inputBarraProduto}
                          id="txtBarraProduto"
                          type="text" />
                      </div>
                      <div className='col-sm-9'>
                        <input className='form-control' ref={inputDescricaoItem} id="txtDescricaoProduto" type="text" />
                      </div>
                    </div>
                  </div>
                  <div className="form-group row col-sm-12">
                    <div className="row col-sm-12">
                      <label htmlFor='txtQtdeUnitaria' className='col-sm-3'>
                        Qtde Unitária:
                      </label>
                      <label htmlFor='txtQtdeCaixas' className='col-sm-3'>
                        Qtde em Caixas:
                      </label>
                      <label htmlFor='txtPrecoUnitario' className='col-sm-3'>
                        Preço Unitário:
                      </label>
                      <label htmlFor='txtPrecoCaixas' className='col-sm-3'>
                        Preço Caixa:
                      </label>
                      <div className='col-sm-3'>
                        <input className='form-control' onFocus={verificaQtdeUnitItemTaVazio} ref={qtdeUnitariaDoItem} id="txtQtdeUnitaria" type="number" />
                      </div>
                      <div className='col-sm-3'>
                        <input className='form-control' onFocus={verificaQtdeCaixaItemTaVazio} ref={qtdeCaixaDoItem} id="txtQtdeCaixas" type="number" />
                      </div>
                      <div className='col-sm-3'>
                        <input className='form-control' disabled={true} ref={inputPrecoUnitarioItem} value="10" id="txtPrecoUnitario" type="number" />
                      </div>
                      <div className='col-sm-3'>
                        <input className='form-control' disabled={true} ref={inputPrecoCaixaItem} value="60" id="txtPrecoCaixas" type="number" />
                      </div>
                    </div>
                  </div>
                  <div className='form-group row col-sm-12'>
                    <div className='row col-sm-12'>
                      <label htmlFor='txtDescontoValor' className='col-sm-3'>
                        Desconto(R$):
                      </label>
                      <label htmlFor='txtDescontoPorcentagem' className='col-sm-3'>
                        Desconto(%):
                      </label>
                      <label htmlFor='txtAcrescimoValor' className='col-sm-3'>
                        Acréscimo(R$):
                      </label>
                      <label htmlFor='txtAcrescimoPorcentagem' className='col-sm-3'>
                        Acréscimo(%):
                      </label>
                      <div className='col-sm-3'>
                        <input className='form-control mt-1' onFocus={verificaDescontoValorTaVazio} ref={descontoValorDoItem} id="txtDescontoValor" type="number" />
                      </div>
                      <div className='col-sm-3'>
                        <input className='form-control mt-1' onFocus={verificaDescontoPercTaVazio} ref={descontoPorcentagemDoItem} id="txtDescontoPorcentagem" type="number" />
                      </div>
                      <div className='col-sm-3'>
                        <input className='form-control mt-1' onFocus={verificaAcrescValorTaVazio} ref={acrescimoValorDoItem} id="txtAcrescimoValor" type="number" />
                      </div>
                      <div className='col-sm-3'>
                        <input className='form-control mt-1' onFocus={verificaAcrescPercTaVazio} ref={acrescimoPorcentagemDoItem} id="txtAcrescimoPorcentagem" type="number" />
                      </div>
                    </div>
                  </div>
                  <div className="form-group row col-sm-12">
                    <div className="row col-sm-12">
                      <div className='col-sm-6'>
                        <button
                          className="btn btn-info btn-lg pb-1 mr-2"
                          onClick={async () => { adicionaItem() }}
                          id="btnAdicionaItem">
                          Adicionar Item
                        </button>
                        <button className="btn btn-danger btn-lg pb-1" 
                        onClick={async () => { excluiRowDataTable() }}
                        id="btnExcluiItem">Excluir Item</button>
                      </div>
                    </div>
                  </div>
                  <table id="tabelaItensVenda" className="table table-lg-responsive table-bordered" style={{ whiteSpace: 'nowrap', backgroundColor: '#343a44' }}>
                    <thead>
                      <th>Produto</th>
                      <th>Qtde Unit.</th>
                      <th>Qtde Caixas</th>
                      <th>Preço Unit.</th>
                      <th>Preço Caixas</th>
                      <th>Valor Total</th>
                    </thead>
                    <tbody id="tabelaTBody">
                      <tr>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === "tab2" && (
                <div>
                  <div className="form-group row col-sm-12">
                    <div className="row col-sm-12">
                      <label className='col-sm-3'>
                      </label>
                      <label htmlFor='txtTotalQtdeUnitariaVendataria' className='col-sm-3'>
                        Total da Qtde Unitária:
                      </label>
                      <label htmlFor='txtTotalQtdeCaixaVenda' className='col-sm-3'>
                        Total da Qtde em Caixas:
                      </label>
                      <label className='col-sm-3'>
                      </label>
                      <div className='col-sm-3'>
                      </div>
                      <div className='col-sm-3'>
                        <input className='form-control' disabled={true} value={totalQtdeUnitTudo} id="txtTotalQtdeUnitariaVenda" type="number" />
                      </div>
                      <div className='col-sm-3'>
                        <input className='form-control' disabled={true} value={totalQtdeCaixasTudo} id="txtTotalQtdeCaixaVenda" type="number" />
                      </div>
                      <div className='col-sm-3'>
                      </div>
                    </div>
                  </div>
                  <div className='form-group row col-sm-12'>
                    <div className='row col-sm-12'>
                      <label htmlFor='txtTotalDescontoValorVenda' className='col-sm-3'>
                        Desconto Venda(R$):
                      </label>
                      <label htmlFor='txtTotalDescontoPercVenda' className='col-sm-3'>
                        Desconto Venda(%):
                      </label>
                      <label htmlFor='txtTotalAcrescimoValorVenda' className='col-sm-3'>
                        Acréscimo Venda(R$):
                      </label>
                      <label htmlFor='txtTotalAcrescimoPercVenda' className='col-sm-3'>
                        Acréscimo Venda(%):
                      </label>
                      <div className='col-sm-3'>
                        <input className='form-control mt-1' onFocus={verificaSeTotalDescontoValorVendaTaVazio} onChange={handleBlurDescontoVenda} ref={totalDescontoValorVenda} id="txtTotalDescontoValorVenda" type="number" />
                      </div>
                      <div className='col-sm-3'>
                        <input className='form-control mt-1' onFocus={verificaSeTotalDescontoPercVendaTaVazio} onChange={handleBlurDescontoVendaPerc} ref={totalDescontoPercVenda} id="txtTotalDescontoPercVenda" type="number" />
                      </div>
                      <div className='col-sm-3'>
                        <input className='form-control mt-1' onFocus={verificaSeTotalAcrescValorVendaTaVazio} onChange={handleBlurAcrescimoVenda} ref={totalAcrescimoValorVenda} id="txtTotalAcrescimoValorVenda" type="number" />
                      </div>
                      <div className='col-sm-3'>
                        <input className='form-control mt-1' onFocus={verificaSeTotalAcrescPercVendaTaVazio} onChange={handleBlurAcrescimoVendaPerc} ref={totalAcrescimoPercVenda} id="txtTotalAcrescimoPercVenda" type="number" />
                      </div>
                    </div>
                  </div>
                  <div className="form-group row col-sm-12">
                    <div className="row col-sm-12">
                      <label className='col-sm-3'>
                      </label>
                      <label htmlFor='txtTotalVendaBruto' className='col-sm-3'>
                        Total da Venda Bruto:
                      </label>
                      <label htmlFor='txtTotalVendaLiquido' className='col-sm-3'>
                        Total da Venda Líquido:
                      </label>
                      <label className='col-sm-3'>
                      </label>
                      <div className='col-sm-3'>
                      </div>
                      <div className='col-sm-3'>
                        <input className='form-control' disabled={true} value={totalValorBrutoVenda} id="txtTotalVendaBruto" type="string" />
                      </div>
                      <div className='col-sm-3'>
                        <input className='form-control' disabled={true} value={totalValorLiquidoVenda} id="txtTotalVendaLiquido" type="string" />
                      </div>
                      <div className='col-sm-3'>
                      </div>
                    </div>
                  </div>
                  <div className="form-group row col-sm-12">
                    <div className="row col-sm-12">
                      <div className="col-sm-3">
                      </div>
                      <div className='col-sm-6 ml-4'>
                        <button
                          className="btn btn-info btn-lg pb-1 mr-2"
                          onClick={async () => { adicionaItem() }}
                          id="btnFechaVenda">
                          Fechar Venda
                        </button>
                        <button className="btn btn-danger btn-lg pb-1" id="btnCancelaVenda">Cancelar Venda</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="card-footer">
              <Nav variant="tabs" activeKey={activeTab} onSelect={handleTabSelect}>
                <Nav.Item>
                  <Nav.Link eventKey="tab1" style={{ color: "white" }} href="#">
                    Itens da Venda
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="tab2" style={{ color: "white" }} href="#">
                    Totais da Venda
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </div>
        </div>
      </section >
    </div>
  )
};

export default Venda;
