import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { schemas } from '../../../shared/schemas';

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
    const schema = schemas[type];
    if (!schema) return '📁';
    // Fallbacks if icon string is just a name
    return schema.icon || '📁';
  };

  const getAssetPath = (type) => {
    switch(type) {
      case 'PROJECT': return '/dashboard/projects';
      case 'EXPERIENCE': return '/dashboard/experience';
      case 'SKILL': return '/dashboard/skills';
      case 'ACHIEVEMENT': return '/dashboard/achievements';
      case 'RESEARCH': return '/dashboard/research';
      case 'RESUME_ASSET': return '/dashboard/resume-assets';
      default: return '/dashboard';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-3xl font-heading font-bold text-heading">Search Results</h2>
        <p className="text-heading/70 mt-2">
          {query ? `Showing results for "${query}"` : 'Enter a search term to begin.'}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {results.length === 0 && query ? (
            <div className="text-center p-12 bg-bg-secondary rounded-card shadow-raised">
              <p className="text-heading/50">No results found for "{query}".</p>
            </div>
          ) : (
            results.map((asset) => (
              <div 
                key={asset.id} 
                onClick={() => navigate(getAssetPath(asset.asset_type))}
                className="bg-bg-secondary p-4 rounded-card shadow-raised hover:shadow-hover transition-all cursor-pointer border border-transparent hover:border-primary/20 flex items-start"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl mr-4 shrink-0">
                  {getAssetIcon(asset.asset_type)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold font-heading text-heading">{asset.title}</h3>
                  <div className="text-xs font-medium text-primary uppercase tracking-wider mb-2">{asset.asset_type}</div>
                  
                  {/* Extract a snippet from values */}
                  <div className="text-sm text-heading/70 line-clamp-2">
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
