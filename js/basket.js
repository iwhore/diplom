// === basket-controls.js ===
document.querySelector(".checkout-btn").addEventListener("click", function () {
  window.location.href = "details.html";
});
function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.querySelector('.cart-items');
    const totalQtyEl = document.querySelector('.order-summary p:nth-child(2) span');
    const totalSumEl = document.querySelector('.order-summary p:nth-child(3) span');
    const finalTotalEl = document.querySelector('.order-summary .result span');
  
    container.innerHTML = '';
    let totalQty = 0;
    let totalSum = 0;
  
    cart.forEach(item => {
      const itemHTML = `
        <div class="cart-item" data-id="${item.id}">
          <button class="remove-item">
            <img src="./images/cross-basket.svg" alt="" />
          </button>
          <div class="img">
            <div class="image-placeholder">
              <img src="${item.image}" alt="${item.name}" style="width: 80px; border-radius: 10px;">
            </div>
            <div class="description">
              <p>${item.name}</p>
              <span>Колір: ${item.color}</span>
            </div>
          </div>
          <span class="item-price">${(item.price * item.quantity).toFixed(2)} грн</span>
          <div class="quantity-control">
            <button class="minus">−</button>
            <p class="quantity">${item.quantity}</p>
            <button class="plus">+</button>
          </div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', itemHTML);
      totalQty += item.quantity;
      totalSum += item.quantity * item.price;
    });
  
    totalQtyEl.textContent = totalQty;
    totalSumEl.textContent = `${totalSum.toFixed(2)} грн`;
    finalTotalEl.textContent = `${totalSum.toFixed(2)} грн`;
  
    addEventListeners();
  }
  
  function addEventListeners() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', () => {
        const id = +button.closest('.cart-item').dataset.id;
        const updated = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updated));
        renderCart();
      });
    });
  
    document.querySelectorAll('.plus').forEach(button => {
      button.addEventListener('click', () => {
        const id = +button.closest('.cart-item').dataset.id;
        const found = cart.find(item => item.id === id);
        if (found) found.quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });
  
    document.querySelectorAll('.minus').forEach(button => {
      button.addEventListener('click', () => {
        const id = +button.closest('.cart-item').dataset.id;
        const found = cart.find(item => item.id === id);
        if (found && found.quantity > 1) {
          found.quantity--;
          localStorage.setItem('cart', JSON.stringify(cart));
          renderCart();
        }
      });
    });
  }
  
  // Запуск після завантаження
  if (document.querySelector('.cart-items')) {
    document.addEventListener('DOMContentLoaded', renderCart);
  }
  