import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toggleControlSidebar, toggleDarkMode, toggleSidebarMenu } from '@app/store/reducers/ui';
import { logoutUser } from '@app/store/reducers/auth';

const Header = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const navbarVariant = useSelector((state: any) => state.ui.navbarVariant);
  const headerBorder = useSelector((state: any) => state.ui.headerBorder);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const logOut = (event: any) => {
    event.preventDefault();
    setDropdownOpen(false);
    dispatch(logoutUser());
    navigate('/login');
  };

  const handleToggleMenuSidebar = () => {
    dispatch(toggleSidebarMenu());
  };


  const [estaDark, setEstaDark] = useState(false);

  useEffect(() => {
    if (!estaDark) {
      dispatch(toggleDarkMode());
      setEstaDark(true);
    }
  }, []);


  const getContainerClasses = useCallback(() => {
    let classes = `main-header navbar navbar-expand ${navbarVariant}`;
    if (headerBorder) {
      classes = `${classes} border-bottom-0`;
    }
    return classes;
  }, [navbarVariant, headerBorder]);

  return (
    <nav className={getContainerClasses()}>
      <ul className="navbar-nav">
        <li className="nav-item">
          <button
            onClick={handleToggleMenuSidebar}
            type="button"
            className="nav-link"
          >
            <i className="fas fa-bars" />
          </button>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/" className="nav-link">
            {t<string>('header.label.home')}
          </Link>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <button
            type="button"
            className="btn btn-info btn-flat float-right"
            onClick={logOut}
          >
            {t<string>('Sair do Sistema')}
          </button>
      </ul>
    </nav>
  );
};

export default Header;
