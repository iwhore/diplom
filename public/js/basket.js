document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.querySelector(".cart-items");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    cart = cart.filter(item => item.quantity > 0);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function calculateTotals() {
    let totalQuantity = 0;
    let subtotal = 0;
    const delivery = 500;
    const discount = 0;
  
    cart.forEach(item => {
      totalQuantity += item.quantity;
      subtotal += item.quantity * item.price;
    });
  
    const totalWithDelivery = subtotal + delivery;
  
    const summarySpans = document.querySelectorAll(".order-summary span");
    summarySpans[0].textContent = totalQuantity; // Кількість
    summarySpans[1].textContent = subtotal.toFixed(2); // Сума
    summarySpans[2].textContent = delivery.toFixed(2); // Доставка
    summarySpans[3].textContent = discount.toFixed(2); // Знижка
    summarySpans[4].textContent = totalWithDelivery.toFixed(2); // Всього
  }

  function renderCart() {
    cartContainer.innerHTML = "";

    cart.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");
      itemElement.dataset.index = index;

      const total = item.quantity * item.price;

      itemElement.innerHTML = `
        <button class="remove-item">
          <img src="./images/cross-basket.svg" alt="Remove">
        </button>
        <div class="img">
          <div class="image-placeholder">
            <img src="${item.image}" alt="${item.name}" />
          </div>
          <div class="description">
            <p>${item.name}</p>
            <span>Колір: ${item.color}</span>
          </div>
        </div>
        <span class="item-total">${total}</span>
        <div class="quantity-control">
          <button class="minus">−</button>
          <p class="quantity">${item.quantity}</p>
          <button class="plus">+</button>
        </div>
      `;

      cartContainer.appendChild(itemElement);
    });

    calculateTotals();
  }

  function updateQuantity(index, type) {
    if (type === "plus") {
      cart[index].quantity++;
    } else if (type === "minus" && cart[index].quantity > 1) {
      cart[index].quantity--;
    }
    saveCart();
    renderCart();
  }

  function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
  }

  cartContainer.addEventListener("click", (e) => {
    const itemEl = e.target.closest(".cart-item");
    const index = parseInt(itemEl?.dataset.index);

    if (e.target.closest(".plus")) updateQuantity(index, "plus");
    else if (e.target.closest(".minus")) updateQuantity(index, "minus");
    else if (e.target.closest(".remove-item")) removeItem(index);
  });

  const checkoutBtn = document.querySelector(".checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.href = "details.html";
    });
  }

  renderCart();
});

