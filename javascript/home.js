function logout(){
     window.location.href = "login.html";
}

// ---------- Data model ----------
const LABELS = {
  "chicken": "Chicken",
  "burgers": "Burgers",
  "coffee": "Coffee",
  "milk-tea": "Milk Tea",
};

const CATEGORIES = {
  "chicken": [
    { name: "Crispy Fried Chicken", price: 129.00, image: "assets/images/fried-chicken.png", icon: "🍗", category: "chicken" },
    { name: "Chicken Wings (6 pcs)", price: 189.00, image: "assets/images/wings.png", icon: "🍗", category: "chicken" },
    { name: "Chicken Nuggets (8 pcs)", price: 119.00, image: "assets/images/nuggets.png", icon: "🍗", category: "chicken" },
    { name: "Chicken Sandwich", price: 145.00, image: "assets/images/chicken-sandwich.png", icon: "🍗", category: "chicken" },
    { name: "Crispy Fried Chicken", price: 129.00, image: "assets/images/fried-chicken.png", icon: "🍗", category: "chicken" },
    { name: "Chicken Wings (6 pcs)", price: 189.00, image: "assets/images/wings.png", icon: "🍗", category: "chicken" },
    { name: "Chicken Nuggets (8 pcs)", price: 119.00, image: "assets/images/nuggets.png", icon: "🍗", category: "chicken" },
    { name: "Chicken Sandwich", price: 145.00, image: "assets/images/chicken-sandwich.png", icon: "🍗", category: "chicken" },
  ],
  "burgers": [
    { name: "Classic Burger", price: 159.00, image: "assets/images/burger.png", icon: "🍔", category: "burgers" },
    { name: "Cheeseburger", price: 179.00, image: "assets/images/cheeseburger.png", icon: "🧀", category: "burgers" },
    { name: "Bacon Burger", price: 199.00, image: "assets/images/bacon-burger.png", icon: "🥓", category: "burgers" },
    { name: "Double Patty Burger", price: 229.00, image: "assets/images/double.png", icon: "🍔", category: "burgers" },
    { name: "Classic Burger", price: 159.00, image: "assets/images/burger.png", icon: "🍔", category: "burgers" },
    { name: "Cheeseburger", price: 179.00, image: "assets/images/cheeseburger.png", icon: "🧀", category: "burgers" },
    { name: "Bacon Burger", price: 199.00, image: "assets/images/bacon-burger.png", icon: "🥓", category: "burgers" },
    { name: "Double Patty Burger", price: 229.00, image: "assets/images/double.png", icon: "🍔", category: "burgers" },
  ],
  "coffee": [
    { name: "Americano (Hot)", price: 95.00, image: "assets/images/americano.png", icon: "☕", category: "coffee" },
    { name: "Latte (Hot)", price: 120.00, image: "assets/images/latte.png", icon: "☕", category: "coffee" },
    { name: "Iced Latte", price: 130.00, image: "assets/images/iced-latte.png", icon: "🧊", category: "coffee" },
    { name: "Caramel Macchiato", price: 145.00, image: "assets/images/caramel.png", icon: "🍮", category: "coffee" },
    { name: "Americano (Hot)", price: 95.00, image: "assets/images/americano.png", icon: "☕", category: "coffee" },
    { name: "Latte (Hot)", price: 120.00, image: "assets/images/latte.png", icon: "☕", category: "coffee" },
    { name: "Iced Latte", price: 130.00, image: "assets/images/iced-latte.png", icon: "🧊", category: "coffee" },
    { name: "Caramel Macchiato", price: 145.00, image: "assets/images/caramel.png", icon: "🍮", category: "coffee" },
  ],
  "milk-tea": [
    { name: "Classic Milk Tea", price: 95.00, image: "assets/images/milktea-classic.png", icon: "🧋", category: "milk-tea" },
    { name: "Wintermelon", price: 105.00, image: "assets/images/milktea-wintermelon.png", icon: "🧋", category: "milk-tea" },
    { name: "Okinawa", price: 115.00, image: "assets/images/milktea-okinawa.png", icon: "🧋", category: "milk-tea" },
    { name: "Thai Milk Tea", price: 125.00, image: "assets/images/milktea-thai.png", icon: "🧋", category: "milk-tea" },
     { name: "Classic Milk Tea", price: 95.00, image: "assets/images/milktea-classic.png", icon: "🧋", category: "milk-tea" },
    { name: "Wintermelon", price: 105.00, image: "assets/images/milktea-wintermelon.png", icon: "🧋", category: "milk-tea" },
    { name: "Okinawa", price: 115.00, image: "assets/images/milktea-okinawa.png", icon: "🧋", category: "milk-tea" },
    { name: "Thai Milk Tea", price: 125.00, image: "assets/images/milktea-thai.png", icon: "🧋", category: "milk-tea" },
  ],
};

