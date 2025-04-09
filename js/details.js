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
    if (!name || !surname || !phone || !email || !city || !address || !index || !card || !cardName || !expDate || !ccv) {
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