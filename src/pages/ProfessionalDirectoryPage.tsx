import React, { useMemo, useState } from 'react';
import ProfessionalCard from '../components/ProfessionalCard';
import { professionals } from '../data/database';
import './ProfessionalDirectoryPage.css';

interface Filters {
  name: string;
  specialty: string;
  location: string;
}

const ProfessionalDirectoryPage: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    name: '',
    specialty: '',
    location: '',
  });

  const filteredProfessionals = useMemo(() => {
    return professionals.filter((professional) => {
      const matchesName = professional.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchesSpecialty = professional.specialty.toLowerCase().includes(filters.specialty.toLowerCase());
      const matchesLocation = professional.location.toLowerCase().includes(filters.location.toLowerCase());

      return matchesName && matchesSpecialty && matchesLocation;
    });
  }, [filters]);

  const handleInputChange =
    (field: keyof Filters) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilters((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  return (
    <section className="directory">
      <div className="container directory__container">
        <header className="directory__header">
          <h1>Diretório de profissionais</h1>
          <p>
            Explore especialistas em saúde mental e neurodesenvolvimento. Ajuste os filtros para encontrar quem melhor
            atende às suas necessidades.
          </p>
        </header>

        <form className="directory__filters card" onSubmit={(event) => event.preventDefault()}>
          <label className="directory__field">
            <span>Nome</span>
            <input
              type="text"
              value={filters.name}
              onChange={handleInputChange('name')}
              placeholder="Digite o nome"
            />
          </label>
          <label className="directory__field">
            <span>Especialidade</span>
            <input
              type="text"
              value={filters.specialty}
              onChange={handleInputChange('specialty')}
              placeholder="Ex.: psicóloga, terapeuta ocupacional"
            />
          </label>
          <label className="directory__field">
            <span>Localização</span>
            <input
              type="text"
              value={filters.location}
              onChange={handleInputChange('location')}
              placeholder="Cidade ou estado"
            />
          </label>
        </form>

        <div className="directory__results">
          {filteredProfessionals.length === 0 ? (
            <p className="directory__empty">Nenhum profissional encontrado com os filtros atuais.</p>
          ) : (
            <div className="directory__grid">
              {filteredProfessionals.map((professional) => (
                <ProfessionalCard key={professional.id} professional={professional} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalDirectoryPage;
