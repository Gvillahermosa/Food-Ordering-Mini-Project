function logout(){
  window.location.href = "login.html";
}

/* ---------- Helpers ---------- */
const peso = (n) => n.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ---------- Labels / Data ---------- */
const LABELS = {
  "chicken": "Chicken",
  "burgers": "Burgers",
  "coffee": "Coffee",
  "milk-tea": "Desserts", // show label as button text
  "fried-chicken": "Fried Chicken"
};

const CATEGORIES = {
  "chicken": [
    { name: "1 - pc. Chickenjoy New Spicy Solo", price: 102.00, image: "assets/foods/chicken1.jpg", icon: "🍗", category: "chicken" },
    { name: "1 - pc. Chickenjoy New Spicy w/ Burger Steak Solo", price: 157.00, image: "assets/foods/chicken2.jpg", icon: "🍗", category: "chicken" },
    { name: "1-pc. Chickenjoy w/ Drink", price: 101.00, image: "assets/foods/chicken3.jpg", icon: "🍗", category: "chicken" },
    { name: "1 - pc. Chickenjoy w/ Coke Float", price: 141.00, image: "assets/foods/chicken4.jpg", icon: "🍗", category: "chicken" },
    { name: "1pc. Chicken McDo with McSpaghetti", price: 155.00, image: "assets/foods/chicken5.jpg", icon: "🍗", category: "chicken" },
    { name: "2pc. Chicken McDo with Rice", price: 183.00, image: "assets/foods/chicken6.jpg", icon: "🍗", category: "chicken" },
    { name: "1pc. Chicken McDo with Rice", price: 92.00, image: "assets/foods/chicken7.jpg", icon: "🍗", category: "chicken" },
    { name: "1pc. Chicken McDo with McSpaghetti", price: 155.00, image: "assets/foods/chicken8.jpg", icon: "🍗", category: "chicken" }
  ],
  "burgers": [
    { name: "Yumburger Solo", price: 46.00, image: "assets/foods/burger1.jpg", icon: "🍔", category: "burgers" },
    { name: "Cheesy Yumburger Sol", price: 76.00, image: "assets/foods/burger2.jpg", icon: "🧀", category: "burgers" },
    { name: "Yumburger w/ Fries & Drink", price: 129.00, image: "assets/foods/burger3.jpg", icon: "🥓", category: "burgers" },
    { name: "Cheesy Yumburger w/ Fries & Drink", price: 150.00, image: "assets/foods/burger4.jpg", icon: "🍔", category: "burgers" },
    { name: "Big Mac", price: 182.00, image: "assets/foods/burger5.jpg", icon: "🍔", category: "burgers" },
    { name: "Burger McDo", price: 44.00, image: "assets/foods/burger6.jpg", icon: "🧀", category: "burgers" },
    { name: "Quarter Pounder with Cheese", price: 179.00, image: "assets/foods/burger7.jpg", icon: "🥓", category: "burgers" },
    { name: "Double Cheeseburger", price: 142.00, image: "assets/foods/burger8.jpg", icon: "🍔", category: "burgers" }
  ],
  "coffee": [
    { name: "Cold Brew ", price: 195.00, image: "assets/foods/coffee1.png", icon: "☕", category: "coffee" },
    { name: "Caffè Misto ", price: 120.00, image: "assets/foods/coffee2.png", icon: "☕", category: "coffee" },
    { name: "Espresso", price: 135.00, image: "assets/foods/coffee3.png", icon: "🧊", category: "coffee" },
    { name: "Iced Americano ", price: 150.00, image: "assets/foods/coffee4.png", icon: "🍮", category: "coffee" },
    { name: "McCafé Premium Roast Coffee (Small)", price: 53.00, image: "assets/foods/coffee5.jpg", icon: "☕", category: "coffee" },
    { name: "McCafé Premium Roast Coffee (Medium)", price: 69.00, image: "assets/foods/coffee5.jpg", icon: "☕", category: "coffee" },
    { name: "Brewed Coffee", price: 60.00, image: "assets/foods/coffee6.png", icon: "🧊", category: "coffee" },
    { name: "Hot Tea", price: 60.00, image: "assets/foods/coffee7.png", icon: "🍮", category: "coffee" }
  ],
  "milk-tea": [
    { name: "Chocolate Sundae", price: 54.00, image: "assets/foods/dessert1.jpg", icon: "🧋", category: "milk-tea" },
    { name: "Mini Chocolate Sundae", price: 33.00, image: "assets/foods/dessert2.jpg", icon: "🧋", category: "milk-tea" },
    { name: "McFlurry with Oreo Cookies", price: 69.00, image: "assets/foods/dessert3.jpg", icon: "🧋", category: "milk-tea" },
    { name: "Hot Caramel Sundae", price: 57.00, image: "assets/foods/dessert4.jpg", icon: "🧋", category: "milk-tea" },
    { name: "Banoffee Pie", price: 220.00, image: "assets/foods/dessert5.png", icon: "🧋", category: "milk-tea" },
    { name: "Blueberry Licious Cheesecake (slice)", price: 275.00, image: "assets/foods/dessert6.png", icon: "🧋", category: "milk-tea" },
    { name: "Classic Chocolate Cake (slice)", price: 230.00, image: "assets/foods/dessert7.png", icon: "🧋", category: "milk-tea" },
    { name: "New York Cheesecake (slice)", price: 245.00, image: "assets/foods/dessert8.png", icon: "🧋", category: "milk-tea" }
  ]
};

