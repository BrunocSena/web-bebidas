/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { ContentHeader } from '@components';
import { toast } from 'react-toastify';
import { api } from '@app/lib/axios';

const RelVenda = () => {

  const [periodo, setPeriodo] = useState('dia');

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
      const lblDateVenda = document.getElementById('lblDateRelVenda') as HTMLLabelElement;
      const txtMesRelVenda = document.getElementById('txtMesRelVenda') as HTMLInputElement;
      const lblMesRelVenda = document.getElementById('lblMesRelVenda') as HTMLLabelElement;
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

    } catch (error) {
      console.error(error);
      toast.error('');
    }
  };



  return (
    <div>
      <ContentHeader title="Relatório de Venda" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header col-sm-12 row">
              <div className='col-sm-6 row'>
                <label htmlFor="selectPeriodo" className="mt-2">Período: </label>
                <select className='ml-2 col-sm-3 form-control' id="selectPeriodo" onChange={(event) => {
                  setPeriodo(event.currentTarget.value);
                }}>
                  <option value="dia" selected>Dia</option>
                  <option value="mes">Mês</option>
                </select>
                <label htmlFor="txtDateRelVenda" id="lblDateRelVenda" className="mt-2 ml-2">Data: </label>
                <input className="form-control col-sm-3 ml-2 d" id="txtDateRelVenda" type='date' />
                <label htmlFor="txtMesRelVenda" id="lblMesRelVenda" className="mt-2 ml-2">Mês: </label>
                <input className="form-control col-sm-3 ml-2 d" id="txtMesRelVenda" type='string' />
                <button className="btn btn-primary btn-sm ml-2"
                onClick={consultaRelVenda}
                ><strong>Consultar</strong></button>
              </div>
            </div>
            <div className="card-body">
              <table id="tabelaRelVenda" className="table table-lg-responsive table-bordered" style={{ whiteSpace: 'nowrap', backgroundColor: '#343a44' }}>
                <thead>
                  <th>Venda</th>
                  <th>Data</th>
                  <th className="text-right">Valor Venda</th>
                  <th className="text-right">Qtde Total Unitária</th>
                  <th className="text-right">Qtde Total Caixas</th>
                </thead>
                <tbody id="tabelaTBody">
                  <tr>
                  </tr>
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
