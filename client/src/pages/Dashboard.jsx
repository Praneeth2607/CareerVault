import React, { useState, useEffect } from 'react';
import { Folder, Briefcase, Award } from 'lucide-react';
import api from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({ projects: 0, experience: 0, skills: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/dashboard/stats');
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-8 text-heading/50">Loading dashboard...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-heading font-bold text-heading">Overview</h2>
        <p className="text-heading/70 mt-2">Manage and view your professional assets across all categories.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-bg-card p-6 rounded-card shadow-raised flex items-center space-x-5 transition-transform hover:-translate-y-1">
          <div className="p-4 bg-primary/10 rounded-full text-primary">
            <Folder className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-heading/70">Total Projects</p>
            <p className="text-3xl font-heading font-bold text-primary">{stats.projects}</p>
          </div>
        </div>

        <div className="bg-bg-card p-6 rounded-card shadow-raised flex items-center space-x-5 transition-transform hover:-translate-y-1">
          <div className="p-4 bg-secondary/10 rounded-full text-secondary">
            <Briefcase className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-heading/70">Experience Entries</p>
            <p className="text-3xl font-heading font-bold text-secondary">{stats.experience}</p>
          </div>
        </div>

        <div className="bg-bg-card p-6 rounded-card shadow-raised flex items-center space-x-5 transition-transform hover:-translate-y-1">
          <div className="p-4 bg-accent/10 rounded-full text-accent">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-heading/70">Skills Tracked</p>
            <p className="text-3xl font-heading font-bold text-accent">{stats.skills}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
