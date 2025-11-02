import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { patientResources, patientTasks } from '../data/database';
import { DEMO_TRIAGE_CODE } from '../constants/demo';
import { ScreeningResult } from '../types';
import { loadScreeningHistory } from '../utils/storage';
import './PatientDashboardPage.css';

const PatientDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState<ScreeningResult[]>([]);

  useEffect(() => {
    if (user) {
      setHistory(loadScreeningHistory(user.email));
    }
  }, [user]);

  const firstName = useMemo(() => {
    if (!user?.name) {
      return 'Bem-vindo(a)';
    }
    const [first] = user.name.split(' ');
    return first || user.name;
  }, [user]);

  const hasAccess = user?.triageAccess ?? false;

  const handleTriageClick = () => {
    if (!hasAccess) {
      navigate('/triagem/codigo');
      return;
    }
    navigate('/triagem');
  };

  return (
    <section className="patient-panel">
      <div className="container patient-panel__container">
        <header className="patient-panel__header">
          <div>
            <h1>Olá, {firstName}!</h1>
            <p>
              Acompanhe suas triagens, organize próximos passos e acesse recomendações validadas para fortalecer sua jornada de cuidado.
            </p>
          </div>
          <button type="button" className="btn btn-primary" onClick={handleTriageClick}>
            {hasAccess ? 'Nova triagem' : 'Liberar triagem'}
          </button>
        </header>

        <div className="patient-panel__grid">
          <section className="card glass patient-panel__section patient-panel__access">
            <header className="patient-panel__section-header">
              <h2>Autorização de triagem</h2>
            </header>
            {hasAccess ? (
              <p>
                Seu acesso às triagens está liberado. Sempre que precisar, clique em <strong>Nova triagem</strong> para iniciar um novo questionário.
              </p>
            ) : (
              <div className="patient-panel__access-content">
                <p>
                  Informe o código compartilhado pelo profissional responsável para liberar os questionários. Nesta demonstração, utilize{' '}
                  <strong>{DEMO_TRIAGE_CODE}</strong>.
                </p>
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/triagem/codigo')}>
                  Inserir código de triagem
                </button>
              </div>
            )}
          </section>

          <section className="card glass patient-panel__section">
            <header className="patient-panel__section-header">
              <h2>Histórico de triagens</h2>
              <p>Os registros ficam salvos localmente neste protótipo para facilitar revisões rápidas.</p>
            </header>
            {history.length === 0 ? (
              <p className="patient-panel__empty">
                Nenhuma triagem registrada ainda. Assim que você concluir um questionário, o resumo aparecerá aqui.
              </p>
            ) : (
              <ul className="patient-panel__history">
                {history.map((item, index) => (
                  <li key={`${item.testName}-${item.date}-${index}`}>
                    <div>
                      <span className="patient-panel__history-test">{item.testName}</span>
                      <strong>{item.riskCategory}</strong>
                    </div>
                    <span className="patient-panel__history-date">{item.date}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="card glass patient-panel__section">
            <header className="patient-panel__section-header">
              <h2>Próximos passos combinados</h2>
              <p>Exemplo de tarefas para manter o cuidado organizado no dia a dia.</p>
            </header>
            <ul className="patient-panel__tasks">
              {patientTasks.map((task) => {
                const statusClass =
                  task.status === 'Pendente' ? 'pending' : task.status === 'Em andamento' ? 'inprogress' : 'done';

                return (
                  <li key={task.id} className="patient-panel__task">
                    <div>
                      <strong>{task.title}</strong>
                      <p>{task.description}</p>
                    </div>
                    <footer>
                      <span className="patient-panel__task-date">Até {task.dueDate}</span>
                      <span className={`patient-panel__task-status patient-panel__task-status--${statusClass}`}>{task.status}</span>
                    </footer>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="card glass patient-panel__section">
            <header className="patient-panel__section-header">
              <h2>Recursos recomendados</h2>
              <p>Conteúdos selecionados para apoiar decisões informadas e fortalecer sua rede de apoio.</p>
            </header>
            <ul className="patient-panel__resources">
              {patientResources.map((resource) => (
                <li key={resource.id}>
                  <strong>{resource.title}</strong>
                  <span>{resource.category}</span>
                  {resource.description && <p>{resource.description}</p>}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
};

export default PatientDashboardPage;
