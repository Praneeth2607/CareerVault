import React, { useState } from 'react';
import AssetList from '../components/AssetList';
import DynamicForm from '../components/DynamicForm';
import { Plus, X } from 'lucide-react';

export default function AssetPage({ title, description, assetType, buttonText }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [listKey, setListKey] = useState(0);

  const handleOpenModal = (asset = null) => {
    setEditingAsset(asset);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingAsset(null);
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    setListKey(prev => prev + 1);
    handleCloseModal();
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-heading font-bold text-heading">{title}</h2>
          <p className="text-heading/70 mt-2">{description}</p>
        </div>
        <button 
          onClick={() => handleOpenModal()} 
          className="flex items-center px-4 py-2 bg-primary text-bg-secondary rounded-button shadow-md hover:bg-primary/90 hover:-translate-y-0.5 transition-all font-medium whitespace-nowrap"
        >
          <Plus className="w-5 h-5 mr-2" /> {buttonText}
        </button>
      </div>

      <AssetList key={listKey} assetType={assetType} onEdit={handleOpenModal} />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-heading/20 backdrop-blur-sm">
          <div className="bg-bg-secondary w-full max-w-2xl rounded-modal shadow-raised max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200">
            <div className="sticky top-0 bg-bg-secondary/90 backdrop-blur-md p-6 border-b border-heading/5 flex justify-between items-center z-10">
              <h3 className="text-2xl font-heading font-bold text-primary">
                {editingAsset ? `Edit ${buttonText.replace('Add ', '')}` : buttonText}
              </h3>
              <button onClick={handleCloseModal} className="p-2 rounded-full hover:bg-bg-primary text-heading/50 hover:text-heading transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8">
              <DynamicForm 
                assetType={assetType} 
                initialData={editingAsset ? { ...editingAsset.values, title: editingAsset.title, id: editingAsset.id } : null} 
                onSubmit={handleSubmit} 
                onCancel={handleCloseModal} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
