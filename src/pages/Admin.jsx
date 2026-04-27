import { Edit2, Plus, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ _id: '', name: '', description: '', price: '', imageUrl: '', details: '' });

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    useEffect(() => {
        if (!token || user?.role !== 'admin') {
            navigate('/');
            return;
        }
        fetchProducts();
    }, [navigate]);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            if (Array.isArray(data)) setProducts(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = formData._id ? `/api/products/${formData._id}` : '/api/products';
        const method = formData._id ? 'PUT' : 'POST';

        try {
            await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            fetchProducts();
            setShowForm(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;
        try {
            await fetch(`/api/products/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchProducts();
        } catch (err) {
            console.error(err);
        }
    };

    const openForm = (product = null) => {
        if (product) {
            setFormData(product);
        } else {
            setFormData({ _id: '', name: '', description: '', price: '', imageUrl: '', details: '' });
        }
        setShowForm(true);
    };

    if (loading) return <div className="empty-state" dir="rtl">جاري تحميل لوحة التحكم...</div>;

    return (
        <div className="glass-panel" dir="rtl">
            <div className="admin-header">
                <h1 style={{ color: 'var(--text-light)', fontSize: '2rem' }}>إدارة المنتجات</h1>
                <button onClick={() => openForm()} className="btn btn-primary"><Plus size={18} /> إضافة منتج جديد</button>
            </div>

            {showForm && (
                <div style={{ background: 'rgba(0,0,0,0.5)', padding: '30px', borderRadius: 'var(--radius)', marginBottom: '40px', border: '1px solid rgba(102, 252, 241, 0.3)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <h3 style={{ color: 'var(--text-light)', fontSize: '1.5rem' }}>{formData._id ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h3>
                        <button onClick={() => setShowForm(false)} style={{ color: 'var(--text-main)', cursor: 'pointer', background: 'none', border: 'none' }}><X size={24} /></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label className="form-label">الاسم</label>
                                <input type="text" name="name" className="form-input" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">السعر ($)</label>
                                <input type="number" step="0.01" name="price" className="form-input" value={formData.price} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">رابط الصورة (URL)</label>
                            <input type="url" name="imageUrl" className="form-input" value={formData.imageUrl} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label className="form-label">وصف قصير</label>
                            <textarea name="description" className="form-textarea" rows="2" value={formData.description} onChange={handleChange} required></textarea>
                        </div>

                        <div className="form-group">
                            <label className="form-label">التفاصيل / المواصفات</label>
                            <textarea name="details" className="form-textarea" rows="4" value={formData.details} onChange={handleChange}></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary">حفظ المنتج</button>
                    </form>
                </div>
            )}

            {products.length === 0 ? (
                <div className="empty-state">لا توجد منتجات حتى الآن. ابدأ بإضافة بعضها!</div>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <th style={{ padding: '15px' }}>المنتج</th>
                                <th style={{ padding: '15px' }}>السعر</th>
                                <th style={{ padding: '15px' }}>تاريخ الإضافة</th>
                                <th style={{ padding: '15px', textAlign: 'left' }}>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(p => (
                                <tr key={p._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        {p.imageUrl && <img src={p.imageUrl} alt="" style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />}
                                        <span style={{ fontWeight: '500', color: 'var(--text-light)' }}>{p.name}</span>
                                    </td>
                                    <td style={{ padding: '15px', color: 'var(--primary)' }}>${p.price.toFixed(2)}</td>
                                    <td style={{ padding: '15px', color: 'var(--text-main)', fontSize: '0.9rem' }}>{new Date(p.createdAt).toLocaleDateString()}</td>
                                    <td style={{ padding: '15px', textAlign: 'left' }}>
                                        <button onClick={() => openForm(p)} className="btn btn-secondary" style={{ padding: '6px 12px', marginLeft: '10px' }}><Edit2 size={14} /> تعديل</button>
                                        <button onClick={() => handleDelete(p._id)} className="btn btn-secondary" style={{ padding: '6px 12px', background: 'rgba(242, 95, 92, 0.1)', color: 'var(--error)' }}><Trash2 size={14} /> حذف</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
