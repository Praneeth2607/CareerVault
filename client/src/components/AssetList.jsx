import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Pencil, Trash2, Star, Archive } from 'lucide-react';

export default function AssetList({ assetType, onEdit }) {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="p-8 text-center text-heading/50">Loading assets...</div>;

  if (assets.length === 0) {
    return (
      <div className="p-12 text-center bg-bg-card rounded-card shadow-raised mt-6 border border-bg-secondary">
        <p className="text-heading/70">No assets found for this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {assets.map(asset => (
        <div key={asset.id} className="bg-bg-card p-6 rounded-card shadow-raised flex flex-col relative group">
          <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => handleToggleFavorite(asset.id, asset.favorite)} className={`p-2 rounded-full ${asset.favorite ? 'text-semantic-warning bg-semantic-warning/10' : 'text-heading/40 hover:bg-bg-primary'}`}>
              <Star className="w-4 h-4" />
            </button>
            <button onClick={() => onEdit(asset)} className="p-2 text-info bg-info/10 hover:bg-info/20 rounded-full text-semantic-info">
              <Pencil className="w-4 h-4" />
            </button>
            <button onClick={() => handleDelete(asset.id)} className="p-2 text-semantic-error bg-semantic-error/10 hover:bg-semantic-error/20 rounded-full">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <h3 className="text-xl font-heading font-semibold text-heading pr-24 mb-2">{asset.title}</h3>
          
          <div className="flex-1 space-y-3 mt-4 text-sm text-heading/80">
            {/* Display up to 3 fields from values as preview */}
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
  );
}
