document.addEventListener('DOMContentLoaded', () => {
  console.log('✔ review.js запущено');

  const form        = document.getElementById('review-form');
  const statusDiv   = document.getElementById('status');
  const stars       = Array.from(document.querySelectorAll('#star-rating span'));
  const ratingInput = document.getElementById('rating');

  if (!form || !statusDiv || stars.length !== 5 || !ratingInput) {
    console.error('❌ review.js: не всі елементи знайдено', { form, statusDiv, stars, ratingInput });
    return;
  }

  // Зірочки
  stars.forEach(star => {
    star.style.cursor = 'pointer';
    star.addEventListener('click', () => {
      const v = Number(star.dataset.value);
      ratingInput.value = v;
      stars.forEach(s => s.textContent = Number(s.dataset.value) <= v ? '★' : '☆');
    });
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    console.log('▶ review-form submit');

    const fd = new FormData(form);
    const payload = {
      name:    fd.get('name').trim(),
      email:   fd.get('email').trim(),
      rating:  Number(fd.get('rating')),
      message: fd.get('message').trim()
    };
    console.log('→ payload', payload);

    if (!payload.name || !payload.email || !payload.rating || !payload.message) {
      statusDiv.style.color = 'red';
      statusDiv.textContent = 'Усі поля обовʼязкові й рейтинг мусить бути > 0';
      return;
    }

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      console.log('↩ /api/reviews', res.status, json);
      if (res.ok) {
        statusDiv.style.color = 'green';
        statusDiv.textContent = json.message || 'Готово!';
        form.reset();
        stars.forEach(s => s.textContent = '☆');
      } else {
        statusDiv.style.color = 'red';
        statusDiv.textContent = json.error || 'Помилка сервера';
      }
    } catch (err) {
      console.error('❌ Fetch error:', err);
      statusDiv.style.color = 'red';
      statusDiv.textContent = 'Не вдалося звʼязатися з сервером';
    }
  });
});