/* ---------- Cart State ---------- */
let cart = [];
let selectedPayment = "credit_card";
let fulfillment = "delivery"; // "delivery" | "pickup"

const methodName = {
  credit_card: "Credit Card",
  paypal: "PayPal",
  gcash: "GCash",
  cod: "Cash on Delivery"
};

/* ---------- Cart Ops ---------- */
function addToCart(name, price, category, qty = 1){
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
    timer: 1200,
    showConfirmButton: false
  });
}

function changeCartQty(idx, delta){
  const item = cart[idx];
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  updateCartUI();
}

function removeCartItem(idx){
  cart.splice(idx, 1);
  updateCartUI();
}

function cartTotal(){
  return cart.reduce((s, i) => s + i.price * i.qty, 0);
}

function updateCartUI(){
  // badge
  document.querySelector('.te-cart-count').textContent =
    String(cart.reduce((s, i) => s + i.qty, 0));

  // list
  const content = document.getElementById('cartContent');
  const empty = content.querySelector('.empty-cart');
  if (cart.length === 0){
    if (!empty) {
      content.insertAdjacentHTML('afterbegin', `
        <div class="empty-cart">
          <div class="empty-cart-icon">🛒</div>
          <p>Your cart is empty</p>
        </div>
      `);
    }
  } else {
    if (empty) empty.remove();
  }

  // remove all existing rows
  content.querySelectorAll('.cart-row').forEach(n => n.remove());

  // insert rows before the first section (fulfillment section)
  const firstSection = document.getElementById('fulfillmentSection');

  const rowsHTML = cart.map((i, idx) => `
    <div class="cart-row">
      <div class="cart-main">
        <div class="cart-name">${i.name}</div>
        <div class="cart-sub">₱ ${peso(i.price)} · <span>x${i.qty}</span></div>
      </div>
      <div class="cart-right">
        <div class="cart-qty">
          <button onclick="changeCartQty(${idx}, -1)">−</button>
          <input value="${i.qty}" readonly>
          <button onclick="changeCartQty(${idx}, 1)">+</button>
        </div>
        <div class="cart-price">₱ ${peso(i.price * i.qty)}</div>
        <button class="cart-remove" onclick="removeCartItem(${idx})">Remove</button>
      </div>
    </div>
  `).join('');

  if (firstSection) {
    firstSection.insertAdjacentHTML('beforebegin', rowsHTML);
  } else {
    content.insertAdjacentHTML('afterbegin', rowsHTML);
  }

  // total + button state
  document.getElementById('cartTotal').textContent = `Total: ₱ ${peso(cartTotal())}`;
  document.getElementById('checkoutBtn').disabled = cart.length === 0;
}

/* ---------- Search / Categories ---------- */
function allItems(){ return Object.values(CATEGORIES).flat(); }

