export interface Professional {
  id: number;
  name: string;
  specialty: string;
  location: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  photoUrl?: string;
}

export interface Question {
  id: number;
  text: string;
  type: 'agree' | 'yesno';
  isReversed?: boolean;
  isCritical?: boolean;
  riskResponse?: 'yes' | 'no';
}

export interface ScreeningResult {
  testName: 'AQ-10' | 'M-CHAT-R/F';
  score: number;
  riskCategory: 'Baixo' | 'Médio' | 'Alto';
  interpretation: string;
  recommendation: string;
  date: string;
}

export interface PatientTask {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: 'Pendente' | 'Em andamento' | 'Concluída';
}

export interface SupportResource {
  id: number;
  title: string;
  category: string;
  link?: string;
  description?: string;
}

export interface ProfessionalCase {
  id: string;
  patientName: string;
  summary: string;
  priority: 'ALTO' | 'MÉDIO' | 'BAIXO';
  nextStep: string;
}

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
}

export interface LibraryArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  readingTime: string;
  updatedAt: string;
  sections: ArticleSection[];
  references: string[];
}

export interface CourseLesson {
  title: string;
  description: string;
}

export interface LibraryCourse {
  id: string;
  slug: string;
  title: string;
  summary: string;
  duration: string;
  modality: 'Online' | 'Presencial' | 'Híbrido';
  level: 'Inicial' | 'Intermediário' | 'Avançado';
  lessons: CourseLesson[];
  outcomes: string[];
}
