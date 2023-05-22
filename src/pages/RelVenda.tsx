/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { ContentHeader } from '@components';

const RelVenda = () => {
  return (
    <div>
      <ContentHeader title="Relatório de Venda" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header col-sm-12 row">
              <div className='col-sm-6 row'>
                <label htmlFor="selectPeriodo" className="mt-2">Período: </label>
                <select className='ml-2 col-sm-3 form-control' id="selectPeriodo">
                  <option value="dia" selected>Dia</option>
                  <option value="mes">Mês</option>
                </select>
                <label htmlFor="txtDateRelVenda" id="lblDateRelVenda" className="mt-2 ml-2">Data: </label>
                <input className="form-control col-sm-3 ml-2 d" id="txtDateRelVenda" type='date' />
                <button className="btn btn-primary btn-sm ml-2"
                ><strong>Consultar</strong></button>
              </div>
            </div>
            <div className="card-body">
              <table id="tabelaRelVenda" className="table table-lg-responsive table-bordered" style={{ whiteSpace: 'nowrap', backgroundColor: '#343a44' }}>
                <thead>
                  <th>Código</th>
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
            <div className="card-footer"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RelVenda;
