import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, password })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/');
            } else {
                setError(data.message || 'فشل تسجيل الدخول');
            }
        } catch (err) {
            setError('خطأ في الشبكة');
        }
    };

    return (
        <div className="auth-container glass-panel" dir="rtl">
            <h2 style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--text-light)', fontSize: '2rem' }}>مرحباً بعودتك</h2>
            {error && <div style={{ color: 'var(--error)', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label className="form-label">اسم المستخدم</label>
                    <input
                        type="text"
                        className="form-input"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="مثال: محمد"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">كلمة المرور</label>
                    <input
                        type="password"
                        className="form-input"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>تسجيل الدخول</button>
            </form>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                ليس لديك حساب؟ <Link to="/register" style={{ color: 'var(--primary)' }}>سجل الآن</Link>
            </div>
        </div>
    );
}
