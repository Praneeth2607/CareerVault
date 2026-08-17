import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Pencil, Trash2, Star, Maximize2, Copy, X } from 'lucide-react';

export default function AssetList({ assetType, onEdit }) {
  const [assets, setAssets] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedAsset, setExpandedAsset] = useState(null);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/assets?type=${assetType}`);
      setAssets(res.data.data);
      
      if (assetType === 'SKILL') {
        const tagsRes = await api.get('/tags');
        setTags(tagsRes.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [assetType]);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this asset?')) {
      await api.delete(`/assets/${id}`);
      fetchAssets();
    }
  };

  const handleToggleFavorite = async (id, currentStatus) => {
    await api.patch(`/assets/${id}/favorite`, { favorite: !currentStatus });
    fetchAssets();
  };

  const handleCopy = (asset, e) => {
    if (e) e.stopPropagation();
    let text = `${asset.title}\n\n`;
    Object.entries(asset.values).forEach(([key, val]) => {
      text += `${key.toUpperCase()}:\n${Array.isArray(val) ? val.join(', ') : val}\n\n`;
    });
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  if (loading) return (
    <div className="py-20 text-center flex flex-col justify-center items-center">
      <div className="animate-pulse text-heading/45 text-sm font-medium">Loading assets...</div>
    </div>
  );

  const hasNoAssets = assets.length === 0;

  // Group assets by category if SKILL
  const groupedSkills = {};
  if (assetType === 'SKILL') {
    assets.forEach(asset => {
      const cat = asset.values.category || 'General';
      const norm = cat.trim();
      const capitalizedNorm = norm.charAt(0).toUpperCase() + norm.slice(1);
      if (!groupedSkills[capitalizedNorm]) {
        groupedSkills[capitalizedNorm] = [];
      }
      groupedSkills[capitalizedNorm].push(asset);
    });
  }

  return (
    <div className="space-y-12">
      {/* Custom Skills/Assets Ledger */}
      <div>
        {hasNoAssets ? (
          <div className="p-16 text-center bg-bg-secondary rounded-card border border-border mt-6">
            <p className="text-heading/50 font-light text-sm">No custom assets found in this ledger yet.</p>
          </div>
        ) : assetType === 'SKILL' ? (
          /* Categorized Tags Layout for Skills */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {Object.entries(groupedSkills).map(([category, skillsList]) => (
              <div 
                key={category} 
                className="bg-bg-secondary p-6 rounded-card border border-border flex flex-col relative"
              >
                <h4 className="text-xs font-semibold text-heading/45 uppercase tracking-wider mb-4 border-b border-border pb-2">
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {skillsList.map(skill => (
                    <div 
                      key={skill.id} 
                      className="relative group/tag inline-flex items-center px-3.5 py-2 bg-bg-primary text-heading border border-border rounded-button text-xs font-medium tracking-wide transition-all duration-150 hover:border-primary/20 hover:text-primary shadow-sm cursor-default"
                    >
                      <span className="font-semibold">{skill.title}</span>
                      
                      {/* Inline Hover Actions inside the tag */}
                      <div className="hidden group-hover/tag:flex items-center ml-2.5 pl-2.5 border-l border-border space-x-1.5">
                        <button 
                          onClick={() => onEdit(skill)} 
                          className="text-heading/40 hover:text-semantic-info transition-colors p-0.5" 
                          title="Edit"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(skill.id)} 
                          className="text-heading/40 hover:text-semantic-error transition-colors p-0.5" 
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Default Grid Card Layout for other asset types */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {assets.map(asset => (
              <div 
                key={asset.id} 
                className="bg-bg-secondary p-6 rounded-card border border-border flex flex-col relative group hover:border-primary/30 hover:translate-y-[-1px] transition-all duration-200"
              >
                {/* Minimal actions overlay panel */}
                <div className="absolute top-4 right-4 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity bg-bg-primary border border-border p-1 rounded-button shadow-none z-10">
                  <button 
                    onClick={(e) => handleCopy(asset, e)} 
                    className="p-1.5 text-heading/50 hover:bg-bg-secondary hover:text-primary rounded-md transition-colors" 
                    title="Copy markdown"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setExpandedAsset(asset)} 
                    className="p-1.5 text-heading/50 hover:bg-bg-secondary hover:text-primary rounded-md transition-colors" 
                    title="Expand details"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleToggleFavorite(asset.id, asset.favorite)} 
                    className={`p-1.5 rounded-md transition-colors ${asset.favorite ? 'text-semantic-warning hover:bg-semantic-warning/10' : 'text-heading/50 hover:bg-bg-secondary hover:text-primary'}`} 
                    title="Toggle favorite"
                  >
                    <Star className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => onEdit(asset)} 
                    className="p-1.5 text-heading/50 hover:bg-bg-secondary hover:text-semantic-info rounded-md transition-colors" 
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(asset.id)} 
                    className="p-1.5 text-heading/50 hover:bg-bg-secondary hover:text-semantic-error rounded-md transition-colors" 
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <h3 className="text-lg font-heading font-semibold text-heading pr-40 mb-2 truncate">{asset.title}</h3>
                
                <div className="flex-1 space-y-4 mt-3 text-xs text-heading/85 leading-relaxed font-light">
                  {Object.entries(asset.values).slice(0, 3).map(([key, val]) => (
                    <div key={key}>
                      <span className="font-semibold text-heading/45 uppercase text-[9px] tracking-wider block">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <p className="mt-0.5 line-clamp-2">
                        {Array.isArray(val) ? val.join(', ') : String(val)}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-border flex justify-between text-[10px] text-heading/40">
                  <span>Updated: {new Date(asset.updated_at).toLocaleDateString()}</span>
                  {asset.favorite && <span className="font-semibold text-semantic-warning uppercase tracking-wider">Favorite</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Extracted Skills Section for the Skills page */}
      {assetType === 'SKILL' && (
        <div className="mt-12 space-y-4">
          <div className="border-b border-border pb-3">
            <h3 className="text-xl font-heading font-bold text-heading">Extracted Skills</h3>
            <p className="text-xs text-heading/50 font-light mt-1">
              These skills are automatically parsed from tags in your projects and work experiences.
            </p>
          </div>
          
          {tags.length === 0 ? (
            <div className="p-8 text-center bg-bg-secondary rounded-card border border-border">
              <p className="text-heading/40 font-light text-xs">No project or work experience tags found yet.</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2.5 p-6 bg-bg-secondary rounded-card border border-border">
              {tags.map(tag => (
                <span 
                  key={tag.id} 
                  className="px-3.5 py-2 bg-bg-primary text-primary border border-border rounded-button text-xs font-semibold uppercase tracking-wider shadow-sm hover:border-primary/20 transition-all cursor-default"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {expandedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-heading/30 backdrop-blur-md transition-opacity duration-200">
          <div className="bg-bg-secondary w-full max-w-2xl rounded-modal border border-border max-h-[90vh] overflow-y-auto relative flex flex-col transition-all duration-200">
            <div className="sticky top-0 bg-bg-secondary/95 backdrop-blur-md px-8 py-5 border-b border-border flex justify-between items-center z-10 shrink-0">
              <h3 className="text-xl font-heading font-bold text-heading pr-12 truncate">{expandedAsset.title}</h3>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={(e) => handleCopy(expandedAsset, e)} 
                  className="px-3 py-1.5 bg-bg-primary hover:bg-[#FAF7F2] border border-border hover:border-primary/20 rounded-button text-heading text-xs font-semibold transition-all flex items-center shrink-0"
                >
                  <Copy className="w-3.5 h-3.5 mr-2 text-primary" /> Copy Block
                </button>
                <button 
                  onClick={() => setExpandedAsset(null)} 
                  className="p-1.5 rounded-full hover:bg-bg-primary text-heading/45 hover:text-heading transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-8 space-y-6 overflow-y-auto">
              {Object.entries(expandedAsset.values).map(([key, val]) => (
                <div key={key} className="space-y-2">
                  <h4 className="font-semibold text-heading/50 uppercase text-[10px] tracking-wider">{key.replace(/([A-Z])/g, ' $1')}</h4>
                  <div className="bg-bg-primary p-5 rounded-[16px] border border-border text-heading text-sm whitespace-pre-wrap leading-relaxed font-light">
                    {Array.isArray(val) ? (
                      <div className="flex flex-wrap gap-1.5">
                        {val.map((tag, i) => (
                          <span key={i} className="px-2 py-0.5 bg-primary/5 text-primary border border-primary/10 rounded text-xs font-medium">{tag}</span>
                        ))}
                      </div>
                    ) : (
                      String(val)
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

}

