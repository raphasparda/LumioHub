import React from 'react';
import { Link } from 'react-router-dom';
import PuzzleLogo from '../components/PuzzleLogo';
import { faqItems, libraryArticles } from '../data/database';
import './HomePage.css';

const HomePage: React.FC = () => {
  const featuredArticles = libraryArticles.slice(0, 2);

  return (
    <main className="home">
      <section className="hero">
        <div className="container hero__content">
          <div className="hero__text">
            <span className="hero__eyebrow">Diagnostico mais acessivel</span>
            <h1>
              LumioHub ilumina jornadas autistas com acolhimento, clareza e parceria desde o primeiro contato.
            </h1>
            <p className="hero__lead">
              Reunimos triagens reconhecidas, conteudos curados e especialistas preparados em um fluxo continuo e humano.
            </p>
            <div className="hero__actions">
              <Link to="/triagem" className="btn btn-primary">
                Iniciar triagem
              </Link>
              <Link to="/biblioteca" className="btn btn-secondary">
                Abrir biblioteca
              </Link>
            </div>
          </div>
          <div className="hero__illustration" aria-hidden="true">
            <PuzzleLogo className="hero__puzzle" />
          </div>
        </div>
      </section>

      <section className="highlights">
        <div className="container highlights__grid">
          <article className="card highlights__item">
            <h3>Triagens validadas</h3>
            <p>Aplicao guiada de AQ-10 e M-CHAT-R/F com interpretaes claras e recomendaes imediatas.</p>
            <Link to="/triagem" className="highlights__link">
              Acessar questionrios &gt;
            </Link>
          </article>
          <article className="card highlights__item">
            <h3>Biblioteca confivel</h3>
            <p>Artigos, cursos e checklists com curadoria para apoiar decises baseadas em evidncias.</p>
            <Link to="/biblioteca" className="highlights__link">
              Explorar biblioteca &gt;
            </Link>
          </article>
          <article className="card highlights__item">
            <h3>Rede profissional</h3>
            <p>Especialistas em sade mental e neurodesenvolvimento conectados em um s ambiente digital.</p>
            <Link to="/profissionais" className="highlights__link">
              Encontrar profissionais &gt;
            </Link>
          </article>
        </div>
      </section>

      <section className="about">
        <div className="container">
          <div className="card about__card glass">
            <h2>Sobre o LumioHub</h2>
            <p>
              LumioHub nasce para democratizar triagem inicial e acolhimento de pessoas autistas. Reunimos ferramentas
              validadas, conteudo confiavel e uma rede profissional pronta para tratar cada historia com respeito.
            </p>
            <p>
              Cuidamos de experiencias centradas na neurodiversidade: linguagem clara, jornadas previsiveis, controles
              acessiveis e protecao de dados como compromisso. Assim, familias, profissionais e pessoas autistas organizam
              rotinas e decisoes com seguranca.
            </p>
          </div>
        </div>
      </section>

      <section className="resources-preview">
        <div className="container">
          <div className="card resources-preview__card glass">
            <header className="resources-preview__header">
              <div>
                <h2>Perguntas frequentes</h2>
                <p>
                  Respostas objetivas para dvidas recorrentes sobre triagens, recomendaes e encaminhamentos. Ideal para
                  acessar rapidamente as informaes essenciais.
                </p>
              </div>
              <Link to="/biblioteca" className="btn btn-secondary resources-preview__cta">
                Ver biblioteca completa
              </Link>
            </header>
            <div className="resources-preview__list">
              {faqItems.map((item) => (
                <article key={item.question} className="resources-preview__item">
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="featured-articles">
        <div className="container">
          <header className="featured-articles__header">
            <h2>Atualizaes em destaque</h2>
            <p>Seleo de artigos recentes com referncias confiveis para aprofundar o conhecimento.</p>
          </header>
          <div className="featured-articles__grid">
            {featuredArticles.map((article) => (
              <article key={article.id} className="card featured-articles__item glass">
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <Link to={`/biblioteca/artigos/${article.slug}`} className="highlights__link">
                  Ler artigo completo &gt;
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
