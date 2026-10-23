import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const products = [
  {
    id: 'velocity-tee',
    name: 'Velocity Tee',
    category: 'Men',
    price: 899,
    oldPrice: 1299,
    rating: 4.8,
    badge: 'New',
    description: 'Lightweight performance tee with breathable mesh and ergonomic fit.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'Navy', hex: '#1d3557' },
      { name: 'White', hex: '#f5f5f5' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'pulse-runner',
    name: 'Pulse Runner',
    category: 'Running',
    price: 2199,
    oldPrice: 2799,
    rating: 4.9,
    badge: 'Best Seller',
    description: 'Responsive cushioning built for daily miles and all-day comfort.',
    sizes: ['39', '40', '41', '42', '43'],
    colors: [
      { name: 'Red', hex: '#d62828' },
      { name: 'Graphite', hex: '#2b2d42' },
      { name: 'Cream', hex: '#f5efe6' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'metro-elite',
    name: 'Metro Elite',
    category: 'Women',
    price: 1999,
    oldPrice: 2499,
    rating: 4.7,
    badge: 'Trending',
    description: 'Sculpted support and a soft knit finish for performance and style.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Rose', hex: '#f4a261' },
      { name: 'Stone', hex: '#d4d4d8' },
      { name: 'Ivory', hex: '#f8f7f4' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'iron-set',
    name: 'Iron Set',
    category: 'Training',
    price: 2899,
    oldPrice: 3299,
    rating: 4.8,
    badge: 'Pro Gear',
    description: 'Strength essentials for explosive training, recovery and everyday power.',
    sizes: ['5kg', '10kg', '15kg'],
    colors: [
      { name: 'Gunmetal', hex: '#4b5563' },
      { name: 'Black', hex: '#111827' },
      { name: 'Orange', hex: '#f97316' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'summit-jacket',
    name: 'Summit Jacket',
    category: 'Men',
    price: 3499,
    oldPrice: 4199,
    rating: 4.9,
    badge: 'Limited',
    description: 'Wind-resistant layering jacket for cold sessions and city movement.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Midnight', hex: '#0f172a' },
      { name: 'Olive', hex: '#4d7c0f' },
      { name: 'Sand', hex: '#d6d3d1' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'trail-pack',
    name: 'Trail Pack',
    category: 'Accessories',
    price: 1299,
    oldPrice: 1699,
    rating: 4.6,
    badge: 'Hot',
    description: 'High-utility gym bag with hydration storage, laptop sleeve and mesh pockets.',
    sizes: ['One Size'],
    colors: [
      { name: 'Black', hex: '#0f172a' },
      { name: 'Forest', hex: '#14532d' },
      { name: 'Slate', hex: '#6b7280' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'core-hoodie',
    name: 'Core Hoodie',
    category: 'Women',
    price: 1699,
    oldPrice: 2299,
    rating: 4.8,
    badge: 'Best Value',
    description: 'Premium fleece with relaxed drape, oversized fit and everyday comfort.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Pearl', hex: '#f5f5f4' },
      { name: 'Charcoal', hex: '#374151' },
      { name: 'Sage', hex: '#4d7c0f' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'aero-sprint',
    name: 'Aero Sprint',
    category: 'Sale',
    price: 1499,
    oldPrice: 2199,
    rating: 4.5,
    badge: 'Flash Deal',
    description: 'A streamlined race short built for top speed, mobility, and comfort.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Electric', hex: '#22c55e' },
      { name: 'Crimson', hex: '#dc2626' },
      { name: 'Black', hex: '#111827' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'rally-zip',
    name: 'Rally Zip',
    category: 'Men',
    price: 3199,
    oldPrice: 3899,
    rating: 4.8,
    badge: 'New',
    description: 'A premium zip-up layer engineered for fast weather changes and all-day training.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Stone', hex: '#e7e5e4' },
      { name: 'Graphite', hex: '#374151' },
      { name: 'Cobalt', hex: '#2563eb' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'spark-elite',
    name: 'Spark Elite',
    category: 'Running',
    price: 2499,
    oldPrice: 3199,
    rating: 4.9,
    badge: 'Top Rated',
    description: 'Lightweight running shoe with extra heel stability and responsive landing support.',
    sizes: ['38', '39', '40', '41', '42', '43'],
    colors: [
      { name: 'Solar', hex: '#f59e0b' },
      { name: 'Shadow', hex: '#111827' },
      { name: 'Mint', hex: '#34d399' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'vivid-legging',
    name: 'Vivid Legging',
    category: 'Women',
    price: 1799,
    oldPrice: 2399,
    rating: 4.7,
    badge: 'Trending',
    description: 'Soft-touch compression tights for strength training, recovery and everyday movement.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Plum', hex: '#7c3aed' },
      { name: 'Terracotta', hex: '#c2410c' },
      { name: 'Pearl', hex: '#f5f5f4' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'grip-mat',
    name: 'Grip Mat',
    category: 'Training',
    price: 1299,
    oldPrice: 1699,
    rating: 4.6,
    badge: 'Gym Essential',
    description: 'Non-slip yoga and training mat built for floor work, stretching and recovery.',
    sizes: ['Standard', 'Pro'],
    colors: [
      { name: 'Teal', hex: '#14b8a6' },
      { name: 'Charcoal', hex: '#374151' },
      { name: 'Sand', hex: '#d6d3d1' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'velocity-bottle',
    name: 'Velocity Bottle',
    category: 'Accessories',
    price: 399,
    oldPrice: 599,
    rating: 4.5,
    badge: 'Daily Use',
    description: 'Insulated hydration bottle that keeps drinks cold for hours during intense sessions.',
    sizes: ['500ml', '750ml'],
    colors: [
      { name: 'Black', hex: '#111827' },
      { name: 'Blue', hex: '#0ea5e9' },
      { name: 'Red', hex: '#ef4444' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'summit-crew',
    name: 'Summit Crew',
    category: 'Men',
    price: 1499,
    oldPrice: 1999,
    rating: 4.7,
    badge: 'Everyday',
    description: 'A structured knit crew that balances comfort, mobility and a clean athletic silhouette.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Navy', hex: '#1d4ed8' },
      { name: 'Stone', hex: '#d6d3d1' },
      { name: 'Black', hex: '#0f172a' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'nova-balance',
    name: 'Nova Balance',
    category: 'Sale',
    price: 1899,
    oldPrice: 2699,
    rating: 4.6,
    badge: 'Hot Deal',
    description: 'A premium training shoe tuned for explosive speed, support and smooth transitions.',
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [
      { name: 'Rose', hex: '#fb7185' },
      { name: 'Slate', hex: '#64748b' },
      { name: 'Ivory', hex: '#f8fafc' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'track-rib',
    name: 'Track Rib',
    category: 'Women',
    price: 2399,
    oldPrice: 2999,
    rating: 4.8,
    badge: 'New Drop',
    description: 'Ribbed performance layer built for warm ups, tempo runs and post-training recovery.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Blush', hex: '#f9a8d4' },
      { name: 'Deep Blue', hex: '#1e3a8a' },
      { name: 'Slate', hex: '#475569' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'power-bands',
    name: 'Power Bands',
    category: 'Training',
    price: 699,
    oldPrice: 999,
    rating: 4.8,
    badge: 'Bundle',
    description: 'Portable strength bands for home workouts, rehab and progressive resistance training.',
    sizes: ['Light', 'Medium', 'Heavy'],
    colors: [
      { name: 'Orange', hex: '#f97316' },
      { name: 'Green', hex: '#22c55e' },
      { name: 'Black', hex: '#111827' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'storm-shorts',
    name: 'Storm Shorts',
    category: 'Running',
    price: 1399,
    oldPrice: 1899,
    rating: 4.7,
    badge: 'Fast Move',
    description: 'Breathable running shorts built for speed, ventilation and unrestricted leg motion.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Jet', hex: '#111827' },
      { name: 'Coral', hex: '#fb7185' },
      { name: 'Lime', hex: '#84cc16' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'trail-sling',
    name: 'Trail Sling',
    category: 'Accessories',
    price: 899,
    oldPrice: 1199,
    rating: 4.5,
    badge: 'Compact',
    description: 'Minimal sling bag for quick runs, gym days and everyday essentials on the move.',
    sizes: ['One Size'],
    colors: [
      { name: 'Khaki', hex: '#a3a3a3' },
      { name: 'Black', hex: '#111827' },
      { name: 'Forest', hex: '#166534' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'apex-sprint',
    name: 'Apex Sprint',
    category: 'Shoes',
    price: 2599,
    oldPrice: 3299,
    rating: 4.9,
    badge: 'Elite',
    description: 'Carbon-infused running shoe for explosive speed, traction and all-day comfort.',
    sizes: ['38', '39', '40', '41', '42', '43'],
    colors: [
      { name: 'Volt', hex: '#eab308' },
      { name: 'Obsidian', hex: '#111827' },
      { name: 'Mist', hex: '#dbeafe' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'urban-flex',
    name: 'Urban Flex',
    category: 'Shoes',
    price: 2299,
    oldPrice: 2899,
    rating: 4.8,
    badge: 'Popular',
    description: 'Street-ready training sneaker with stable cushioning and breathable knit upper.',
    sizes: ['36', '37', '38', '39', '40', '41', '42'],
    colors: [
      { name: 'Cinder', hex: '#374151' },
      { name: 'White', hex: '#f8fafc' },
      { name: 'Coral', hex: '#fb7185' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'trail-glide',
    name: 'Trail Glide',
    category: 'Shoes',
    price: 2799,
    oldPrice: 3499,
    rating: 4.9,
    badge: 'Adventure',
    description: 'Trail runner with deep grip, rock-solid support and all-terrain stability.',
    sizes: ['39', '40', '41', '42', '43', '44'],
    colors: [
      { name: 'Forest', hex: '#166534' },
      { name: 'Sand', hex: '#d6d3d1' },
      { name: 'Black', hex: '#111827' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=80',
    ],
  },
];

const users = [
  { id: 1, name: 'Omar Hassan', email: 'omar@stryde.com', password: '123456' },
  { id: 2, name: 'Nora Salem', email: 'nora@stryde.com', password: 'admin123' },
];

const searchProducts = (query, list = products) => {
  const term = query.trim().toLowerCase();
  if (!term) return list;

  return list.filter((product) => {
    const haystack = `${product.name} ${product.category} ${product.description}`.toLowerCase();
    return haystack.includes(term);
  });
};

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'API is running' });
});

app.get('/api/categories', (_req, res) => {
  res.json(['Men', 'Women', 'Running', 'Training', 'Accessories', 'Shoes', 'Sale']);
});

app.get('/api/products', (req, res) => {
  const query = req.query.q || '';
  const limit = Number(req.query.limit || 0);
  const filtered = searchProducts(String(query), products);

  res.json(limit > 0 ? filtered.slice(0, limit) : filtered);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((item) => item.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.json(product);
});

app.post('/api/login', (req, res) => {
  const { email, password, name } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const foundUser = users.find(
    (user) => user.email.toLowerCase() === String(email).toLowerCase() && user.password === String(password),
  );

  if (!foundUser) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  return res.json({
    user: {
      id: foundUser.id,
      name: name || foundUser.name,
      email: foundUser.email,
    },
  });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
