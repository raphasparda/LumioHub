import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AQ10QuestionnairePage from './pages/AQ10QuestionnairePage';
import MChatQuestionnairePage from './pages/MChatQuestionnairePage';
import ResultsPage from './pages/ResultsPage';
import ProfessionalDirectoryPage from './pages/ProfessionalDirectoryPage';
import ProfessionalProfilePage from './pages/ProfessionalProfilePage';
import LibraryPage from './pages/LibraryPage';
import ArticlePage from './pages/ArticlePage';
import CoursePage from './pages/CoursePage';
import TriageOverviewPage from './pages/TriageOverviewPage';
import PatientDashboardPage from './pages/PatientDashboardPage';
import ProfessionalDashboardPage from './pages/ProfessionalDashboardPage';
import RegisterPage from './pages/RegisterPage';
import PatientRegisterPage from './pages/PatientRegisterPage';
import ProfessionalRegisterPage from './pages/ProfessionalRegisterPage';
import TriageAccessPage from './pages/TriageAccessPage';
import ProtectedRoute from './routes/ProtectedRoute';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Header />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cadastro" element={<RegisterPage />} />
            <Route path="/cadastro/paciente" element={<PatientRegisterPage />} />
            <Route path="/cadastro/profissional" element={<ProfessionalRegisterPage />} />

            <Route element={<ProtectedRoute allowedRoles={['paciente']} />}>
              <Route path="/triagem/codigo" element={<TriageAccessPage />} />
            </Route>

            <Route element={<ProtectedRoute requiresTriageAccess />}>
              <Route path="/triagem" element={<TriageOverviewPage />} />
              <Route path="/triagem/aq10" element={<AQ10QuestionnairePage />} />
              <Route path="/triagem/mchat" element={<MChatQuestionnairePage />} />
              <Route path="/triagem/resultados" element={<ResultsPage />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['paciente']} />}>
              <Route path="/painel/paciente" element={<PatientDashboardPage />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['profissional']} />}>
              <Route path="/painel/profissional" element={<ProfessionalDashboardPage />} />
            </Route>

            <Route path="/profissionais" element={<ProfessionalDirectoryPage />} />
            <Route path="/profissionais/:id" element={<ProfessionalProfilePage />} />
            <Route path="/biblioteca" element={<LibraryPage />} />
            <Route path="/biblioteca/artigos/:slug" element={<ArticlePage />} />
            <Route path="/biblioteca/cursos/:slug" element={<CoursePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
