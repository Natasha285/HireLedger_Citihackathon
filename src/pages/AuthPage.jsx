import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const roles = [ 'student', 'recruiter', 'admin' ];

export default function AuthPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  const [form, setForm] = useState({ email: '', password: '', role: 'student' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = 'Email is required';
    if (!form.password.trim()) e.password = 'Password is required';
    if (!form.role) e.role = 'Role is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field) => (ev) => {
    setForm(f => ({ ...f, [field]: ev.target.value }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const res = login(form.email.trim(), form.password.trim(), form.role);
    setSubmitting(false);
    if (res.ok) {
      const target = from && from !== '/login' ? from : `/dashboard/${form.role}`;
      navigate(target, { replace: true });
    } else if (res.error) {
      setErrors(prev => ({ ...prev, form: res.error }));
    }
  };

  useEffect(() => {
    if (user) {
      navigate(`/dashboard/${user.role}`, { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="auth-layout" aria-label="Authentication page">
      <div className="auth-side marketing" aria-hidden="true">
        <div className="inner marketing-inner pt-6vh pb-6vh">
          <div className="maxw-520">
            <h1 className="marketing-headline">
              <span className="gradient-accent">Hire better.</span><br />
              <span className="headline-fade">Faster.</span>
            </h1>
            <p className="lead">
              Unified campus recruitment for students, recruiters, and admins—collaboration, insights and talent decisions in a single modern platform.
            </p>
            <ul className="feature-list">
              <li><strong>Role-based</strong> intelligent dashboards</li>
              <li><strong>Real-time</strong> pipeline visibility</li>
              <li><strong>Future:</strong> AI ranking & verifiable credentials</li>
            </ul>
          </div>
          <div className="mt-auto fs-xs opacity-75 ls-1">© {new Date().getFullYear()} HireLedger (Demo)</div>
        </div>
        <div aria-hidden className="decor-layer">
          <div className="decor-a" />
          <div className="decor-b" />
        </div>
      </div>
      <div className="auth-side form">
        <form className="auth-card glass" onSubmit={handleSubmit} aria-describedby={errors.form ? 'form-error' : undefined} noValidate>
          <h2 className="auth-welcome">Welcome back</h2>
          <p className="auth-desc">Sign in to continue to your role dashboard.</p>
          {errors.form && <div id="form-error" role="alert" className="error-msg">{errors.form}</div>}
          <label className="field-group">
            <span>Email / Username</span>
            <input
              type="text"
              autoComplete="username"
              value={form.email}
              onChange={handleChange('email')}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'err-email' : undefined}
            />
            {errors.email && <small id="err-email" className="error-msg">{errors.email}</small>}
          </label>
          <label className="field-group">
            <span>Password</span>
            <input
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange('password')}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'err-password' : undefined}
            />
            {errors.password && <small id="err-password" className="error-msg">{errors.password}</small>}
          </label>
          <label className="field-group">
            <span>Role</span>
            <select value={form.role} onChange={handleChange('role')} aria-invalid={!!errors.role} aria-describedby={errors.role ? 'err-role' : undefined}>
              {roles.map(r => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
            </select>
            {errors.role && <small id="err-role" className="error-msg">{errors.role}</small>}
          </label>
          <div className="actions-row actions-tight">
            <button type="submit" className="btn primary" disabled={submitting}>{submitting ? 'Logging in…' : 'Login'}</button>
            <button type="button" className="link-btn" onClick={() => alert('Sign Up flow placeholder')}>Sign Up</button>
            <button type="button" className="link-btn" onClick={() => alert('Forgot Password placeholder')}>Forgot Password</button>
          </div>
          <small className="muted demo-note">Demo auth only. Replace with real backend/OAuth.</small>
        </form>
      </div>
    </div>
  );
}
