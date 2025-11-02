import React, { FormEvent, useState } from 'react';
import { Link, Location, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '../context/AuthContext';
import { authenticatePatient, authenticateProfessional } from '../utils/storage';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const locationState = location.state as { from?: Location; email?: string; role?: UserRole } | undefined;

  const [email, setEmail] = useState(() => locationState?.email ?? '');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(locationState?.role ?? 'paciente');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);

    if (role === 'paciente') {
      const account = authenticatePatient(email, password);
      if (!account) {
        setFeedback('Credenciais inválidas. Verifique e-mail e senha ou realize o cadastro.');
        setIsSubmitting(false);
        return;
      }

      login({
        id: account.id,
        name: account.name,
        email: account.email,
        role: 'paciente',
        triageAccess: account.triageAccessGranted,
      });
    } else {
      const account = authenticateProfessional(email, password);
      if (!account) {
        setFeedback('Credenciais inválidas. Verifique e-mail e senha ou realize o cadastro.');
        setIsSubmitting(false);
        return;
      }

      login({
        id: account.id,
        name: account.name,
        email: account.email,
        role: 'profissional',
        professionalCode: account.defaultCode,
      });
    }

    const destination = locationState?.from?.pathname ?? (role === 'paciente' ? '/painel/paciente' : '/painel/profissional');
    navigate(destination, { replace: true });
  };

  return (
    <section className="login">
      <div className="container login__container card glass">
        <div className="login__intro">
          <h1>Acesse sua conta</h1>
          <p>
            Entre com suas credenciais para administrar triagens, acompanhar resultados e acessar conteúdos exclusivos. Ainda não tem conta?
            <Link to="/cadastro" className="login__link"> Cadastre-se.</Link>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="login__form">
          <label className="login__field">
            <span>E-mail</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="seuemail@exemplo.com"
              required
              autoComplete="email"
            />
          </label>
          <label className="login__field">
            <span>Perfil de acesso</span>
            <div className="login__role">
              <label>
                <input type="radio" name="role" value="paciente" checked={role === 'paciente'} onChange={() => setRole('paciente')} />
                Paciente ou familiar
              </label>
              <label>
                <input type="radio" name="role" value="profissional" checked={role === 'profissional'} onChange={() => setRole('profissional')} />
                Profissional
              </label>
            </div>
          </label>
          <label className="login__field">
            <span>Senha</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Informe sua senha"
              required
              autoComplete="current-password"
            />
          </label>

          {feedback && <div className="login__feedback">{feedback}</div>}

          <button type="submit" className="btn btn-primary login__submit" disabled={isSubmitting}>
            {isSubmitting ? 'Validando...' : 'Entrar'}
          </button>
          <div className="login__links">
            <Link to="/cadastro" className="login__link">
              Criar uma conta
            </Link>
            <span className="login__hint">Fluxo de recuperação disponível na versão completa.</span>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
