import {removeWindowClass} from '@app/utils/helpers';
import {Gatekeeper} from 'gatekeeper-client-sdk';
import { api } from '@app/lib/axios';

export const loginByAuth = async (login: string, password: string) => {
  const usuario = {
    "login": login,
    "password": password
  }

  const podeLogar = await api.post('users/login', usuario);
  // localStorage.setItem('token', token);
  removeWindowClass('login-page');
  removeWindowClass('hold-transition');
  return podeLogar.data;
};