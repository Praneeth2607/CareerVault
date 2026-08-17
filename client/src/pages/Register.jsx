import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please check your details.');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-bg-primary font-body relative overflow-hidden">
      <div className="w-full max-w-md bg-bg-secondary p-8 rounded-modal border border-border z-10 relative">
        <h1 className="text-3xl font-heading font-bold text-center text-heading mb-2">Create Account</h1>
        <p className="text-center text-heading/60 mb-8 font-light text-sm">Start organizing your professional life.</p>
        
        {error && <div className="mb-4 p-3 bg-semantic-error/5 border border-semantic-error/15 text-semantic-error rounded-md text-sm text-center font-medium">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-heading/55 uppercase tracking-wider mb-2">Username</label>
            <input 
              type="text" 
              required
              className="w-full h-12 px-4 bg-bg-primary border border-border rounded-input outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-heading text-sm placeholder-heading/40 transition-all duration-200"
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-heading/55 uppercase tracking-wider mb-2">Email</label>
            <input 
              type="email" 
              required
              className="w-full h-12 px-4 bg-bg-primary border border-border rounded-input outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-heading text-sm placeholder-heading/40 transition-all duration-200"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-heading/55 uppercase tracking-wider mb-2">Password</label>
            <input 
              type="password" 
              required
              className="w-full h-12 px-4 bg-bg-primary border border-border rounded-input outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-heading text-sm placeholder-heading/40 transition-all duration-200"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            className="w-full h-12 bg-primary text-bg-primary font-semibold rounded-button hover:bg-primary/95 hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200 shadow-sm mt-4"
          >
            Register
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-heading/60 font-light">
          Already have an account? <Link to="/login" className="text-primary hover:underline font-semibold ml-1">Log in</Link>
        </div>
      </div>
    </div>
  );
}

