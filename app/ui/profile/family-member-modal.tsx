'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { z } from 'zod';

const familyMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  relationship: z.string().min(1, 'Relationship is required'),
  age: z.number().min(0, 'Age must be a positive number'),
  gender: z.string().min(1, 'Gender is required'),
  bloodType: z.string().optional(),
  allergies: z.array(z.string()).default([]),
  medications: z.array(z.string()).default([]),
  conditions: z.array(z.string()).default([]),
  address: z.string().optional(),
});

type FamilyMemberFormData = z.infer<typeof familyMemberSchema>;

interface FamilyMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: FamilyMemberFormData;
  onSave: (data: FamilyMemberFormData) => void;
  isEditing?: boolean;
}

export default function FamilyMemberModal({
  isOpen,
  onClose,
  initialData,
  onSave,
  isEditing = false,
}: FamilyMemberModalProps) {
  const defaultData: FamilyMemberFormData = {
    name: '',
    relationship: '',
    age: 0,
    gender: '',
    bloodType: '',
    allergies: [],
    medications: [],
    conditions: [],
    address: '',
  };

  const [formData, setFormData] = useState<FamilyMemberFormData>(
    initialData || defaultData
  );
  const [errors, setErrors] = useState<Partial<Record<keyof FamilyMemberFormData, string>>>({});
  const [newAllergy, setNewAllergy] = useState('');
  const [newMedication, setNewMedication] = useState('');
  const [newCondition, setNewCondition] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = familyMemberSchema.parse(formData);
      onSave(validatedData);
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof FamilyMemberFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof FamilyMemberFormData] = err.message;
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
    if (errors[name as keyof FamilyMemberFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
    if (errors[name as keyof FamilyMemberFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const addItem = (type: 'allergies' | 'medications' | 'conditions', value: string) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [type]: [...prev[type], value.trim()],
      }));
    }
  };

  const removeItem = (type: 'allergies' | 'medications' | 'conditions', index: number) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-accent/20 sticky top-0 bg-background">
          <h2 className="text-xl font-semibold">
            {isEditing ? 'Edit Family Member' : 'Add Family Member'}
          </h2>
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
                Relationship *
              </label>
              <select
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-md border ${
                  errors.relationship ? 'border-critical' : 'border-accent/20'
                } bg-background`}
              >
                <option value="">Select relationship</option>
                <option value="Spouse">Spouse</option>
                <option value="Child">Child</option>
                <option value="Parent">Parent</option>
                <option value="Sibling">Sibling</option>
                <option value="Other">Other</option>
              </select>
              {errors.relationship && (
                <p className="mt-1 text-sm text-critical">{errors.relationship}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Age *
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleNumberChange}
                min="0"
                className={`w-full px-3 py-2 rounded-md border ${
                  errors.age ? 'border-critical' : 'border-accent/20'
                } bg-background`}
              />
              {errors.age && (
                <p className="mt-1 text-sm text-critical">{errors.age}</p>
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
                Blood Type
              </label>
              <select
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-accent/20 bg-background"
              >
                <option value="">Select blood type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-secondary mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-accent/20 bg-background"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-secondary mb-1">
                Allergies
              </label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-md border border-accent/20 bg-background"
                  placeholder="Add new allergy"
                />
                <button
                  type="button"
                  onClick={() => {
                    addItem('allergies', newAllergy);
                    setNewAllergy('');
                  }}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.allergies.map((allergy, index) => (
                  <span
                    key={index}
                    className="flex items-center space-x-1 px-3 py-1 bg-accent/10 rounded-full"
                  >
                    <span>{allergy}</span>
                    <button
                      type="button"
                      onClick={() => removeItem('allergies', index)}
                      className="text-secondary hover:text-foreground"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-secondary mb-1">
                Medications
              </label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={newMedication}
                  onChange={(e) => setNewMedication(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-md border border-accent/20 bg-background"
                  placeholder="Add new medication"
                />
                <button
                  type="button"
                  onClick={() => {
                    addItem('medications', newMedication);
                    setNewMedication('');
                  }}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.medications.map((medication, index) => (
                  <span
                    key={index}
                    className="flex items-center space-x-1 px-3 py-1 bg-accent/10 rounded-full"
                  >
                    <span>{medication}</span>
                    <button
                      type="button"
                      onClick={() => removeItem('medications', index)}
                      className="text-secondary hover:text-foreground"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-secondary mb-1">
                Conditions
              </label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-md border border-accent/20 bg-background"
                  placeholder="Add new condition"
                />
                <button
                  type="button"
                  onClick={() => {
                    addItem('conditions', newCondition);
                    setNewCondition('');
                  }}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.conditions.map((condition, index) => (
                  <span
                    key={index}
                    className="flex items-center space-x-1 px-3 py-1 bg-accent/10 rounded-full"
                  >
                    <span>{condition}</span>
                    <button
                      type="button"
                      onClick={() => removeItem('conditions', index)}
                      className="text-secondary hover:text-foreground"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
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
              {isEditing ? 'Save Changes' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 