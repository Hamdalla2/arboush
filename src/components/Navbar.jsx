import { LogOut, PlusCircle, User as UserIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <nav className="navbar" dir="rtl">
            <Link to="/" className="brand">متجر <span style={{ color: '#fff' }}>سلطان</span></Link>
            <div className="nav-links">
                {token ? (
                    <>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-main)', fontSize: '0.9rem' }}>
                            <UserIcon size={16} /> {user?.name}
                        </span>
                        {user?.role === 'admin' && (
                            <Link to="/admin" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                                <PlusCircle size={16} /> لوحة التحكم
                            </Link>
                        )}
                        <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                            <LogOut size={16} /> تسجيل الخروج
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-secondary" style={{ padding: '8px 16px' }}>تسجيل الدخول</Link>
                        <Link to="/register" className="btn btn-primary" style={{ padding: '8px 16px' }}>حساب جديد</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
