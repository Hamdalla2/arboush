import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (newPassword !== confirmPassword) {
            setError('كلمة المرور الجديدة غير متطابقة');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ oldPassword, newPassword })
            });
            const data = await res.json();
            if (res.ok) {
                setSuccess('تم تغيير كلمة المرور بنجاح');
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                setError(data.message || 'فشل تغيير كلمة المرور');
            }
        } catch (err) {
            setError('خطأ في الشبكة');
        }
    };

    return (
        <div className="auth-container glass-panel" dir="rtl">
            <h2 style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--text-light)', fontSize: '2rem' }}>تغيير كلمة المرور</h2>
            {error && <div style={{ color: 'var(--error)', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}
            {success && <div style={{ color: '#4caf50', marginBottom: '15px', textAlign: 'center' }}>{success}</div>}
            <form onSubmit={handleChangePassword}>
                <div className="form-group">
                    <label className="form-label">كلمة المرور الحالية</label>
                    <input
                        type="password"
                        className="form-input"
                        value={oldPassword}
                        onChange={e => setOldPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">كلمة المرور الجديدة</label>
                    <input
                        type="password"
                        className="form-input"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">تأكيد كلمة المرور الجديدة</label>
                    <input
                        type="password"
                        className="form-input"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>حفظ التغييرات</button>
            </form>
        </div>
    );
}
