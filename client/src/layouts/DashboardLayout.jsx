import React, { useState } from 'react';
import { Outlet, Navigate, NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LayoutDashboard, Folder, Briefcase, LogOut, Award, FileText, Microscope, Bookmark, Settings as SettingsIcon, Search as SearchIcon, ArrowLeft } from 'lucide-react';

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

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-bg-primary">
      <div className="animate-pulse font-heading text-heading/50 text-lg">Loading CareerVault...</div>
    </div>
  );
  
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-screen bg-bg-primary font-body text-heading">
      {/* Sidebar */}
      <div className="w-64 bg-bg-secondary border-r border-border flex flex-col z-10 relative">
        <div className="p-6 border-b border-border h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-xl font-heading font-bold text-primary tracking-tight">CareerVault</h1>
          </Link>
          <Link to="/" className="text-[10px] uppercase font-bold text-heading/40 hover:text-primary transition-colors flex items-center">
            <ArrowLeft className="w-3 h-3 mr-1" /> Home
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <NavLink to="/dashboard" end className={({ isActive }) => `flex items-center px-4 py-3 rounded-button font-medium border text-sm transition-all duration-200 ${isActive ? 'bg-primary/5 border-primary/20 text-primary font-semibold' : 'border-transparent text-heading/70 hover:bg-primary/5 hover:text-primary'}`}>
            <LayoutDashboard className="w-4 h-4 mr-3" /> Dashboard
          </NavLink>
          <NavLink to="/dashboard/projects" className={({ isActive }) => `flex items-center px-4 py-3 rounded-button font-medium border text-sm transition-all duration-200 ${isActive ? 'bg-primary/5 border-primary/20 text-primary font-semibold' : 'border-transparent text-heading/70 hover:bg-primary/5 hover:text-primary'}`}>
            <Folder className="w-4 h-4 mr-3" /> Projects
          </NavLink>
          <NavLink to="/dashboard/experience" className={({ isActive }) => `flex items-center px-4 py-3 rounded-button font-medium border text-sm transition-all duration-200 ${isActive ? 'bg-primary/5 border-primary/20 text-primary font-semibold' : 'border-transparent text-heading/70 hover:bg-primary/5 hover:text-primary'}`}>
            <Briefcase className="w-4 h-4 mr-3" /> Experience
          </NavLink>
          <NavLink to="/dashboard/skills" className={({ isActive }) => `flex items-center px-4 py-3 rounded-button font-medium border text-sm transition-all duration-200 ${isActive ? 'bg-primary/5 border-primary/20 text-primary font-semibold' : 'border-transparent text-heading/70 hover:bg-primary/5 hover:text-primary'}`}>
            <Award className="w-4 h-4 mr-3" /> Skills
          </NavLink>
          <NavLink to="/dashboard/achievements" className={({ isActive }) => `flex items-center px-4 py-3 rounded-button font-medium border text-sm transition-all duration-200 ${isActive ? 'bg-primary/5 border-primary/20 text-primary font-semibold' : 'border-transparent text-heading/70 hover:bg-primary/5 hover:text-primary'}`}>
            <Bookmark className="w-4 h-4 mr-3" /> Achievements
          </NavLink>
          <NavLink to="/dashboard/research" className={({ isActive }) => `flex items-center px-4 py-3 rounded-button font-medium border text-sm transition-all duration-200 ${isActive ? 'bg-primary/5 border-primary/20 text-primary font-semibold' : 'border-transparent text-heading/70 hover:bg-primary/5 hover:text-primary'}`}>
            <Microscope className="w-4 h-4 mr-3" /> Research
          </NavLink>
          <NavLink to="/dashboard/resume-assets" className={({ isActive }) => `flex items-center px-4 py-3 rounded-button font-medium border text-sm transition-all duration-200 ${isActive ? 'bg-primary/5 border-primary/20 text-primary font-semibold' : 'border-transparent text-heading/70 hover:bg-primary/5 hover:text-primary'}`}>
            <FileText className="w-4 h-4 mr-3" /> Resume Assets
          </NavLink>
        </nav>
        <div className="p-4 border-t border-border space-y-1">
          <NavLink to="/dashboard/settings" className={({ isActive }) => `flex items-center w-full px-4 py-2.5 rounded-button text-sm transition-colors font-medium border ${isActive ? 'bg-primary/5 border-primary/20 text-primary' : 'border-transparent text-heading/70 hover:bg-primary/5 hover:text-primary'}`}>
            <SettingsIcon className="w-4 h-4 mr-3" /> Settings
          </NavLink>
          <button onClick={logout} className="flex items-center w-full px-4 py-2.5 text-semantic-error hover:bg-semantic-error/5 border border-transparent hover:border-semantic-error/10 rounded-button transition-colors font-medium text-sm text-editorial">
            <LogOut className="w-4 h-4 mr-3" /> Logout
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-bg-primary flex flex-col">
        <header className="bg-bg-secondary border-b border-border px-8 flex justify-between items-center h-20 shrink-0">
          <h2 className="text-xl font-heading font-semibold text-heading hidden md:block">
            Welcome back, {user?.username ? user.username.charAt(0).toUpperCase() + user.username.slice(1) : ''}
          </h2>
          
          <form onSubmit={handleSearch} className="relative w-full max-w-md ml-auto">
            <input 
              type="text" 
              placeholder="Search anything..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 bg-bg-primary rounded-input border border-border outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-heading text-sm transition-all duration-200"
            />
            <SearchIcon className="absolute left-3.5 top-3.5 w-4 h-4 text-heading/40" />
            <button type="submit" className="hidden">Search</button>
          </form>
        </header>
        <main className="p-8 max-w-7xl w-full mx-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

