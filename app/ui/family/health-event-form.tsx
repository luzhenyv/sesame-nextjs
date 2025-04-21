'use client';

import { EventFormData } from '@/app/lib/types/health';
import { X, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

interface HealthEventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  formData: EventFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing: boolean;
}

export function HealthEventForm({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onInputChange,
  onFileChange,
  isEditing
}: HealthEventFormProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-background rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <form onSubmit={onSubmit} className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              {isEditing ? 'Edit Event' : 'Add New Event'}
            </h2>
            <button
              type="button"
              className="p-2 hover:bg-accent/10 rounded-full"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={onInputChange}
                className="w-full px-3 py-2 rounded-md border border-accent/20 bg-background"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={onInputChange}
                className="w-full px-3 py-2 rounded-md border border-accent/20 bg-background"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={onInputChange}
                className="w-full px-3 py-2 rounded-md border border-accent/20 bg-background"
                required
              >
                <option value="medical">Medical</option>
                <option value="appointment">Appointment</option>
                <option value="medication">Medication</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Family Member</label>
              <select
                name="familyMemberId"
                value={formData.familyMemberId}
                onChange={onInputChange}
                className="w-full px-3 py-2 rounded-md border border-accent/20 bg-background"
                required
              >
                <option value="1">Demo User</option>
                <option value="2">Spouse</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={onInputChange}
                rows={4}
                className="w-full px-3 py-2 rounded-md border border-accent/20 bg-background"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Attachments</label>
              <div className="border-2 border-dashed border-accent/20 rounded-md p-4 text-center">
                <input
                  type="file"
                  multiple
                  onChange={onFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="h-8 w-8 mb-2 text-accent" />
                  <span className="text-sm text-secondary">
                    Drag and drop files here or click to upload
                  </span>
                </label>
              </div>
              {formData.attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {formData.attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-accent/5 rounded">
                      <span className="text-sm truncate">{file.name}</span>
                      <button
                        type="button"
                        className="text-accent hover:text-accent/80"
                        onClick={() => {
                          onInputChange({
                            target: {
                              name: 'attachments',
                              value: formData.attachments.filter((_, i) => i !== index)
                            }
                          } as any);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 rounded-md border border-accent/20 hover:bg-accent/5"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-primary text-background hover:opacity-90"
            >
              {isEditing ? 'Save Changes' : 'Add Event'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
} 