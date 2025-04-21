'use client';

import { useState, useMemo } from 'react';
import { Plus, Filter, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockEvents } from '@/app/lib/mock/health-events';
import { filterEvents } from '@/app/lib/utils/health';
import { HealthEvent, EventFormData } from '@/app/lib/types/health';
import { HealthEventCard } from './health-event-card';
import { HealthEventForm } from './health-event-form';
import { HealthEventDetails } from './health-event-details';

export default function HealthTimeline() {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<HealthEvent | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    content: '',
    category: 'medical',
    familyMemberId: 1,
    attachments: []
  });

  const filteredEvents = useMemo(() => {
    return filterEvents(mockEvents, selectedMember, searchQuery, dateRange);
  }, [selectedMember, searchQuery, dateRange]);

  const handleEventClick = (event: HealthEvent) => {
    setSelectedEvent(event);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };

  const handleFormOpen = (event?: HealthEvent) => {
    if (event) {
      setIsEditing(true);
      setFormData({
        title: event.title,
        date: event.date.toISOString().split('T')[0],
        content: event.content,
        category: event.category,
        familyMemberId: event.familyMemberId,
        attachments: []
      });
    } else {
      setIsEditing(false);
      setFormData({
        title: '',
        date: new Date().toISOString().split('T')[0],
        content: '',
        category: 'medical',
        familyMemberId: 1,
        attachments: []
      });
    }
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedEvent(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        attachments: Array.from(e.target.files as FileList)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    handleFormClose();
  };

  const handleDeleteEvent = (event: HealthEvent) => {
    // TODO: Implement delete logic
    handleClosePopup();
  };

  return (
    <div className="mt-8">
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Health Event Timeline</h2>
          <div className="flex items-center space-x-4">
            <button
              className="flex items-center space-x-2 p-2 hover:bg-accent/10 rounded-md"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
            <button 
              className="flex items-center space-x-2 py-2 px-4 bg-primary text-background rounded-md hover:opacity-90 transition-opacity"
              onClick={() => handleFormOpen()}
            >
              <Plus className="h-4 w-4" />
              <span>Add Event</span>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-accent/20 bg-background"
            />
          </div>
          <select
            className="px-3 py-2 rounded-md border border-accent/20 bg-background"
            value={selectedMember || ''}
            onChange={(e) => setSelectedMember(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">All Members</option>
            <option value="1">Demo User</option>
            <option value="2">Spouse</option>
          </select>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center space-x-4 p-4 bg-accent/5 rounded-md"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="px-3 py-2 rounded-md border border-accent/20 bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="px-3 py-2 rounded-md border border-accent/20 bg-background"
              />
            </div>
            <button
              className="mt-6 px-3 py-2 text-sm text-secondary hover:text-primary"
              onClick={() => setDateRange({ start: '', end: '' })}
            >
              Clear Dates
            </button>
          </motion.div>
        )}
      </div>

      <div className="relative">
        <div className="absolute left-1/2 w-0.5 h-full bg-accent/20" />

        <div className="space-y-8">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-8 text-secondary">
              No events found matching your criteria
            </div>
          ) : (
            filteredEvents.map((event, index) => (
              <HealthEventCard
                key={event.id}
                event={event}
                onClick={handleEventClick}
                index={index}
              />
            ))
          )}
        </div>
      </div>

      {selectedEvent && (
        <HealthEventDetails
          event={selectedEvent}
          onClose={handleClosePopup}
          onEdit={handleFormOpen}
          onDelete={handleDeleteEvent}
        />
      )}

      <HealthEventForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleSubmit}
        formData={formData}
        onInputChange={handleInputChange}
        onFileChange={handleFileChange}
        isEditing={isEditing}
      />
    </div>
  );
} 