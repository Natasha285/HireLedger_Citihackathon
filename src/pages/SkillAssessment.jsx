import React, { useState, useEffect, useMemo } from 'react';
import '../styles/pages/SkillAssessment.css';

/*
  SkillAssessment Page
  --------------------
  Static quiz UI with:
    - Progress bar
    - Timer badge
    - Question card (single-choice)
    - Submit button (disabled until answer picked)
    - Result view (score summary, percentile radial, recommendations)
  Notes / Future Integrations:
    - TODO(API): Fetch assessment metadata & question batch from backend (paginated / adaptive)
    - TODO(API): Post user responses and capture answer timing for analytics
    - TODO(SECURITY): Server-side validation of score; never trust client-calculated results
    - TODO(ADAPTIVE): Adaptive difficulty algorithm (e.g., IRT or simple ladder) based on correctness streak
    - TODO(ANTI-CHEAT): Obfuscate question order & implement focus/blur detection, possible integrity hash
    - TODO(BLOCKCHAIN): Optional on-chain credential hash after passing score threshold
*/

// Placeholder question data
const QUESTIONS = [
  { id: 'q1', prompt: 'Which array method creates a new array with all elements that pass the test?', options: ['map()', 'forEach()', 'filter()', 'reduce()'], answer: 2, topic: 'JavaScript Fundamentals' },
  { id: 'q2', prompt: 'Big-O time complexity of binary search on sorted array?', options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'], answer: 1, topic: 'Algorithms' },
  { id: 'q3', prompt: 'Which HTTP status means Unauthorized?', options: ['400', '401', '403', '422'], answer: 1, topic: 'Web Protocols' },
  { id: 'q4', prompt: 'CSS property to create a flex container?', options: ['display: flex', 'flex: container', 'flex: 1', 'container: flex'], answer: 0, topic: 'CSS' },
  { id: 'q5', prompt: 'SQL command to remove a table schema & data?', options: ['DELETE TABLE users', 'REMOVE users', 'DROP TABLE users', 'TRUNCATE users'], answer: 2, topic: 'Databases' }
];

const TOTAL_TIME = 60 * 5; // 5 minutes in seconds (placeholder)

function ProgressBar({ current, total }) {
  const pct = (current / total) * 100;
  return (
    <div className="assess-progress" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={current} aria-label="Assessment progress">
      <div className="assess-progress-fill" style={{ width: pct + '%' }} />
    </div>
  );
}

function RadialScore({ scorePct }) {
  const circ = 2 * Math.PI * 48;
  const offset = circ - (scorePct / 100) * circ;
  return (
    <div className="radial-score" aria-label={`Score ${scorePct}%`}>
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="48" className="track" strokeWidth="12" />
        <circle cx="60" cy="60" r="48" className="bar" strokeWidth="12" strokeDasharray={circ} strokeDashoffset={offset} />
      </svg>
      <div className="radial-score-value">{scorePct}%</div>
    </div>
  );
}

export default function SkillAssessment() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: selectedIndex }
  const [seconds, setSeconds] = useState(TOTAL_TIME);
  const [submitted, setSubmitted] = useState(false);

  // Timer effect
  useEffect(() => {
    if (submitted) return; // stop timer when submitted
    if (seconds <= 0) { setSubmitted(true); return; }
    const t = setTimeout(()=> setSeconds(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds, submitted]);

  const currentQuestion = QUESTIONS[index];
  const answeredCurrent = answers[currentQuestion.id] != null;

  const scoreInfo = useMemo(() => {
    if (!submitted) return null;
    let correct = 0;
    QUESTIONS.forEach(q => { if (answers[q.id] === q.answer) correct++; });
    const pct = Math.round((correct / QUESTIONS.length) * 100);
    // Placeholder percentile logic (random-ish deterministic)
    const percentile = Math.min(99, Math.max(1, pct + 12));
    const recommendations = [
      'Review Big-O complexities for sorting & searching',
      'Deep dive into HTTP status code classes (2xx,4xx,5xx)',
      'Practice advanced CSS layout patterns (grid + flex synergy)',
      'Strengthen SQL DDL vs DML understanding'
    ];
    return { correct, pct, percentile, recommendations };
  }, [submitted, answers]);

  function selectOption(optIndex) {
    if (submitted) return;
    setAnswers(a => ({ ...a, [currentQuestion.id]: optIndex }));
  }

  function goNext() {
    if (index < QUESTIONS.length - 1) {
      setIndex(i => i + 1);
    }
  }
  function goPrev() { if (index > 0) setIndex(i => i - 1); }

  function submit() { setSubmitted(true); }

  if (submitted && scoreInfo) {
    return (
      <div className="assessment-page">
        <div className="result-wrap">
          <div className="result-card">
            <h2>Assessment Result</h2>
            <div className="result-top">
              <RadialScore scorePct={scoreInfo.pct} />
              <div className="result-stats">
                <p><strong>{scoreInfo.correct}</strong> / {QUESTIONS.length} correct</p>
                <p>Percentile: <strong>{scoreInfo.percentile}</strong></p>
                <p>Time Used: {Math.round(((TOTAL_TIME - seconds)/TOTAL_TIME)*100)}%</p>
              </div>
            </div>
            <div className="reco-block">
              <h3>Recommended Focus Areas</h3>
              <ul>
                {scoreInfo.recommendations.map(r => <li key={r}>{r}</li>)}
              </ul>
            </div>
            <div className="actions-row">
              <button onClick={()=>{ /* TODO(API): Request retake token */ window.location.reload(); }} className="btn-primary">Retake</button>
              <button onClick={()=>alert('TODO: Show detailed review')} className="btn-ghost">Review Answers</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="assessment-page">
      <header className="assessment-head">
        <div className="timer" role="status" aria-live="polite">⏱ {minutes}:{secs.toString().padStart(2,'0')}</div>
        <ProgressBar current={index + (answeredCurrent ? 1 : 0)} total={QUESTIONS.length} />
        <div className="question-meta">Question {index + 1} / {QUESTIONS.length}</div>
      </header>

      <main className="question-card" aria-labelledby="qprompt">
        <h2 id="qprompt" className="prompt">{currentQuestion.prompt}</h2>
        <ul className="options" role="list">
          {currentQuestion.options.map((opt, i) => {
            const selected = answers[currentQuestion.id] === i;
            return (
              <li key={i}>
                <button
                  className={"option-btn" + (selected ? ' selected' : '')}
                  onClick={()=>selectOption(i)}
                  aria-pressed={selected}
                >{opt}</button>
              </li>
            );
          })}
        </ul>
        <div className="nav-row">
          <button onClick={goPrev} disabled={index===0} className="btn-ghost">Prev</button>
          {index < QUESTIONS.length - 1 && (
            <button onClick={goNext} disabled={!answeredCurrent} className="btn-secondary">Next</button>
          )}
          {index === QUESTIONS.length - 1 && (
            <button onClick={submit} disabled={!answeredCurrent} className="btn-primary">Submit</button>
          )}
        </div>
      </main>
    </div>
  );
}
