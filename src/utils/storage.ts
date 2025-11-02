import { DEMO_TRIAGE_CODE } from '../constants/demo';
import { ProfessionalCase, ScreeningResult } from '../types';

const PATIENTS_KEY = 'lumiohub-patient-accounts';
const PROFESSIONALS_KEY = 'lumiohub-professional-accounts';
const HISTORY_STORAGE_KEY = 'lumiohub-screening-history';
const PROFESSIONAL_CASES_KEY = 'lumiohub-professional-cases';

export interface PatientAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  triageAccessGranted: boolean;
  createdAt: string;
}

export interface ProfessionalAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  organization?: string;
  defaultCode: string;
  createdAt: string;
}

interface HistoryMap {
  [email: string]: ScreeningResult[];
}

interface ProfessionalCaseMap {
  [email: string]: ProfessionalCase[];
}

const readJSON = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error(`Erro ao ler dados de ${key}`, error);
    return fallback;
  }
};

const writeJSON = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Erro ao salvar dados de ${key}`, error);
  }
};

const readPatients = (): PatientAccount[] => readJSON<PatientAccount[]>(PATIENTS_KEY, []);
const writePatients = (list: PatientAccount[]) => writeJSON(PATIENTS_KEY, list);

const readProfessionals = (): ProfessionalAccount[] => readJSON<ProfessionalAccount[]>(PROFESSIONALS_KEY, []);
const writeProfessionals = (list: ProfessionalAccount[]) => writeJSON(PROFESSIONALS_KEY, list);

const readHistoryMap = (): HistoryMap => readJSON<HistoryMap>(HISTORY_STORAGE_KEY, {});
const writeHistoryMap = (map: HistoryMap) => writeJSON(HISTORY_STORAGE_KEY, map);

const readProfessionalCaseMap = (): ProfessionalCaseMap => readJSON<ProfessionalCaseMap>(PROFESSIONAL_CASES_KEY, {});
const writeProfessionalCaseMap = (map: ProfessionalCaseMap) => writeJSON(PROFESSIONAL_CASES_KEY, map);

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const generateId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;

const normalizePriorityValue = (priority: string): ProfessionalCase['priority'] => {
  if (!priority) {
    return 'BAIXO';
  }

  const base = typeof priority.normalize === 'function' ? priority.normalize('NFD') : priority;
  const cleaned = base.replace(/[\u0300-\u036f]/g, '').trim().toUpperCase();

  switch (cleaned) {
    case 'ALTO':
    case 'ALTA':
    case 'HIGH':
      return 'ALTO';
    case 'MEDIO':
    case 'MEDIA':
    case 'MEDIUM':
      return 'MÉDIO';
    case 'BAIXO':
    case 'BAIXA':
    case 'LOW':
      return 'BAIXO';
    default:
      return 'BAIXO';
  }
};

export interface RegisterPatientPayload {
  name: string;
  email: string;
  password: string;
  accessCode?: string;
}

export interface RegisterProfessionalPayload {
  name: string;
  email: string;
  password: string;
  organization?: string;
}

export const registerPatient = (payload: RegisterPatientPayload) => {
  const patients = readPatients();
  const email = normalizeEmail(payload.email);

  if (patients.some((patient) => patient.email === email)) {
    return { success: false, message: 'Já existe um paciente cadastrado com este e-mail.' };
  }

  const triageAccessGranted = payload.accessCode?.trim().toUpperCase() === DEMO_TRIAGE_CODE;

  const account: PatientAccount = {
    id: generateId('patient'),
    name: payload.name.trim(),
    email,
    password: payload.password,
    triageAccessGranted,
    createdAt: new Date().toISOString(),
  };

  writePatients([account, ...patients]);

  return { success: true, account };
};

export const registerProfessional = (payload: RegisterProfessionalPayload) => {
  const professionals = readProfessionals();
  const email = normalizeEmail(payload.email);

  if (professionals.some((professional) => professional.email === email)) {
    return { success: false, message: 'Já existe um profissional cadastrado com este e-mail.' };
  }

  const account: ProfessionalAccount = {
    id: generateId('professional'),
    name: payload.name.trim(),
    email,
    password: payload.password,
    organization: payload.organization?.trim(),
    defaultCode: DEMO_TRIAGE_CODE,
    createdAt: new Date().toISOString(),
  };

  writeProfessionals([account, ...professionals]);

  return { success: true, account };
};

export const authenticatePatient = (email: string, password: string): PatientAccount | null => {
  const patients = readPatients();
  const normalized = normalizeEmail(email);
  const account = patients.find((patient) => patient.email === normalized && patient.password === password);
  return account ?? null;
};

export const authenticateProfessional = (email: string, password: string): ProfessionalAccount | null => {
  const professionals = readProfessionals();
  const normalized = normalizeEmail(email);
  const account = professionals.find((professional) => professional.email === normalized && professional.password === password);
  return account ?? null;
};

export const setPatientTriageAccess = (email: string, granted: boolean) => {
  const patients = readPatients();
  const normalized = normalizeEmail(email);
  const updated = patients.map((patient) =>
    patient.email === normalized ? { ...patient, triageAccessGranted: granted } : patient
  );
  writePatients(updated);
};

export const loadScreeningHistory = (email: string): ScreeningResult[] => {
  const map = readHistoryMap();
  const normalized = normalizeEmail(email);
  return map[normalized] ?? [];
};

export const appendScreeningResult = (email: string, result: ScreeningResult): void => {
  const map = readHistoryMap();
  const normalized = normalizeEmail(email);
  const currentHistory = map[normalized] ?? [];
  map[normalized] = [
    {
      ...result,
    },
    ...currentHistory,
  ].slice(0, 10);
  writeHistoryMap(map);
};

export const loadAllScreeningResults = (): ScreeningResult[] => {
  const map = readHistoryMap();
  return Object.values(map).flat();
};

export const getProfessionalAccounts = (): ProfessionalAccount[] => readProfessionals();

export const getPatientAccount = (email: string): PatientAccount | null => {
  const patients = readPatients();
  const normalized = normalizeEmail(email);
  return patients.find((patient) => patient.email === normalized) ?? null;
};

export interface ProfessionalCasePayload {
  patientName: string;
  summary: string;
  priority: 'ALTO' | 'MÉDIO' | 'BAIXO';
  nextStep: string;
}

export const loadProfessionalCases = (email: string): ProfessionalCase[] => {
  if (!email) {
    return [];
  }
  const map = readProfessionalCaseMap();
  const normalizedEmail = normalizeEmail(email);
  const current = map[normalizedEmail] ?? [];
  const normalizedCases = current.map((item) => ({
    ...item,
    priority: normalizePriorityValue(item.priority),
  }));

  map[normalizedEmail] = normalizedCases;
  writeProfessionalCaseMap(map);

  return normalizedCases;
};

export const addProfessionalCase = (email: string, payload: ProfessionalCasePayload): ProfessionalCase[] => {
  const normalizedEmail = normalizeEmail(email);
  const map = readProfessionalCaseMap();
  const current = map[normalizedEmail] ?? [];
  const normalizedPriority = normalizePriorityValue(payload.priority);

  const newCase: ProfessionalCase = {
    id: generateId('case'),
    patientName: payload.patientName.trim(),
    summary: payload.summary.trim(),
    priority: normalizedPriority,
    nextStep: payload.nextStep.trim(),
  };

  const updated = [
    newCase,
    ...current.map((item) => ({
      ...item,
      priority: normalizePriorityValue(item.priority),
    })),
  ];
  map[normalizedEmail] = updated;
  writeProfessionalCaseMap(map);
  return updated;
};

export const removeProfessionalCase = (email: string, caseId: string): ProfessionalCase[] => {
  const normalizedEmail = normalizeEmail(email);
  const map = readProfessionalCaseMap();
  const current = map[normalizedEmail] ?? [];
  const updated = current
    .filter((item) => item.id !== caseId)
    .map((item) => ({
      ...item,
      priority: normalizePriorityValue(item.priority),
    }));
  map[normalizedEmail] = updated;
  writeProfessionalCaseMap(map);
  return updated;
};
