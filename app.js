const products = [
  { id:1,  name:'Seminar Kit SS-11 Premium',       category:'seminar',     price:'Rp 111.500', oldPrice:'Rp 149.000', badge:'sale',  stars:4.8, reviews:234,  emoji:'📋', minOrder:'10 pcs' },
  { id:2,  name:'Tumbler Vacuum Flask TC-208',      category:'drinkware',   price:'Rp 76.700',  oldPrice:'',           badge:'best',  stars:4.9, reviews:512,  emoji:'☕', minOrder:'20 pcs' },
  { id:3,  name:'Flashdisk OTG Metal OTGWD01',      category:'merchandise', price:'Rp 80.300',  oldPrice:'Rp 95.000',  badge:'sale',  stars:4.7, reviews:189,  emoji:'💾', minOrder:'50 pcs' },
  { id:4,  name:'Kaos Satuan Sablon DTF Custom',    category:'merchandise', price:'Rp 104.500', oldPrice:'',           badge:'new',   stars:4.6, reviews:88,   emoji:'👕', minOrder:'12 pcs' },
  { id:5,  name:'Print MMT Outdoor Full Color',     category:'printing',    price:'Rp 22.000',  oldPrice:'',           badge:'',      stars:4.8, reviews:671,  emoji:'🖨️', minOrder:'1 m²'  },
  { id:6,  name:'Plakat Akrilik PA-005 Custom',     category:'merchandise', price:'Rp 82.500',  oldPrice:'Rp 110.000', badge:'sale',  stars:4.9, reviews:302,  emoji:'🏆', minOrder:'5 pcs'  },
  { id:7,  name:'Notebook Transparan Post-It',       category:'seminar',     price:'Rp 30.800',  oldPrice:'',           badge:'new',   stars:4.5, reviews:143,  emoji:'📓', minOrder:'25 pcs' },
  { id:8,  name:'Stainless Bottle Rope Handle',     category:'drinkware',   price:'Rp 76.700',  oldPrice:'',           badge:'best',  stars:4.8, reviews:388,  emoji:'🥤', minOrder:'20 pcs' },
  { id:9,  name:'Kartu Nama Digital Print Full',    category:'printing',    price:'Rp 45.000',  oldPrice:'Rp 60.000',  badge:'sale',  stars:4.7, reviews:920,  emoji:'🪪', minOrder:'100 pcs'},
  { id:10, name:'Pulpen Custom Logo 1143',          category:'merchandise', price:'Rp 3.900',   oldPrice:'',           badge:'best',  stars:4.6, reviews:1250, emoji:'✏️', minOrder:'100 pcs'},
  { id:11, name:'Bottle Infus Fruit WB-103',        category:'drinkware',   price:'Rp 54.600',  oldPrice:'Rp 70.000',  badge:'sale',  stars:4.5, reviews:167,  emoji:'🍋', minOrder:'15 pcs' },
  { id:12, name:'Paket Seminar Kit Bronze 3',       category:'seminar',     price:'Rp 28.600',  oldPrice:'',           badge:'new',   stars:4.4, reviews:76,   emoji:'🎒', minOrder:'30 pcs' },
  { id:13, name:'Banner Roll Up 160x60cm',          category:'printing',    price:'Rp 85.000',  oldPrice:'Rp 110.000', badge:'sale',  stars:4.7, reviews:234,  emoji:'📢', minOrder:'1 pcs'  },
  { id:14, name:'Mug Warna Custom Sablon',          category:'drinkware',   price:'Rp 28.000',  oldPrice:'',           badge:'best',  stars:4.8, reviews:788,  emoji:'☕', minOrder:'24 pcs' },
  { id:15, name:'Pop Up Impraboard Display',        category:'printing',    price:'Rp 308.000', oldPrice:'Rp 380.000', badge:'sale',  stars:4.6, reviews:55,   emoji:'🗂️', minOrder:'1 pcs'  },
  { id:16, name:'Flashdisk Pen FDPEN16 Custom',    category:'merchandise', price:'Rp 80.300',  oldPrice:'',           badge:'new',   stars:4.5, reviews:120,  emoji:'🖊️', minOrder:'50 pcs' },
  { id:17, name:'Hang Tag Kertas Full Warna',       category:'printing',    price:'Rp 330',     oldPrice:'',           badge:'',      stars:4.4, reviews:340,  emoji:'🏷️', minOrder:'500 pcs'},
  { id:18, name:'Kalender Plakat Akrilik 2025',    category:'merchandise', price:'Rp 132.000', oldPrice:'Rp 165.000', badge:'sale',  stars:4.7, reviews:198,  emoji:'📅', minOrder:'10 pcs' },
  { id:19, name:'Tote Bag Canvas Sablon',           category:'merchandise', price:'Rp 42.000',  oldPrice:'',           badge:'new',   stars:4.6, reviews:210,  emoji:'👜', minOrder:'50 pcs' },
  { id:20, name:'Pin Button Custom Diameter 5.8cm', category:'merchandise', price:'Rp 2.800',   oldPrice:'',           badge:'best',  stars:4.5, reviews:670,  emoji:'📌', minOrder:'100 pcs'},
];