function createMenuItemElement(item){
  const div = document.createElement('div');
  div.className = 'te-card';

  // Build the image element (supports optional hires asset via item.hires)
  const src = item.image || '';
  const hires = item.hires || ''; // <-- if you add item.hires, srcset will use it
  const imgOrIcon = src
    ? `<img src="${src}" ${hires ? `srcset="${src} 1x, ${hires} 2x"` : ''} loading="lazy" decoding="async" alt="${item.name}" onerror="this.style.display='none'; this.closest('.te-card__media').querySelector('.fallback-icon').style.display='grid';">`
    : '';

  div.innerHTML = `
    <div class="te-card__media" data-full="${src}" data-name="${item.name}" ${hires ? `data-hires="${hires}"` : ''}>
      ${imgOrIcon}
      <div class="fallback-icon" style="display:${src ? 'none' : 'grid'}; place-items:center; width:100%; height:100%; font-size:48px; background:#f4f4f5;">${item.icon || '🍽️'}</div>
      <button class="te-like" aria-pressed="false" title="Like">
        <img class="heart_icon" src="assets/icons/heart.png" alt="heart" style="width:24px; height:24px;">
      </button>
    </div>

    <div class="te-card__body">
      <h3 class="te-card__title">${item.name}</h3>
      <div class="te-meta">₱ ${peso(item.price)}</div>

      <div class="qty-control">
        <button type="button" class="qty-btn" onclick="changeQty(this, -1)">−</button>
        <input type="number" class="qty-input" value="1" min="1" readonly>
        <button type="button" class="qty-btn" onclick="changeQty(this, 1)">+</button>
      </div>

      <div class="te-card__cta">
        <button class="te-btn te-btn--primary add-to-cart" style="background-color:black"
          data-name="${item.name}"
          data-price="${item.price}"
          data-category="${item.category}">
          Add to cart
        </button>
      </div>
    </div>
  `;

  // Add-to-cart (safe listener)
  const addBtn = div.querySelector('.add-to-cart');
  addBtn.addEventListener('click', () => {
    const qtyInput = div.querySelector('.qty-input');
    const qty = parseInt(qtyInput.value, 10) || 1;
    addToCart(item.name, item.price, item.category, qty);
  });

  // Image modal opener (click the media area)
  const media = div.querySelector('.te-card__media');
  media.addEventListener('click', (e) => {
    // Ignore clicks on the like button inside media
    if (e.target.closest('.te-like')) return;
    const full = media.getAttribute('data-hires') || media.getAttribute('data-full');
    const name = media.getAttribute('data-name') || '';
    if (full) openImageModal(full, name);
  });

  return div;
}

function changeQty(btn, delta) {
  const input = btn.parentElement.querySelector('.qty-input');
  let val = parseInt(input.value, 10) || 1;
  val = Math.max(1, val + delta);
  input.value = val;
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

let currentCategory = "chicken";
function renderCategory(key){
  const grid = document.getElementById('menu-grid');
  grid.innerHTML = '';
  (CATEGORIES[key] || []).forEach(item => grid.appendChild(createMenuItemElement(item)));
}
function showCategory(rawKey) {
  const key = String(rawKey).toLowerCase();
  currentCategory = key;

  document.querySelectorAll('.te-chip').forEach(b => b.classList.remove('active'));
  const chip = document.querySelector(`.te-chip[data-cat="${key}"]`);
  if (chip) chip.classList.add('active');

  const sel = document.getElementById('selectedCategory');
  if (sel) sel.textContent = LABELS[key] || 'Menu';

  renderCategory(key);
}

function setActiveChip(key) {
  document.querySelectorAll('#categoryChips .te-chip').forEach(chip => {
    chip.classList.toggle('active', chip.getAttribute('data-cat') === key);
  });
}

function debounce(fn, delay = 250) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
}

function searchMenu(query) {
  const q = (query || '').trim().toLowerCase();

  if (!q) {
    const sel = document.getElementById('selectedCategory');
    if (sel) sel.textContent = LABELS[currentCategory] || 'Menu';
    setActiveChip(currentCategory);
    renderCategory(currentCategory);
    return;
  }

  document.querySelectorAll('#categoryChips .te-chip').forEach(c => c.classList.remove('active'));

  const results = allItems().filter(i =>
    i.name.toLowerCase().includes(q) ||
    (i.category && i.category.toLowerCase().includes(q))
  );

  const sel = document.getElementById('selectedCategory');
  if (sel) sel.textContent = `Search: "${query}"`;
  renderItems(results);
}

