import React from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogOut, Home, Folder, Briefcase } from 'lucide-react';

export default function DashboardLayout() {
  const { user, loading, logout } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-screen bg-bg-primary font-body">
      {/* Sidebar */}
      <div className="w-64 bg-bg-secondary shadow-raised flex flex-col z-10 relative">
        <div className="p-6">
          <h1 className="text-2xl font-heading font-bold text-primary">CareerVault</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link to="/dashboard" className="flex items-center px-4 py-3 text-heading hover:text-accent hover:bg-bg-primary rounded-md transition-colors">
            <Home className="w-5 h-5 mr-3" /> Dashboard
          </Link>
          <Link to="/dashboard/projects" className="flex items-center px-4 py-3 text-heading hover:text-accent hover:bg-bg-primary rounded-md transition-colors">
            <Folder className="w-5 h-5 mr-3" /> Projects
          </Link>
          <Link to="/dashboard/experience" className="flex items-center px-4 py-3 text-heading hover:text-accent hover:bg-bg-primary rounded-md transition-colors">
            <Briefcase className="w-5 h-5 mr-3" /> Experience
          </Link>
        </nav>
        <div className="p-4 border-t border-camel/20">
          <button onClick={logout} className="flex items-center w-full px-4 py-2 text-semantic-error hover:bg-bg-primary rounded-md transition-colors font-medium">
            <LogOut className="w-5 h-5 mr-3" /> Logout
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-bg-primary">
        <header className="bg-bg-secondary p-6 shadow-sm flex justify-between items-center">
          <h2 className="text-xl font-heading font-semibold text-heading">Welcome back, {user.username}</h2>
        </header>
        <main className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
