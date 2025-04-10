'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserCircle, Plus } from 'lucide-react';

export default function FamilyPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsAuthenticated(isLoggedIn);
    
    // Redirect to login if not authenticated
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [router]);
  
  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }
  
  // Mock family members data
  const familyMembers = [
    { id: 1, name: 'Demo User', role: 'Primary', age: 35 },
    { id: 2, name: 'Spouse', role: 'Spouse', age: 33 },
    { id: 3, name: 'Child 1', role: 'Child', age: 8 },
    { id: 4, name: 'Child 2', role: 'Child', age: 5 },
  ];
  
  return (
    <div className="min-h-screen p-6 bg-accent/10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Family Members</h1>
          <button className="flex items-center space-x-2 py-2 px-4 bg-primary text-background rounded-md hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" />
            <span>Add Member</span>
          </button>
        </div>
        
        <div className="bg-background rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-accent/20">
              <thead className="bg-accent/5">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                    Member
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                    Age
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-accent/20">
                {familyMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-accent/5">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full overflow-hidden bg-accent mr-3">
                          <UserCircle className="h-full w-full text-primary" />
                        </div>
                        <div className="text-sm font-medium">{member.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">{member.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">{member.age}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-primary hover:opacity-80">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}