/* ---------- Cart Panel ---------- */
function toggleCart(force){
  const overlay = document.getElementById('cartOverlay');
  const panel   = document.getElementById('cartPanel');

  const isOpen = panel.classList.contains('open');
  const shouldOpen = (typeof force === 'boolean') ? force : !isOpen;

  if (shouldOpen){
    panel.classList.add('open');
    overlay.classList.add('active');
    panel.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  } else {
    panel.classList.remove('open');
    overlay.classList.remove('active');
    panel.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }
}

// ESC to close cart
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape'){
    toggleCart(false);
    closeImageModal();
  }
});

/* ---------- Likes ---------- */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.te-like');
  if (!btn) return;
  const liked = btn.classList.toggle('is-liked');
  btn.setAttribute('aria-pressed', liked);
  const img = btn.querySelector('img');
  if (img) img.src = liked ? 'assets/icons/redheart.png' : 'assets/icons/heart.png';
});

/* ---------- Payment Selection (incl. COD) ---------- */
function choosePayment(key){
  selectedPayment = key;

  // highlight selected card
  document.querySelectorAll('.pay-card').forEach(card => {
    card.classList.toggle('selected', card.dataset.pay === key);
  });

  // show payment form
  document.querySelectorAll('.payment').forEach(p => p.classList.add('hidden'));
  const sect = document.getElementById(key);
  if (sect) sect.classList.remove('hidden');
}

// Backwards-compat wrappers (if you still call these elsewhere)
function showcreditcardmodal(){ choosePayment('credit_card'); }
function showpaypalmodal(){ choosePayment('paypal'); }
function showgcashmodal(){ choosePayment('gcash'); }
function showcodemodal(){ choosePayment('cod'); }

/* ---------- Fulfillment (Delivery vs Pickup) ---------- */
function applyFulfillmentUI(){
  const isDelivery = fulfillment === 'delivery';
  document.getElementById('addressSection').classList.toggle('hidden', !isDelivery);
  document.getElementById('pickupSection').classList.toggle('hidden', isDelivery);
}
document.addEventListener('change', (e) => {
  const target = e.target;
  if (target && target.name === 'fulfillment'){
    fulfillment = target.value;
    applyFulfillmentUI();
  }
});

/* ---------- Checkout ---------- */
function validateBeforeCheckout(){
  if (cart.length === 0) return { ok: false, reason: "Your cart is empty." };

  if (fulfillment === 'delivery'){
    const fullName = document.getElementById('addrFullName').value.trim();
    const phone = document.getElementById('addrPhone').value.trim();
    const line1 = document.getElementById('addrLine1').value.trim();
    const city = document.getElementById('addrCity').value.trim();
    if (!fullName || !phone || !line1 || !city){
      return { ok: false, reason: "Please complete your delivery address (name, phone, street, city)." };
    }
  } else {
    const branch = document.getElementById('pickupBranch').value.trim();
    const pickupName = document.getElementById('pickupName').value.trim();
    if (!branch || !pickupName){
      return { ok: false, reason: "Please select a pickup branch and enter your name." };
    }
  }

  if (selectedPayment === 'credit_card'){
    const holder = document.getElementById('cardholder').value.trim();
    const number = document.getElementById('cardnumber').value.trim();
    const exp = document.getElementById('expdate').value.trim();
    const cvv = document.getElementById('cvv').value.trim();
    if (!holder || !number || !exp || !cvv){
      return { ok: false, reason: "Please fill in your credit card details." };
    }
  }
  if (selectedPayment === 'paypal'){
    const mail = document.getElementById('paypalEmail').value.trim();
    if (!mail){ return { ok: false, reason: "Please enter your PayPal email." }; }
  }
  if (selectedPayment === 'gcash'){
    const num = document.getElementById('gcashNumber').value.trim();
    if (!num){ return { ok: false, reason: "Please enter your GCash number." }; }
  }

  return { ok: true };
}

