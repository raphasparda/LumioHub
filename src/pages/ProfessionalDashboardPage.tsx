import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DEMO_TRIAGE_CODE } from '../constants/demo';
import { ProfessionalCase, ScreeningResult } from '../types';
import {
  addProfessionalCase,
  loadAllScreeningResults,
  loadProfessionalCases,
  removeProfessionalCase,
} from '../utils/storage';
import './ProfessionalDashboardPage.css';

const agendaItems = [
  {
    id: 'agenda-1',
    date: '05/11 - 14h',
    title: 'Retorno interdisciplinar - Família S.',
    description: 'Ajustar plano sensorial aplicado na escola e alinhar recomendações com equipe pedagógica.',
  },
  {
    id: 'agenda-2',
    date: '07/11 - 09h',
    title: 'Análise de triagem AQ-10',
    description: 'Revisar respostas enviadas por adulto em busca de diagnóstico tardio e definir próximos encaminhamentos.',
  },
  {
    id: 'agenda-3',
    date: '11/11 - 16h',
    title: 'Reunião com rede de apoio',
    description: 'Organizar divisão de responsabilidades de cuidado e monitoramento de sinais de sobrecarga.',
  },
] as const;

type CaseFormState = {
  patientName: string;
  summary: string;
  priority: 'ALTO' | 'MÉDIO' | 'BAIXO';
  nextStep: string;
};

const defaultCaseForm: CaseFormState = {
  patientName: '',
  summary: '',
  priority: 'MÉDIO',
  nextStep: '',
};

const ProfessionalDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [triageResults, setTriageResults] = useState<ScreeningResult[]>([]);
  const [cases, setCases] = useState<ProfessionalCase[]>([]);
  const [formData, setFormData] = useState<CaseFormState>(defaultCaseForm);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    setTriageResults(loadAllScreeningResults());
  }, []);

  useEffect(() => {
    if (!user?.email) {
      setCases([]);
      return;
    }
    setCases(loadProfessionalCases(user.email));
  }, [user]);

  const metrics = useMemo(() => {
    if (triageResults.length === 0) {
      return {
        total: 0,
        high: 0,
        medium: 0,
        aq10: 0,
        mchat: 0,
      };
    }

    const total = triageResults.length;
    const high = triageResults.filter((item) => item.riskCategory === 'Alto').length;
    const medium = triageResults.filter((item) => item.riskCategory === 'Médio').length;
    const aq10 = triageResults.filter((item) => item.testName === 'AQ-10').length;
    const mchat = triageResults.filter((item) => item.testName === 'M-CHAT-R/F').length;

    return { total, high, medium, aq10, mchat };
  }, [triageResults]);

  const firstName = useMemo(() => {
    if (!user?.name) {
      return 'Bem-vindo(a)';
    }
    const [first] = user.name.split(' ');
    return first || user.name;
  }, [user]);

  const sharedCode = user?.professionalCode ?? DEMO_TRIAGE_CODE;

  const handleCaseFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCase = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user?.email) {
      setFormError('Disponível apenas para profissionais autenticados.');
      return;
    }

    const trimmedName = formData.patientName.trim();
    const trimmedSummary = formData.summary.trim();
    const trimmedNextStep = formData.nextStep.trim();

    if (!trimmedName || !trimmedSummary || !trimmedNextStep) {
      setFormError('Preencha nome, descrição clínica e próximo passo para registrar o caso.');
      return;
    }

    const updatedCases = addProfessionalCase(user.email, {
      patientName: trimmedName,
      summary: trimmedSummary,
      priority: formData.priority,
      nextStep: trimmedNextStep,
    });

    setCases(updatedCases);
    setFormData(defaultCaseForm);
    setFormError(null);
  };

  const handleRemoveCase = (caseId: string) => {
    if (!user?.email) {
      return;
    }
    const updatedCases = removeProfessionalCase(user.email, caseId);
    setCases(updatedCases);
  };

  return (
    <section className="professional-panel">
      <div className="container professional-panel__container">
        <header className="professional-panel__header">
          <div>
            <h1>Olá, {firstName}!</h1>
            <p>
              Consolide triagens recentes, defina prioridades e acompanhe materiais clínicos selecionados para apoiar suas avaliações.
            </p>
          </div>
          <div className="professional-panel__actions">
            <Link to="/triagem/mchat" className="btn btn-secondary">
              Simular M-CHAT-R/F
            </Link>
            <Link to="/profissionais" className="btn btn-primary">
              Rede de profissionais
            </Link>
          </div>
        </header>

        <section className="professional-panel__metrics">
          <article className="professional-panel__metric card glass">
            <span>Total de triagens salvas</span>
            <strong>{metrics.total}</strong>
          </article>
          <article className="professional-panel__metric card glass">
            <span>Risco ALTO</span>
            <strong>{metrics.high}</strong>
          </article>
          <article className="professional-panel__metric card glass">
            <span>Risco MÉDIO</span>
            <strong>{metrics.medium}</strong>
          </article>
          <article className="professional-panel__metric card glass">
            <span>AQ-10 - Adultos</span>
            <strong>{metrics.aq10}</strong>
          </article>
          <article className="professional-panel__metric card glass">
            <span>M-CHAT-R/F - Infantil</span>
            <strong>{metrics.mchat}</strong>
          </article>
        </section>

        <section className="card glass professional-panel__section professional-panel__code">
          <header className="professional-panel__section-header">
            <h2>Código para compartilhar com pacientes</h2>
            <p>
              Envie este código para liberar os questionários na jornada do paciente. Na demonstração todos utilizam o mesmo código.
            </p>
          </header>
          <div className="professional-panel__code-box">
            <strong>{sharedCode}</strong>
            <span>Copie e oriente o paciente sobre a importância do acompanhamento profissional.</span>
          </div>
        </section>

        <section className="card glass professional-panel__section">
          <header className="professional-panel__section-header">
            <h2>Casos em acompanhamento</h2>
            <p>Adicione casos reais para priorizar riscos e registrar próximas ações de acompanhamento.</p>
          </header>
          <form className="professional-panel__case-form" onSubmit={handleAddCase}>
            <div className="professional-panel__form-row">
              <label className="professional-panel__field">
                <span>Nome do paciente</span>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleCaseFieldChange}
                  placeholder="Ex.: Maria P."
                />
              </label>
              <label className="professional-panel__field professional-panel__field--compact">
                <span>Grau de risco</span>
                <select name="priority" value={formData.priority} onChange={handleCaseFieldChange}>
                  <option value="ALTO">ALTO</option>
                  <option value="MÉDIO">MÉDIO</option>
                  <option value="BAIXO">BAIXO</option>
                </select>
              </label>
            </div>
            <label className="professional-panel__field">
              <span>Descrição clínica</span>
              <textarea
                name="summary"
                rows={3}
                value={formData.summary}
                onChange={handleCaseFieldChange}
                placeholder="Resuma sinais observados, contexto e necessidades imediatas."
              />
            </label>
            <label className="professional-panel__field">
              <span>Próximo passo</span>
              <textarea
                name="nextStep"
                rows={2}
                value={formData.nextStep}
                onChange={handleCaseFieldChange}
                placeholder="Ex.: Agendar entrevista com fonoaudióloga e ajustes ambientais."
              />
            </label>
            {formError && <p className="professional-panel__form-error">{formError}</p>}
            <div className="professional-panel__form-actions">
              <button type="submit" className="btn btn-primary">
                Adicionar caso
              </button>
            </div>
          </form>
          <div className="professional-panel__cases">
            {cases.length === 0 ? (
              <p className="professional-panel__empty">
                Nenhum caso cadastrado ainda. Utilize o formulário para registrar o primeiro acompanhamento.
              </p>
            ) : (
              cases.map((item) => {
                const priorityClass = item.priority === 'ALTO' ? 'high' : item.priority === 'MÉDIO' ? 'medium' : 'low';
                return (
                  <article key={item.id} className="professional-panel__case">
                    <header>
                      <div className="professional-panel__case-heading">
                        <strong>{item.patientName}</strong>
                        <span className={`professional-panel__priority professional-panel__priority--${priorityClass}`}>
                          Risco {item.priority}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="professional-panel__case-remove"
                        onClick={() => handleRemoveCase(item.id)}
                      >
                        Remover
                      </button>
                    </header>
                    <p>{item.summary}</p>
                    <footer>
                      <span>Próximo passo</span>
                      <p>{item.nextStep}</p>
                    </footer>
                  </article>
                );
              })
            )}
          </div>
        </section>

        <section className="card glass professional-panel__section">
          <header className="professional-panel__section-header">
            <h2>Agenda</h2>
            <p>Visualize compromissos prioritários e mantenha a equipe alinhada.</p>
          </header>
          <ul className="professional-panel__agenda">
            {agendaItems.map((item) => (
              <li key={item.id}>
                <div className="professional-panel__agenda-header">
                  <strong>{item.title}</strong>
                  <span>{item.date}</span>
                </div>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
};

export default ProfessionalDashboardPage;
