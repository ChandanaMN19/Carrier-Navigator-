import React, { useState } from 'react';
import { Hammer, Download, Sparkles, Plus, Trash2, Layout, FileCheck } from 'lucide-react';
import { apiService } from '../services/api';

export default function ResumeBuilderView({ onAnalyzeBuiltResume }) {
  const [template, setTemplate] = useState('modern');
  const [downloading, setDownloading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: 'Alex Mercer',
    title: 'Full Stack Software Engineer',
    email: 'alex.mercer@example.com',
    phone: '+1 (555) 019-2834',
    linkedin: 'linkedin.com/in/alexmercer',
    github: 'github.com/alexmercer',
    summary: 'Passionate Full Stack Engineer with 3+ years of experience building scalable Spring Boot microservices and responsive React web applications.',
    skills: ['Java', 'Spring Boot', 'React', 'SQL', 'MongoDB', 'REST APIs', 'Docker', 'Git'],
    newSkill: '',
    educationList: [
      { degree: 'B.Tech in Computer Science', institution: 'State Tech University', year: '2020 - 2024', score: '3.8 GPA' }
    ],
    experienceList: [
      { company: 'TechCorp Solutions', role: 'Junior Software Engineer', duration: '2023 - Present', description: 'Engineered RESTful APIs using Java 21 and Spring Boot. Optimized SQL database queries reducing latency by 35%.' }
    ],
    projectList: [
      { name: 'Career Navigator Platform', technologies: 'Spring Boot, React, Apache PDFBox, MongoDB', description: 'Designed an all-in-one AI career platform with live resume builder, ATS scoring engine, and interactive mock interview simulator.' }
    ]
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = () => {
    if (!formData.newSkill.trim()) return;
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, prev.newSkill.trim()],
      newSkill: ''
    }));
  };

  const handleRemoveSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleDownloadPdf = async () => {
    setDownloading(true);
    await apiService.downloadResumePdf({ ...formData, template });
    setDownloading(false);
  };

  const handleAnalyzeResume = async () => {
    setAnalyzing(true);
    const result = await apiService.analyzeBuiltResume(formData);
    onAnalyzeBuiltResume(result);
    setAnalyzing(false);
  };

  return (
    <div className="animate-fade">
      <div className="module-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 className="module-title">
            <Hammer className="text-purple-400" />
            Module 2: Interactive Resume Builder
          </h2>
          <p className="module-subtitle">
            Build your resume step-by-step with real-time preview, template options, server-side PDF export, and 1-click ATS analysis.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleAnalyzeResume} disabled={analyzing} className="btn-secondary">
            <FileCheck size={18} className="text-emerald-400" />
            <span>{analyzing ? 'Analyzing...' : 'Analyze This Resume'}</span>
          </button>
          <button onClick={handleDownloadPdf} disabled={downloading} className="btn-primary">
            <Download size={18} />
            <span>{downloading ? 'Exporting PDF...' : 'Export as PDF'}</span>
          </button>
        </div>
      </div>

      <div className="grid-2col">
        {/* Input Form Panel */}
        <div className="glass-panel" style={{ padding: '24px', maxHeight: '720px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Resume Details</h3>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Layout size={16} className="text-slate-400" />
              <select
                className="form-select"
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                style={{ padding: '6px 12px', fontSize: '0.85rem' }}
              >
                <option value="modern">Modern Clean Template</option>
                <option value="executive">Executive Elegant Template</option>
                <option value="minimalist">Tech Minimalist Template</option>
              </select>
            </div>
          </div>

          {/* Personal Info */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--primary-accent)', fontWeight: 700, marginBottom: '12px' }}>
              1. PERSONAL INFORMATION
            </h4>
            <div className="grid-2col" style={{ gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  className="form-input"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Professional Title</label>
                <input
                  className="form-input"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>
            </div>

            <div className="grid-2col" style={{ gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  className="form-input"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--primary-accent)', fontWeight: 700, marginBottom: '12px' }}>
              2. PROFESSIONAL SUMMARY
            </h4>
            <textarea
              className="form-textarea"
              rows={3}
              value={formData.summary}
              onChange={(e) => handleInputChange('summary', e.target.value)}
            />
          </div>

          {/* Technical Skills */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--primary-accent)', fontWeight: 700, marginBottom: '12px' }}>
              3. TECHNICAL SKILLS
            </h4>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <input
                className="form-input"
                placeholder="Add skill (e.g. AWS, Microservices)"
                value={formData.newSkill}
                onChange={(e) => handleInputChange('newSkill', e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
              />
              <button onClick={handleAddSkill} className="btn-secondary" style={{ padding: '0 16px' }}>
                <Plus size={18} />
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {formData.skills.map((skill, i) => (
                <span key={i} className="badge badge-indigo" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  {skill}
                  <Trash2 size={12} style={{ cursor: 'pointer' }} onClick={() => handleRemoveSkill(i)} />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview Panel */}
        <div className="glass-panel" style={{ padding: '32px', background: '#ffffff', color: '#1e293b', borderRadius: 'var(--radius-md)' }}>
          <div style={{ borderBottom: template === 'executive' ? '3px solid #1e293b' : '2px solid #6366f1', paddingBottom: '16px', marginBottom: '20px' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: template === 'minimalist' ? '#0f172a' : '#4338ca', margin: 0 }}>
              {formData.fullName || 'YOUR NAME'}
            </h1>
            <p style={{ fontSize: '1rem', fontWeight: 600, color: '#475569', marginTop: '4px' }}>
              {formData.title}
            </p>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>
              {formData.email} • {formData.phone} • {formData.linkedin}
            </p>
          </div>

          {/* Live Summary */}
          {formData.summary && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '8px' }}>
                SUMMARY
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5 }}>
                {formData.summary}
              </p>
            </div>
          )}

          {/* Live Skills */}
          {formData.skills.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '8px' }}>
                TECHNICAL SKILLS
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#334155', fontWeight: 600 }}>
                {formData.skills.join(' • ')}
              </p>
            </div>
          )}

          {/* Live Projects */}
          {formData.projectList.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '8px' }}>
                PROJECTS
              </h3>
              {formData.projectList.map((p, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{p.name}</span>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic' }}>{p.technologies}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#475569', marginTop: '2px' }}>{p.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Live Education */}
          {formData.educationList.length > 0 && (
            <div>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '8px' }}>
                EDUCATION
              </h3>
              {formData.educationList.map((e, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ fontWeight: 700 }}>{e.degree} - {e.institution}</span>
                  <span style={{ color: '#64748b' }}>{e.year}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
