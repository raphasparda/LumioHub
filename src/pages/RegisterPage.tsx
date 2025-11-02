import React from 'react';
import { Link } from 'react-router-dom';
import { DEMO_TRIAGE_CODE } from '../constants/demo';
import './RegisterPage.css';

const RegisterPage: React.FC = () => {
  return (
    <section className="register">
      <div className="container register__container">
        <header className="register__hero">
          <span className="register__eyebrow">Cadastre-se</span>
          <h1>Escolha como deseja participar da plataforma</h1>
          <p>
            Crie uma conta para organizar triagens e acompanhar resultados com segurança. Pacientes precisam informar um
            código fornecido por profissionais para liberar os questionários.
          </p>
        </header>

        <div className="register__grid">
          <article className="card glass register__card">
            <h2>Sou paciente ou familiar</h2>
            <p>
              Faça o registro para acessar o painel, registrar observações e realizar triagens com acompanhamento
              profissional. Utilize o código de autorização compartilhado pelo profissional responsável.
            </p>
            <ul className="register__list">
              <li>Acesso ao painel personalizado</li>
              <li>Histórico de triagens e tarefas sugeridas</li>
              <li>Orientações rápidas e materiais de apoio</li>
            </ul>
            <div className="register__actions">
              <Link to="/cadastro/paciente" className="btn btn-primary">
                Cadastrar paciente
              </Link>
              <p className="register__hint">
                Código padrão da demonstração: <strong>{DEMO_TRIAGE_CODE}</strong>
              </p>
            </div>
          </article>

          <article className="card glass register__card">
            <h2>Sou profissional</h2>
            <p>
              Cadastre-se para organizar encaminhamentos, acompanhar resultados e orientar pacientes com segurança.
              Compartilhe o código de autorização padrão ou gere novos códigos em seu fluxo de atendimento.
            </p>
            <ul className="register__list">
              <li>Painel com indicadores de triagens</li>
              <li>Visão consolidada das respostas (demo)</li>
              <li>Código padrão para seus pacientes: <strong>{DEMO_TRIAGE_CODE}</strong></li>
            </ul>
            <div className="register__actions">
              <Link to="/cadastro/profissional" className="btn btn-secondary">
                Cadastrar profissional
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
