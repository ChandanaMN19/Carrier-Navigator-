import React, { useState } from 'react';
import { Upload, CheckCircle2, XCircle, AlertCircle, Sparkles, FileText, ArrowRight } from 'lucide-react';
import { apiService } from '../services/api';

export default function ResumeAnalyzerView({ onTransferToBuilder }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    const data = await apiService.analyzeResumeFile(file);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="animate-fade">
      <div className="module-header">
        <h2 className="module-title">
          <FileText className="text-indigo-400" />
          Module 1: Resume Analyzer & ATS Scorer
        </h2>
        <p className="module-subtitle">
          Upload your resume PDF or DOCX to extract skills, evaluate section completeness, and calculate your overall ATS score.
        </p>
      </div>

      <div className="grid-2col">
        {/* Upload Panel */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: 700 }}>
            Upload Resume Document
          </h3>

          <div
            style={{
              border: '2px dashed var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '36px',
              textAlign: 'center',
              cursor: 'pointer',
              marginBottom: '20px',
              background: 'rgba(15, 23, 42, 0.4)'
            }}
            onClick={() => document.getElementById('resume-file-input').click()}
          >
            <Upload size={40} style={{ margin: '0 auto 12px auto', color: 'var(--primary-accent)' }} />
            <p style={{ fontWeight: 600, fontSize: '1.05rem' }}>
              {file ? file.name : 'Click or Drag & Drop Resume File'}
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Supports PDF, DOCX, or TXT up to 10MB
            </p>
            <input
              id="resume-file-input"
              type="file"
              accept=".pdf,.docx,.txt"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!file || loading}
            className="btn-primary"
            style={{ width: '100%', opacity: !file || loading ? 0.6 : 1 }}
          >
            {loading ? (
              <span>Analyzing Resume...</span>
            ) : (
              <>
                <Sparkles size={18} />
                <span>Calculate ATS Score & Extract Skills</span>
              </>
            )}
          </button>

          {/* Quick Demo File Button */}
          {!file && (
            <button
              onClick={() => {
                const fakeFile = new File(["Sample candidate resume content with Java, React, SQL, and Spring Boot."], "sample_software_engineer_resume.pdf", { type: "application/pdf" });
                setFile(fakeFile);
              }}
              className="btn-secondary"
              style={{ width: '100%', marginTop: '12px', justifyContent: 'center' }}
            >
              Load Sample Engineer Resume
            </button>
          )}
        </div>

        {/* Results Panel */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: 700 }}>
            ATS Evaluation Report
          </h3>

          {!result ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              <FileText size={48} style={{ margin: '0 auto 12px auto', opacity: 0.3 }} />
              <p>Upload a resume file on the left to display the ATS score breakdown.</p>
            </div>
          ) : (
            <div>
              {/* Score Gauge */}
              <div className="score-circle" style={{ '--score': result.score }}>
                <div className="score-circle-inner">
                  <span className="score-number">{result.score}%</span>
                  <span className="score-label">ATS MATCH</span>
                </div>
              </div>

              {/* Section Completeness */}
              <div style={{ margin: '20px 0' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                  SECTION COMPLETENESS
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {Object.entries(result.sectionCompleteness || {}).map(([sec, present]) => (
                    <div
                      key={sec}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.85rem',
                        background: 'rgba(15, 23, 42, 0.6)',
                        padding: '6px 10px',
                        borderRadius: '6px'
                      }}
                    >
                      {present ? (
                        <CheckCircle2 size={16} className="text-emerald-400" />
                      ) : (
                        <XCircle size={16} className="text-rose-400" />
                      )}
                      <span>{sec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Extracted */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  DETECTED TECHNICAL SKILLS
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {result.extractedSkills.map((sk) => (
                    <span key={sk} className="badge badge-indigo">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              {result.missingSkills && result.missingSkills.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    RECOMMENDED MISSING KEYWORDS
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {result.missingSkills.map((sk) => (
                      <span key={sk} className="badge badge-amber">
                        + {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Improvement Suggestions */}
              <div>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  ACTIONABLE SUGGESTIONS
                </h4>
                <ul style={{ paddingLeft: '18px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  {result.suggestions.map((sug, idx) => (
                    <li key={idx} style={{ marginBottom: '6px' }}>{sug}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
