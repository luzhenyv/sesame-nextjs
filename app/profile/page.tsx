'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserCircle, LogOut } from 'lucide-react';

export default function ProfilePage() {
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
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };
  
  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="min-h-screen p-6 bg-accent/10">
      <div className="max-w-2xl mx-auto bg-background rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-accent">
            <UserCircle className="w-full h-full text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">User Profile</h1>
            <p className="text-secondary">user@example.com</p>
          </div>
        </div>
        
        <div className="border-t border-accent/20 pt-6">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Name
              </label>
              <p className="text-foreground">Demo User</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Email
              </label>
              <p className="text-foreground">user@example.com</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Account Type
              </label>
              <p className="text-foreground">Standard</p>
            </div>
          </div>
          
          <div className="mt-8">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 py-2 px-4 bg-critical/10 text-critical rounded-md hover:bg-critical/20 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 