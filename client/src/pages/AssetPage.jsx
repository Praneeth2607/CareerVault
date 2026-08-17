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
    <div className="space-y-8 relative max-w-6xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-4xl font-heading font-bold text-heading">{title}</h2>
          <p className="text-heading/60 mt-1.5 font-light">{description}</p>
        </div>
        <button 
          onClick={() => handleOpenModal()} 
          className="flex items-center px-5 py-2.5 bg-primary text-bg-primary rounded-button hover:bg-primary/95 hover:-translate-y-[1px] active:translate-y-0 transition-all font-semibold whitespace-nowrap text-sm shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" /> {buttonText}
        </button>
      </div>

      <AssetList key={listKey} assetType={assetType} onEdit={handleOpenModal} />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-heading/30 backdrop-blur-md transition-opacity duration-200">
          <div className="bg-bg-secondary w-full max-w-2xl rounded-modal border border-border max-h-[90vh] overflow-y-auto relative flex flex-col transition-all duration-200">
            <div className="sticky top-0 bg-bg-secondary/95 backdrop-blur-md px-8 py-5 border-b border-border flex justify-between items-center z-10 shrink-0">
              <h3 className="text-xl font-heading font-bold text-heading">
                {editingAsset ? `Edit ${buttonText.replace('Add ', '')}` : buttonText}
              </h3>
              <button onClick={handleCloseModal} className="p-1.5 rounded-full hover:bg-bg-primary text-heading/45 hover:text-heading transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto">
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

