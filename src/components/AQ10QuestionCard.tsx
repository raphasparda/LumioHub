import React from 'react';
import { Question } from '../types';
import './AQ10QuestionCard.css';

interface AQ10QuestionCardProps {
  question: Question;
  currentAnswer?: number;
  onAnswer: (answerValue: number) => void;
}

const likertOptions = [
  { label: 'Definitivamente Concordo', value: 0 },
  { label: 'Ligeiramente Concordo', value: 1 },
  { label: 'Ligeiramente Discordo', value: 2 },
  { label: 'Definitivamente Discordo', value: 3 },
];

const AQ10QuestionCard: React.FC<AQ10QuestionCardProps> = ({
  question,
  currentAnswer,
  onAnswer,
}) => {
  return (
    <article className="aq10-card card">
      <header className="aq10-card__header">
        <span className="aq10-card__badge">Pergunta {question.id}</span>
        <p>{question.text}</p>
      </header>
      <div className="aq10-card__options">
        {likertOptions.map((option) => {
          const isSelected = currentAnswer === option.value;
          return (
            <button
              key={option.value}
              type="button"
              className={`btn aq10-card__option ${
                isSelected ? 'aq10-card__option--selected' : ''
              }`}
              onClick={() => onAnswer(option.value)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </article>
  );
};

export default AQ10QuestionCard;



