import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { libraryCourses } from '../data/database';
import './CoursePage.css';

const CoursePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const course = libraryCourses.find((item) => item.slug === slug);

  if (!course) {
    return (
      <section className="course">
        <div className="container course__container card">
          <h1>Curso não encontrado</h1>
          <p>Não encontramos o conteúdo solicitado. Volte para a biblioteca e explore outros cursos.</p>
          <Link to="/biblioteca" className="btn btn-secondary">
            Voltar para a biblioteca
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="course">
      <div className="container course__container">
        <header className="course__header">
          <p className="course__meta">
            {course.duration} · {course.modality} · nível {course.level}
          </p>
          <h1>{course.title}</h1>
          <p>{course.summary}</p>
        </header>

        <div className="course__body card">
          <section className="course__section">
            <h2>Conteúdo programático</h2>
            <ul>
              {course.lessons.map((lesson) => (
                <li key={lesson.title}>
                  <strong>{lesson.title}</strong>
                  <span>{lesson.description}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="course__section">
            <h2>Ao concluir você será capaz de</h2>
            <ul className="course__outcomes">
              {course.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </section>
        </div>

        <footer className="course__footer">
          <Link to="/biblioteca" className="btn btn-primary">
            Voltar para a biblioteca
          </Link>
        </footer>
      </div>
    </section>
  );
};

export default CoursePage;
