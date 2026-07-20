import React, { useState } from 'react';
import { Outlet, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LayoutDashboard, Folder, Briefcase, LogOut, Award, FileText, Microscope, Bookmark, Settings as SettingsIcon, Search as SearchIcon } from 'lucide-react';

export default function DashboardLayout() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/dashboard/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

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
          <NavLink to="/dashboard" className={({ isActive }) => `flex items-center px-4 py-3 rounded-button font-medium transition-all ${isActive ? 'bg-primary/10 text-primary shadow-pressed' : 'text-heading hover:bg-bg-primary hover:shadow-raised'}`}>
            <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
          </NavLink>
          <NavLink to="/dashboard/projects" className={({ isActive }) => `flex items-center px-4 py-3 rounded-button font-medium transition-all ${isActive ? 'bg-primary/10 text-primary shadow-pressed' : 'text-heading hover:bg-bg-primary hover:shadow-raised'}`}>
            <Folder className="w-5 h-5 mr-3" /> Projects
          </NavLink>
          <NavLink to="/dashboard/experience" className={({ isActive }) => `flex items-center px-4 py-3 rounded-button font-medium transition-all ${isActive ? 'bg-primary/10 text-primary shadow-pressed' : 'text-heading hover:bg-bg-primary hover:shadow-raised'}`}>
            <Briefcase className="w-5 h-5 mr-3" /> Experience
          </NavLink>
          <NavLink to="/dashboard/skills" className={({ isActive }) => `flex items-center px-4 py-3 rounded-button font-medium transition-all ${isActive ? 'bg-primary/10 text-primary shadow-pressed' : 'text-heading hover:bg-bg-primary hover:shadow-raised'}`}>
            <Award className="w-5 h-5 mr-3" /> Skills
          </NavLink>
          <NavLink to="/dashboard/achievements" className={({ isActive }) => `flex items-center px-4 py-3 rounded-button font-medium transition-all ${isActive ? 'bg-primary/10 text-primary shadow-pressed' : 'text-heading hover:bg-bg-primary hover:shadow-raised'}`}>
            <Bookmark className="w-5 h-5 mr-3" /> Achievements
          </NavLink>
          <NavLink to="/dashboard/research" className={({ isActive }) => `flex items-center px-4 py-3 rounded-button font-medium transition-all ${isActive ? 'bg-primary/10 text-primary shadow-pressed' : 'text-heading hover:bg-bg-primary hover:shadow-raised'}`}>
            <Microscope className="w-5 h-5 mr-3" /> Research
          </NavLink>
          <NavLink to="/dashboard/resume-assets" className={({ isActive }) => `flex items-center px-4 py-3 rounded-button font-medium transition-all ${isActive ? 'bg-primary/10 text-primary shadow-pressed' : 'text-heading hover:bg-bg-primary hover:shadow-raised'}`}>
            <FileText className="w-5 h-5 mr-3" /> Resume Assets
          </NavLink>
        </nav>
        <div className="p-4 border-t border-camel/20 space-y-2">
          <NavLink to="/dashboard/settings" className={({ isActive }) => `flex items-center w-full px-4 py-2 rounded-md transition-colors font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-heading/80 hover:bg-bg-primary'}`}>
            <SettingsIcon className="w-5 h-5 mr-3" /> Settings
          </NavLink>
          <button onClick={logout} className="flex items-center w-full px-4 py-2 text-semantic-error hover:bg-bg-primary rounded-md transition-colors font-medium">
            <LogOut className="w-5 h-5 mr-3" /> Logout
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-bg-primary">
        <header className="bg-bg-secondary p-6 shadow-sm flex justify-between items-center h-20">
          <h2 className="text-xl font-heading font-semibold text-heading hidden md:block">Welcome back, {user.username}</h2>
          
          <form onSubmit={handleSearch} className="relative w-full max-w-md ml-auto">
            <input 
              type="text" 
              placeholder="Search anything..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-bg-primary rounded-full shadow-pressed outline-none focus:ring-2 focus:ring-primary/20 text-heading text-sm"
            />
            <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-heading/40" />
            <button type="submit" className="hidden">Search</button>
          </form>
        </header>
        <main className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
