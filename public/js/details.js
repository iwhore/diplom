document.querySelector(".checkout-btn").addEventListener("click", function (e) {
  e.preventDefault(); // Зупиняє відправку форми

  // Отримуємо значення
  const name = document.getElementById("name").value.trim();
  const surname = document.getElementById("surname").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const city = document.getElementById("city").value.trim();
  const address = document.getElementById("address").value.trim();
  const index = document.getElementById("index").value.trim();
  const card = document.getElementById("card-number").value.trim();
  const cardName = document.getElementById("cardholder-name").value.trim();
  const expDate = document.getElementById("expiry-date").value.trim();
  const ccv = document.getElementById("ccv").value.trim();

  // Перевірка на заповнення
  if (
    !name ||
    !surname ||
    !phone ||
    !email ||
    !city ||
    !address ||
    !index ||
    !card ||
    !cardName ||
    !expDate ||
    !ccv
  ) {
    alert("Будь ласка, заповніть усі поля!");
    return;
  }

  // Перевірка email
  if (!email.includes("@")) {
    alert("Введіть коректний e-mail!");
    return;
  }

  // Перевірка телефону (тільки цифри + довжина)
  if (!/^\d{10,13}$/.test(phone)) {
    alert("Введіть правильний номер телефону!");
    return;
  }

  // Якщо все добре
  window.location.href = "order.html";

  // Тут можна реалізувати очищення або перехід на сторінку підтвердження
});

// ======= details.js (на сторінці details.html) =======
document.addEventListener("DOMContentLoaded", function () {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const summaryContainer = document.querySelector(".order-summary");

  let totalQuantity = 0;
  let subtotal = 0;
  const delivery = 500;

  cart.forEach(item => {
    totalQuantity += item.quantity;
    subtotal += item.quantity * item.price;
  });

  const total = subtotal + delivery;

  if (summaryContainer) {
    const spans = summaryContainer.querySelectorAll("span");
    if (spans[0]) spans[0].textContent = subtotal.toFixed(2);
    if (spans[1]) spans[1].textContent = delivery.toFixed(2);
    if (spans[2]) spans[2].textContent = total.toFixed(2);
  }

  // Зберігаємо для сторінки замовлення
  localStorage.setItem("orderSummary", JSON.stringify({
    totalQuantity,
    total
  }));
});

