import { ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div dir="rtl">
            <div className="hero">
                <h1>مرحبا بكم في <span>متجر سولي</span></h1>
                <p>منتجات حصرية وفاخرة مختارة خصيصاً لك. قم بتسجيل الدخول للطلب عبر الواتساب.</p>
            </div>

            {loading ? (
                <div className="empty-state">جاري تحميل المنتجات...</div>
            ) : products.length === 0 ? (
                <div className="empty-state">لا توجد منتجات متاحة حالياً.</div>
            ) : (
                <div className="products-grid">
                    {products.map(p => (
                        <div key={p._id} className="product-card">
                            {p.image || p.imageUrl || (p.images && p.images.length > 0) ? (
                                <img src={p.image || p.imageUrl || p.images[0]} alt={p.name} className="product-img" />
                            ) : (
                                <div className="product-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#66fcf1' }}>
                                    <ShoppingBag size={48} opacity={0.5} />
                                </div>
                            )}
                            <div className="product-info">
                                <h3 className="product-title">{p.name}</h3>
                                <p className="product-desc">{p.description.length > 80 ? p.description.substring(0, 80) + '...' : p.description}</p>
                                <div className="product-price">${p.price?.toFixed(2)}</div>
                                <Link to={`/product/${p._id}`} className="btn btn-primary" style={{ width: '100%' }}>عرض التفاصيل</Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
