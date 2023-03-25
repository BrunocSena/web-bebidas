import {removeWindowClass} from '@app/utils/helpers';
import {Gatekeeper} from 'gatekeeper-client-sdk';
import { api } from '@app/lib/axios';

export const loginByAuth = async (login: string, password: string) => {
  const podeAcessar = await Gatekeeper.loginByAuth(login, password);
  // localStorage.setItem('token', token);
  removeWindowClass('login-page');
  removeWindowClass('hold-transition');
  return token;
};