import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  Headphones,
  Heart,
  LayoutDashboard,
  Menu,
  Minus,
  PackageSearch,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Star,
  TrendingUp,
  Truck,
  User,
  Users,
  Zap,
} from 'lucide-react';
import {
  BrowserRouter,
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom';
import './App.css';

const categories = ['Men', 'Women', 'Running', 'Training', 'Accessories', 'Shoes', 'Sale'];

const promoHighlights = [
  { title: 'Free shipping', subtitle: 'Orders over EGP 2,000', icon: Truck },
  { title: 'Secure checkout', subtitle: '100% encrypted payments', icon: ShieldCheck },
  { title: 'Fast support', subtitle: 'Live assistance 24/7', icon: Headphones },
];

const pageLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Account', path: '/account' },
  { label: 'Admin', path: '/admin' },
];

const formatPrice = (price) =>
  new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 0,
  }).format(price);

const API_URL = 'http://localhost:3001';

const fetchProducts = async (query = '') => {
  const url = query ? `${API_URL}/api/products?q=${encodeURIComponent(query)}` : `${API_URL}/api/products`;
  let lastError;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      return await response.json();
    } catch (error) {
      lastError = error;
      if (attempt < 2) {
        await new Promise((resolve) => setTimeout(resolve, 250 * (attempt + 1)));
      }
    }
  }

  throw lastError;
};

function Header({ cartCount, wishlistCount, currentUser, searchTerm, onSearchChange }) {
  const navigate = useNavigate();

  return (
    <header className="topbar">
      <div className="container nav-wrap">
        <div className="brand-group">
          <button type="button" className="icon-button mobile-only" aria-label="Open menu">
            <Menu size={18} />
          </button>
          <Link to="/" className="brand-logo">
            STRYDE
          </Link>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          {pageLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <div className="header-search">
            <Search size={16} />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  navigate('/shop');
                }
              }}
              placeholder="Search products"
              aria-label="Search products"
            />
          </div>

          <button type="button" className="icon-button" aria-label="Wishlist">
            <Heart size={18} />
            {wishlistCount > 0 && <span className="mini-badge">{wishlistCount}</span>}
          </button>

          {currentUser ? (
            <Link to="/account" className="account-button">
              <User size={16} />
              {currentUser.name.split(' ')[0]}
            </Link>
          ) : (
            <Link to="/login" className="secondary-button compact-button">
              Login
            </Link>
          )}

          <Link to="/cart" className="cart-button" aria-label="Cart">
            <ShoppingBag size={18} />
            <span>Cart</span>
            <strong>{cartCount}</strong>
          </Link>
        </div>
      </div>
    </header>
  );
}

