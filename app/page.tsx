'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserCircle, Heart, Activity, Calendar } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsAuthenticated(isLoggedIn);
  }, []);
  
  return (
    <div className="min-h-screen p-6 bg-accent/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Health Management Dashboard</h1>
          <p className="text-secondary max-w-2xl mx-auto">
            Welcome to your health management platform. Track your family's health, set reminders, and manage appointments all in one place.
          </p>
        </div>
        
        {!isAuthenticated ? (
          <div className="bg-background rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Get Started</h2>
            <p className="text-secondary mb-6">
              Please log in to access your health management dashboard and family information.
            </p>
            <button
              onClick={() => router.push('/login')}
              className="py-2 px-6 bg-primary text-background rounded-md hover:opacity-90 transition-opacity"
            >
              Login
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Family Card */}
            <div className="bg-background rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                  <UserCircle className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Family</h2>
              </div>
              <p className="text-secondary mb-4">
                Manage your family members and their health profiles.
              </p>
              <button
                onClick={() => router.push('/family')}
                className="text-primary hover:opacity-80 transition-opacity"
              >
                View Family →
              </button>
            </div>
            
            {/* Health Metrics Card */}
            <div className="bg-background rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Health Metrics</h2>
              </div>
              <p className="text-secondary mb-4">
                Track vital signs, medications, and health goals.
              </p>
              <button
                className="text-primary hover:opacity-80 transition-opacity"
              >
                View Metrics →
              </button>
            </div>
            
            {/* Appointments Card */}
            <div className="bg-background rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Appointments</h2>
              </div>
              <p className="text-secondary mb-4">
                Schedule and manage upcoming medical appointments.
              </p>
              <button
                className="text-primary hover:opacity-80 transition-opacity"
              >
                View Appointments →
              </button>
            </div>
            
            {/* Profile Card */}
            <div className="bg-background rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Your Profile</h2>
              </div>
              <p className="text-secondary mb-4">
                Update your personal information and preferences.
              </p>
              <button
                onClick={() => router.push('/profile')}
                className="text-primary hover:opacity-80 transition-opacity"
              >
                View Profile →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
