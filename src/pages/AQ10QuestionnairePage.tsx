import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AQ10QuestionCard from '../components/AQ10QuestionCard';
import { aq10Questions } from '../data/database';
import { ScreeningResult } from '../types';
import './AQ10QuestionnairePage.css';

const TOTAL_QUESTIONS = aq10Questions.length;

const AQ10QuestionnairePage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<number | undefined>>(Array(TOTAL_QUESTIONS).fill(undefined));
  const navigate = useNavigate();

  const currentQuestion = useMemo(() => aq10Questions[currentQuestionIndex], [currentQuestionIndex]);
  const progress = ((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100;

  const handleAnswer = (answerValue: number) => {
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

    const score = answers.reduce<number>((total, answer, index) => {
      const question = aq10Questions[index];
      if (answer === undefined) {
        return total;
      }
      const isAgreement = answer <= 1;
      const isDisagreement = answer >= 2;
      const addsPoint = question.isReversed ? isDisagreement : isAgreement;
      return addsPoint ? total + 1 : total;
    }, 0);

    const riskCategory: ScreeningResult['riskCategory'] = score >= 7 ? 'Alto' : score >= 5 ? 'Médio' : 'Baixo';

    const interpretationMap: Record<ScreeningResult['riskCategory'], string> = {
      Alto: 'Pontuação igual ou maior que 7 indica forte probabilidade de traços autistas. Procure avaliação especializada.',
      Médio: 'Pontuação entre 5 e 6 sugere sinais relevantes. Busque entrevistas clínicas complementares.',
      Baixo: 'Pontuação abaixo de 5. Continue observando seus padrões e repita a triagem se novas dúvidas surgirem.',
    };

    const recommendationMap: Record<ScreeningResult['riskCategory'], string> = {
      Alto: 'Agende avaliação multidisciplinar e considere aplicar instrumentos complementares, como o RAADS-R.',
      Médio: 'Procure profissional especializado para entrevista detalhada e acompanhamento periódico.',
      Baixo: 'Mantenha registros das observações e compartilhe com profissionais de confiança quando necessário.',
    };

    const result: ScreeningResult = {
      testName: 'AQ-10',
      score,
      riskCategory,
      interpretation: interpretationMap[riskCategory],
      recommendation: recommendationMap[riskCategory],
      date: new Date().toLocaleDateString('pt-BR'),
    };

    navigate('/triagem/resultados', { state: { result } });
  };

  return (
    <section className="aq10">
      <div className="container aq10__wrapper">
        <header className="aq10__header">
          <h1>Triagem AQ-10</h1>
          <p>
            Responda considerando como você se sente na maior parte do tempo. O objetivo é indicar se vale buscar uma
            avaliação clínica mais aprofundada.
          </p>
        </header>

        <div
          className="aq10__progress"
          role="progressbar"
          aria-valuenow={currentQuestionIndex + 1}
          aria-valuemin={1}
          aria-valuemax={TOTAL_QUESTIONS}
        >
          <div className="aq10__progress-bar" style={{ width: `${progress}%` }} />
          <span>
            Pergunta {currentQuestionIndex + 1} de {TOTAL_QUESTIONS}
          </span>
        </div>

        <AQ10QuestionCard
          question={currentQuestion}
          currentAnswer={answers[currentQuestionIndex]}
          onAnswer={handleAnswer}
        />

        <div className="aq10__controls">
          <button
            type="button"
            className="btn btn-secondary aq10__control-btn"
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
          >
            Anterior
          </button>
          <button
            type="button"
            className="btn btn-primary aq10__control-btn"
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

export default AQ10QuestionnairePage;
