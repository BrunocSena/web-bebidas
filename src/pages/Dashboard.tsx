import {SmallBox} from '@app/components';
import React, { useEffect, useState } from 'react';
import {ContentHeader} from '@components';
import { api } from '@app/lib/axios';

const Dashboard = () => {

  const [qtdeVendasHoje, setQtdeVendasHoje] = useState(0);
  const [valorVendasHoje, setValorVendasHoje] = useState(0);

  async function retornaQtdeVendas() {
    const dataHoje = new Date();
    const diaComZero = String(dataHoje.getDate()) == '1' || String(dataHoje.getDate()) == '2' || String(dataHoje.getDate()) == '3' || String(dataHoje.getDate()) == '4' || String(dataHoje.getDate()) == '5' || String(dataHoje.getDate()) == '6' || String(dataHoje.getDate()) == '7' || String(dataHoje.getDate()) == '8' || String(dataHoje.getDate()) == '9' ?  ('0' + String(dataHoje.getDate())) : String(dataHoje.getDate());
    const diaHoje = diaComZero;
    const mesComZero = String(dataHoje.getMonth()) == '1' || String(dataHoje.getMonth()) == '2' || String(dataHoje.getMonth()) == '3' || String(dataHoje.getMonth()) == '4' || String(dataHoje.getMonth()) == '5' || String(dataHoje.getMonth()) == '6' || String(dataHoje.getMonth()) == '7' || String(dataHoje.getMonth()) == '8' || String(dataHoje.getMonth()) == '9' ? ('0' + String(dataHoje.getMonth())) : String(dataHoje.getMonth()); 
    const mesHoje = mesComZero;
    const anoHoje = String(dataHoje.getFullYear());
    const dataFormatada = anoHoje + '-' + mesHoje + '-' + diaHoje;

    const objDataVendas = {
      "dataVenda": dataFormatada
    }

    const qtdeVendas = await api.post('dashboard/selectQtdeVendas', objDataVendas);

    const vlrVendas = await api.post('dashboard/selectVlrVendas', objDataVendas);

    if(+qtdeVendas.data.vendasFeitas <= 0) {
      setQtdeVendasHoje(0);
    } else {
      setQtdeVendasHoje(+qtdeVendas.data.vendasFeitas);
    };

    if(+vlrVendas.data.valorVendas._sum.valorVendaLiquido <= 0) {
      setValorVendasHoje(0);
    } else {
      setValorVendasHoje(+vlrVendas.data.valorVendas._sum.valorVendaLiquido);
    }
  };

  useEffect(() => {
    retornaQtdeVendas()
  }, []);

  return (
    <div>
      <ContentHeader title="Dashboard" />

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{qtdeVendasHoje}</h3>

                  <p>Vendas Hoje</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag" />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>{valorVendasHoje}</h3>

                  <p>R$ Valor Vendido Hoje</p>
                </div>
                <div className="icon">
                  <i className="ion ion-social-usd" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
