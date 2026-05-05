import { ArrowRight, MessageCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fullscreenImage, setFullscreenImage] = useState(null);
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    const SULI_WHATSAPP = "972569031313";

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="empty-state" dir="rtl">جاري تحميل تفاصيل المنتج...</div>;
    if (!product) return <div className="empty-state" dir="rtl">المنتج غير موجود</div>;

    const handleBuy = () => {
        const text = `مرحباً سولي، أنا مهتم بشراء: ${product.name} (السعر: $${product.price}). اسمي هو ${user.name}.`;
        window.open(`https://wa.me/${SULI_WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank');
    };

    return (
        <>
            <div className="glass-panel" style={{ maxWidth: '900px', margin: '0 auto' }} dir="rtl">
                <Link to="/" className="btn btn-secondary" style={{ marginBottom: '20px' }}><ArrowRight size={18} /> العودة للمتجر</Link>

                <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1', minWidth: '300px' }}>
                        {product.image || product.imageUrl || (product.images && product.images.length > 0) ? (
                            <>
                                <img
                                    src={product.image || product.imageUrl || product.images[0]}
                                    alt={product.name}
                                    style={{ width: '100%', borderRadius: 'var(--radius)', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}
                                    onClick={() => setFullscreenImage(product.image || product.imageUrl || product.images[0])}
                                />
                                {product.images && product.images.length > 1 && (
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px', overflowX: 'auto' }}>
                                        {product.images.map((img, i) => (
                                            <img
                                                key={i}
                                                src={img}
                                                alt=''
                                                style={{ width: '80px', height: '80px', borderRadius: 'var(--radius)', border: '1px solid rgba(255,255,255,0.05)', objectFit: 'cover', cursor: 'pointer' }}
                                                onClick={() => setFullscreenImage(img)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
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
                                <h4 style={{ color: 'var(--text-light)', marginBottom: '10px', fontSize: '1.1rem' }}>المواصفات</h4>
                                <p style={{ lineHeight: '1.5' }}>{product.details}</p>
                            </div>
                        )}

                        <div style={{ marginTop: 'auto' }}>
                            {user ? (
                                <button onClick={handleBuy} className="btn btn-primary" style={{ width: '100%', fontSize: '1.2rem', padding: '16px' }}>
                                    <MessageCircle size={24} /> الشراء عبر الواتساب
                                </button>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '24px', background: 'rgba(242, 95, 92, 0.05)', border: '1px solid rgba(242, 95, 92, 0.2)', borderRadius: 'var(--radius)' }}>
                                    <p style={{ color: 'var(--error)', marginBottom: '15px', fontSize: '1.1rem' }}>يجب تسجيل الدخول لإتمام الطلب.</p>
                                    <Link to="/login" className="btn btn-secondary">تسجيل الدخول للشراء</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {fullscreenImage && (
                <div
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => setFullscreenImage(null)}
                >
                    <button
                        style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
                        onClick={(e) => { e.stopPropagation(); setFullscreenImage(null); }}
                    >
                        <X size={32} />
                    </button>
                    <img src={fullscreenImage} alt="Fullscreen" style={{ width: '100%', height: '100%', objectFit: 'contain', maxWidth: '100vw', maxHeight: '100vh' }} />
                </div>
            )}
        </>
    );
}
