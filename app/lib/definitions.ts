export type User = {
    id: string;
    name: string;
    email: string;
    role: string;
    gender: string;
    birthDate: string;
    address: string;
    language: string;
    description?: string;
};

export type FamilyMember = {
    id: string;
    name: string;
    relationship: string;
    healthScore: number;
    age: number;
    gender: string;
    bloodType?: string;
    allergies: string[];
    medications: string[];
    conditions: string[];
    address?: string;
    isExpanded: boolean;
};

export type HealthEvent = {
    id: string;
    title: string;
    type: 'CHECKUP' | 'MEDICATION' | 'SYMPTOM';
    date: string;
    description: string;
};