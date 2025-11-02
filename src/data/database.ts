import {
  LibraryArticle,
  LibraryCourse,
  PatientTask,
  Professional,
  ProfessionalCase,
  Question,
  SupportResource,
} from '../types';

export const aq10Questions: Question[] = [
  {
    id: 1,
    text: 'Percebo sons ou cheiros sutis que outras pessoas raramente notam.',
    type: 'agree',
  },
  {
    id: 2,
    text: 'Consigo trocar de atividade rapidamente quando algo inesperado acontece.',
    type: 'agree',
    isReversed: true,
  },
  {
    id: 3,
    text: 'Compreendo com facilidade o contexto geral em conversas sem me perder nos detalhes.',
    type: 'agree',
    isReversed: true,
  },
  {
    id: 4,
    text: 'Retomo uma tarefa com tranquilidade mesmo aps interrupes.',
    type: 'agree',
    isReversed: true,
  },
  {
    id: 5,
    text: 'Entendo com facilidade o significado indireto em conversas.',
    type: 'agree',
    isReversed: true,
  },
  {
    id: 6,
    text: 'Percebo rapidamente quando algum ao meu redor est entediado.',
    type: 'agree',
    isReversed: true,
  },
  {
    id: 7,
    text: 'Consigo imaginar cenas com clareza ao ler uma histria.',
    type: 'agree',
    isReversed: true,
  },
  {
    id: 8,
    text: 'Gosto de catalogar informaes detalhadas sobre temas especficos.',
    type: 'agree',
  },
  {
    id: 9,
    text: 'Identifico com facilidade emoes apenas observando expresses faciais.',
    type: 'agree',
    isReversed: true,
  },
  {
    id: 10,
    text: 'Prefiro rotinas estruturadas e me incomodo com mudanas inesperadas.',
    type: 'agree',
  },
];

export const mchatQuestions: Question[] = [
  {
    id: 1,
    text: 'Quando voc aponta para algo distante, seu filho olha para o que foi apontado?',
    type: 'yesno',
    riskResponse: 'no',
  },
  {
    id: 2,
    text: 'Voc j se perguntou se seu filho pode ter alguma perda auditiva?',
    type: 'yesno',
    riskResponse: 'yes',
    isCritical: true,
  },
  {
    id: 3,
    text: 'Seu filho gosta de brincar de faz de conta ou imitar situaes do cotidiano?',
    type: 'yesno',
    riskResponse: 'no',
  },
  {
    id: 4,
    text: 'Seu filho gosta de subir em cadeiras, brinquedos ou escadas?',
    type: 'yesno',
    riskResponse: 'no',
  },
  {
    id: 5,
    text: 'Seu filho faz movimentos incomuns com os dedos perto dos olhos?',
    type: 'yesno',
    riskResponse: 'yes',
    isCritical: true,
  },
  {
    id: 6,
    text: 'Seu filho aponta com o dedo indicador para pedir algo ou pedir ajuda?',
    type: 'yesno',
    riskResponse: 'no',
  },
  {
    id: 7,
    text: 'Seu filho aponta com o dedo indicador para mostrar o que chamou a ateno?',
    type: 'yesno',
    riskResponse: 'no',
    isCritical: true,
  },
  {
    id: 8,
    text: 'Seu filho demonstra interesse em brincar com outras crianas?',
    type: 'yesno',
    riskResponse: 'no',
  },
  {
    id: 9,
    text: 'Seu filho traz objetos apenas para compartilhar algo com voc?',
    type: 'yesno',
    riskResponse: 'no',
  },
  {
    id: 10,
    text: 'Seu filho responde quando voc o chama pelo nome?',
    type: 'yesno',
    riskResponse: 'no',
    isCritical: true,
  },
  {
    id: 11,
    text: 'Seu filho sorri em resposta ao seu sorriso ou a outras expresses sociais?',
    type: 'yesno',
    riskResponse: 'no',
  },
  {
    id: 12,
    text: 'Seu filho fica incomodado com sons cotidianos (aspirador, liquidificador)?',
    type: 'yesno',
    riskResponse: 'yes',
  },
  {
    id: 13,
    text: 'Seu filho consegue acompanhar com o olhar quando voc aponta para algo?',
    type: 'yesno',
    riskResponse: 'no',
  },
  {
    id: 14,
    text: 'Seu filho percebe quando voc muda entonao para mostrar que est feliz ou chateado?',
    type: 'yesno',
    riskResponse: 'no',
  },
  {
    id: 15,
    text: 'Seu filho gosta de brincar em diferentes posies (por exemplo, voando como avio)?',
    type: 'yesno',
    riskResponse: 'no',
  },
  {
    id: 16,
    text: 'Seu filho procura compartilhar interesses com voc durante a brincadeira?',
    type: 'yesno',
    riskResponse: 'no',
  },
  {
    id: 17,
    text: 'Seu filho mostra objetos favoritos para voc apenas para compartilhar?',
    type: 'yesno',
    riskResponse: 'no',
  },
  {
    id: 18,
    text: 'Seu filho reage como voc espera quando ocorre algo novo?',
    type: 'yesno',
    riskResponse: 'no',
  },
  {
    id: 19,
    text: 'Seu filho observa seu rosto para verificar sua reao em situaes desconhecidas?',
    type: 'yesno',
    riskResponse: 'no',
  },
  {
    id: 20,
    text: 'Seu filho gosta de movimentos corporais incomuns, como balanar as mos ou o corpo?',
    type: 'yesno',
    riskResponse: 'yes',
  },
];

