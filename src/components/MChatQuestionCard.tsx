import React from 'react';
import { Question } from '../types';
import './MChatQuestionCard.css';

interface MChatQuestionCardProps {
  question: Question;
  currentAnswer?: 'yes' | 'no';
  onAnswer: (answer: 'yes' | 'no') => void;
}

const MChatQuestionCard: React.FC<MChatQuestionCardProps> = ({ question, currentAnswer, onAnswer }) => (
  <article className="mchat-card card">
    <header className="mchat-card__header">
      <span className="mchat-card__badge">Pergunta {question.id}</span>
      <p>{question.text}</p>
      {question.isCritical && <span className="mchat-card__critical">Item crítico da triagem</span>}
    </header>
    <div className="mchat-card__options">
      <button
        type="button"
        className={`btn mchat-card__option ${currentAnswer === 'yes' ? 'mchat-card__option--selected' : ''}`}
        onClick={() => onAnswer('yes')}
      >
        Sim
      </button>
      <button
        type="button"
        className={`btn mchat-card__option ${currentAnswer === 'no' ? 'mchat-card__option--selected' : ''}`}
        onClick={() => onAnswer('no')}
      >
        Não
      </button>
    </div>
  </article>
);

export default MChatQuestionCard;
