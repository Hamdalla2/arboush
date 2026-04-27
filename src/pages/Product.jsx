import { ArrowLeft, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    // Real world should fetch this from backend config or admin profile 
    const SULTAN_WHATSAPP = "1234567890";

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="empty-state">Loading product details...</div>;
    if (!product) return <div className="empty-state">Product not found</div>;

    const handleBuy = () => {
        const text = `Hello Sultan, I am interested in buying: ${product.name} (Price: $${product.price}). My name is ${user.name}.`;
        window.open(`https://wa.me/${SULTAN_WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank');
    };

    return (
        <div className="glass-panel" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <Link to="/" className="btn btn-secondary" style={{ marginBottom: '20px' }}><ArrowLeft size={18} /> Back to Store</Link>

            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1', minWidth: '300px' }}>
                    {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} style={{ width: '100%', borderRadius: 'var(--radius)', border: '1px solid rgba(255,255,255,0.05)' }} />
                    ) : (
                        <div style={{ width: '100%', height: '400px', background: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius)' }}></div>
                    )}
                </div>
                <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column' }}>
                    <h1 style={{ color: 'var(--text-light)', fontSize: '2.5rem', marginBottom: '10px' }}>{product.name}</h1>
                    <div style={{ color: 'var(--primary)', fontSize: '2rem', fontWeight: '700', marginBottom: '20px' }}>
                        ${product.price?.toFixed(2)}
                    </div>
                    <p style={{ color: 'var(--text-main)', lineHeight: '1.6', marginBottom: '30px', fontSize: '1.1rem' }}>
                        {product.description}
                    </p>

                    {product.details && (
                        <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius)', marginBottom: '30px' }}>
                            <h4 style={{ color: 'var(--text-light)', marginBottom: '10px', fontSize: '1.1rem' }}>Specifications</h4>
                            <p style={{ lineHeight: '1.5' }}>{product.details}</p>
                        </div>
                    )}

                    <div style={{ marginTop: 'auto' }}>
                        {user ? (
                            <button onClick={handleBuy} className="btn btn-primary" style={{ width: '100%', fontSize: '1.2rem', padding: '16px' }}>
                                <MessageCircle size={24} /> Buy via WhatsApp
                            </button>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '24px', background: 'rgba(242, 95, 92, 0.05)', border: '1px solid rgba(242, 95, 92, 0.2)', borderRadius: 'var(--radius)' }}>
                                <p style={{ color: 'var(--error)', marginBottom: '15px', fontSize: '1.1rem' }}>You must be signed in to place orders.</p>
                                <Link to="/login" className="btn btn-secondary">Sign In to Purchase</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
