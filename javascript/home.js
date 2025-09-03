function logout(){
     window.location.href = "login.html";
}


  function toggleCart(force){
    const overlay = document.getElementById('cartOverlay');
    const panel   = document.getElementById('cartPanel');

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
