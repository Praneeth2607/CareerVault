import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, KeyRound, Mail, ArrowLeft } from 'lucide-react';
import api from '../services/api';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Views: 'login', 'forgot', 'reset'
  const [view, setView] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [simulatedLink, setSimulatedLink] = useState('');

  const tokenFromUrl = searchParams.get('resetToken');

  useEffect(() => {
    if (tokenFromUrl) {
      setView('reset');
    } else {
      setView('login');
    }
  }, [tokenFromUrl]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSimulatedLink('');
    setLoading(true);
    try {
      const res = await api.post('/auth/forgot-password', { email });
      setSuccess('Reset link generated successfully! (check console for simulated link)');
      if (res.data.resetLink) {
        setSimulatedLink(res.data.resetLink);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send password reset request');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    setLoading(true);
    try {
      await api.post('/auth/reset-password', { token: tokenFromUrl, password: newPassword });
      setSuccess('Password reset successful! Redirecting to login page...');
      setTimeout(() => {
        // Clear resetToken from URL and go back to login view
        setSearchParams({});
        setView('login');
        setSuccess('');
        setNewPassword('');
        setConfirmPassword('');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. Token might be invalid or expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-bg-primary font-body relative overflow-hidden">
      <div className="w-full max-w-md bg-bg-secondary p-8 rounded-modal shadow-raised z-10 relative">
        
        {view === 'login' && (
          <>
            <h1 className="text-3xl font-heading font-bold text-center text-primary mb-2">Welcome Back</h1>
            <p className="text-center text-heading/70 mb-8">Securely access your CareerVault.</p>
            
            {error && <div className="mb-4 p-3 bg-semantic-error/10 text-semantic-error rounded-md text-sm text-center">{error}</div>}
            
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-heading mb-1">Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full h-12 px-4 bg-bg-primary rounded-md shadow-pressed outline-none focus:ring-2 focus:ring-primary/20 text-heading placeholder-heading/40 transition-all"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-heading">Password</label>
                  <button 
                    type="button" 
                    onClick={() => setView('forgot')}
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    className="w-full h-12 pl-4 pr-12 bg-bg-primary rounded-md shadow-pressed outline-none focus:ring-2 focus:ring-primary/20 text-heading placeholder-heading/40 transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-heading/40 hover:text-heading/70 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full h-12 bg-primary text-bg-secondary font-medium rounded-button hover:bg-primary/90 hover:-translate-y-0.5 transition-all shadow-md mt-4 disabled:opacity-50"
              >
                {loading ? 'Logging In...' : 'Log In'}
              </button>
            </form>
            
            <div className="mt-6 text-center text-sm text-heading/70">
              Don't have an account? <Link to="/register" className="text-primary hover:underline font-medium">Create one</Link>
            </div>
          </>
        )}

        {view === 'forgot' && (
          <>
            <button 
              onClick={() => { setView('login'); setError(''); setSuccess(''); setSimulatedLink(''); }}
              className="flex items-center text-xs text-heading/60 hover:text-heading mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Login
            </button>
            
            <h1 className="text-3xl font-heading font-bold text-center text-primary mb-2">Forgot Password</h1>
            <p className="text-center text-heading/70 mb-8">Enter your email and we'll simulate sending a reset link.</p>
            
            {error && <div className="mb-4 p-3 bg-semantic-error/10 text-semantic-error rounded-md text-sm text-center">{error}</div>}
            {success && <div className="mb-4 p-3 bg-semantic-success/10 text-semantic-success rounded-md text-sm text-center">{success}</div>}
            
            <form onSubmit={handleForgotSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-heading mb-1">Email Address</label>
                <div className="relative">
                  <input 
                    type="email" 
                    required
                    className="w-full h-12 pl-4 pr-12 bg-bg-primary rounded-md shadow-pressed outline-none focus:ring-2 focus:ring-primary/20 text-heading placeholder-heading/40 transition-all"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Mail className="absolute right-4 top-3.5 w-5 h-5 text-heading/30" />
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full h-12 bg-primary text-bg-secondary font-medium rounded-button hover:bg-primary/90 hover:-translate-y-0.5 transition-all shadow-md mt-4 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Request Reset Link'}
              </button>
            </form>

            {simulatedLink && (
              <div className="mt-8 p-4 bg-bg-primary rounded-md border border-primary/10 space-y-2">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider">Development Help (Direct Reset Link):</p>
                <a 
                  href={simulatedLink} 
                  className="text-sm text-accent hover:underline break-all block"
                >
                  {simulatedLink}
                </a>
              </div>
            )}
          </>
        )}

        {view === 'reset' && (
          <>
            <h1 className="text-3xl font-heading font-bold text-center text-primary mb-2">Reset Password</h1>
            <p className="text-center text-heading/70 mb-8">Enter your new secure password.</p>
            
            {error && <div className="mb-4 p-3 bg-semantic-error/10 text-semantic-error rounded-md text-sm text-center">{error}</div>}
            {success && <div className="mb-4 p-3 bg-semantic-success/10 text-semantic-success rounded-md text-sm text-center">{success}</div>}
            
            <form onSubmit={handleResetSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-heading mb-1">New Password</label>
                <div className="relative">
                  <input 
                    type={showNewPassword ? "text" : "password"} 
                    required
                    className="w-full h-12 pl-4 pr-12 bg-bg-primary rounded-md shadow-pressed outline-none focus:ring-2 focus:ring-primary/20 text-heading placeholder-heading/40 transition-all"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-3 text-heading/40 hover:text-heading/70 transition-colors"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-heading mb-1">Confirm New Password</label>
                <input 
                  type="password" 
                  required
                  className="w-full h-12 px-4 bg-bg-primary rounded-md shadow-pressed outline-none focus:ring-2 focus:ring-primary/20 text-heading placeholder-heading/40 transition-all"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full h-12 bg-primary text-bg-secondary font-medium rounded-button hover:bg-primary/90 hover:-translate-y-0.5 transition-all shadow-md mt-4 disabled:opacity-50"
              >
                {loading ? 'Resetting...' : 'Update Password'}
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}

