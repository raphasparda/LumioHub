import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ScreeningResult } from '../types';
import { appendScreeningResult } from '../utils/storage';
import './ResultsPage.css';

interface LocationState {
  result?: ScreeningResult;
}

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: LocationState };
  const result = state?.result;
  const { user } = useAuth();
  const hasPersisted = useRef(false);

  useEffect(() => {
    if (!result) {
      navigate('/triagem', { replace: true });
    }
  }, [navigate, result]);

  useEffect(() => {
    if (result && user && !hasPersisted.current) {
      appendScreeningResult(user.email, result);
      hasPersisted.current = true;
    }
  }, [result, user]);

  if (!result) {
    return null;
  }

  const goToDashboard = () => {
    if (user?.role === 'profissional') {
      navigate('/painel/profissional');
    } else {
      navigate('/painel/paciente');
    }
  };

  return (
    <section className="results">
      <div className="container results__container card">
        <header className="results__header">
          <div>
            <h1>Resultado da triagem</h1>
            <p className="results__subtitle">
              Use este resumo como ponto de partida para conversas clínicas e registros no painel.
            </p>
          </div>
          <span className="results__tag">{result.testName}</span>
        </header>

        <div className="results__grid">
          <div className="results__score">
            <span className="results__label">Pontuação</span>
            <strong>{result.score}</strong>
          </div>
          <div className="results__detail">
            <span className="results__label">Categoria de risco</span>
            <strong>{result.riskCategory}</strong>
          </div>
          <div className="results__detail">
            <span className="results__label">Data da triagem</span>
            <span>{result.date}</span>
          </div>
        </div>

        <div className="results__message">
          <h2>Interpretação</h2>
          <p>{result.interpretation}</p>
          <h2>Recomendação</h2>
          <p>{result.recommendation}</p>
        </div>

        <div className="results__actions">
          <button type="button" className="btn btn-primary" onClick={() => navigate('/profissionais')}>
            Encontrar profissionais
          </button>
          <button type="button" className="btn btn-secondary" onClick={goToDashboard}>
            Ir para o painel
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResultsPage;
