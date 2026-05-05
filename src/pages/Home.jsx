import { ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedType, setSelectedType] = useState('');

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                const productList = Array.isArray(data) ? data : (data.entries || []);
                setProducts(productList);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const types = [...new Set(products.map(p => p.type).filter(Boolean))];

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesType = !selectedType || p.type === selectedType;
        return matchesSearch && matchesType;
    });

    return (
        <div dir="rtl">
            <div className="hero">
                <h1>مرحبا بكم في <span>متجر سولي</span></h1>
                <p>منتجات حصرية وفاخرة مختارة خصيصاً لك. قم بتسجيل الدخول للطلب عبر الواتساب.</p>
            </div>

            <div className="search-filter-container" style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
                <div style={{ flex: 2, minWidth: '200px' }}>
                    <input
                        type="text"
                        placeholder="ابحث عن منتج بالاسم..."
                        className="form-input"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ width: '100%' }}
                    />
                </div>
                <div style={{ flex: 1, minWidth: '150px' }}>
                    <select
                        className="form-input"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        style={{ width: '100%', height: '100%' }}
                    >
                        <option value="">كل الأنواع</option>
                        {types.map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="empty-state">جاري تحميل المنتجات...</div>
            ) : filteredProducts.length === 0 ? (
                <div className="empty-state">لا توجد منتجات تطابق بحثك.</div>
            ) : (
                <div className="products-grid">
                    {filteredProducts.map(p => (
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
