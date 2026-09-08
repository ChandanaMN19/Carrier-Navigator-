import React, { useState, useEffect } from 'react';
import { Brain, Clock, CheckCircle, AlertCircle, BarChart3, RotateCcw, ArrowRight } from 'lucide-react';
import { apiService } from '../services/api';

export default function AptitudeTestView() {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [activeIdx, setActiveIdx] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(300); // 5 minute countdown
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTest();
  }, []);

  useEffect(() => {
    if (isSubmitted || secondsRemaining <= 0) return;
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsRemaining, isSubmitted]);

  const loadTest = async () => {
    const data = await apiService.getAptitudeQuestions();
    setQuestions(data);
    setUserAnswers({});
    setActiveIdx(0);
    setSecondsRemaining(300);
    setIsSubmitted(false);
    setResult(null);
  };

  const handleSelectOption = (qId, optionIdx) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitTest = async () => {
    if (isSubmitted) return;
    setLoading(true);
    const timeTaken = 300 - secondsRemaining;
    const rep = await apiService.submitAptitudeTest(userAnswers, timeTaken);
    setResult(rep);
    setIsSubmitted(true);
    setLoading(false);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentQ = questions[activeIdx];

  return (
    <div className="animate-fade">
      <div className="module-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 className="module-title">
            <Brain className="text-amber-400" />
            Module 5: Aptitude & Technical Test Engine
          </h2>
          <p className="module-subtitle">
            Take timed MCQs covering Quantitative Aptitude, Logical Reasoning, and Verbal skills with instant accuracy and weak-area analysis.
          </p>
        </div>

        {!isSubmitted && (
          <div className="glass-panel" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px', borderColor: secondsRemaining < 60 ? '#f43f5e' : 'var(--border-color)' }}>
            <Clock size={20} className={secondsRemaining < 60 ? 'text-rose-400 animate-pulse' : 'text-amber-400'} />
            <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>{formatTime(secondsRemaining)}</span>
          </div>
        )}
      </div>

      {!isSubmitted ? (
        <div className="grid-2col">
          {/* Question Display */}
          <div className="glass-panel" style={{ padding: '28px' }}>
            {currentQ && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span className="badge badge-amber">{currentQ.category}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Question {activeIdx + 1} of {questions.length}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '20px', lineHeight: 1.4 }}>
                  {currentQ.questionText}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = userAnswers[currentQ.id] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(currentQ.id, optIdx)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '14px 18px',
                          borderRadius: 'var(--radius-sm)',
                          border: isSelected ? '2px solid var(--primary-accent)' : '1px solid var(--border-color)',
                          background: isSelected ? 'rgba(99, 102, 241, 0.2)' : 'rgba(15, 23, 42, 0.6)',
                          color: 'var(--text-primary)',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontWeight: isSelected ? 700 : 500
                        }}
                      >
                        <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: isSelected ? 'var(--primary-accent)' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    disabled={activeIdx === 0}
                    onClick={() => setActiveIdx(activeIdx - 1)}
                    className="btn-secondary"
                  >
                    ← Previous
                  </button>
                  {activeIdx < questions.length - 1 ? (
                    <button onClick={() => setActiveIdx(activeIdx + 1)} className="btn-secondary">
                      Next →
                    </button>
                  ) : (
                    <button onClick={handleSubmitTest} disabled={loading} className="btn-primary">
                      {loading ? 'Submitting...' : 'Complete & Submit Quiz'}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Navigator Grid */}
          <div className="glass-panel" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>Question Navigator</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '24px' }}>
              {questions.map((q, idx) => {
                const isAnswered = userAnswers[q.id] !== undefined;
                const isCurrent = idx === activeIdx;
                return (
                  <button
                    key={q.id}
                    onClick={() => setActiveIdx(idx)}
                    style={{
                      padding: '12px',
                      borderRadius: 'var(--radius-sm)',
                      border: isCurrent ? '2px solid #818cf8' : '1px solid var(--border-color)',
                      background: isAnswered ? 'rgba(16, 185, 129, 0.2)' : 'rgba(15, 23, 42, 0.5)',
                      color: isAnswered ? '#34d399' : 'var(--text-secondary)',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Q{idx + 1}
                  </button>
                );
              })}
            </div>

            <button onClick={handleSubmitTest} className="btn-primary" style={{ width: '100%' }}>
              Finish & Submit Test
            </button>
          </div>
        </div>
      ) : (
        /* Results Report Card */
        <div className="glass-panel animate-fade" style={{ padding: '36px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Aptitude Quiz Performance Summary</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Completed in {300 - secondsRemaining} seconds • Pace: {result?.speedGrade}</p>
            </div>
            <button onClick={loadTest} className="btn-secondary">
              <RotateCcw size={16} /> Retake Test
            </button>
          </div>

          <div className="grid-3col" style={{ marginBottom: '28px' }}>
            <div className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>OVERALL ACCURACY</span>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#818cf8' }}>{result?.scorePercentage}%</div>
            </div>
            <div className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>CORRECT ANSWERS</span>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#34d399' }}>{result?.correctCount} / {result?.totalQuestions}</div>
            </div>
            <div className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>SPEED RATING</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fbbf24', marginTop: '8px' }}>{result?.speedGrade}</div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>CATEGORY ACCURACY</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {Object.entries(result?.categoryAccuracy || {}).map(([cat, pct]) => (
                <div key={cat} style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600 }}>{cat}</span>
                  <span className={`badge ${pct >= 75 ? 'badge-green' : 'badge-amber'}`}>{pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>STUDY RECOMMENDATIONS</h4>
            <ul style={{ paddingLeft: '18px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {result?.recommendations.map((rec, i) => (
                <li key={i} style={{ marginBottom: '4px' }}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
