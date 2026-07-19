import React, { useState, useEffect } from 'react';
import api from '../services/api';

// For simplicity, we define or fetch schemas. In a real monorepo we'd share the exact file.
// Here we'll simulate importing the shared schema structure or passing it as a prop.
// For MVP, we assume the backend provides the structure or we import the shared one.
// Since the frontend and backend share the workspace, we can import it.
import { getSchemaByType } from '../../../shared/schemas/index.js';

export default function DynamicForm({ assetType, initialData, onSubmit, onCancel }) {
  const schema = getSchemaByType(assetType);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  if (!schema) return <div>Invalid Asset Type</div>;

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleTagsChange = (key, value) => {
    // simple comma separated tags
    const tagsArray = value.split(',').map(t => t.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, [key]: tagsArray }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData?.id) {
        // update
        await api.put(`/assets/${initialData.id}`, { title: formData.title || 'Untitled', values: formData });
      } else {
        // create
        await api.post('/assets', { assetType, title: formData.title || formData.summary || formData.organization || 'Untitled', values: formData });
      }
      onSubmit();
    } catch (error) {
      console.error(error);
      alert('Error saving asset');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {schema.fields.map((field) => {
        return (
          <div key={field.key} className="flex flex-col">
            <label className="text-sm font-medium text-heading mb-1">{field.label} {field.required && '*'}</label>
            
            {field.type === 'textarea' ? (
              <textarea
                required={field.required}
                className="w-full p-4 bg-bg-primary rounded-md shadow-pressed outline-none focus:ring-2 focus:ring-primary/20 text-heading placeholder-heading/40 min-h-[100px]"
                value={formData[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
              />
            ) : field.type === 'tags' ? (
              <input
                type="text"
                required={field.required}
                placeholder="Comma separated tags"
                className="w-full h-12 px-4 bg-bg-primary rounded-md shadow-pressed outline-none focus:ring-2 focus:ring-primary/20 text-heading placeholder-heading/40"
                value={(formData[field.key] || []).join(', ')}
                onChange={(e) => handleTagsChange(field.key, e.target.value)}
              />
            ) : (
              <input
                type={field.type === 'url' ? 'url' : 'text'}
                required={field.required}
                className="w-full h-12 px-4 bg-bg-primary rounded-md shadow-pressed outline-none focus:ring-2 focus:ring-primary/20 text-heading placeholder-heading/40"
                value={formData[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
              />
            )}
          </div>
        );
      })}

      <div className="flex justify-end space-x-4 mt-8">
        <button type="button" onClick={onCancel} className="px-6 py-2 rounded-button text-heading hover:bg-bg-primary transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="px-6 py-2 bg-primary text-bg-secondary rounded-button shadow-md hover:bg-primary/90 transition-all">
          {loading ? 'Saving...' : 'Save Asset'}
        </button>
      </div>
    </form>
  );
}