let visibleCount = 10;
let activeFilter = 'all';

function renderProducts() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  const filtered = activeFilter === 'all'
    ? products
    : products.filter(p => p.category === activeFilter);
  const visible = filtered.slice(0, visibleCount);

  grid.innerHTML = visible.map(p => {
    const badgeHtml = p.badge
      ? `<span class="pc-badge badge-${p.badge === 'sale' ? 'sale' : p.badge === 'new' ? 'new' : 'best'}">${p.badge === 'sale' ? 'DISKON' : p.badge === 'new' ? 'BARU' : 'TERLARIS'}</span>`
      : '';
    const oldPriceHtml = p.oldPrice
      ? `<span class="pc-price-old">${p.oldPrice}</span>`
      : '';
    const starsStr = '★'.repeat(Math.round(p.stars)) + '☆'.repeat(5 - Math.round(p.stars));
    return `
      <div class="product-card">
        <div class="pc-thumb">
          ${p.emoji}
          <div class="pc-badge-wrap">${badgeHtml}</div>
          <button class="pc-cart-btn" title="Tambah ke keranjang" onclick="addToCart(${p.id})">+</button>
        </div>
        <div class="pc-body">
          <span class="pc-category">${getCategoryLabel(p.category)}</span>
          <div class="pc-name">${p.name}</div>
          <div class="pc-rating">
            <span class="pc-stars">${starsStr}</span>
            <span>${p.stars} (${p.reviews})</span>
          </div>
          <div class="pc-price-wrap">
            <div class="pc-price">${p.price}</div>
            ${oldPriceHtml}
            <div class="pc-min-order">Min. order: ${p.minOrder}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Load more button visibility
  const btn = document.getElementById('loadMore');
  if (btn) {
    btn.style.display = visibleCount >= filtered.length ? 'none' : 'inline-flex';
  }
}

function getCategoryLabel(cat) {
  const map = { merchandise: 'Merchandise', printing: 'Digital Printing', drinkware: 'Drinkware', seminar: 'Seminar Kit' };
  return map[cat] || cat;
}

function addToCart(id) {
  const badge = document.querySelector('.cart-badge');
  if (badge) {
    const current = parseInt(badge.textContent) || 0;
    badge.textContent = current + 1;
    badge.style.transform = 'scale(1.4)';
    setTimeout(() => badge.style.transform = 'scale(1)', 200);
  }
  showToast('Produk ditambahkan ke keranjang ✓');
}

function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  t.style.cssText = `
    position:fixed; bottom:2rem; left:50%; transform:translateX(-50%) translateY(20px);
    background:var(--navy); color:#fff; padding:.75rem 1.5rem;
    border-radius:var(--radius); font-size:.85rem; font-weight:500;
    box-shadow:var(--shadow-lg); z-index:9999; opacity:0;
    transition: opacity .3s ease, transform .3s ease;
  `;
  document.body.appendChild(t);
  requestAnimationFrame(() => {
    t.style.opacity = '1';
    t.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(() => t.remove(), 300);
  }, 2800);
}

// ======= FILTER TABS =======
document.querySelectorAll('.ftab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    visibleCount = 10;
    renderProducts();
  });
});

// Load more
const loadMoreBtn = document.getElementById('loadMore');
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    visibleCount += 5;
    renderProducts();
  });
}

// ======= NAVBAR SCROLL =======
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
  const btt = document.getElementById('backToTop');
  if (btt) {
    if (window.scrollY > 300) btt.classList.add('visible');
    else btt.classList.remove('visible');
  }
}, { passive: true });

// ======= MOBILE MENU =======
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger?.addEventListener('click', () => {
  mobileMenu?.classList.toggle('open');
});

// ======= BACK TO TOP =======
document.getElementById('backToTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ======= SMOOTH ANCHOR SCROLL =======
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ======= SEARCH =======
document.getElementById('searchInput')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const q = e.target.value.trim();
    if (q) showToast(`Mencari: "${q}"...`);
  }
});
document.querySelector('.btn-search')?.addEventListener('click', () => {
  const q = document.getElementById('searchInput')?.value.trim();
  if (q) showToast(`Mencari: "${q}"...`);
});

// ======= SCROLL REVEAL =======
const revealTargets = document.querySelectorAll(
  '.kat-card, .product-card, .testi-card, .trust-item, .promo-banner, .wcard'
);
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeSlideUp .4s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Add keyframe via JS
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .kat-card, .product-card, .testi-card, .trust-item, .promo-banner, .wcard {
    opacity: 0;
  }
`;
document.head.appendChild(style);
revealTargets.forEach(el => observer.observe(el));

// ======= INIT =======
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
});

// Also call now in case DOM is already ready
if (document.readyState !== 'loading') renderProducts();