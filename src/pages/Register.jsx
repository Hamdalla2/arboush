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
                setError(data.message || 'فشل إنشاء الحساب');
            }
        } catch (err) {
            setError('خطأ في الشبكة');
        }
    };

    return (
        <div className="auth-container glass-panel" dir="rtl">
            <h2 style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--text-light)', fontSize: '2rem' }}>إنشاء حساب جديـد</h2>
            {error && <div style={{ color: 'var(--error)', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label className="form-label">الاسم الكامل</label>
                    <input type="text" name="name" className="form-input" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label className="form-label">رقم الواتساب</label>
                    <input type="text" name="whatsapp" className="form-input" placeholder="مثال: 1234567890" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label className="form-label">عنوان التوصيل</label>
                    <textarea name="address" className="form-textarea" rows="2" onChange={handleChange} required></textarea>
                </div>
                <div className="form-group">
                    <label className="form-label">كلمة المرور</label>
                    <input type="password" name="password" className="form-input" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label className="form-label" style={{ opacity: 0.5, fontSize: '0.8rem' }}>كود الإدارة (اختياري)</label>
                    <input type="password" name="code" className="form-input" onChange={handleChange} placeholder="اتركه فارغاً بالوضع الطبيعي" />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>تسجيل</button>
            </form>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                لديك حساب بالفعل؟ <Link to="/login" style={{ color: 'var(--primary)' }}>تسجيل الدخول</Link>
            </div>
        </div>
    );
}
