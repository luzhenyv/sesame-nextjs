export type User = {
    id: string;
    name: string;
    email: string;
    role: string;
};

export type FamilyMember = {
    id: string;
    name: string;
    relationship: string;
    healthScore: number;
};

export type HealthEvent = {
    id: string;
    title: string;
    type: 'CHECKUP' | 'MEDICATION' | 'SYMPTOM';
    date: string;
    description: string;
};