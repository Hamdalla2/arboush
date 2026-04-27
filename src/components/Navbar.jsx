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
        <nav className="navbar">
            <Link to="/" className="brand">SULTAN<span style={{ color: '#fff' }}>STORE</span></Link>
            <div className="nav-links">
                {token ? (
                    <>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-main)', fontSize: '0.9rem' }}>
                            <UserIcon size={16} /> {user?.name}
                        </span>
                        {user?.role === 'admin' && (
                            <Link to="/admin" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                                <PlusCircle size={16} /> Admin
                            </Link>
                        )}
                        <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                            <LogOut size={16} /> Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-secondary" style={{ padding: '8px 16px' }}>Login</Link>
                        <Link to="/register" className="btn btn-primary" style={{ padding: '8px 16px' }}>Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
