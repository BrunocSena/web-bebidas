import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Main from '@modules/main/Main';
import Login from '@modules/login/Login';
import ForgetPassword from '@modules/forgot-password/ForgotPassword';
import RecoverPassword from '@modules/recover-password/RecoverPassword';
import {useWindowSize} from '@app/hooks/useWindowSize';
import {calculateWindowSize} from '@app/utils/helpers';
import {useDispatch, useSelector} from 'react-redux';
import {setWindowSize} from '@app/store/reducers/ui';

import Dashboard from '@pages/Dashboard';
import Venda from './pages/Venda';
import Profile from '@pages/profile/Profile';
import CadProduto from './pages/CadProduto';
import EntradaProduto from './pages/EntradaProduto';
import SaidaProduto from './pages/SaidaProduto';
import RelVenda from './pages/RelVenda';
import RelLucro from './pages/RelLucro';
import Desperdicio from './pages/Desperdicio';
import ConsultaProd from './pages/ConsultaProd'

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import ConsultaEstoque from './pages/ConsultaEstoque';



const App = () => {
  const windowSize = useWindowSize();
  const screenSize = useSelector((state: any) => state.ui.screenSize);
  const dispatch = useDispatch();

  useEffect(() => {
    const size = calculateWindowSize(windowSize.width);
    if (screenSize !== size) {
      dispatch(setWindowSize(size));
    }
  }, [windowSize]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/forgot-password" element={<PublicRoute />}>
          <Route path="/forgot-password" element={<ForgetPassword />} />
        </Route>
        <Route path="/recover-password" element={<PublicRoute />}>
          <Route path="/recover-password" element={<RecoverPassword />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Main />}>
            <Route path="/relvenda" element={<RelVenda />} />
            <Route path="/saidaproduto" element={<SaidaProduto />} />
            <Route path="/entradaproduto" element={<EntradaProduto />} />
            <Route path="/cadproduto" element={<CadProduto />} />
            <Route path="/venda" element={<Venda />} />
            <Route path="/rellucro" element={<RelLucro />} />
            <Route path="/desperdicio" element={<Desperdicio />} />
            <Route path="/consultaprod" element={<ConsultaProd />} />
            <Route path="/consultaestoque" element={<ConsultaEstoque />} />
            <Route path="/" element={ <Dashboard />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        autoClose={3000}
        draggable={false}
        position="top-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnHover
      />
    </BrowserRouter>
  );
};

export default App;
