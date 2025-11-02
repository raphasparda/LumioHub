import React from 'react';
import { Link } from 'react-router-dom';
import './TriageOverviewPage.css';

const TriageOverviewPage: React.FC = () => {
  return (
    <section className="triage-overview">
      <div className="container triage-overview__container">
        <header className="triage-overview__header">
          <h1>Escolha a triagem validada para iniciar</h1>
          <p>
            O LumioHub reune instrumentos reconhecidos pela literatura cientifica. Escolha o questionario mais
            adequado para a faixa etria e acompanhe os resultados no painel.
          </p>
        </header>

        <div className="triage-overview__grid">
          <article className="card triage-card">
            <span className="triage-card__badge">Adultos e adolescentes</span>
            <h2>AQ-10</h2>
            <p>
              Verso abreviada do Autism Spectrum Quotient recomendada para rastreio rpido de traos autistas a partir
              de 16 anos.
            </p>
            <ul className="triage-card__list">
              <li>10 itens com escala Likert de 4 pontos</li>
              <li>Interpretao com base no ponto de corte maior ou igual a 6</li>
              <li>Resultado imediato com recomendaes de encaminhamento</li>
            </ul>
            <Link to="/triagem/aq10" className="btn btn-primary triage-card__cta">
              Iniciar AQ-10
            </Link>
          </article>

          <article className="card triage-card">
            <span className="triage-card__badge">Crianas de 16 a 30 meses</span>
            <h2>M-CHAT-R/F</h2>
            <p>
              Checklist utilizado mundialmente para triagem precoce com foco em comunicao social e comportamento.
            </p>
            <ul className="triage-card__list">
              <li>20 perguntas com respostas sim ou no</li>
              <li>Clculo automtico de risco baixo, mdio ou alto</li>
              <li>Destaque para itens crticos que demandam avaliao imediata</li>
            </ul>
            <Link to="/triagem/mchat" className="btn btn-secondary triage-card__cta">
              Iniciar M-CHAT-R/F
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
};

export default TriageOverviewPage;
