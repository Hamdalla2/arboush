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
        <div>
            <div className="hero">
                <h1>Welcome to <span>Sultan Store</span></h1>
                <p>Premium exclusive products selected just for you. Sign in to place orders via WhatsApp.</p>
            </div>

            {loading ? (
                <div className="empty-state">Loading products...</div>
            ) : products.length === 0 ? (
                <div className="empty-state">No products available yet.</div>
            ) : (
                <div className="products-grid">
                    {products.map(p => (
                        <div key={p._id} className="product-card">
                            {p.imageUrl ? (
                                <img src={p.imageUrl} alt={p.name} className="product-img" />
                            ) : (
                                <div className="product-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#66fcf1' }}>
                                    <ShoppingBag size={48} opacity={0.5} />
                                </div>
                            )}
                            <div className="product-info">
                                <h3 className="product-title">{p.name}</h3>
                                <p className="product-desc">{p.description.length > 80 ? p.description.substring(0, 80) + '...' : p.description}</p>
                                <div className="product-price">${p.price?.toFixed(2)}</div>
                                <Link to={`/product/${p._id}`} className="btn btn-primary" style={{ width: '100%' }}>View Details</Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
