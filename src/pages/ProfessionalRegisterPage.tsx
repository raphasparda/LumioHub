import React, { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DEMO_TRIAGE_CODE } from '../constants/demo';
import { registerProfessional } from '../utils/storage';
import './RegisterPage.css';

const ProfessionalRegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    const result = registerProfessional({ name, email, password, organization });

    if (!result.success || !result.account) {
      setFeedback({ type: 'error', message: result.message ?? 'Não foi possível concluir o cadastro.' });
      setIsSubmitting(false);
      return;
    }

    setFeedback({
      type: 'success',
      message: `Cadastro realizado! Utilize o código ${result.account.defaultCode} com seus pacientes.`,
    });

    setTimeout(() => {
      navigate('/login', { replace: true, state: { email, role: 'profissional' } });
    }, 1600);
  };

  return (
    <section className="register">
      <div className="container register__container">
        <header className="register__hero">
          <span className="register__eyebrow">Cadastro de profissional</span>
          <h1>Organize triagens e acompanhe resultados dos seus pacientes em um único painel</h1>
          <p>
            Compartilhe o código padrão <strong>{DEMO_TRIAGE_CODE}</strong> ou gere novos códigos em seus atendimentos.
            Nesta demonstração, todos os pacientes podem utilizar o código padrão para liberar as triagens.
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
                placeholder="Seu nome"
                required
                autoComplete="name"
              />
            </label>

            <label className="register__field">
              <span>Instituição ou área de atuação (opcional)</span>
              <input
                type="text"
                value={organization}
                onChange={(event) => setOrganization(event.target.value)}
                placeholder="Clínica, instituição ou especialidade"
                autoComplete="organization"
              />
            </label>

            <label className="register__field">
              <span>E-mail profissional</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="contato@exemplo.com"
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

            {feedback && (
              <div className={`form-feedback ${feedback.type === 'error' ? 'form-feedback--error' : ''}`}>
                {feedback.message}
              </div>
            )}

            <div className="register__form-footer">
              <button type="submit" className="btn btn-secondary" disabled={isSubmitting}>
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

export default ProfessionalRegisterPage;