function ProductCard({ product, onAddToCart, isFavorite, onToggleFavorite }) {
  return (
    <article className="product-card">
      <div className="product-card-media">
        <img src={product.gallery[0]} alt={product.name} />
        <span className="badge">{product.badge}</span>
        <button
          type="button"
          className={isFavorite ? 'wishlist-button active' : 'wishlist-button'}
          aria-label={`Toggle ${product.name} favorite`}
          onClick={() => onToggleFavorite(product.id)}
        >
          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="product-card-body">
        <div className="product-meta-row">
          <span className="product-category">{product.category}</span>
          <span className="rating">
            <Star size={14} fill="currentColor" /> {product.rating}
          </span>
        </div>

        <Link to={`/product/${product.id}`} className="product-title-link">
          <h3>{product.name}</h3>
        </Link>

        <div className="price-row">
          <span className="price">{formatPrice(product.price)}</span>
          <span className="old-price">{formatPrice(product.oldPrice)}</span>
        </div>

        <div className="card-footer">
          <button type="button" className="ghost-button" onClick={() => onAddToCart(product)}>
            Add to cart
          </button>
          <Link to={`/product/${product.id}`} className="mini-link">
            Details <ChevronRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}

function HomePage({ addToCart, favorites, onToggleFavorite }) {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const data = await fetchProducts();
        setFeaturedProducts(data.slice(0, 4));
      } catch (error) {
        console.error('Could not load featured products:', error);
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  return (
    <main className="page-shell">
      <section className="hero-banner container">
        <div className="hero-copy">
          <small>NEW ARRIVALS</small>
          <h1>MOVE WITHOUT LIMITS</h1>
          <p>Performance gear for every version of you. Built for motion, designed for impact.</p>
          <div className="hero-actions">
            <Link to="/shop" className="primary-button">
              Shop the collection <ArrowRight size={18} />
            </Link>
            <Link to="/admin" className="secondary-button">
              Admin preview
            </Link>
          </div>
          <div className="hero-stats">
            <div>
              <strong>18k+</strong>
              <span>happy athletes</span>
            </div>
            <div>
              <strong>4.9/5</strong>
              <span>customer rating</span>
            </div>
            <div>
              <strong>2-day</strong>
              <span>delivery in Cairo</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-card large-card">
            <img
              src="https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1200&q=80"
              alt="Athletic runner"
            />
          </div>
          <div className="visual-card small-card">
            <p>Built to perform</p>
            <h3>Summer Drop 2026</h3>
          </div>
        </div>
      </section>

      <section className="categories-strip container">
        {categories.map((category) => (
          <Link key={category} to="/shop" className="category-pill">
            {category}
          </Link>
        ))}
      </section>

      <section className="promo-grid container">
        {promoHighlights.map(({ title, subtitle, icon: Icon }) => (
          <div key={title} className="promo-box">
            <div className="promo-icon">
              <Icon size={22} />
            </div>
            <div>
              <h4>{title}</h4>
              <p>{subtitle}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="content-section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Trending now</p>
            <h2>Performance essentials</h2>
          </div>
          <Link to="/shop" className="mini-link">
            View all <ChevronRight size={15} />
          </Link>
        </div>

        {loading ? (
          <div className="no-results">
            <h3>Loading products...</h3>
          </div>
        ) : (
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        )}
      </section>

      <section className="container feature-banner">
        <div className="feature-content">
          <p className="eyebrow">Athlete approved</p>
          <h2>Built for daily training and everyday comfort.</h2>
          <p>
            Every piece is engineered to move fluidly, breathe better and stay durable through every session.
          </p>
          <Link to="/shop" className="primary-button">
            Explore training gear <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}

function ShopPage({ addToCart, favorites, onToggleFavorite, searchTerm, onSearchChange }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(searchTerm);
        if (!isMounted) return;
        setProducts(data);
      } catch (error) {
        if (!isMounted) return;
        setProducts([]);
        console.error('Could not load products:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();
    return () => {
      isMounted = false;
    };
  }, [searchTerm]);

  const visibleProducts = useMemo(() => {
    const source =
      selectedCategory === 'All'
        ? products
        : products.filter((product) => product.category === selectedCategory);

    const filtered = [...source];

    if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);

    return filtered;
  }, [products, selectedCategory, sortBy]);

  return (
    <main className="page-shell container shop-page">
      <aside className="sidebar-panel">
        <div className="side-header">
          <h3>Filters</h3>
          <button
            type="button"
            className="text-button"
            onClick={() => {
              setSelectedCategory('All');
              setSortBy('featured');
              onSearchChange('');
            }}
          >
            Reset
          </button>
        </div>

        <div className="filter-group">
          <p>Search</p>
          <div className="search-box">
            <Search size={16} />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search by product or sport"
            />
          </div>
        </div>

        <div className="filter-group">
          <p>Category</p>
          <div className="chip-list">
            {['All', ...categories].map((item) => (
              <button
                key={item}
                type="button"
                className={item === selectedCategory ? 'chip active' : 'chip'}
                onClick={() => setSelectedCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <p>Sort by</p>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer rating</option>
          </select>
        </div>

        <div className="filter-group stat-box">
          <div className="stat-item">
            <Zap size={18} />
            <div>
              <strong>Free delivery</strong>
              <span>On orders over EGP 2,000</span>
            </div>
          </div>
        </div>
      </aside>

      <section className="shop-content">
        <div className="shop-toolbar">
          <div>
            <p className="eyebrow">Shop all</p>
            <h2>{selectedCategory === 'All' ? 'All products' : selectedCategory}</h2>
          </div>
          <div className="toolbar-tools">
            <button type="button" className="icon-button subtle">
              <Search size={18} />
            </button>
            <button type="button" className="icon-button subtle">
              <TrendingUp size={18} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="no-results">
            <h3>Loading products...</h3>
          </div>
        ) : (
          <div className="product-grid large-grid">
            {visibleProducts.length > 0 ? (
              visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))
            ) : (
              <div className="no-results">
                <h3>No products found</h3>
                <p>Try searching for another keyword or reset the filters.</p>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

function ProductDetailsPage({ addToCart, favorites, onToggleFavorite }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/products/${id}`);
        if (!response.ok) {
          setProduct(null);
          return;
        }

        const data = await response.json();
        setProduct(data);
        setSelectedSize(data.sizes[0] ?? 'M');
        setSelectedColor(data.colors[0]?.name ?? 'Black');
      } catch (error) {
        console.error('Could not load product details:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="page-shell container empty-cart">
        <div className="empty-state">
          <ShoppingBag size={54} />
          <h2>Loading product...</h2>
        </div>
      </main>
    );
  }

  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  const selectedColorMeta = product.colors.find((color) => color.name === selectedColor) || product.colors[0];

  return (
    <main className="page-shell container product-page">
      <div className="product-gallery">
        <div className="gallery-main">
          <img src={product.gallery[0]} alt={product.name} />
        </div>
        <div className="gallery-thumbs">
          {product.gallery.map((image) => (
            <button type="button" key={image} className="thumb-button">
              <img src={image} alt={`${product.name} thumbnail`} />
            </button>
          ))}
        </div>
      </div>

      <div className="product-info">
        <div className="product-head-row">
          <div>
            <p className="eyebrow">{product.category}</p>
            <h1>{product.name}</h1>
          </div>
          <button
            type="button"
            className={favorites.includes(product.id) ? 'wishlist-button active large-favorite' : 'wishlist-button large-favorite'}
            onClick={() => onToggleFavorite(product.id)}
          >
            <Heart size={18} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="review-row">
          <div className="rating">
            <Star size={14} fill="currentColor" /> {product.rating}
          </div>
          <span>1,280 reviews</span>
        </div>

        <div className="price-row detail-price">
          <span className="price">{formatPrice(product.price)}</span>
          <span className="old-price">{formatPrice(product.oldPrice)}</span>
        </div>

        <p className="description">{product.description}</p>

        <div className="option-block">
          <div className="option-header">
            <span>Color</span>
            <strong>{selectedColorMeta.name}</strong>
          </div>
          <div className="swatches">
            {product.colors.map((color) => (
              <button
                key={color.name}
                type="button"
                className={selectedColor === color.name ? 'swatch active' : 'swatch'}
                style={{ background: color.hex }}
                aria-label={`Select ${color.name}`}
                onClick={() => setSelectedColor(color.name)}
              />
            ))}
          </div>
        </div>

        <div className="option-block">
          <div className="option-header">
            <span>Size</span>
            <strong>{selectedSize}</strong>
          </div>
          <div className="size-pills">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                className={selectedSize === size ? 'size-button active' : 'size-button'}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="purchase-row">
          <div className="quantity-box">
            <button type="button" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>
              <Minus size={16} />
            </button>
            <span>{quantity}</span>
            <button type="button" onClick={() => setQuantity((prev) => prev + 1)}>
              <Plus size={16} />
            </button>
          </div>

          <button
            type="button"
            className="primary-button wide-button"
            onClick={() => addToCart(product, { size: selectedSize, color: selectedColorMeta.name, quantity })}
          >
            Add to cart
          </button>
        </div>

        <div className="feature-list">
          <div>
            <Check size={16} /> Free returns within 30 days
          </div>
          <div>
            <Check size={16} /> Secure payment via card or cash on delivery
          </div>
          <div>
            <Check size={16} /> 2-year quality guarantee
          </div>
        </div>
      </div>
    </main>
  );
}

function CartPage({ cart, updateCartItem, removeCartItem, subtotal, shipping, total }) {
  if (cart.length === 0) {
    return (
      <main className="page-shell container empty-cart">
        <div className="empty-state">
          <ShoppingBag size={54} />
          <h2>Your cart is empty</h2>
          <p>Add your favorite training gear and complete your order.</p>
          <Link to="/shop" className="primary-button">
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell container cart-page">
      <section className="cart-items-panel">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Your cart</p>
            <h2>{cart.length} item(s)</h2>
          </div>
        </div>

        {cart.map((item) => (
          <div key={`${item.product.id}-${item.size}-${item.color}`} className="cart-item">
            <img src={item.product.gallery[0]} alt={item.product.name} />
            <div className="cart-item-copy">
              <div className="cart-item-head">
                <div>
                  <h3>{item.product.name}</h3>
                  <p>
                    {item.color} • {item.size}
                  </p>
                </div>
                <button
                  type="button"
                  className="text-button"
                  onClick={() => removeCartItem(item.product.id, item.size, item.color)}
                >
                  Remove
                </button>
              </div>

              <div className="cart-item-actions">
                <div className="quantity-box small-box">
                  <button type="button" onClick={() => updateCartItem(item.product.id, item.size, item.color, -1)}>
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => updateCartItem(item.product.id, item.size, item.color, 1)}>
                    <Plus size={16} />
                  </button>
                </div>
                <strong>{formatPrice(item.product.price * item.quantity)}</strong>
              </div>
            </div>
          </div>
        ))}
      </section>

      <aside className="summary-panel">
        <h3>Order summary</h3>
        <div className="summary-row">
          <span>Subtotal</span>
          <strong>{formatPrice(subtotal)}</strong>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <strong>{shipping === 0 ? 'Free' : formatPrice(shipping)}</strong>
        </div>
        <div className="summary-row coupon-row">
          <span>Coupon</span>
          <strong>- EGP 150</strong>
        </div>
        <div className="summary-total">
          <span>Total</span>
          <strong>{formatPrice(total)}</strong>
        </div>

        <Link to="/checkout" className="primary-button full-width">
          Proceed to checkout
        </Link>
      </aside>
    </main>
  );
}

function CheckoutPage({ cart, subtotal, shipping, total }) {
  return (
    <main className="page-shell container checkout-page">
      <section className="checkout-form-panel">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Checkout</p>
            <h2>Delivery details</h2>
          </div>
        </div>

        <form className="checkout-form">
          <div className="field-grid two-col">
            <label>
              <span>First name</span>
              <input type="text" defaultValue="Omar" />
            </label>
            <label>
              <span>Last name</span>
              <input type="text" defaultValue="Khaled" />
            </label>
          </div>

          <label>
            <span>Email</span>
            <input type="email" defaultValue="omar@example.com" />
          </label>

          <label>
            <span>Shipping address</span>
            <textarea defaultValue="12 El Gezira Street, Dokki, Cairo" rows="3" />
          </label>

          <div className="field-grid two-col">
            <label>
              <span>City</span>
              <input type="text" defaultValue="Cairo" />
            </label>
            <label>
              <span>Payment method</span>
              <select defaultValue="cod">
                <option value="cod">Cash on delivery</option>
                <option value="card">Card payment</option>
              </select>
            </label>
          </div>

          <button type="submit" className="primary-button">
            Place order
          </button>
        </form>
      </section>

      <aside className="summary-panel">
        <h3>Review order</h3>
        {cart.map((item) => (
          <div key={`${item.product.id}-${item.size}-${item.color}`} className="mini-order-item">
            <span>{item.product.name} × {item.quantity}</span>
            <strong>{formatPrice(item.product.price * item.quantity)}</strong>
          </div>
        ))}

        <div className="summary-row">
          <span>Subtotal</span>
          <strong>{formatPrice(subtotal)}</strong>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <strong>{shipping === 0 ? 'Free' : formatPrice(shipping)}</strong>
        </div>
        <div className="summary-total">
          <span>Total</span>
          <strong>{formatPrice(total)}</strong>
        </div>
      </aside>
    </main>
  );
}

function AccountPage({ currentUser }) {
  const recentOrders = [
    { id: 'STR-1189', total: 2499, status: 'Shipped' },
    { id: 'STR-1047', total: 1899, status: 'Delivered' },
    { id: 'STR-982', total: 999, status: 'Processing' },
  ];

  return (
    <main className="page-shell container account-page">
      <div className="account-hero">
        <div>
          <p className="eyebrow">My account</p>
          <h2>Welcome back, {currentUser?.name || 'Athlete'}</h2>
        </div>
        <button type="button" className="secondary-button">
          <User size={16} /> Log out
        </button>
      </div>

      <div className="account-grid">
        <section className="profile-panel panel-box">
          <h3>Profile</h3>
          <ul>
            <li>
              <strong>Name:</strong> {currentUser?.name || 'Guest User'}
            </li>
            <li>
              <strong>Email:</strong> {currentUser?.email || 'guest@example.com'}
            </li>
            <li>
              <strong>Member since:</strong> Jan 2025
            </li>
            <li>
              <strong>Preferred sport:</strong> Running
            </li>
          </ul>
        </section>

        <section className="orders-panel panel-box">
          <h3>Recent orders</h3>
          {recentOrders.map((order) => (
            <div key={order.id} className="order-row">
              <div>
                <strong>{order.id}</strong>
                <span>{order.status}</span>
              </div>
              <strong>{formatPrice(order.total)}</strong>
            </div>
          ))}
        </section>
      </div>

      <section className="wishlist-panel panel-box">
        <h3>Wishlist</h3>
        <div className="mini-product-row">
          <span>Velocity Tee</span>
          <span>EGP 899</span>
        </div>
        <div className="mini-product-row">
          <span>Pulse Runner</span>
          <span>EGP 2,199</span>
        </div>
      </section>
    </main>
  );
}

function AdminPage() {
  return (
    <main className="page-shell container admin-page">
      <div className="admin-header">
        <div>
          <p className="eyebrow">Admin dashboard</p>
          <h2>Store overview</h2>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <LayoutDashboard size={18} />
          <span>Total revenue</span>
          <strong>EGP 324,900</strong>
        </div>
        <div className="stat-card">
          <PackageSearch size={18} />
          <span>Orders</span>
          <strong>1,249</strong>
        </div>
        <div className="stat-card">
          <Users size={18} />
          <span>Customers</span>
          <strong>842</strong>
        </div>
        <div className="stat-card">
          <BarChart3 size={18} />
          <span>Low stock</span>
          <strong>23 items</strong>
        </div>
      </div>

      <section className="admin-content panel-box">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Inventory</p>
            <h3>Latest products</h3>
          </div>
          <button type="button" className="secondary-button">
            Add product
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Velocity Tee</td>
              <td>Men</td>
              <td>EGP 899</td>
              <td>44</td>
              <td>
                <span className="status active">In stock</span>
              </td>
            </tr>
            <tr>
              <td>Pulse Runner</td>
              <td>Running</td>
              <td>EGP 2,199</td>
              <td>12</td>
              <td>
                <span className="status warning">Low stock</span>
              </td>
            </tr>
            <tr>
              <td>Iron Set</td>
              <td>Training</td>
              <td>EGP 2,899</td>
              <td>8</td>
              <td>
                <span className="status warning">Low stock</span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}

function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.message || 'Login failed');
        return;
      }

      const safeName = data.user?.name || formData.name || formData.email.split('@')[0];
      onLogin({ name: safeName, email: data.user?.email || formData.email });
      navigate('/account');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Unable to connect to the authentication server.');
    }
  };

  return (
    <main className="page-shell container auth-page">
      <div className="auth-card">
        <div className="auth-intro">
          <p className="eyebrow">Welcome back</p>
          <h2>Sign in to your account</h2>
          <p>Track orders, save favorites and manage your profile in a single place.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Full name</span>
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
            />
          </label>
          <label>
            <span>Email address</span>
            <input
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
            />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(event) => setFormData((current) => ({ ...current, password: event.target.value }))}
            />
          </label>
          <button type="submit" className="primary-button full-width">
            Login
          </button>
          <button type="button" className="secondary-button full-width">
            Create account
          </button>
        </form>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>STRYDE</h3>
          <p>Modern performance wear for athletes and everyday movers.</p>
        </div>
        <div>
          <h4>Shop</h4>
          <ul>
            <li>
              <Link to="/shop">Men</Link>
            </li>
            <li>
              <Link to="/shop">Women</Link>
            </li>
            <li>
              <Link to="/shop">Accessories</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li>
              <Link to="/account">My account</Link>
            </li>
            <li>
              <Link to="/checkout">Shipping</Link>
            </li>
            <li>
              <Link to="/login">Help center</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>hello@stryde.com</li>
            <li>+966 55 123 4567</li>
            <li>24/7 support</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState(['velocity-tee']);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const addToCart = (product, options = {}) => {
    const { size = product.sizes[0], color = product.colors[0].name, quantity = 1 } = options;

    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.product.id === product.id && item.size === size && item.color === color,
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.product.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...currentCart, { product, size, color, quantity }];
    });
  };

  const updateCartItem = (productId, size, color, delta) => {
    setCart((currentCart) =>
      currentCart
        .map((item) => {
          if (item.product.id !== productId || item.size !== size || item.color !== color) {
            return item;
          }

          const nextQuantity = item.quantity + delta;
          return nextQuantity > 0 ? { ...item, quantity: nextQuantity } : null;
        })
        .filter(Boolean),
    );
  };

  const removeCartItem = (productId, size, color) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => !(item.product.id === productId && item.size === size && item.color === color),
      ),
    );
  };

  const toggleFavorite = (productId) => {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(productId)
        ? currentFavorites.filter((id) => id !== productId)
        : [...currentFavorites, productId],
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = cart.length === 0 || subtotal >= 2000 ? 0 : 95;
  const total = subtotal + shipping - 150;

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Header
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          wishlistCount={favorites.length}
          currentUser={currentUser}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <Routes>
          <Route path="/" element={<HomePage addToCart={addToCart} favorites={favorites} onToggleFavorite={toggleFavorite} />} />
          <Route
            path="/shop"
            element={
              <ShopPage
                addToCart={addToCart}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            }
          />
          <Route
            path="/product/:id"
            element={<ProductDetailsPage addToCart={addToCart} favorites={favorites} onToggleFavorite={toggleFavorite} />}
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                updateCartItem={updateCartItem}
                removeCartItem={removeCartItem}
                subtotal={subtotal}
                shipping={shipping}
                total={total}
              />
            }
          />
          <Route
            path="/checkout"
            element={<CheckoutPage cart={cart} subtotal={subtotal} shipping={shipping} total={total} />}
          />
          <Route path="/account" element={<AccountPage currentUser={currentUser} />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<LoginPage onLogin={setCurrentUser} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
