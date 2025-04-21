'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserCircle, Plus, Edit2, Trash2, ChevronDown, ChevronUp, LogOut } from 'lucide-react';
import EditProfileModal from '../ui/profile/edit-profile-modal';
import FamilyMemberModal from '../ui/profile/family-member-modal';
import { User, FamilyMember } from '../lib/definitions';

export default function ProfilePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [managerProfile, setManagerProfile] = useState<User>({
    id: '1',
    name: 'Demo User',
    email: 'user@example.com',
    role: 'manager',
    gender: 'Male',
    birthDate: '1990-01-01',
    address: '123 Health St, Wellness City',
    language: 'English',
    description: 'Primary health manager for the family',
  });
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: '1',
      name: 'Spouse',
      relationship: 'Spouse',
      healthScore: 85,
      age: 35,
      gender: 'Female',
      bloodType: 'A+',
      allergies: ['Pollen', 'Peanuts'],
      medications: ['Vitamin D', 'Omega-3'],
      conditions: ['Seasonal Allergies'],
      isExpanded: false,
    },
  ]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsAuthenticated(isLoggedIn);
    
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };

  const toggleMemberExpansion = (id: string) => {
    setFamilyMembers(members =>
      members.map(member =>
        member.id === id
          ? { ...member, isExpanded: !member.isExpanded }
          : member
      )
    );
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleSaveProfile = (data: Omit<User, 'id' | 'role'>) => {
    setManagerProfile(prev => ({
      ...prev,
      ...data
    }));
    setIsEditingProfile(false);
  };

  const handleAddMember = () => {
    setIsAddingMember(true);
  };

  const handleEditMember = (member: FamilyMember) => {
    setEditingMember(member);
  };

  const handleDeleteMember = (id: string) => {
    if (window.confirm('Are you sure you want to delete this family member?')) {
      setFamilyMembers(members => members.filter(member => member.id !== id));
    }
  };

  const handleSaveMember = (data: Omit<FamilyMember, 'id' | 'isExpanded' | 'healthScore'>) => {
    if (editingMember) {
      setFamilyMembers(members =>
        members.map(member =>
          member.id === editingMember.id
            ? { ...data, id: member.id, isExpanded: member.isExpanded, healthScore: member.healthScore }
            : member
        )
      );
      setEditingMember(null);
    } else {
      const newMember: FamilyMember = {
        ...data,
        id: Date.now().toString(),
        isExpanded: false,
        healthScore: 85, // Default health score for new members
      };
      setFamilyMembers(members => [...members, newMember]);
      setIsAddingMember(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen p-6 bg-accent/10">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Manager Profile Card */}
        <div className="bg-background rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-accent relative">
                <UserCircle className="w-full h-full text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{managerProfile.name}</h1>
                <p className="text-secondary">{managerProfile.email}</p>
              </div>
            </div>
            <button
              onClick={handleEditProfile}
              className="flex items-center space-x-2 py-2 px-4 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
            >
              <Edit2 className="h-4 w-4" />
              <span>Edit Profile</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Gender
              </label>
              <p className="text-foreground">{managerProfile.gender}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Birth Date
              </label>
              <p className="text-foreground">{managerProfile.birthDate}</p>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-secondary mb-1">
                Address
              </label>
              <p className="text-foreground">{managerProfile.address}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Language
              </label>
              <p className="text-foreground">{managerProfile.language}</p>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-secondary mb-1">
                Description
              </label>
              <p className="text-foreground">{managerProfile.description}</p>
            </div>
          </div>
        </div>

        {/* Family Members Section */}
        <div className="bg-background rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Family Members</h2>
            <div className="text-sm text-secondary">
              {familyMembers.length}/10 members
            </div>
          </div>

          <div className="space-y-4">
            {familyMembers.map((member) => (
              <div
                key={member.id}
                className="border border-accent/20 rounded-lg overflow-hidden"
              >
                <div
                  className="p-4 cursor-pointer hover:bg-accent/5 transition-colors"
                  onClick={() => toggleMemberExpansion(member.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-accent">
                        <UserCircle className="w-full h-full text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-secondary">
                          {member.relationship} • {member.age} years
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditMember(member);
                        }}
                        className="p-2 hover:bg-accent/10 rounded-full"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteMember(member.id);
                        }}
                        className="p-2 hover:bg-accent/10 rounded-full"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      {member.isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </div>

                {member.isExpanded && (
                  <div className="border-t border-accent/20 p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary mb-1">
                          Gender
                        </label>
                        <p className="text-foreground">{member.gender}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary mb-1">
                          Blood Type
                        </label>
                        <p className="text-foreground">{member.bloodType}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary mb-1">
                          Allergies
                        </label>
                        <p className="text-foreground">
                          {member.allergies.join(', ')}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary mb-1">
                          Health Score
                        </label>
                        <p className="text-foreground">
                          {member.healthScore}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-secondary mb-1">
                          Medications
                        </label>
                        <p className="text-foreground">
                          {member.medications.join(', ')}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-secondary mb-1">
                          Conditions
                        </label>
                        <p className="text-foreground">
                          {member.conditions.join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleAddMember}
            className="mt-6 flex items-center space-x-2 py-2 px-4 bg-primary text-background rounded-md hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" />
            <span>Add Family Member</span>
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 py-2 px-4 bg-critical/10 text-critical rounded-md hover:bg-critical/20 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* Modals */}
      <EditProfileModal
        isOpen={isEditingProfile}
        onClose={() => setIsEditingProfile(false)}
        initialData={managerProfile}
        onSave={handleSaveProfile}
      />

      <FamilyMemberModal
        isOpen={isAddingMember || !!editingMember}
        onClose={() => {
          setIsAddingMember(false);
          setEditingMember(null);
        }}
        initialData={editingMember || undefined}
        onSave={handleSaveMember}
        isEditing={!!editingMember}
      />
    </div>
  );
} 