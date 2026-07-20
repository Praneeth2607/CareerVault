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
  const [tagInputs, setTagInputs] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (schema) {
        const initialTags = {};
        schema.fields.forEach(f => {
          if (f.type === 'tags' && initialData[f.key]) {
            initialTags[f.key] = initialData[f.key].join(', ');
          }
        });
        setTagInputs(initialTags);
      }
    }
  }, [initialData, schema]);

  if (!schema) return <div>Invalid Asset Type</div>;

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleTagsChange = (key, value) => {
    setTagInputs(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const finalData = { ...formData };
    schema.fields.forEach(f => {
      if (f.type === 'tags' && tagInputs[f.key]) {
        finalData[f.key] = tagInputs[f.key].split(',').map(t => t.trim()).filter(Boolean);
      }
    });

    try {
      if (initialData?.id) {
        // update
        await api.put(`/assets/${initialData.id}`, { title: formData.title || 'Untitled', values: finalData });
      } else {
        // create
        await api.post('/assets', { assetType, title: formData.title || 'Untitled', values: finalData });
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
      <div className="flex flex-col">
        <label className="text-sm font-medium text-heading mb-1">Title *</label>
        <input
          type="text"
          required
          className="w-full h-12 px-4 bg-bg-primary rounded-md shadow-pressed outline-none focus:ring-2 focus:ring-primary/20 text-heading placeholder-heading/40"
          value={formData.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Enter a title for this entry..."
        />
      </div>

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
                value={tagInputs[field.key] || ''}
                onChange={(e) => handleTagsChange(field.key, e.target.value)}
              />
            ) : field.type === 'select' ? (
              <select
                required={field.required}
                className="w-full h-12 px-4 bg-bg-primary rounded-md shadow-pressed outline-none focus:ring-2 focus:ring-primary/20 text-heading appearance-none"
                value={formData[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
              >
                <option value="" disabled>Select an option</option>
                {field.options?.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type === 'url' ? 'url' : field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
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
