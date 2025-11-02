import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { professionals } from '../data/database';
import './ProfessionalProfilePage.css';

const ProfessionalProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const professional = professionals.find((item) => item.id === Number(id));

  if (!professional) {
    return (
      <section className="profile">
        <div className="container profile__container card">
          <h1>Profissional não encontrado</h1>
          <p>Não localizamos o profissional solicitado. Retorne ao diretório e tente novamente.</p>
          <Link to="/profissionais" className="btn btn-secondary profile__back">
            Voltar ao diretório
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="profile">
      <div className="container profile__container card">
        <div className="profile__header">
          <img
            src={professional.photoUrl ?? 'https://via.placeholder.com/160?text=Prof'}
            alt={`Foto de ${professional.name}`}
          />
          <div>
            <h1>{professional.name}</h1>
            <p className="profile__specialty">{professional.specialty}</p>
            <p className="profile__location">{professional.location}</p>
          </div>
        </div>

        <section className="profile__section">
          <h2>Sobre</h2>
          <p>{professional.description}</p>
        </section>

        <section className="profile__section">
          <h2>Contato</h2>
          <ul className="profile__contacts">
            <li>
              <strong>E-mail:</strong> {professional.contactEmail}
            </li>
            <li>
              <strong>Telefone:</strong> {professional.contactPhone}
            </li>
          </ul>
        </section>

        <Link to="/profissionais" className="btn btn-secondary profile__back">
          Voltar ao diretório
        </Link>
      </div>
    </section>
  );
};

export default ProfessionalProfilePage;
