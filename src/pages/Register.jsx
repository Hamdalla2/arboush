import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = useState({ name: '', whatsapp: '', password: '', address: '', code: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/');
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Network error');
        }
    };

    return (
        <div className="auth-container glass-panel">
            <h2 style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--text-light)', fontSize: '2rem' }}>Create Account</h2>
            {error && <div style={{ color: 'var(--error)', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input type="text" name="name" className="form-input" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label className="form-label">WhatsApp Number</label>
                    <input type="text" name="whatsapp" className="form-input" placeholder="e.g. 1234567890" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label className="form-label">Shipping Address</label>
                    <textarea name="address" className="form-textarea" rows="2" onChange={handleChange} required></textarea>
                </div>
                <div className="form-group">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" className="form-input" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label className="form-label" style={{ opacity: 0.5, fontSize: '0.8rem' }}>Admin Code (Optional)</label>
                    <input type="password" name="code" className="form-input" onChange={handleChange} placeholder="Leave blank normally" />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>Sign Up</button>
            </form>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                Already have an account? <Link to="/login" style={{ color: 'var(--primary)' }}>Log in</Link>
            </div>
        </div>
    );
}
