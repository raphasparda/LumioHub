import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MChatQuestionCard from '../components/MChatQuestionCard';
import { mchatQuestions } from '../data/database';
import { ScreeningResult } from '../types';
import './MChatQuestionnairePage.css';

const TOTAL_QUESTIONS = mchatQuestions.length;

const MChatQuestionnairePage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<'yes' | 'no' | undefined>>(Array(TOTAL_QUESTIONS).fill(undefined));
  const navigate = useNavigate();

  const currentQuestion = useMemo(() => mchatQuestions[currentQuestionIndex], [currentQuestionIndex]);
  const progress = ((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100;

  const handleAnswer = (answerValue: 'yes' | 'no') => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestionIndex] = answerValue;
      return updated;
    });
  };

  const handlePrev = () => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      return;
    }

    const atRiskCount = answers.reduce((total, answer, index) => {
      const question = mchatQuestions[index];
      if (answer === undefined) {
        return total;
      }
      if (question.riskResponse && answer === question.riskResponse) {
        return total + 1;
      }
      return total;
    }, 0);

    const criticalFlags = answers.reduce((total, answer, index) => {
      const question = mchatQuestions[index];
      if (!question.isCritical || answer === undefined) {
        return total;
      }
      return question.riskResponse === answer ? total + 1 : total;
    }, 0);

    const riskCategory: ScreeningResult['riskCategory'] = atRiskCount >= 8 ? 'Alto' : atRiskCount >= 3 ? 'Médio' : 'Baixo';

    const interpretationMap: Record<ScreeningResult['riskCategory'], string> = {
      Alto: `Risco elevado (${atRiskCount} respostas de risco, ${criticalFlags} itens críticos). Inicie avaliação diagnóstica completa com equipe especializada.`,
      Médio: `Risco moderado (${atRiskCount} respostas de risco). Aplique a entrevista de follow-up do M-CHAT-R/F e monitore o desenvolvimento.`,
      Baixo: `Risco baixo (${atRiskCount} respostas de risco). Continue acompanhando marcos de desenvolvimento e repita a triagem periodicamente.`,
    };

    const recommendationMap: Record<ScreeningResult['riskCategory'], string> = {
      Alto: 'Encaminhe para equipe multidisciplinar (pediatria, psicologia, fonoaudiologia) e organize acompanhamento estruturado.',
      Médio: 'Realize a entrevista complementar do M-CHAT-R/F com profissional treinado e reavalie em breve.',
      Baixo: 'Mantenha contato com pediatra e educadores, reforçando observações e estímulos adequados.',
    };

    const result: ScreeningResult = {
      testName: 'M-CHAT-R/F',
      score: atRiskCount,
      riskCategory,
      interpretation: interpretationMap[riskCategory],
      recommendation: recommendationMap[riskCategory],
      date: new Date().toLocaleDateString('pt-BR'),
    };

    navigate('/triagem/resultados', { state: { result } });
  };

  return (
    <section className="mchat">
      <div className="container mchat__wrapper">
        <header className="mchat__header">
          <h1>Triagem M-CHAT-R/F</h1>
          <p>
            Responda com base em comportamentos observados nas últimas semanas. A triagem ajuda a decidir se vale
            aprofundar a avaliação do desenvolvimento socioemocional.
          </p>
        </header>

        <div
          className="mchat__progress"
          role="progressbar"
          aria-valuenow={currentQuestionIndex + 1}
          aria-valuemin={1}
          aria-valuemax={TOTAL_QUESTIONS}
        >
          <div className="mchat__progress-bar" style={{ width: `${progress}%` }} />
          <span>
            Pergunta {currentQuestionIndex + 1} de {TOTAL_QUESTIONS}
          </span>
        </div>

        <MChatQuestionCard
          question={currentQuestion}
          currentAnswer={answers[currentQuestionIndex]}
          onAnswer={handleAnswer}
        />

        <div className="mchat__controls">
          <button
            type="button"
            className="btn btn-secondary mchat__control-btn"
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
          >
            Anterior
          </button>
          <button
            type="button"
            className="btn btn-primary mchat__control-btn"
            onClick={handleNext}
            disabled={answers[currentQuestionIndex] === undefined}
          >
            {currentQuestionIndex === TOTAL_QUESTIONS - 1 ? 'Concluir triagem' : 'Próximo'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default MChatQuestionnairePage;