export const professionals: Professional[] = [
  {
    id: 1,
    name: 'Dra. Lcia Martins',
    specialty: 'Psicologia Clnica',
    location: 'Curitiba  PR',
    description:
      'Psicloga especializada em avaliao neuropsicolgica e suporte a adultos autistas em transies de carreira.',
    contactEmail: 'lucia.martins@lumiohub.com',
    contactPhone: '(41) 90000-1234',
    photoUrl: 'https://via.placeholder.com/160x160.png?text=LM',
  },
  {
    id: 2,
    name: 'Dr. Alberto Nunes',
    specialty: 'Psiquiatria',
    location: 'So Paulo  SP',
    description:
      'Psiquiatra com foco em diagnstico diferencial do espectro autista, com experincia em sade mental comunitria.',
    contactEmail: 'alberto.nunes@lumiohub.com',
    contactPhone: '(11) 98000-4567',
    photoUrl: 'https://via.placeholder.com/160x160.png?text=AN',
  },
  {
    id: 3,
    name: 'Carina Figueiredo',
    specialty: 'Terapia Ocupacional',
    location: 'Porto Alegre  RS',
    description:
      'Terapeuta ocupacional voltada a rotinas sensoriais, autonomia e planejamento de suportes para crianas autistas.',
    contactEmail: 'carina.figueiredo@lumiohub.com',
    contactPhone: '(51) 97000-8899',
    photoUrl: 'https://via.placeholder.com/160x160.png?text=CF',
  },
  {
    id: 4,
    name: 'Felipe Duarte',
    specialty: 'Psicopedagogia',
    location: 'Recife  PE',
    description:
      'Psicopedagogo que atua com adaptao curricular, capacitao de equipes escolares e letramento em neurodiversidade.',
    contactEmail: 'felipe.duarte@lumiohub.com',
    contactPhone: '(81) 96000-2211',
    photoUrl: 'https://via.placeholder.com/160x160.png?text=FD',
  },
  {
    id: 5,
    name: 'Samira Azevedo',
    specialty: 'Fonoaudiologia',
    location: 'Braslia  DF',
    description:
      'Fonoaudiloga com experincia em comunicao alternativa, desenvolvimento de linguagem e orientao familiar.',
    contactEmail: 'samira.azevedo@lumiohub.com',
    contactPhone: '(61) 94000-7788',
    photoUrl: 'https://via.placeholder.com/160x160.png?text=SA',
  },
  {
    id: 6,
    name: 'Dra. Helena Prado',
    specialty: 'Neuropediatria',
    location: 'Belm  PA',
    description:
      'Neuropediatra dedicada a linhas de cuidado interdisciplinares com foco em identificao precoce do espectro autista.',
    contactEmail: 'helena.prado@lumiohub.com',
    contactPhone: '(91) 95000-3344',
    photoUrl: 'https://via.placeholder.com/160x160.png?text=HP',
  },
];

export const faqItems = [
  {
    question: 'A triagem substitui o diagnstico clnico?',
    answer:
      'No. A triagem sinaliza probabilidade aumentada de autismo e orienta os prximos passos, mas o diagnstico  sempre clnico e deve ser realizado por equipe especializada.',
  },
  {
    question: 'Com que frequncia devo refazer os questionrios?',
    answer:
      'Recomenda-se repetir a triagem a cada seis meses ou sempre que surgirem mudanas significativas no comportamento ou no desenvolvimento.',
  },
  {
    question: 'Os dados inseridos ficam protegidos?',
    answer:
      'Sim. Armazenamos somente o necessrio em ambiente seguro, com criptografia e controle de acesso seguindo a LGPD.',
  },
  {
    question: 'Profissionais podem acessar meus resultados?',
    answer:
      'Somente com a sua autorizao explcita. Voc decide se deseja compartilhar relatrios com especialistas cadastrados.',
  },
];

