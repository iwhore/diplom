document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('order-form');
  if (!form) {
    console.error('order.js: не знайдено форму #order-form');
    return;
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    console.log('order.js: submit форми');

    // 1) Збираємо дані
    const name      = form.querySelector('#name').value.trim();
    const surname   = form.querySelector('#surname').value.trim();
    const phone     = form.querySelector('#phone').value.trim();
    const email     = form.querySelector('#email').value.trim();
    const city      = form.querySelector('#city').value.trim();
    const address   = form.querySelector('#address').value.trim();
    const index     = form.querySelector('#index').value.trim();
    const payment   = form.querySelector('input[name="payment"]:checked')?.value;
    console.log({ name, surname, phone, email, city, address, index, payment });

    if (!payment) {
      return alert('Оберіть метод оплати');
    }

    // 2) Поля картки
    let cardholder = '', cardNumber = '', expiryDate = '', ccv = '';
    if (payment === 'card') {
      cardholder  = form.querySelector('#cardholder-name').value.trim();
      cardNumber  = form.querySelector('#card-number').value.trim();
      expiryDate  = form.querySelector('#expiry-date').value.trim();
      ccv         = form.querySelector('#ccv').value.trim();
      console.log({ cardholder, cardNumber, expiryDate, ccv });
    }

    // 3) Валідація мінімальна
    if (!name||!surname||!phone||!email||!city||!address||!index ||
        (payment==='card' && (!cardholder||!cardNumber||!expiryDate||!ccv))) {
      return alert('Заповніть усі поля');
    }

    // 4) Підрахунок сум з localStorage
    const summary = JSON.parse(localStorage.getItem('orderSummary')||'{}');
    console.log('orderSummary:', summary);
    if (!summary.subtotal) {
      console.warn('orderSummary не знайдено або subtotal==0');
    }

    // 5) Формуємо payload
    const payload = {
      name, surname, phone, email, city, address, index,
      payment, cardholder, cardNumber, expiryDate, ccv,
      totalSum: summary.subtotal, shipping: summary.delivery, grandTotal: summary.total,
      cartItems: JSON.parse(localStorage.getItem('cart')||'[]')
    };
    console.log('payload →', payload);

    // 6) Відправка
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(payload)
      });
      console.log('fetch /api/order status:', res.status);
      const data = await res.text();    // спочатку текст, щоб побачити HTML
      console.log('fetch /api/order text response:', data);

      // спробуємо розібрати JSON
      let json;
      try {
        json = JSON.parse(data);
      } catch(parseErr) {
        console.error('Не JSON у відповіді:', parseErr);
        return alert('Отримано некоректну відповідь від сервера');
      }

      if (!res.ok) {
        return alert(json.error || 'Сервер повернув помилку');
      }
      alert(json.message || 'ОК!');
      form.reset();
      setTimeout(() => location.href='/confirmation.html', 1500);
    } catch (err) {
      console.error('fetch error:', err);
      alert('Не вдалося зв’язатися із сервером');
    }
  });
});