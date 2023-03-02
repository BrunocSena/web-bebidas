import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {MenuItem} from '@components';
import {PfImage} from '@profabric/react-components';
import styled from 'styled-components';
import i18n from '@app/utils/i18n';

export interface IMenuItem {
  name: string;
  icon?: string;
  path?: string;
  children?: Array<IMenuItem>;
}

export const MENU: IMenuItem[] = [
  {
    name: i18n.t('menusidebar.label.dashboard'),
    path: '/'
  },
  {
    name: i18n.t('Venda'),
    path: '/venda'
  },
  {
    name: i18n.t('Cadastro de Produto'),
    path: '/cadproduto'
  },
  {
    name: i18n.t('Entrada de Produto'),
    path: '/entradaproduto'
  },
  {
    name: i18n.t('Saída de Produto'),
    path: '/saidaproduto'
  },
  {
    name: i18n.t('Desperdício'),
    path: '/desperdicio'
  },
  {
    name: i18n.t('Relatório de Venda'),
    path: '/relvenda'
  },
  {
    name: i18n.t('Lucro x Custo de Produtos'),
    path: '/rellucro'
  }
];

const StyledBrandImage = styled(PfImage)`
  float: left;
  line-height: 0.8;
  margin: -1px 8px 0 6px;
  opacity: 0.8;
  --pf-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23) !important;
`;

const StyledUserImage = styled(PfImage)`
  --pf-box-shadow: 0 3px 6px #00000029, 0 3px 6px #0000003b !important;
`;

const MenuSidebar = () => {
  const user = useSelector((state: any) => state.auth.currentUser);
  const sidebarSkin = useSelector((state: any) => state.ui.sidebarSkin);
  const menuItemFlat = useSelector((state: any) => state.ui.menuItemFlat);
  const menuChildIndent = useSelector((state: any) => state.ui.menuChildIndent);

  return (
    <aside className={`main-sidebar elevation-4 ${sidebarSkin}`}>
      <Link to="/" className="brand-link">
        <StyledBrandImage
          src="/img/logo.png"
          alt="AdminLTE Logo"
          width={33}
          height={33}
          rounded
        />
        <span className="brand-text font-weight-light">Place Beer</span>
      </Link>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <StyledUserImage
              src={user.picture}
              fallbackSrc="/img/default-profile.png"
              alt="User"
              width={34}
              height={34}
              rounded
            />
          </div>
          <div className="info">
            <Link to="/profile" className="d-block">
              Guilherme
            </Link>
          </div>
        </div>

        <nav className="mt-2" style={{overflowY: 'hidden'}}>
          <ul
            className={`nav nav-pills nav-sidebar flex-column${
              menuItemFlat ? ' nav-flat' : ''
            }${menuChildIndent ? ' nav-child-indent' : ''}`}
            role="menu"
          >
            {MENU.map((menuItem: IMenuItem) => (
              <MenuItem
                key={menuItem.name + menuItem.path}
                menuItem={menuItem}
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default MenuSidebar;