export const introArticles = [
  {
    id: 1,
    title: 'Por que iniciar a triagem cedo?',
    content:
      'Intervenes iniciadas nos primeiros anos de vida tm maior impacto em comunicao e autonomia, reduzindo barreiras ao longo da vida.',
  },
  {
    id: 2,
    title: 'Acolhimento comea pela informao',
    content:
      'Linguagem clara, respeito s diferenas sensoriais e apoio continuado criam ambientes em que pessoas autistas se sentem seguras.',
  },
  {
    id: 3,
    title: 'Rede de apoio conecta cuidados',
    content:
      'Compartilhar o cotidiano entre famlia, profissionais e escola facilita a construo de estratgias consistentes e humanizadas.',
  },
];

export const libraryArticles: LibraryArticle[] = [
  {
    id: 'article-triagem-tea',
    slug: 'trajetoria-triagem-tea',
    title: 'Triagem estruturada para o Transtorno do Espectro Autista',
    summary:
      'Como ferramentas validadas, como AQ-10, RAADS-R e M-CHAT-R/F, apoiam a identificao inicial e o encaminhamento responsvel.',
    readingTime: '8 minutos',
    updatedAt: 'Agosto de 2024',
    sections: [
      {
        heading: 'Triagem no  diagnstico',
        paragraphs: [
          'Instrumentos de triagem servem para indicar probabilidade aumentada de autismo, jamais para fechar laudo. A etapa diagnstica requer avaliao clnica detalhada conduzida por profissionais habilitados (American Academy of Pediatrics, 2023).',
          'Ao aplicar questionrios como o AQ-10 ou o M-CHAT-R/F, deixe claro para responsveis e pessoas avaliadas que o resultado aponta um nvel de risco e orienta o prximo passo de cuidado.',
        ],
      },
      {
        heading: 'Ferramentas validadas e pontos de corte',
        paragraphs: [
          'O AQ-10  recomendado para adolescentes e adultos, com ponto de corte  6 indicando necessidade de avaliao aprofundada (Baron-Cohen et al., 2001).',
          'Para crianas entre 16 e 30 meses, o M-CHAT-R/F apresenta alta sensibilidade e inclui itens crticos que exigem follow-up imediato (Robins et al., 2014).',
        ],
      },
      {
        heading: 'Encaminhamentos integrados',
        paragraphs: [
          'Relatrios de triagem organizam sinais observados e reduzem o tempo de explicao em consultrio, permitindo que a consulta especializada foque em anamnese e planejamento teraputico.',
          'Compartilhe resultados apenas com consentimento e registre orientaes claras para a famlia sobre direitos e servios disponveis.',
        ],
      },
    ],
    references: [
      'American Academy of Pediatrics. Autism Screening Guidelines. Pediatrics, 2023.',
      'Baron-Cohen, S. et al. The Autism-Spectrum Quotient (AQ). Journal of Autism and Developmental Disorders, 2001.',
      'Robins, D. L. et al. Modified Checklist for Autism in Toddlers, Revised with Follow-up (M-CHAT-R/F). Pediatrics, 2014.',
    ],
  },
  {
    id: 'article-direitos-lgpd',
    slug: 'direitos-lgpd-neurodiversidade',
    title: 'Proteo de dados e direitos das pessoas autistas',
    summary:
      'Como alinhar cuidado digital  Lei Geral de Proteo de Dados e s polticas brasileiras de incluso e direitos das pessoas com deficincia.',
    readingTime: '7 minutos',
    updatedAt: 'Julho de 2024',
    sections: [
      {
        heading: 'LGPD e dados sensveis',
        paragraphs: [
          'Resultados de triagem, observaes sobre rotina e relatrios clnicos so dados pessoais sensveis. A LGPD exige consentimento explcito, finalidade clara e minimizao na coleta (Brasil, 2018).',
          'No LumioHub solicitamos apenas os dados essenciais, permitimos revogacao a qualquer momento e registramos logs de acesso para auditoria.',
        ],
      },
      {
        heading: 'Direitos garantidos em lei',
        paragraphs: [
          'A Lei n 12.764/2012 e a LBI (Lei n 13.146/2015) reconhecem o autismo como deficincia para todos os efeitos legais, assegurando atendimento prioritrio, incluso escolar e acesso a tratamentos pelo SUS.',
          'A pessoa autista e sua famlia tm direito a receber informaes compreensveis sobre avaliaes, resultados e encaminhamentos, fortalecendo o protagonismo nas decises de cuidado.',
        ],
      },
      {
        heading: 'Boas prticas digitais',
        paragraphs: [
          'Implemente autenticao forte para profissionais, criptografia em repouso e em trnsito e polticas de reteno que respeitem o ciclo de vida dos dados.',
          'Fornea canais transparentes para solicitar correo, excluso ou exportao das informaes armazenadas, reforando autonomia e confiana.',
        ],
      },
    ],
    references: [
      'Brasil. Lei n 13.709/2018 (Lei Geral de Proteo de Dados Pessoais). Dirio Oficial da Unio, 2018.',
      'Brasil. Lei n 12.764/2012. Poltica Nacional de Proteo dos Direitos da Pessoa com TEA.',
      'Brasil. Lei n 13.146/2015. Lei Brasileira de Incluso da Pessoa com Deficincia.',
    ],
  },
  {
    id: 'article-acessibilidade',
    slug: 'design-acessivel-tea',
    title: 'Design acessvel para pessoas autistas',
    summary:
      'Estratgias de UX e acessibilidade digital que reduzem sobrecarga sensorial e facilitam a navegao de pessoas neurodivergentes.',
    readingTime: '6 minutos',
    updatedAt: 'Agosto de 2024',
    sections: [
      {
        heading: 'Controle sensorial',
        paragraphs: [
          'Interfaces acessveis oferecem controle sobre animaes, volume e contraste. Minimizar estmulos simultneos reduz risco de sobrecarga sensorial.',
          'Preferimos cores slidas, transies suaves e feedback visual sutil, sempre com contraste adequado conforme WCAG 2.1 (W3C, 2018).',
        ],
      },
      {
        heading: 'Linguagem clara e previsibilidade',
        paragraphs: [
          'Estruturas previsveis, ttulos autoexplicativos e textos objetivos favorecem o processamento de informao.',
          'Informar o passo seguinte em cada etapa da jornada diminui ansiedade e melhora a experincia de quem depende de rotinas organizadas.',
        ],
      },
      {
        heading: 'Participao de pessoas autistas',
        paragraphs: [
          'Testes de usabilidade com pessoas autistas revelam nuances que abordagens tradicionais no captam, desde a altura de componentes at padres de foco.',
          'Co-criar solues com a comunidade garante respeito  diversidade de perfis, interesses e modos de comunicao.',
        ],
      },
    ],
    references: [
      'World Wide Web Consortium (W3C). Web Content Accessibility Guidelines 2.1, 2018.',
      'Harper, S. & Ameer, I. Accessible Design for Neurodiversity. ACM Interactions, 2022.',
      'Silva, T. et al. Participao de pessoas autistas em processos de UX. Revista Brasileira de Design, 2023.',
    ],
  },
];

