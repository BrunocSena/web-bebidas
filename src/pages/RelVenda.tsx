/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { ContentHeader } from '@components';
import { toast } from 'react-toastify';
import { api } from '@app/lib/axios';
import { format } from 'date-fns';

const RelVenda = () => {

  const [periodo, setPeriodo] = useState('dia');
  const [linhasTabela, setLinhasTabela] = useState<TableRowProps[]>([]);
  const [totalValorVenda, setTotalValorVenda] = useState(0);
  let valorTotVendas = 0;

  interface TableRowProps {
    codVen: number,
    dataVen: string,
    qtdeTotalCaixa: number,
    qtdeTotalUnitaria: number,
    valorVendaBruto: number,
    valorVendaLiquido: number
  };

  const TableRow = ({
    codVen,
    dataVen,
    qtdeTotalCaixa,
    qtdeTotalUnitaria,
    valorVendaBruto,
    valorVendaLiquido
  }: TableRowProps) => {
    let dataVendidas = new Date(dataVen + ' 00:00:00');
    let dataFormatada = ('0' + dataVendidas.getDate()).slice(-2) + '/' + ('0' + (dataVendidas.getMonth() + 1)).slice(-2) + '/' + (dataVendidas.getFullYear());
    return (
      <tr>
        <td style={{ textAlign: 'center' }}>{codVen}</td>
        <td style={{ textAlign: 'center' }}>{dataFormatada}</td>
        <td style={{ textAlign: 'right' }}>R$ {valorVendaLiquido.toFixed(2).replace('.', ',')}</td>
        <td style={{ textAlign: 'right' }}>{qtdeTotalUnitaria}</td>
        <td style={{ textAlign: 'right' }}>{qtdeTotalCaixa}</td>
      </tr>
    );
  };

  useEffect(() => {
    if (periodo == 'dia') {
      const txtDateVenda = document.getElementById('txtDateRelVenda') as HTMLInputElement;
      const lblDateVenda = document.getElementById('lblDateRelVenda') as HTMLLabelElement;
      const txtMesRelVenda = document.getElementById('txtMesRelVenda') as HTMLInputElement;
      const lblMesRelVenda = document.getElementById('lblMesRelVenda') as HTMLLabelElement;
      txtDateVenda.classList.remove('d-none');
      lblDateVenda.classList.remove('d-none');
      txtMesRelVenda.classList.add('d-none');
      lblMesRelVenda.classList.add('d-none');
    } else {
      const txtDateVenda = document.getElementById('txtDateRelVenda') as HTMLInputElement;
      const lblDateVenda = document.getElementById('lblDateRelVenda') as HTMLLabelElement;
      const txtMesRelVenda = document.getElementById('txtMesRelVenda') as HTMLInputElement;
      const lblMesRelVenda = document.getElementById('lblMesRelVenda') as HTMLLabelElement;
      txtDateVenda.classList.add('d-none');
      lblDateVenda.classList.add('d-none');
      txtMesRelVenda.classList.remove('d-none');
      lblMesRelVenda.classList.remove('d-none');
    }
  }, [periodo]);

  async function consultaRelVenda() {
    try {
      const txtDateVenda = document.getElementById('txtDateRelVenda') as HTMLInputElement;
      const txtMesRelVenda = document.getElementById('txtMesRelVenda') as HTMLInputElement;
      let objDateVenda = {};

      if (periodo == 'dia') {
        objDateVenda = {
          "dataVenda": txtDateVenda.value,
          "periodo": periodo
        }
      } else {
        objDateVenda = {
          "dataVenda": txtMesRelVenda.value,
          "periodo": periodo
        }
      }
      const responseRelVenda = await api.post('relvenda/consultarelvenda', objDateVenda);
      setLinhasTabela(responseRelVenda.data.vendasPeriodo);
    } catch (error) {
      console.error(error);
      toast.error('');
    }
  };

  useEffect(() => {
    const dataHj = new Date();
    const diaHj = dataHj.getDate();
    const mesHj = dataHj.getMonth() + 1;
    const anoHj = dataHj.getFullYear();
    const txtDate = document.getElementById('txtDateRelVenda') as HTMLInputElement;
    txtDate.value = String(anoHj) + '-' + String(mesHj).padStart(2, '0') + '-' + String(diaHj).padStart(2, '0');
  }, [])

  const handleLimpaTabela = () => {
    setLinhasTabela([]);
  };

  const handleLimpaCampo = () => {
    const txtMesVenda = document.getElementById('txtMesRelVenda') as HTMLInputElement;

    txtMesVenda.value = '';
  };

  return (
    <div>
      <ContentHeader title="Relatório de Venda" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header col-sm-12 row">
              <div className='col-sm-6 row'>
                <label htmlFor="selectPeriodo" className="mt-2 col-sm-2">Período: </label>
                <select className='ml-2 col-sm-3 form-control' id="selectPeriodo" onChange={(event) => {
                  setPeriodo(event.currentTarget.value);
                  if (event.currentTarget.value == 'dia') {
                    const dataHj = new Date();
                    const diaHj = dataHj.getDate();
                    const mesHj = dataHj.getMonth() + 1;
                    const anoHj = dataHj.getFullYear();
                    const txtDate = document.getElementById('txtDateRelVenda') as HTMLInputElement;
                    txtDate.value = String(anoHj) + '-' + String(mesHj).padStart(2, '0') + '-' + String(diaHj).padStart(2, '0');
                  }
                }}>
                  <option value="dia" selected>Dia</option>
                  <option value="mes">Mês</option>
                </select>
                <label htmlFor="txtDateRelVenda" id="lblDateRelVenda" className="mt-2 ml-2">Data: </label>
                <input className="form-control col-sm-3 ml-2"
                  id="txtDateRelVenda"
                  type='date'
                />
                <label htmlFor="txtMesRelVenda" id="lblMesRelVenda" className="mt-2 ml-2">Mês: </label>
                <input className="form-control col-sm-3 ml-2"
                  onBlur={(event) => {
                    if (+event.currentTarget.value > 12) {
                      toast.error('Favor informar um número de mês válido!');
                      handleLimpaTabela();
                      handleLimpaCampo();
                      document.getElementById('txtMesRelVenda')?.focus();
                      return;
                    };
                  }}
                  id="txtMesRelVenda"
                  type='string'
                />
                <button className="btn btn-primary btn-sm ml-2 col-sm-2"
                  onClick={async () => {
                    await consultaRelVenda();
                  }}
                ><strong>Consultar</strong></button>
                <label htmlFor="txtTotalValVenda" id="lblTotalValVenda" className="mt-2 ml-4 col-sm-3">Total Valor Vendas:</label>
                <input className="form-control col-sm-2"></input>
              </div>
            </div>
            <div className="card-body">
              <table id="tabelaRelVenda" className="table table-lg-responsive table-bordered" style={{ whiteSpace: 'nowrap', backgroundColor: '#343a44' }}>
                <thead>
                  <th className="text-center">Venda</th>
                  <th className="text-center">Data</th>
                  <th className="text-right">Valor Venda</th>
                  <th className="text-right">Qtde Total Unitária</th>
                  <th className="text-right">Qtde Total Caixas</th>
                </thead>
                <tbody id="tabelaTBody">
                  {linhasTabela.map((linha: TableRowProps) => (
                    valorTotVendas = valorTotVendas + linha.valorVendaLiquido,
                    console.log(valorTotVendas),
                    <TableRow
                      codVen={linha.codVen}
                      dataVen={linha.dataVen}
                      qtdeTotalUnitaria={linha.qtdeTotalUnitaria}
                      qtdeTotalCaixa={linha.qtdeTotalCaixa}
                      valorVendaBruto={linha.valorVendaBruto}
                      valorVendaLiquido={linha.valorVendaLiquido}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RelVenda;
