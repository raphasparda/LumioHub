import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { faqItems, introArticles, libraryArticles, libraryCourses } from '../data/database';
import './LibraryPage.css';

const LibraryPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="library-page">
      <div className="container library-page__container">
        <header className="library-page__header">
          <h1>Biblioteca de conhecimento</h1>
          <p>
            Acesse respostas rápidas, artigos completos com referências verificadas e cursos autorais desenvolvidos para
            orientar decisões informadas sobre o espectro autista.
          </p>
        </header>

        <div className="library-page__grid">
          <div className="library-page__column card">
            <h2>Perguntas frequentes</h2>
            <div className="accordion">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={item.question} className="accordion__item">
                    <button
                      type="button"
                      className={`accordion__trigger ${isOpen ? 'accordion__trigger--open' : ''}`}
                      onClick={() => toggleItem(index)}
                      aria-expanded={isOpen}
                    >
                      <span>{item.question}</span>
                      <span className="accordion__icon">{isOpen ? '\u2212' : '+'}</span>
                    </button>
                    {isOpen && <p className="accordion__content">{item.answer}</p>}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="library-page__column card">
            <h2>Artigos introdutórios</h2>
            <div className="articles">
              {introArticles.map((article) => (
                <article key={article.id} className="articles__item">
                  <h3>{article.title}</h3>
                  <p>{article.content}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <section className="library">
          <h2>Artigos completos</h2>
          <div className="library__grid">
            {libraryArticles.map((article) => (
              <article key={article.id} className="card library__item">
                <strong>{article.title}</strong>
                <p>{article.summary}</p>
                <Link to={`/biblioteca/artigos/${article.slug}`} className="library__link">
                  Ler artigo completo &gt;
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="library">
          <h2>Cursos exclusivos</h2>
          <div className="library__grid">
            {libraryCourses.map((course) => (
              <article key={course.id} className="card library__item">
                <strong>{course.title}</strong>
                <p>{course.summary}</p>
                  {course.duration} · {course.modality} · nível {course.level}
                <Link to={`/biblioteca/cursos/${course.slug}`} className="library__link">
                  Ver detalhes do curso &gt;
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default LibraryPage;
