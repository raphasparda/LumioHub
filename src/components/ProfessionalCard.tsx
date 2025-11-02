import React from 'react';
import { Link } from 'react-router-dom';
import { Professional } from '../types';
import './ProfessionalCard.css';

interface ProfessionalCardProps {
  professional: Professional;
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ professional }) => {
  const { id, name, specialty, location, photoUrl } = professional;
  const imageSrc = photoUrl ?? 'https://via.placeholder.com/120?text=Prof';

  return (
    <article className="professional-card card">
      <div className="professional-card__avatar">
        <img src={imageSrc} alt={`Foto de ${name}`} />
      </div>
      <div className="professional-card__content">
        <h3>{name}</h3>
        <p className="professional-card__specialty">{specialty}</p>
        <p className="professional-card__location">{location}</p>
        <Link to={`/profissionais/${id}`} className="btn btn-secondary professional-card__cta">
          Ver perfil
        </Link>
      </div>
    </article>
  );
};

export default ProfessionalCard;



