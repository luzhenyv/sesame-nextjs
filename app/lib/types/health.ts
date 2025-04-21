export type HealthEventCategory = 'medical' | 'appointment' | 'medication' | 'other';

export interface HealthEventAttachment {
  type: 'image' | 'pdf' | 'audio';
  url: string;
}

export interface HealthEvent {
  id: string;
  title: string;
  date: Date;
  content: string;
  category: HealthEventCategory;
  familyMemberId: number;
  attachments?: HealthEventAttachment[];
}

export interface EventFormData {
  title: string;
  date: string;
  content: string;
  category: HealthEventCategory;
  familyMemberId: number;
  attachments: File[];
}

export interface DateRange {
  start: string;
  end: string;
} 