import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { Shield, User, MonitorSmartphone, KeyRound, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile state
  const [profile, setProfile] = useState(null);
  
  // Password state
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordStatus, setPasswordStatus] = useState({ type: '', message: '' });
  
  // Sessions state
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetchProfile();
    fetchSessions();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/profile');
      setProfile(res.data.data);
    } catch (error) {
      console.error('Failed to load profile', error);
    }
  };

  const fetchSessions = async () => {
    try {
      const res = await api.get('/sessions');
      setSessions(res.data.data);
    } catch (error) {
      console.error('Failed to load sessions', error);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordStatus({ type: 'error', message: 'New passwords do not match' });
      return;
    }
    try {
      await api.patch('/profile/password', {
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword
      });
      setPasswordStatus({ type: 'success', message: 'Password updated successfully' });
      setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setPasswordStatus({ type: 'error', message: error.response?.data?.message || 'Failed to update password' });
    }
  };

  const handleRevokeSession = async (sessionId) => {
    try {
      await api.delete(`/sessions/${sessionId}`);
      fetchSessions();
    } catch (error) {
      console.error('Failed to revoke session', error);
    }
  };

  const handleRevokeAll = async () => {
    try {
      await api.delete('/sessions');
      // Revoking all sessions logs out the user, handled by 401 interceptor if current session dies
      fetchSessions();
    } catch (error) {
      console.error('Failed to revoke all sessions', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h2 className="text-4xl font-heading font-bold text-heading">Settings</h2>
        <p className="text-heading/60 mt-1.5 font-light">Manage your profile, security configuration, and active devices.</p>
      </div>

      <div className="flex space-x-2 border-b border-border pb-px">
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex items-center px-5 py-3 border-b-2 font-medium text-sm transition-all ${activeTab === 'profile' ? 'border-primary text-primary font-semibold' : 'border-transparent text-heading/55 hover:text-primary'}`}
        >
          <User className="w-4 h-4 mr-2" /> Profile
        </button>
        {profile?.auth_provider === 'LOCAL' && (
          <button 
            onClick={() => setActiveTab('security')}
            className={`flex items-center px-5 py-3 border-b-2 font-medium text-sm transition-all ${activeTab === 'security' ? 'border-primary text-primary font-semibold' : 'border-transparent text-heading/55 hover:text-primary'}`}
          >
            <Shield className="w-4 h-4 mr-2" /> Security
          </button>
        )}
        <button 
          onClick={() => setActiveTab('sessions')}
          className={`flex items-center px-5 py-3 border-b-2 font-medium text-sm transition-all ${activeTab === 'sessions' ? 'border-primary text-primary font-semibold' : 'border-transparent text-heading/55 hover:text-primary'}`}
        >
          <MonitorSmartphone className="w-4 h-4 mr-2" /> Active Sessions
        </button>
      </div>

      <div className="bg-bg-secondary p-8 rounded-card border border-border">
        {activeTab === 'profile' && profile && (
          <div className="space-y-6 max-w-md">
            <div>
              <label className="block text-xs font-semibold text-heading/50 uppercase tracking-wider mb-2">Username</label>
              <div className="w-full h-12 px-4 bg-bg-primary/50 border border-border rounded-input flex items-center text-heading/60 select-all font-mono text-sm">
                {profile.username}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-heading/50 uppercase tracking-wider mb-2">Email Address</label>
              <div className="w-full h-12 px-4 bg-bg-primary/50 border border-border rounded-input flex items-center text-heading/60 select-all font-mono text-sm">
                {profile.email}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-heading/50 uppercase tracking-wider mb-2.5">Authentication Provider</label>
              <div className="inline-block px-3 py-1 bg-primary/5 text-primary border border-primary/10 rounded-full text-xs font-semibold uppercase tracking-wider">
                {profile.auth_provider}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="max-w-md">
            <form onSubmit={handlePasswordChange} className="space-y-6">
              {passwordStatus.message && (
                <div className={`p-4 rounded-input border flex items-start text-sm ${passwordStatus.type === 'error' ? 'bg-semantic-error/5 border-semantic-error/15 text-semantic-error' : 'bg-semantic-success/5 border-semantic-success/15 text-semantic-success'}`}>
                  {passwordStatus.type === 'error' ? <AlertCircle className="w-4.5 h-4.5 mr-2.5 shrink-0 mt-0.5" /> : <CheckCircle2 className="w-4.5 h-4.5 mr-2.5 shrink-0 mt-0.5" />}
                  <span>{passwordStatus.message}</span>
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-heading/50 uppercase tracking-wider mb-2">Current Password</label>
                <input 
                  type="password" 
                  required
                  value={passwords.oldPassword}
                  onChange={e => setPasswords({...passwords, oldPassword: e.target.value})}
                  className="w-full h-12 px-4 bg-bg-primary rounded-input border border-border outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-heading text-sm transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-heading/50 uppercase tracking-wider mb-2">New Password</label>
                <input 
                  type="password" 
                  required
                  value={passwords.newPassword}
                  onChange={e => setPasswords({...passwords, newPassword: e.target.value})}
                  className="w-full h-12 px-4 bg-bg-primary rounded-input border border-border outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-heading text-sm transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-heading/50 uppercase tracking-wider mb-2">Confirm New Password</label>
                <input 
                  type="password" 
                  required
                  value={passwords.confirmPassword}
                  onChange={e => setPasswords({...passwords, confirmPassword: e.target.value})}
                  className="w-full h-12 px-4 bg-bg-primary rounded-input border border-border outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-heading text-sm transition-all duration-200"
                />
              </div>
              <button 
                type="submit" 
                className="flex items-center px-6 py-3 bg-primary text-bg-primary rounded-button hover:bg-primary/95 transition-all font-semibold text-sm shadow-sm"
              >
                <KeyRound className="w-4 h-4 mr-2" /> Update Password
              </button>
            </form>
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
              <p className="text-sm text-heading/60 font-light">Audit or terminate active device connections currently logged into your account.</p>
              <button 
                onClick={handleRevokeAll}
                className="px-4 py-2 text-xs font-semibold text-semantic-error border border-semantic-error/25 hover:bg-semantic-error/5 rounded-button transition-colors self-start sm:self-auto shrink-0"
              >
                Revoke All Sessions
              </button>
            </div>
            
            <div className="space-y-4">
              {sessions.map(session => (
                <div key={session.id} className="flex items-center justify-between p-5 bg-bg-primary rounded-[18px] border border-border hover:border-primary/25 transition-all duration-200">
                  <div className="flex items-center pr-4 min-w-0">
                    <div className={`p-3 rounded-lg mr-4 border shrink-0 ${session.isCurrent ? 'bg-semantic-success/5 border-semantic-success/15 text-semantic-success' : 'bg-heading/5 border-border text-heading/40'}`}>
                      <MonitorSmartphone className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-heading font-semibold text-heading text-sm flex items-center">
                        <span className="truncate">{session.device_name || 'Unknown Device'}</span>
                        {session.isCurrent && <span className="ml-3 text-[9px] font-bold px-2 py-0.5 bg-semantic-success text-white rounded-full uppercase tracking-wider shrink-0">Current</span>}
                      </h4>
                      <p className="text-xs text-heading/50 mt-1 truncate font-light">{session.user_agent}</p>
                      <p className="text-[10px] text-heading/40 mt-1">IP: {session.ip_address} • Expires: {new Date(session.expires_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {!session.isCurrent && (
                    <button 
                      onClick={() => handleRevokeSession(session.id)}
                      className="px-4 py-2 text-xs font-bold text-semantic-error hover:bg-semantic-error/5 border border-transparent hover:border-semantic-error/15 rounded-button transition-colors shrink-0"
                    >
                      Revoke
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

