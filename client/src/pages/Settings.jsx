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
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="text-3xl font-heading font-bold text-heading">Settings</h2>
        <p className="text-heading/70 mt-2">Manage your account, security, and active devices.</p>
      </div>

      <div className="flex space-x-2 border-b border-heading/10 pb-px">
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex items-center px-4 py-2 border-b-2 font-medium transition-colors ${activeTab === 'profile' ? 'border-primary text-primary' : 'border-transparent text-heading/60 hover:text-heading'}`}
        >
          <User className="w-4 h-4 mr-2" /> Profile
        </button>
        {profile?.auth_provider === 'LOCAL' && (
          <button 
            onClick={() => setActiveTab('security')}
            className={`flex items-center px-4 py-2 border-b-2 font-medium transition-colors ${activeTab === 'security' ? 'border-primary text-primary' : 'border-transparent text-heading/60 hover:text-heading'}`}
          >
            <Shield className="w-4 h-4 mr-2" /> Security
          </button>
        )}
        <button 
          onClick={() => setActiveTab('sessions')}
          className={`flex items-center px-4 py-2 border-b-2 font-medium transition-colors ${activeTab === 'sessions' ? 'border-primary text-primary' : 'border-transparent text-heading/60 hover:text-heading'}`}
        >
          <MonitorSmartphone className="w-4 h-4 mr-2" /> Active Sessions
        </button>
      </div>

      <div className="bg-bg-secondary p-8 rounded-card shadow-raised">
        {activeTab === 'profile' && profile && (
          <div className="space-y-6 max-w-md">
            <div>
              <label className="block text-sm font-medium text-heading/70 mb-2">Username</label>
              <div className="w-full h-12 px-4 bg-bg-primary rounded-md shadow-pressed flex items-center text-heading/50">
                {profile.username}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-heading/70 mb-2">Email Address</label>
              <div className="w-full h-12 px-4 bg-bg-primary rounded-md shadow-pressed flex items-center text-heading/50">
                {profile.email}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-heading/70 mb-2">Authentication Provider</label>
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {profile.auth_provider}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="max-w-md">
            <form onSubmit={handlePasswordChange} className="space-y-6">
              {passwordStatus.message && (
                <div className={`p-4 rounded-md flex items-start ${passwordStatus.type === 'error' ? 'bg-semantic-error/10 text-semantic-error' : 'bg-semantic-success/10 text-semantic-success'}`}>
                  {passwordStatus.type === 'error' ? <AlertCircle className="w-5 h-5 mr-2 shrink-0 mt-0.5" /> : <CheckCircle2 className="w-5 h-5 mr-2 shrink-0 mt-0.5" />}
                  <span>{passwordStatus.message}</span>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-heading/70 mb-2">Current Password</label>
                <input 
                  type="password" 
                  required
                  value={passwords.oldPassword}
                  onChange={e => setPasswords({...passwords, oldPassword: e.target.value})}
                  className="w-full h-12 px-4 bg-bg-primary rounded-md shadow-pressed outline-none focus:ring-2 focus:ring-primary/20 text-heading"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-heading/70 mb-2">New Password</label>
                <input 
                  type="password" 
                  required
                  value={passwords.newPassword}
                  onChange={e => setPasswords({...passwords, newPassword: e.target.value})}
                  className="w-full h-12 px-4 bg-bg-primary rounded-md shadow-pressed outline-none focus:ring-2 focus:ring-primary/20 text-heading"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-heading/70 mb-2">Confirm New Password</label>
                <input 
                  type="password" 
                  required
                  value={passwords.confirmPassword}
                  onChange={e => setPasswords({...passwords, confirmPassword: e.target.value})}
                  className="w-full h-12 px-4 bg-bg-primary rounded-md shadow-pressed outline-none focus:ring-2 focus:ring-primary/20 text-heading"
                />
              </div>
              <button 
                type="submit" 
                className="flex items-center px-6 py-3 bg-primary text-bg-secondary rounded-button shadow-md hover:bg-primary/90 transition-all font-medium"
              >
                <KeyRound className="w-5 h-5 mr-2" /> Update Password
              </button>
            </form>
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <p className="text-heading/70">Manage the devices currently signed in to your account.</p>
              <button 
                onClick={handleRevokeAll}
                className="px-4 py-2 text-semantic-error bg-semantic-error/10 hover:bg-semantic-error/20 rounded-md font-medium transition-colors"
              >
                Revoke All Sessions
              </button>
            </div>
            
            <div className="space-y-4">
              {sessions.map(session => (
                <div key={session.id} className="flex items-center justify-between p-4 bg-bg-primary rounded-lg border border-heading/5">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-full mr-4 ${session.isCurrent ? 'bg-semantic-success/20 text-semantic-success' : 'bg-heading/10 text-heading/50'}`}>
                      <MonitorSmartphone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-heading flex items-center">
                        {session.device_name || 'Unknown Device'} 
                        {session.isCurrent && <span className="ml-3 text-xs px-2 py-0.5 bg-semantic-success text-white rounded-full">Current</span>}
                      </h4>
                      <p className="text-sm text-heading/60 mt-1">{session.user_agent}</p>
                      <p className="text-xs text-heading/40 mt-1">IP: {session.ip_address} • Expires: {new Date(session.expires_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {!session.isCurrent && (
                    <button 
                      onClick={() => handleRevokeSession(session.id)}
                      className="px-4 py-2 text-sm text-semantic-error hover:bg-semantic-error/10 rounded-md transition-colors"
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