// ---------- Cart ----------
let cart = [];
function addToCart(name, price, category, qty=1){
  qty = parseInt(qty, 10) || 1;
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, price, qty, category });
  }
  updateCartUI();
  Swal.fire({
    icon: 'success',
    title: 'Added to Cart',
    text: `${qty} x ${name} added to your cart.`,
    timer: 1500,
    showConfirmButton: false
  })
}

function updateCartUI(){
  // badge
  const badge = document.querySelector('.te-cart-count');
  const totalQty = cart.reduce((s,i)=>s+i.qty, 0);
  badge.textContent = String(totalQty);

  // total & list (simple)
  const content = document.getElementById('cartContent');
  if (cart.length === 0){
    content.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-icon">🛒</div>
        <p>Your cart is empty</p>
      </div>`;
  } else {
    content.innerHTML = cart.map(i => `
      <div class="cart-row" style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #eee;">
        <div><strong>${i.name}</strong><br><small>x${i.qty}</small></div>
        <div>₱ ${(i.price * i.qty).toFixed(2)}</div>
      </div>
    `).join('');
  }

  const total = cart.reduce((s,i)=>s + i.price*i.qty, 0);
  document.getElementById('cartTotal').textContent = `Total: ₱ ${total.toFixed(2)}`;
  const btn = document.getElementById('checkoutBtn');
  btn.disabled = cart.length === 0;
}

// ——— helpers ———
function allItems() {
  return Object.values(CATEGORIES).flat();
}

function renderItems(items) {
  const grid = document.getElementById('menu-grid');
  grid.innerHTML = '';

  if (!items.length) {
    grid.innerHTML = `<div style="padding:12px; color:#6b7280">No results found.</div>`;
    return;
  }
  items.forEach(item => grid.appendChild(createMenuItemElement(item)));
}

function setActiveChip(key) {
  document.querySelectorAll('#categoryChips .te-chip').forEach(chip => {
    chip.classList.toggle('active', chip.getAttribute('data-cat') === key);
  });
}

function debounce(fn, delay=250) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
}

// ——— search ———
function searchMenu(query) {
  const q = (query || '').trim().toLowerCase();

  if (!q) {
    // empty → restore current category view
    document.getElementById('selectedCategory').textContent = LABELS[currentCategory] || 'Menu';
    setActiveChip(currentCategory);
    renderCategory(currentCategory);
    return;
  }

  // deactivate chips during search view
  document.querySelectorAll('#categoryChips .te-chip').forEach(c => c.classList.remove('active'));

  // filter by name or category
  const results = allItems().filter(i =>
    i.name.toLowerCase().includes(q) ||
    (i.category && i.category.toLowerCase().includes(q))
  );

  document.getElementById('selectedCategory').textContent = `Search: "${query}"`;
  renderItems(results);
}

// ——— wire events ———
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('searchInput');
  const btn   = document.getElementById('searchBtn');

  btn.addEventListener('click', () => searchMenu(input.value));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchMenu(input.value);
  });
  // live search with debounce
  input.addEventListener('input', debounce(() => searchMenu(input.value), 250));
});


// ---------- Rendering ----------
let currentCategory = "chicken";

function createMenuItemElement(item){
  const div = document.createElement('div');
  div.className = 'te-card';

  const imgOrIcon = item.image
    ? `<img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'; this.closest('.te-card__media').querySelector('.fallback-icon').style.display='grid';">`
    : '';

  div.innerHTML = `
  <div class="te-card__media">
    ${imgOrIcon}
    <div class="fallback-icon" style="display:${item.image ? 'none' : 'grid'}; place-items:center; width:100%; height:100%; font-size:48px; background:#f4f4f5;">${item.icon || '🍽️'}</div>
    <button class="te-like" aria-pressed="false" title="Like">
      <img class="heart_icon" src="assets/icons/heart.png" alt="heart" style="width:24px; height:24px;">
    </button>
  </div>

  <div class="te-card__body">
    <h3 class="te-card__title">${item.name}</h3>
    <div class="te-meta">₱ ${item.price.toFixed(2)}</div>

    <!-- Quantity controls -->
    <div class="qty-control">
      <button type="button" class="qty-btn" onclick="changeQty(this, -1)">−</button>
      <input type="number" class="qty-input" value="1" min="1" readonly>
      <button type="button" class="qty-btn" onclick="changeQty(this, 1)">+</button>
    </div>

    <div class="te-card__cta">
      <button class="te-btn te-btn--primary" style="background-color:black"
        onclick="addToCart('${item.name.replace(/'/g,"\\'")}', ${item.price}, '${item.category}', this.closest('.te-card').querySelector('.qty-input').value)">
        Add to cart
      </button>
    </div>
  </div>
`;
  return div;
}

function changeQty(btn, delta) {
  const input = btn.parentElement.querySelector('.qty-input');
  let val = parseInt(input.value, 10) || 1;
  val = Math.max(1, val + delta);
  input.value = val;
}

function renderCategory(key){
  const grid = document.getElementById('menu-grid');
  grid.innerHTML = '';
  (CATEGORIES[key] || []).forEach(item => {
    grid.appendChild(createMenuItemElement(item));
  });
}
function showCategory(rawKey) {
  const key = String(rawKey).toLowerCase();
  currentCategory = key;

  // reset active state
  document.querySelectorAll('.te-chip').forEach(b => b.classList.remove('active'));

  // find the button that matches and activate
  document.querySelector(`.te-chip[data-cat="${key}"]`)?.classList.add('active');

  // update label
  document.getElementById('selectedCategory').textContent = LABELS[key] || 'Menu';

  // render items
  renderCategory(key);
}


// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
  // initial render
  showCategory(currentCategory);
  updateCartUI();
});



  function toggleCart(force){
    const overlay = document.getElementById('cartOverlay');
    const panel   = document.getElementById('cartPanel');
    document.getElementById('checkout').classList.remove('hidden');
    const isOpen = panel.classList.contains('open');
    const shouldOpen = (typeof force === 'boolean') ? force : !isOpen;

    if (shouldOpen){
      panel.classList.add('open');
      overlay.classList.add('active');
      panel.setAttribute('aria-hidden','false');
      document.body.classList.add('no-scroll');
    } else {
      panel.classList.remove('open');
      overlay.classList.remove('active');
      panel.setAttribute('aria-hidden','true');
      document.body.classList.remove('no-scroll');
    }
  }

  // Close with ESC
  window.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape'){
      toggleCart(false);
    }
    });

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.te-like');
  if (!btn) return; // click wasn't on a like button

  const liked = btn.classList.toggle('is-liked');
  btn.setAttribute('aria-pressed', liked);

  const img = btn.querySelector('img');
  if (img) {
    img.src = liked ? 'assets/icons/redheart.png' : 'assets/icons/heart.png';
  }
});

function showcreditcardmodal(){
      document.getElementById('credit_card').classList.remove('hidden');
      document.getElementById('paypal').classList.add('hidden');
      document.getElementById('gcash').classList.add('hidden');
      setPayment('credit card');
    }
    function showpaypalmodal(){
      document.getElementById('credit_card').classList.add('hidden');
      document.getElementById('paypal').classList.remove('hidden');
      document.getElementById('gcash').classList.add('hidden');
      setPayment('paypal');
    }
    function showgcashmodal(){
      document.getElementById('credit_card').classList.add('hidden');
      document.getElementById('paypal').classList.add('hidden');
      document.getElementById('gcash').classList.remove('hidden');
      setPayment('gcash');
    }
