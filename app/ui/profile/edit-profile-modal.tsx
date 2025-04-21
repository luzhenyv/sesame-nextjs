'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { z } from 'zod';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  gender: z.string().min(1, 'Gender is required'),
  birthDate: z.string().min(1, 'Birth date is required'),
  address: z.string().min(1, 'Address is required'),
  language: z.string().min(1, 'Language is required'),
  description: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: ProfileFormData;
  onSave: (data: ProfileFormData) => void;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  initialData,
  onSave,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState<ProfileFormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof ProfileFormData, string>>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = profileSchema.parse(formData);
      onSave(validatedData);
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ProfileFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof ProfileFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ProfileFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center p-6 border-b border-accent/20">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent/10 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-md border ${
                  errors.name ? 'border-critical' : 'border-accent/20'
                } bg-background`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-critical">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-md border ${
                  errors.email ? 'border-critical' : 'border-accent/20'
                } bg-background`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-critical">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Gender *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-md border ${
                  errors.gender ? 'border-critical' : 'border-accent/20'
                } bg-background`}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <p className="mt-1 text-sm text-critical">{errors.gender}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Birth Date *
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-md border ${
                  errors.birthDate ? 'border-critical' : 'border-accent/20'
                } bg-background`}
              />
              {errors.birthDate && (
                <p className="mt-1 text-sm text-critical">{errors.birthDate}</p>
              )}
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-secondary mb-1">
                Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-md border ${
                  errors.address ? 'border-critical' : 'border-accent/20'
                } bg-background`}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-critical">{errors.address}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Language *
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-md border ${
                  errors.language ? 'border-critical' : 'border-accent/20'
                } bg-background`}
              >
                <option value="">Select language</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Chinese">Chinese</option>
              </select>
              {errors.language && (
                <p className="mt-1 text-sm text-critical">{errors.language}</p>
              )}
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-secondary mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 rounded-md border border-accent/20 bg-background"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-accent/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-secondary hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-background rounded-md hover:opacity-90"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 