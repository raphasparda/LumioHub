import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__content">
        <div className="footer__links">
          <Link to="/politica-privacidade" className="footer__link">
            Politica de privacidade
          </Link>
          <Link to="/termos-uso" className="footer__link">
            Termos de uso
          </Link>
          <Link to="/contato" className="footer__link">
            Contato
          </Link>
        </div>
        <p className="footer__copy">
          &copy; {year} LumioHub. Todos os direitos reservados | www.sparda.dev
        </p>
      </div>
    </footer>
  );
};

export default Footer;
