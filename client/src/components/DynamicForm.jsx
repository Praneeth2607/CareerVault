import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Copy, Check } from 'lucide-react';

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
  const [copiedField, setCopiedField] = useState(null);

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

  if (!schema) return <div className="text-sm font-medium text-semantic-error">Invalid Asset Type</div>;

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleTagsChange = (key, value) => {
    setTagInputs(prev => ({ ...prev, [key]: value }));
  };

  const triggerCopy = (label, text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 1500);
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

  const getFieldValueToCopy = (field) => {
    if (field.type === 'tags') {
      return tagInputs[field.key] || '';
    }
    return formData[field.key] || '';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-xl mx-auto relative pb-20 -mb-8">
      {/* Title Field */}
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-semibold text-heading/55 uppercase tracking-wider">Title *</label>
          {formData.title && (
            <button 
              type="button" 
              onClick={() => triggerCopy('Title', formData.title)} 
              className="text-[10px] text-primary hover:underline font-semibold flex items-center transition-colors"
            >
              {copiedField === 'Title' ? (
                <>
                  <Check className="w-3 h-3 mr-1 text-semantic-success" />
                  <span className="text-semantic-success">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 mr-1" />
                  <span>Copy Title</span>
                </>
              )}
            </button>
          )}
        </div>
        <input
          type="text"
          required
          className="w-full h-12 px-4 bg-bg-primary border border-border rounded-input outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-heading text-sm placeholder-heading/30 transition-all duration-200"
          value={formData.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Enter a title for this entry..."
        />
      </div>

      {/* Dynamic Fields */}
      {schema.fields.map((field) => {
        const valToCopy = getFieldValueToCopy(field);
        return (
          <div key={field.key} className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-heading/55 uppercase tracking-wider">{field.label} {field.required && '*'}</label>
              {valToCopy && (
                <button 
                  type="button" 
                  onClick={() => triggerCopy(field.label, String(valToCopy))} 
                  className="text-[10px] text-primary hover:underline font-semibold flex items-center transition-colors"
                >
                  {copiedField === field.label ? (
                    <>
                      <Check className="w-3 h-3 mr-1 text-semantic-success" />
                      <span className="text-semantic-success">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 mr-1" />
                      <span>Copy Field</span>
                    </>
                  )}
                </button>
              )}
            </div>
            
            {field.type === 'textarea' ? (
              <textarea
                required={field.required}
                className="w-full p-4 bg-bg-primary border border-border rounded-input outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-heading text-sm placeholder-heading/30 min-h-[120px] transition-all duration-200 leading-relaxed font-light"
                value={formData[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder={`Enter ${field.label.toLowerCase()}...`}
              />
            ) : field.type === 'tags' ? (
              <input
                type="text"
                required={field.required}
                placeholder="Comma separated values (e.g. React, Node, CSS)"
                className="w-full h-12 px-4 bg-bg-primary border border-border rounded-input outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-heading text-sm placeholder-heading/30 transition-all duration-200"
                value={tagInputs[field.key] || ''}
                onChange={(e) => handleTagsChange(field.key, e.target.value)}
              />
            ) : field.type === 'select' ? (
              <select
                required={field.required}
                className="w-full h-12 px-4 bg-bg-primary border border-border rounded-input outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-heading text-sm appearance-none cursor-pointer transition-all duration-200"
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
                className="w-full h-12 px-4 bg-bg-primary border border-border rounded-input outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-heading text-sm placeholder-heading/30 transition-all duration-200"
                value={formData[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder={`Enter ${field.label.toLowerCase()}...`}
              />
            )}
          </div>
        );
      })}

      {/* Sticky Save Actions Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-bg-secondary/95 backdrop-blur-md py-4 border-t border-border flex justify-end space-x-4 z-10 -mx-8 px-8">
        <button 
          type="button" 
          onClick={onCancel} 
          className="px-5 py-2.5 rounded-button text-heading/70 border border-border hover:bg-bg-primary hover:text-heading hover:border-primary/20 transition-all text-xs font-semibold"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={loading} 
          className="px-6 py-2.5 bg-primary text-bg-primary rounded-button hover:bg-primary/95 transition-all text-xs font-semibold shadow-sm"
        >
          {loading ? 'Saving...' : 'Save Asset'}
        </button>
      </div>
    </form>
  );
}