export const libraryCourses: LibraryCourse[] = [
  {
    id: 'course-triagem-fundamentos',
    slug: 'fundamentos-triagem-tea',
    title: 'Fundamentos da triagem em TEA',
    summary:
      'Curso introdutrio para compreender instrumentos validados, critrios clnicos e boas prticas ticas na triagem digital.',
    duration: '4 horas',
    modality: 'Online',
    level: 'Inicial',
    lessons: [
      {
        title: 'Panorama epidemiolgico',
        description: 'Prevalncia atualizada no Brasil e no mundo, desigualdades de acesso e impactos sociais.',
      },
      {
        title: 'Instrumentos validados',
        description: 'Quando aplicar AQ-10, RAADS-R e M-CHAT-R/F, incluindo pontos de corte e limitaes.',
      },
      {
        title: 'Comunicao responsvel',
        description: 'Como apresentar resultados de triagem, alinhar expectativas e orientar prximos passos.',
      },
    ],
    outcomes: [
      'Reconhecer instrumentos recomendados para diferentes faixas etrias.',
      'Planejar fluxos de triagem digital alinhados  legislao brasileira.',
      'Apoiar famlias e pessoas autistas com comunicao clara e acolhedora.',
    ],
  },
  {
    id: 'course-educacao-inclusiva',
    slug: 'educacao-inclusiva-neurodiversidade',
    title: 'Educao inclusiva para neurodiversidade',
    summary:
      'Formao para equipes escolares implementarem prticas inclusivas e ambientes sensorialmente seguros.',
    duration: '6 horas',
    modality: 'Online',
    level: 'Intermedi\u00e1rio',
    lessons: [
      {
        title: 'Planejamento pedaggico acessvel',
        description: 'Construo de rotinas flexveis, materiais visuais e apoio na comunicao.',
      },
      {
        title: 'Gesto de crises e autorregulao',
        description: 'Ferramentas prticas para lidar com sobrecarga sensorial e comportamentos desafiadores.',
      },
      {
        title: 'Parceria com famlias',
        description: 'Fluxos de comunicao contnua e registro compartilhado de observaes.',
      },
    ],
    outcomes: [
      'Aplicar princpios de educao inclusiva no cotidiano escolar.',
      'Mapear adaptaes sensoriais de baixo custo para diferentes perfis.',
      'Fortalecer a colaborao entre escola, famlia e terapeutas.',
    ],
  },
  {
    id: 'course-protocolo-profissional',
    slug: 'protocolo-profissional-tea',
    title: 'Protocolo profissional em linhas de cuidado TEA',
    summary:
      'Guia avanado para profissionais de sade estruturarem acompanhamento interdisciplinar alinhado  literatura recente.',
    duration: '8 horas',
    modality: 'H\u00edbrido',
    level: 'Avan\u00e7ado',
    lessons: [
      {
        title: 'Avaliao interdisciplinar',
        description: 'Fluxo integrado entre psiquiatria, psicologia, fonoaudiologia e terapia ocupacional.',
      },
      {
        title: 'Planejamento teraputico',
        description: 'Priorizao de objetivos, definio de indicadores e reviso peridica de resultados.',
      },
      {
        title: 'tica e proteo de dados',
        description: 'Gesto de consentimento, privacidade e registro clnico seguro em ambientes digitais.',
      },
    ],
    outcomes: [
      'Organizar linhas de cuidado alinhadas  legislao e s melhores prticas cientficas.',
      'Documentar planos teraputicos com metas mensurveis e reviso contnua.',
      'Estruturar processos de governana de dados em servios especializados.',
    ],
  },
];

