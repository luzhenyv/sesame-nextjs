'use client';

import { HealthEvent } from '@/app/lib/types/health';
import { getCategoryIconClass, getEventColor } from '@/app/lib/utils/health';
import { Image, FileText, Mic } from 'lucide-react';

interface HealthEventCardProps {
  event: HealthEvent;
  onClick: (event: HealthEvent) => void;
  index: number;
}

export function HealthEventCard({ event, onClick, index }: HealthEventCardProps) {
  return (
    <div className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
      <div className="w-1/2">
        <div 
          className="bg-background p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
          onClick={() => onClick(event)}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-secondary">
              {event.date.toLocaleDateString()}
            </span>
            <div className="flex items-center space-x-2">
              {event.attachments?.map((attachment, i) => (
                <span key={i} className="text-accent">
                  {attachment.type === 'image' && <Image className="h-4 w-4" />}
                  {attachment.type === 'pdf' && <FileText className="h-4 w-4" />}
                  {attachment.type === 'audio' && <Mic className="h-4 w-4" />}
                </span>
              ))}
            </div>
          </div>
          <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">
            {event.title}
          </h3>
          <p className="text-sm text-secondary line-clamp-2">{event.content}</p>
          <div className="mt-2 flex items-center space-x-2">
            <span className={`text-xs px-2 py-1 rounded-full ${getEventColor(event.category)}`}>
              {event.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 