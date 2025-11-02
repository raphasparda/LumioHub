import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PuzzleLogo from './PuzzleLogo';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  const dashboardPath = user?.role === 'paciente' ? '/painel/paciente' : '/painel/profissional';
  const dashboardLabel = user?.role === 'paciente' ? 'Painel do paciente' : 'Painel do profissional';

  return (
    <header className="header">
      <div className="container header__content">
        <Link to="/" className="header__brand" onClick={closeMenu}>
          <PuzzleLogo className="header__logo" />
          <span>LumioHub</span>
        </Link>
        <button
          type="button"
          className={`header__toggle ${isMenuOpen ? 'header__toggle--open' : ''}`}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Fechar menu de navegacao' : 'Abrir menu de navegacao'}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`} onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink
            to="/triagem"
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
            onClick={closeMenu}
          >
            Triagem
          </NavLink>
          <NavLink
            to="/profissionais"
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
            onClick={closeMenu}
          >
            Profissionais
          </NavLink>
          <NavLink
            to="/biblioteca"
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
            onClick={closeMenu}
          >
            Biblioteca
          </NavLink>
          <NavLink
            to="/cadastro"
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
            onClick={closeMenu}
          >
            Cadastro
          </NavLink>
          {isAuthenticated && user ? (
            <>
              <NavLink
                to={dashboardPath}
                className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
                onClick={closeMenu}
              >
                {dashboardLabel}
              </NavLink>
              <button type="button" className="nav-link nav-link--logout" onClick={handleLogout}>
                Sair
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) => `nav-link nav-link--cta ${isActive ? 'nav-link--active' : ''}`}
              onClick={closeMenu}
            >
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
