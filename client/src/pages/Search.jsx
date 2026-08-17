import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { schemas } from '../../../shared/schemas';
import { Folder, Briefcase, Award, Bookmark, Microscope, FileText, Search as SearchIcon } from 'lucide-react';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      performSearch(query);
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  const performSearch = async (q) => {
    setLoading(true);
    try {
      const res = await api.get(`/search?q=${encodeURIComponent(q)}`);
      setResults(res.data.data);
    } catch (error) {
      console.error('Search failed', error);
    } finally {
      setLoading(false);
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

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      <div>
        <h2 className="text-4xl font-heading font-bold text-heading">Search Results</h2>
        <p className="text-heading/60 mt-1.5 font-light">
          {query ? `Showing results for "${query}"` : 'Enter a search term to begin.'}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-pulse font-heading text-heading/40">Searching our vault...</div>
        </div>
      ) : (
        <div className="space-y-4">
          {results.length === 0 && query ? (
            <div className="text-center p-12 bg-bg-secondary rounded-card border border-border">
              <p className="text-heading/50">No results found matching "{query}".</p>
            </div>
          ) : (
            results.map((asset) => (
              <div 
                key={asset.id} 
                onClick={() => navigate(getAssetPath(asset.asset_type))}
                className="bg-bg-secondary p-6 rounded-card border border-border hover:border-primary/30 transition-all duration-200 cursor-pointer flex items-start group"
              >
                <div className="w-10 h-10 rounded-lg bg-bg-primary border border-border flex items-center justify-center text-heading/70 mr-4 shrink-0 transition-colors group-hover:border-primary/20">
                  {getAssetIcon(asset.asset_type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-lg font-bold font-heading text-heading truncate group-hover:text-primary transition-colors">{asset.title}</h3>
                    <span className="text-[10px] font-bold text-primary/70 bg-primary/5 px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                      {asset.asset_type.replace('_', ' ')}
                    </span>
                  </div>
                  
                  {/* Extract a snippet from values */}
                  <div className="text-sm text-heading/70 line-clamp-2 mt-2 leading-relaxed font-light">
                    {Object.entries(asset.values)
                      .filter(([k, v]) => typeof v === 'string' && v.trim().length > 0)
                      .map(([k, v]) => v)
                      .join(' • ')}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

