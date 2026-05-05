import { Edit2, Plus, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ _id: '', name: '', description: '', price: '', imageUrl: '', image: '', images: '', details: '', type: '' });
    const [uploading, setUploading] = useState(false);

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
            const productList = Array.isArray(data) ? data : (data.entries || []);
            setProducts(productList);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleUpload = async (file) => {
        if (!file) return null;
        try {
            setUploading(true);
            const res = await fetch('/api/upload/presigned-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ fileName: file.name, fileType: file.type, fileSize: file.size })
            });
            const { url, publicUrl } = await res.json();

            await fetch(url, {
                method: 'PUT',
                body: file,
                headers: { 'Content-Type': file.type }
            });

            setUploading(false);
            return publicUrl;
        } catch (err) {
            console.error('Upload failed:', err);
            setUploading(false);
            alert('فشل رفع الصورة');
            return null;
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const url = await handleUpload(file);
        if (url) {
            setFormData(prev => ({ ...prev, image: url, imageUrl: url }));
        }
    };

    const handleMultipleFilesChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const uploadedUrls = [];
        for (const file of files) {
            const url = await handleUpload(file);
            if (url) uploadedUrls.push(url);
        }

        if (uploadedUrls.length > 0) {
            const currentImages = formData.images ? (typeof formData.images === 'string' ? formData.images.split(',').map(s => s.trim()).filter(Boolean) : formData.images) : [];
            const newImages = [...currentImages, ...uploadedUrls].join(', ');
            setFormData(prev => ({ ...prev, images: newImages }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isNew = !formData._id;
        const url = isNew ? '/api/products' : `/api/products/${formData._id}`;
        const method = isNew ? 'POST' : 'PUT';

        const sendData = { ...formData };
        if (isNew) delete sendData._id;
        if (sendData.price) sendData.price = parseFloat(sendData.price);

        if (typeof sendData.images === 'string') {
            sendData.images = sendData.images.split(',').map(s => s.trim()).filter(Boolean);
        }

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(sendData)
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'فشلت العملية');
            }

            fetchProducts();
            setShowForm(false);
        } catch (err) {
            console.error(err);
            alert('حدث خطأ: ' + err.message);
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
            setFormData({ ...product, images: Array.isArray(product.images) ? product.images.join(', ') : '' });
        } else {
            setFormData({ _id: '', name: '', description: '', price: '', imageUrl: '', image: '', images: '', details: '', type: '' });
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
                            <label className="form-label">نوع المنتج (Type)</label>
                            <input type="text" name="type" className="form-input" value={formData.type || ''} onChange={handleChange} placeholder="مثال: عطور، ملابس، ساعات..." />
                        </div>

                        <div className="form-group" style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div>
                                <label className="form-label">الصورة الأساسية</label>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <input type="file" accept="image/*" onChange={handleFileChange} className="form-input" style={{ flex: 1 }} disabled={uploading} />
                                    {formData.image && <img src={formData.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />}
                                </div>
                                <input type="url" name="image" className="form-input" placeholder="أو رابط URL مباشرة" value={formData.image || formData.imageUrl || ''} onChange={e => setFormData({ ...formData, image: e.target.value, imageUrl: e.target.value })} style={{ marginTop: '10px' }} />
                            </div>
                            <div>
                                <label className="form-label">صور إضافية</label>
                                <input type="file" accept="image/*" multiple onChange={handleMultipleFilesChange} className="form-input" disabled={uploading} />
                                <textarea name="images" className="form-textarea" rows="1" value={formData.images || ''} onChange={handleChange} placeholder="روابط الصور مفصولة بفاصلة" style={{ marginTop: '10px' }}></textarea>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">وصف قصير</label>
                            <textarea name="description" className="form-textarea" rows="2" value={formData.description} onChange={handleChange}></textarea>
                        </div>

                        <div className="form-group">
                            <label className="form-label">التفاصيل / المواصفات</label>
                            <textarea name="details" className="form-textarea" rows="4" value={formData.details} onChange={handleChange}></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={uploading}>
                            {uploading ? 'جاري الرفع...' : 'حفظ المنتج'}
                        </button>
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
                                        {(p.image || p.imageUrl || (p.images && p.images[0])) && <img src={p.image || p.imageUrl || p.images[0]} alt="" style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />}
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
