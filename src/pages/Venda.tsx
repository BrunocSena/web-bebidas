/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { ContentHeader } from '@components';

const Venda = () => {
  return (
    <div>
      <ContentHeader title="Venda" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title pt-2"><strong>Venda: xNumerox</strong></h3>
              <div className='card-tools'>
                <input className='form-control' type='date' value='2023-03-02' disabled={true}/>
              </div>
            </div>
            <div className="card-body">
              <div className="form-group row col-sm-12">
                <div className="row col-sm-12">
                <label htmlFor='inputCodigoProd' className='col-sm-3'>
                    Barra:
                  </label>
                  <label htmlFor='inputCodigoProd' className='col-sm-9'>
                    Produto:
                  </label>
                  <div className='col-sm-3'>
                    <input className='form-control' type="text" />
                  </div>
                  <div className='col-sm-9'>
                    <input className='form-control' type="text" />
                  </div>
                </div>
              </div>
              <div className="form-group row col-sm-12">
                <div className="row col-sm-12">
                  <div className='col-sm-6'>
                    <input className='form-control' type="text" />
                  </div>
                  <div className='col-sm-6'>
                    <input className='form-control' type="text" />
                  </div>
                </div>
              </div>
              <div className="form-group row col-sm-12">
                <div className="row col-sm-12">
                  <div className='col-sm-6'>
                    <input className='form-control' type="text" />
                  </div>
                  <div className='col-sm-6'>
                    <input className='form-control' type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">Footer</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Venda;
