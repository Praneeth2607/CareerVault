import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Pencil, Trash2, Star, Maximize2, Copy, X } from 'lucide-react';

export default function AssetList({ assetType, onEdit }) {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedAsset, setExpandedAsset] = useState(null);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/assets?type=${assetType}`);
      setAssets(res.data.data);
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

  const handleCopy = (asset) => {
    let text = `${asset.title}\n\n`;
    Object.entries(asset.values).forEach(([key, val]) => {
      text += `${key.toUpperCase()}:\n${Array.isArray(val) ? val.join(', ') : val}\n\n`;
    });
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  if (loading) return <div className="p-8 text-center text-heading/50">Loading assets...</div>;

  if (assets.length === 0) {
    return (
      <div className="p-12 text-center bg-bg-card rounded-card shadow-raised mt-6 border border-bg-secondary">
        <p className="text-heading/70">No assets found for this category.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {assets.map(asset => (
          <div key={asset.id} className="bg-bg-card p-6 rounded-card shadow-raised flex flex-col relative group">
            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity bg-bg-card/90 backdrop-blur-sm p-1 rounded-full shadow-sm">
              <button onClick={() => handleCopy(asset)} className="p-2 text-heading/40 hover:bg-bg-primary hover:text-primary rounded-full transition-colors" title="Copy to clipboard">
                <Copy className="w-4 h-4" />
              </button>
              <button onClick={() => setExpandedAsset(asset)} className="p-2 text-heading/40 hover:bg-bg-primary hover:text-primary rounded-full transition-colors" title="Expand details">
                <Maximize2 className="w-4 h-4" />
              </button>
              <button onClick={() => handleToggleFavorite(asset.id, asset.favorite)} className={`p-2 rounded-full transition-colors ${asset.favorite ? 'text-semantic-warning bg-semantic-warning/10' : 'text-heading/40 hover:bg-bg-primary'}`} title="Toggle favorite">
                <Star className="w-4 h-4" />
              </button>
              <button onClick={() => onEdit(asset)} className="p-2 text-info bg-info/10 hover:bg-info/20 rounded-full text-semantic-info transition-colors" title="Edit">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(asset.id)} className="p-2 text-semantic-error bg-semantic-error/10 hover:bg-semantic-error/20 rounded-full transition-colors" title="Delete">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <h3 className="text-xl font-heading font-semibold text-heading pr-48 mb-2">{asset.title}</h3>
            
            <div className="flex-1 space-y-3 mt-4 text-sm text-heading/80">
              {Object.entries(asset.values).slice(0, 3).map(([key, val]) => (
                <div key={key}>
                  <span className="font-medium text-heading/60 uppercase text-xs tracking-wider">{key}</span>
                  <p className="mt-1 line-clamp-2">
                    {Array.isArray(val) ? val.join(', ') : String(val)}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-heading/5 flex justify-between text-xs text-heading/40">
              <span>Updated: {new Date(asset.updated_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {expandedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-heading/20 backdrop-blur-sm">
          <div className="bg-bg-secondary w-full max-w-2xl rounded-modal shadow-raised max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200">
            <div className="sticky top-0 bg-bg-secondary/90 backdrop-blur-md p-6 border-b border-heading/5 flex justify-between items-center z-10">
              <h3 className="text-2xl font-heading font-bold text-primary pr-12">{expandedAsset.title}</h3>
              <div className="flex items-center space-x-2">
                <button onClick={() => handleCopy(expandedAsset)} className="p-2 rounded-full hover:bg-bg-primary text-primary transition-colors flex items-center text-sm font-medium">
                  <Copy className="w-4 h-4 mr-2" /> Copy
                </button>
                <button onClick={() => setExpandedAsset(null)} className="p-2 rounded-full hover:bg-bg-primary text-heading/50 hover:text-heading transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              {Object.entries(expandedAsset.values).map(([key, val]) => (
                <div key={key}>
                  <h4 className="font-medium text-heading/60 uppercase text-xs tracking-wider mb-2">{key}</h4>
                  <div className="bg-bg-primary p-4 rounded-md text-heading text-sm whitespace-pre-wrap">
                    {Array.isArray(val) ? (
                      <div className="flex flex-wrap gap-2">
                        {val.map((tag, i) => (
                          <span key={i} className="px-2 py-1 bg-accent/10 text-accent rounded-md text-xs">{tag}</span>
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
    </>
  );
}
