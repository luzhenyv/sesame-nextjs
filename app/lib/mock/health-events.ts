import { HealthEvent } from '../types/health';

export const mockEvents: HealthEvent[] = [
  {
    id: '1',
    title: 'Annual Checkup',
    date: new Date('2024-03-15'),
    content: 'Regular health checkup with Dr. Smith. All vitals normal.',
    category: 'medical',
    familyMemberId: 1,
    attachments: [
      { type: 'pdf', url: '/documents/checkup.pdf' }
    ]
  },
  {
    id: '2',
    title: 'Flu Shot',
    date: new Date('2024-02-20'),
    content: 'Received seasonal flu vaccination at local clinic.',
    category: 'medication',
    familyMemberId: 2
  }
]; 