export const patientTasks: PatientTask[] = [
  {
    id: 1,
    title: 'Registrar observaes semanais',
    description:
      'Anote episdios de sobrecarga, interesses especiais e interaes significativas no dirio para compartilhar com profissionais.',
    dueDate: '2024-10-15',
    status: 'Em andamento',
  },
  {
    id: 2,
    title: 'Compartilhar resultado da triagem',
    description:
      'Envie o resumo da ltima triagem para um profissional de confiana e alinhe a necessidade de atendimento presencial.',
    dueDate: '2024-10-18',
    status: 'Pendente',
  },
  {
    id: 3,
    title: 'Planejar adaptaes sensoriais',
    description:
      'Reveja com a famlia e a escola quais ajustes ambientais reduzem sobrecarga e aumentam conforto nas rotinas dirias.',
    dueDate: '2024-10-25',
    status: 'Pendente',
  },
  {
    id: 4,
    title: 'Celebrar conquistas do ms',
    description:
      'Registre avanos importantes para reforar estratgias que funcionaram e manter a motivao coletiva.',
    dueDate: '2024-10-30',
    status: 'Conclu\u00edda',
  },
];

export const patientResources: SupportResource[] = [
  {
    id: 1,
    title: 'Guia rpido de direitos no TEA',
    category: 'Informao',
    description:
      'Resumo das leis brasileiras, incluindo Poltica Nacional dos Direitos da Pessoa com TEA e Lei Brasileira de Incluso.',
  },
  {
    id: 2,
    title: 'Checklist para consultas',
    category: 'Ferramenta',
    description:
      'Perguntas-chave para levar a consultas mdicas ou pedaggicas e registrar orientaes acordadas.',
  },
  {
    id: 3,
    title: 'Comunidades de apoio confiveis',
    category: 'Comunidade',
    description:
      'Lista de fruns moderados por pessoas autistas e familiares com foco em acolhimento e troca de experincias seguras.',
  },
];

export const professionalCases: ProfessionalCase[] = [];

export const professionalResources: SupportResource[] = [
  {
    id: 1,
    title: 'Checklist oficial M-CHAT-R/F',
    category: 'Clnico',
  },
  {
    id: 2,
    title: 'Guia de comunicao inclusiva com famlias',
    category: 'Prtica',
  },
  {
    id: 3,
    title: 'Agenda de congressos sobre neurodiversidade',
    category: 'Atualizao',
  },
];

export const database = {
  triage: {
    aq10Questions,
    mchatQuestions,
  },
  content: {
    faqItems,
    introArticles,
    libraryArticles,
    libraryCourses,
  },
  professionals,
  patient: {
    tasks: patientTasks,
    resources: patientResources,
  },
  professional: {
    cases: professionalCases,
    resources: professionalResources,
  },
};
