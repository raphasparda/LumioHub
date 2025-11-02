import React, { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DEMO_TRIAGE_CODE } from '../constants/demo';
import { registerPatient } from '../utils/storage';
import './RegisterPage.css';

const PatientRegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);

    if (password.length < 6) {
      setFeedback({ type: 'error', message: 'A senha deve conter pelo menos 6 caracteres.' });
      return;
    }

    if (password !== confirmPassword) {
      setFeedback({ type: 'error', message: 'As senhas não conferem.' });
      return;
    }

    setIsSubmitting(true);

    const result = registerPatient({
      name,
      email,
      password,
      accessCode,
    });

    if (!result.success || !result.account) {
      setFeedback({ type: 'error', message: result.message ?? 'Não foi possível concluir o cadastro.' });
      setIsSubmitting(false);
      return;
    }

    setFeedback({
      type: 'success',
      message: result.account.triageAccessGranted
        ? 'Cadastro realizado! Você já pode acessar seu painel e iniciar uma triagem.'
        : 'Cadastro realizado! Insira o código de autorização no painel para liberar as triagens.',
    });

    setTimeout(() => {
      navigate('/login', { replace: true, state: { email, role: 'paciente' } });
    }, 1600);
  };

  return (
    <section className="register">
      <div className="container register__container">
        <header className="register__hero">
          <span className="register__eyebrow">Cadastro de paciente</span>
          <h1>Crie sua conta para organizar triagens com acompanhamento profissional</h1>
          <p>
            Use o código compartilhado pelo seu profissional de referência. Nesta demonstração, utilize{' '}
            <strong>{DEMO_TRIAGE_CODE}</strong> para liberar o acesso imediato às triagens.
          </p>
        </header>

        <div className="card glass register__card">
          <form className="register__form" onSubmit={handleSubmit}>
            <label className="register__field">
              <span>Nome completo</span>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Nome e sobrenome"
                required
                autoComplete="name"
              />
            </label>

            <label className="register__field">
              <span>E-mail</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="voce@email.com"
                required
                autoComplete="email"
              />
            </label>

            <div className="register__form-grid">
              <label className="register__field">
                <span>Senha</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Mínimo de 6 caracteres"
                  required
                  autoComplete="new-password"
                />
              </label>
              <label className="register__field">
                <span>Confirmar senha</span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Repita a senha"
                  required
                  autoComplete="new-password"
                />
              </label>
            </div>

            <label className="register__field">
              <span>Código de autorização do profissional</span>
              <input
                type="text"
                value={accessCode}
                onChange={(event) => setAccessCode(event.target.value)}
                placeholder={DEMO_TRIAGE_CODE}
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
                {isSubmitting ? 'Cadastrando...' : 'Concluir cadastro'}
              </button>
              <p className="register__hint">
                Já possui conta? <Link to="/login" className="register__link">Acesse aqui.</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PatientRegisterPage;

