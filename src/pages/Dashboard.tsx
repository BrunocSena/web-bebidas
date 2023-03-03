import {SmallBox} from '@app/components';
import React from 'react';
import {ContentHeader} from '@components';

const Dashboard = () => {
  return (
    <div>
      <ContentHeader title="Dashboard" />

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>150</h3>

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
                  <h3>44</h3>

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
