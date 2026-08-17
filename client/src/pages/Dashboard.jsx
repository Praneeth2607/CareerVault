import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Folder, Briefcase, Award, Bookmark, Microscope, FileText, Plus, Search, Calendar, Copy, ChevronRight } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ 
    projects: 0, 
    experience: 0, 
    skills: 0,
    achievements: 0,
    research: 0,
    resumeAssets: 0
  });
  const [recentAssets, setRecentAssets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, assetsRes] = await Promise.all([
          api.get('/dashboard/stats'),
          api.get('/assets?limit=5')
        ]);
        
        if (statsRes.data.success) {
          setStats(statsRes.data.data);
        }
        if (assetsRes.data.success) {
          setRecentAssets(assetsRes.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/dashboard/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const getAssetIcon = (type) => {
    switch (type) {
      case 'PROJECT': return <Folder className="w-5 h-5" />;
      case 'WORK_EXPERIENCE': return <Briefcase className="w-5 h-5" />;
      case 'SKILL': return <Award className="w-5 h-5" />;
      case 'ACHIEVEMENT': return <Bookmark className="w-5 h-5" />;
      case 'RESEARCH': return <Microscope className="w-5 h-5" />;
      case 'RESUME_ASSET': return <FileText className="w-5 h-5" />;
      default: return <Folder className="w-5 h-5" />;
    }
  };

  const getAssetPath = (type) => {
    switch(type) {
      case 'PROJECT': return '/dashboard/projects';
      case 'WORK_EXPERIENCE': return '/dashboard/experience';
      case 'SKILL': return '/dashboard/skills';
      case 'ACHIEVEMENT': return '/dashboard/achievements';
      case 'RESEARCH': return '/dashboard/research';
      case 'RESUME_ASSET': return '/dashboard/resume-assets';
      default: return '/dashboard';
    }
  };

  const handleQuickCopy = (asset, e) => {
    e.stopPropagation();
    let text = `${asset.title}\n\n`;
    Object.entries(asset.values).forEach(([key, val]) => {
      text += `${key.toUpperCase()}:\n${Array.isArray(val) ? val.join(', ') : val}\n\n`;
    });
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  if (loading) return (
    <div className="flex items-center justify-center p-12">
      <div className="animate-pulse font-heading text-heading/40">Loading overview stats...</div>
    </div>
  );

  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-12">
      {/* Greeting Header */}
      <div>
        <h2 className="text-4xl font-heading font-bold text-heading">Overview</h2>
        <p className="text-heading/60 mt-1.5 font-light">Your professional digital ledger at a glance.</p>
      </div>


      {/* Asset Overview - Grid of stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {[
          { label: 'Projects', count: stats.projects, type: 'PROJECT', path: '/dashboard/projects', color: 'text-primary' },
          { label: 'Experiences', count: stats.experience, type: 'WORK_EXPERIENCE', path: '/dashboard/experience', color: 'text-[#BB9457]' },
          { label: 'Skills', count: stats.skills, type: 'SKILL', path: '/dashboard/skills', color: 'text-[#99582A]' },
          { label: 'Achievements', count: stats.achievements, type: 'ACHIEVEMENT', path: '/dashboard/achievements', color: 'text-[#3A7D44]' },
          { label: 'Research', count: stats.research, type: 'RESEARCH', path: '/dashboard/research', color: 'text-[#457B9D]' },
          { label: 'Resume Blocks', count: stats.resumeAssets, type: 'RESUME_ASSET', path: '/dashboard/resume-assets', color: 'text-[#C44536]' }
        ].map((item, idx) => (
          <Link 
            key={idx} 
            to={item.path}
            className="bg-bg-secondary p-5 rounded-card border border-border flex flex-col justify-between hover:border-primary/30 transition-all duration-200"
          >
            <div className="flex justify-between items-center">
              <span className={`p-1.5 bg-bg-primary rounded-md ${item.color}`}>
                {getAssetIcon(item.type)}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-heading/30" />
            </div>
            <div className="mt-4">
              <p className="text-3xl font-heading font-bold text-heading">{item.count}</p>
              <p className="text-xs font-medium text-heading/50 mt-1">{item.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity and Quick Actions Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Assets List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-heading font-bold text-heading">Recent Assets</h3>
          {recentAssets.length === 0 ? (
            <div className="border border-border p-8 rounded-card text-center bg-bg-secondary text-heading/50 text-sm">
              No assets in your vault yet. Use quick actions to populate your ledger.
            </div>
          ) : (
            <div className="border border-border rounded-card overflow-hidden bg-bg-secondary divide-y divide-border">
              {recentAssets.map((asset) => (
                <div 
                  key={asset.id} 
                  onClick={() => navigate(getAssetPath(asset.asset_type))}
                  className="p-5 flex items-center justify-between hover:bg-bg-primary/45 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <span className="p-2 bg-bg-primary border border-border rounded-md text-heading/70 shrink-0">
                      {getAssetIcon(asset.asset_type)}
                    </span>
                    <div>
                      <h4 className="font-heading font-semibold text-heading text-sm">{asset.title}</h4>
                      <p className="text-[10px] font-bold text-primary/80 uppercase tracking-wider mt-0.5">{asset.asset_type.replace('_', ' ')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-heading/40">
                    <span className="hidden sm:inline">Updated {new Date(asset.updated_at).toLocaleDateString()}</span>
                    <button 
                      onClick={(e) => handleQuickCopy(asset, e)}
                      className="px-2.5 py-1.5 border border-border hover:border-primary/30 hover:text-primary rounded-md text-heading/60 transition-colors flex items-center bg-bg-primary text-[10px] font-semibold"
                    >
                      <Copy className="w-3 h-3 mr-1" /> Copy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions Panel */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-bold text-heading">Quick Actions</h3>
          <div className="bg-bg-secondary border border-border p-6 rounded-card space-y-3.5">
            <p className="text-xs text-heading/60 leading-relaxed font-light mb-2">Create new entries in your repository ledger immediately.</p>
            {[
              { label: 'New Project', path: '/dashboard/projects' },
              { label: 'New Experience', path: '/dashboard/experience' },
              { label: 'New Skill', path: '/dashboard/skills' },
              { label: 'New Achievement', path: '/dashboard/achievements' },
              { label: 'New Research', path: '/dashboard/research' },
              { label: 'New Resume Asset', path: '/dashboard/resume-assets' }
            ].map((action, idx) => (
              <Link 
                key={idx}
                to={action.path}
                className="w-full py-2.5 px-4 bg-bg-primary hover:bg-[#FAF7F2] border border-border hover:border-primary/20 rounded-button text-xs font-semibold text-heading/80 flex items-center justify-between transition-all"
              >
                <span>{action.label}</span>
                <Plus className="w-3.5 h-3.5 text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

