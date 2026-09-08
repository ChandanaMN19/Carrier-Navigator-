import React, { useState, useEffect } from 'react';
import { Mic, Volume2, CheckCircle, AlertTriangle, Sparkles, Award, RefreshCw } from 'lucide-react';
import { apiService } from '../services/api';

export default function MockInterviewView() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerText, setAnswerText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    const data = await apiService.getMockQuestions();
    setQuestions(data);
    setCurrentIndex(0);
    setAnswerText('');
    setFeedback(null);
  };

  const handleToggleVoice = () => {
    if (!isRecording) {
      setIsRecording(true);
      setAnswerText("I would approach this by using ConcurrentHashMap which achieves thread-safety without locking the entire table. It uses lock striping over bucket segments to allow concurrent reads and writes.");
    } else {
      setIsRecording(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!answerText.trim() || !currentQ) return;
    setLoading(true);
    const fb = await apiService.submitInterviewAnswer(currentQ.id, answerText, ['Java', 'Spring Boot']);
    setFeedback(fb);
    setLoading(false);
  };

  const currentQ = questions[currentIndex];

  return (
    <div className="animate-fade">
      <div className="module-header">
        <h2 className="module-title">
          <Mic className="text-rose-400" />
          Module 4: Mock Interview Simulator
        </h2>
        <p className="module-subtitle">
          Practice HR and technical interview questions using text or voice input. Receive instant feedback on keyword coverage, confidence sentiment, and model answer structure.
        </p>
      </div>

      <div className="grid-2col">
        {/* Workspace Panel */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span className="badge badge-indigo">
              Question {currentIndex + 1} of {questions.length || 1}
            </span>
            <button onClick={loadQuestions} className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.8rem' }}>
              <RefreshCw size={14} /> Reset Question Round
            </button>
          </div>

          {currentQ ? (
            <div>
              <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '18px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', borderLeft: '4px solid var(--primary-accent)' }}>
                <span className={`badge ${currentQ.category === 'HR' ? 'badge-amber' : 'badge-green'}`} style={{ marginBottom: '8px' }}>
                  {currentQ.category} Question
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.4 }}>
                  "{currentQ.questionText}"
                </h3>
              </div>

              {/* Answer Input */}
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label className="form-label">Your Response</label>
                  <button
                    onClick={handleToggleVoice}
                    className={`btn-secondary ${isRecording ? 'badge-rose' : ''}`}
                    style={{ padding: '4px 12px', fontSize: '0.8rem' }}
                  >
                    <Mic size={14} className={isRecording ? 'animate-pulse text-rose-400' : ''} />
                    <span>{isRecording ? 'Voice Recording Active...' : 'Simulate Voice Input'}</span>
                  </button>
                </div>

                <textarea
                  className="form-textarea"
                  rows={6}
                  placeholder="Type or speak your interview answer here..."
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                />
              </div>

              <button
                onClick={handleSubmitAnswer}
                disabled={!answerText.trim() || loading}
                className="btn-primary"
                style={{ width: '100%', opacity: !answerText.trim() || loading ? 0.6 : 1 }}
              >
                {loading ? 'Evaluating Response...' : 'Submit & Analyze Response'}
              </button>
            </div>
          ) : (
            <p>Loading questions...</p>
          )}
        </div>

        {/* Feedback Panel */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: 700 }}>
            AI Interview Evaluation Report
          </h3>

          {!feedback ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              <Award size={48} style={{ margin: '0 auto 12px auto', opacity: 0.3 }} />
              <p>Submit your answer on the left to evaluate performance metrics and sentiment analysis.</p>
            </div>
          ) : (
            <div>
              {/* Overall Score */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                <div className="glass-panel" style={{ flex: 1, padding: '16px', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>OVERALL SCORE</span>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#818cf8' }}>{feedback.overallScore}%</div>
                </div>
                <div className="glass-panel" style={{ flex: 1, padding: '16px', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>CONFIDENCE TONE</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#34d399', marginTop: '6px' }}>{feedback.sentiment}</div>
                </div>
              </div>

              {/* Keyword Breakdown */}
              <div style={{ marginBottom: '18px' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  TECHNICAL KEYWORD COVERAGE
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {feedback.matchedKeywords.map((kw) => (
                    <span key={kw} className="badge badge-green">✓ {kw}</span>
                  ))}
                  {feedback.missingKeywords.map((kw) => (
                    <span key={kw} className="badge badge-rose">✗ {kw}</span>
                  ))}
                </div>
              </div>

              {/* Actionable Feedback */}
              <div style={{ marginBottom: '18px' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  IMPROVEMENT RECOMMENDATIONS
                </h4>
                <ul style={{ paddingLeft: '18px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {feedback.suggestions.map((sug, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{sug}</li>
                  ))}
                </ul>
              </div>

              {/* Model Answer Guidance */}
              <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '14px', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #f59e0b' }}>
                <h4 style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: 700, marginBottom: '4px' }}>
                  IDEAL ANSWER BENCHMARK
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {feedback.idealAnswerSnippet}
                </p>
              </div>

              {currentIndex < questions.length - 1 && (
                <button
                  onClick={() => {
                    setCurrentIndex(currentIndex + 1);
                    setAnswerText('');
                    setFeedback(null);
                  }}
                  className="btn-secondary"
                  style={{ width: '100%', marginTop: '20px', justifyContent: 'center' }}
                >
                  Proceed to Next Question →
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