function summaryHTML(){
  const items = cart.map(i => `
    <div style="display:flex;justify-content:space-between;gap:12px;">
      <div>${i.name} × ${i.qty}</div>
      <div><b>₱ ${peso(i.price * i.qty)}</b></div>
    </div>
  `).join('');

  let fulfillBlock = '';
  if (fulfillment === 'delivery'){
    const n = document.getElementById('addrFullName').value;
    const ph = document.getElementById('addrPhone').value;
    const l1 = document.getElementById('addrLine1').value;
    const brgy = document.getElementById('addrBarangay').value;
    const city = document.getElementById('addrCity').value;
    const prov = document.getElementById('addrProvince').value;
    const notes = document.getElementById('addrNotes').value;
    fulfillBlock = `
      <div style="margin-top:8px;">
        <div><b>Delivery to:</b> ${n} (${ph})</div>
        <div style="font-size:12px;color:#6b7280;">${l1}${brgy ? ', ' + brgy : ''}${city ? ', ' + city : ''}${prov ? ', ' + prov : ''}</div>
        ${notes ? `<div style="font-size:12px;color:#6b7280;">Notes: ${notes}</div>` : ''}
      </div>
    `;
  } else {
    const b = document.getElementById('pickupBranch').value;
    const n2 = document.getElementById('pickupName').value;
    const ph2 = document.getElementById('pickupPhone').value;
    const t = document.getElementById('pickupTime').value;
    fulfillBlock = `
      <div style="margin-top:8px;">
        <div><b>Pickup:</b> ${b}</div>
        <div style="font-size:12px;color:#6b7280;">For: ${n2}${ph2 ? ' (' + ph2 + ')' : ''}${t ? ' · ' + t : ''}</div>
      </div>
    `;
  }

  return `
    <div style="text-align:left">
      <div style="margin-bottom:8px;font-weight:700;">Items</div>
      ${items}
      <hr style="margin:12px 0;">
      <div style="display:flex;justify-content:space-between;">
        <div><b>Payment</b></div>
        <div>${methodName[selectedPayment]}</div>
      </div>
      ${fulfillBlock}
      <hr style="margin:12px 0;">
      <div style="display:flex;justify-content:space-between;">
        <div style="font-weight:700;">Total</div>
        <div style="font-weight:700;">₱ ${peso(cartTotal())}</div>
      </div>
    </div>
  `;
}

/* ---------- Image Modal Logic ---------- */
function openImageModal(src, caption=''){
  const modal = document.getElementById('imgModal');
  const img   = document.getElementById('imgModalImg');
  const cap   = document.getElementById('imgModalCaption');
  if (!modal || !img) return;

  img.src = src;
  img.alt = caption || '';
  if (cap) cap.textContent = caption || '';

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
}

function closeImageModal(){
  const modal = document.getElementById('imgModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');

  // clear src to allow reloading GIFs/webp if needed
  const img = document.getElementById('imgModalImg');
  if (img) img.removeAttribute('src');
}

// Close on overlay/click or close button
document.addEventListener('click', (e) => {
  if (e.target && e.target.hasAttribute('data-close')) {
    closeImageModal();
  }
});

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // Initial render
  showCategory(currentCategory);
  updateCartUI();
  applyFulfillmentUI();
  choosePayment('credit_card');

  // Search
  const input = document.getElementById('searchInput');
  const btn   = document.getElementById('searchBtn');
  btn.addEventListener('click', () => searchMenu(input.value));
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') searchMenu(input.value); });
  input.addEventListener('input', debounce(() => searchMenu(input.value), 250));

  // Chips click
  const chips = document.getElementById('categoryChips');
  if (chips) {
    chips.addEventListener('click', (e) => {
      const b = e.target.closest('.te-chip');
      if (!b) return;
      const key = b.getAttribute('data-cat');
      if (key) showCategory(key);
    });
  }

  // Checkout action
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      const v = validateBeforeCheckout();
      if (!v.ok) {
        Swal.fire({ icon: 'warning', title: 'Hold on', text: v.reason });
        return;
      }
      Swal.fire({
        title: 'Confirm Order',
        html: summaryHTML(),
        showCancelButton: true,
        confirmButtonText: 'Place Order',
        cancelButtonText: 'Cancel',
        focusConfirm: false
      }).then(res => {
        if (res.isConfirmed){
          Swal.fire({ icon: 'success', title: 'Order placed!', text: 'Your order is on its way. Thank you!' });
          cart = [];
          updateCartUI();
          toggleCart(false);
        }
      });
    });
  }
});
