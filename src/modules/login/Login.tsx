import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { loginUser } from '@store/reducers/auth';
import { setWindowClass } from '@app/utils/helpers';
import { PfButton, PfCheckbox } from '@profabric/react-components';

import * as Yup from 'yup';

import { Form, InputGroup } from 'react-bootstrap';
import * as AuthService from '../../services/auth';
import { toggleDarkMode } from '@app/store/reducers/ui';

const Login = () => {
  const [isAuthLoading, setAuthLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [t] = useTranslation();

  const login = async (login: string, password: string) => {
    const fezLogin = await AuthService.loginByAuth(login, password);
    
    if(fezLogin) {
      setAuthLoading(true);
      toast.success('Login feito com sucesso!');
      setAuthLoading(false);
      dispatch(loginUser(true));
      navigate('/');
      handleDarkModeChange();
    } else {
      setAuthLoading(false);
      toast.error('Login ou senha incorretos! Verifique');
    }
  };

  const handleDarkModeChange = () => {
    dispatch(toggleDarkMode());
  };

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      login: '',
      password: ''
    },
    validationSchema: Yup.object({
      login: Yup.string().required('Required'),
      password: Yup.string()
        .min(5, 'Must be 5 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required')
    }),
    onSubmit: (values) => {
      login(values.login, values.password);
    }
  });

  setWindowClass('hold-transition login-page');

  return (
    <div className="login-box">
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <Link to="/" className="h1">
            <b>Place Beer</b>
          </Link>
        </div>
        <div className="card-body">
          <p className="login-box-msg">Entre com seu usuário e senha</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="login"
                  name="login"
                  type="text"
                  placeholder="Usuário"
                  onChange={handleChange}
                  value={values.login}
                />
                <InputGroup.Append>
                  <InputGroup.Text>
                    <i className="fas fa-envelope" />
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </div>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && !!errors.password}
                />
                {touched.password && errors.password ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <i className="fas fa-lock" />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>

            <div className="row">
              <div className="col-8">
                <PfCheckbox checked={false}>
                  Lembrar usuário e senha
                </PfCheckbox>
              </div>
              <div className="col-4">
                <PfButton
                  block
                  type="submit"
                  loading={isAuthLoading}
                >
                  Log In
                </PfButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
