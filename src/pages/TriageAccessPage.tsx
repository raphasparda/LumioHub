import React, { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DEMO_TRIAGE_CODE } from '../constants/demo';
import { setPatientTriageAccess } from '../utils/storage';
import './RegisterPage.css';

const TriageAccessPage: React.FC = () => {
  const { user, login } = useAuth();
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  if (!user || user.role !== 'paciente') {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);

    const normalized = code.trim().toUpperCase();

    if (!normalized) {
      setFeedback({ type: 'error', message: 'Informe o código de autorização recebido do profissional.' });
      return;
    }

    setIsSubmitting(true);

    if (normalized !== DEMO_TRIAGE_CODE) {
      setFeedback({ type: 'error', message: 'Código inválido. Verifique com seu profissional de referência.' });
      setIsSubmitting(false);
      return;
    }

    setPatientTriageAccess(user.email, true);
    login({ ...user, triageAccess: true });
    setFeedback({ type: 'success', message: 'Acesso liberado! Você já pode iniciar uma triagem.' });

    setTimeout(() => {
      navigate('/triagem', { replace: true });
    }, 1200);
  };

  return (
    <section className="register">
      <div className="container register__container">
        <header className="register__hero">
          <span className="register__eyebrow">Código de triagem</span>
          <h1>Informe o código autorizado pelo profissional para liberar os questionários</h1>
          <p>
            O código garante que cada triagem seja acompanhada por profissionais habilitados. Na demonstração, utilize{' '}
            <strong>{DEMO_TRIAGE_CODE}</strong>.
          </p>
        </header>

        <div className="card glass register__card">
          <form className="register__form" onSubmit={handleSubmit}>
            <label className="register__field">
              <span>Código de autorização</span>
              <input
                type="text"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="Digite o código fornecido"
                autoComplete="off"
              />
            </label>

            {feedback && (
              <div className={`form-feedback ${feedback.type === 'error' ? 'form-feedback--error' : ''}`}>
                {feedback.message}
              </div>
            )}

            <div className="register__form-footer">
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Validando...' : 'Validar código'}
              </button>
              <p className="register__hint">
                Em caso de dúvidas, entre em contato com o profissional ou{' '}
                <Link to="/cadastro/profissional" className="register__link">
                  conheça nossa rede.
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TriageAccessPage;

