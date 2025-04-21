import { HealthEvent, HealthEventCategory } from '../types/health';

export const getCategoryIconClass = (category: HealthEventCategory): string => {
  switch (category) {
    case 'medical':
      return 'lucide-file-text';
    case 'appointment':
      return 'lucide-calendar';
    case 'medication':
      return 'lucide-file-text';
    default:
      return 'lucide-file-text';
  }
};

export const getEventColor = (category: HealthEventCategory) => {
  switch (category) {
    case 'medical':
      return 'bg-blue-100 text-blue-800';
    case 'appointment':
      return 'bg-green-100 text-green-800';
    case 'medication':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const filterEvents = (
  events: HealthEvent[],
  selectedMember: number | null,
  searchQuery: string,
  dateRange: { start: string; end: string }
) => {
  let result = [...events];

  if (selectedMember) {
    result = result.filter(event => event.familyMemberId === selectedMember);
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    result = result.filter(event => 
      event.title.toLowerCase().includes(query) ||
      event.content.toLowerCase().includes(query)
    );
  }

  if (dateRange.start || dateRange.end) {
    result = result.filter(event => {
      const eventDate = event.date.getTime();
      const startDate = dateRange.start ? new Date(dateRange.start).getTime() : 0;
      const endDate = dateRange.end ? new Date(dateRange.end).getTime() : Infinity;
      return eventDate >= startDate && eventDate <= endDate;
    });
  }

  return result.sort((a, b) => b.date.getTime() - a.date.getTime());
}; 