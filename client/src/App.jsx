import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AssetPage from './pages/AssetPage';
import Settings from './pages/Settings';
import Search from './pages/Search';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<AssetPage title="Projects" description="Manage your software development projects and case studies." assetType="PROJECT" buttonText="Add Project" />} />
            <Route path="experience" element={<AssetPage title="Work Experience" description="Track your professional history, roles, and achievements." assetType="WORK_EXPERIENCE" buttonText="Add Experience" />} />
            <Route path="skills" element={<AssetPage title="Skills" description="Track your technical and soft skills." assetType="SKILL" buttonText="Add Skill" />} />
            <Route path="achievements" element={<AssetPage title="Achievements" description="Record your certifications, awards, and milestones." assetType="ACHIEVEMENT" buttonText="Add Achievement" />} />
            <Route path="research" element={<AssetPage title="Research" description="Organize your research papers and publications." assetType="RESEARCH" buttonText="Add Research" />} />
            <Route path="resume-assets" element={<AssetPage title="Resume Assets" description="Reusable paragraphs, summaries, and cover letter blocks." assetType="RESUME_ASSET" buttonText="Add Asset" />} />
            <Route path="settings" element={<Settings />} />
            <Route path="search" element={<Search />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
