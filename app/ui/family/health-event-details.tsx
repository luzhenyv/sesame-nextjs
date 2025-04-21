'use client';

import { HealthEvent } from '@/app/lib/types/health';
import { Image, FileText, Mic, X, Edit2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface HealthEventDetailsProps {
  event: HealthEvent;
  onClose: () => void;
  onEdit: (event: HealthEvent) => void;
  onDelete: (event: HealthEvent) => void;
}

export function HealthEventDetails({ event, onClose, onEdit, onDelete }: HealthEventDetailsProps) {
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
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
              <div className="flex items-center space-x-4 text-secondary">
                <span>{event.date.toLocaleDateString()}</span>
                <span className="px-2 py-1 rounded-full bg-accent/10 text-xs">
                  {event.category}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button 
                className="p-2 hover:bg-accent/10 rounded-full"
                onClick={() => onEdit(event)}
              >
                <Edit2 className="h-5 w-5" />
              </button>
              <button 
                className="p-2 hover:bg-accent/10 rounded-full"
                onClick={() => onDelete(event)}
              >
                <Trash2 className="h-5 w-5" />
              </button>
              <button 
                className="p-2 hover:bg-accent/10 rounded-full"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="prose max-w-none mb-6">
            <p>{event.content}</p>
          </div>

          {event.attachments && event.attachments.length > 0 && (
            <div className="border-t border-accent/20 pt-4">
              <h3 className="text-lg font-medium mb-3">Attachments</h3>
              <div className="grid grid-cols-2 gap-4">
                {event.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 bg-accent/5 rounded-lg">
                    {attachment.type === 'image' && <Image className="h-5 w-5" />}
                    {attachment.type === 'pdf' && <FileText className="h-5 w-5" />}
                    {attachment.type === 'audio' && <Mic className="h-5 w-5" />}
                    <span className="text-sm truncate">{attachment.url.split('/').pop()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
} 