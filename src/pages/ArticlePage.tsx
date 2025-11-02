import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { libraryArticles } from '../data/database';
import './ArticlePage.css';

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = libraryArticles.find((item) => item.slug === slug);

  if (!article) {
    return (
      <section className="article">
        <div className="container article__container card">
          <h1>Artigo não encontrado</h1>
          <p>Não encontramos o conteúdo solicitado. Volte para a biblioteca e escolha outro material.</p>
          <Link to="/biblioteca" className="btn btn-secondary">
            Voltar para a biblioteca
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="article">
      <div className="container article__container">
        <header className="article__header">
          <h1>{article.title}</h1>
          <p>{article.summary}</p>
        </header>

        <div className="article__body card">
          {article.sections.map((section, index) => (
            <section key={index} className="article__section">
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

          <section className="article__references">
            <h2>Referências</h2>
            <ul>
              {article.references.map((reference) => (
                <li key={reference}>{reference}</li>
              ))}
            </ul>
          </section>
        </div>

        <footer className="article__footer">
          <Link to="/biblioteca" className="btn btn-secondary">
            Voltar para a biblioteca
          </Link>
        </footer>
      </div>
    </section>
  );
};

export default ArticlePage;
