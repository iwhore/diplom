document.addEventListener('DOMContentLoaded', () => {
  const minusBtn = document.querySelector(".quantity-btn.minus");
  const plusBtn = document.querySelector(".quantity-btn.plus");
  const quantityDisplay = document.querySelector(".quantity-value");
  const colorInputs = document.querySelectorAll('input[name="color"]');
  const currentColorText = document.getElementById("current-color");
  const addToCartBtn = document.querySelector('.btn-add-cart');
  const addToFavoriteBtn = document.querySelector('.btn-favorite');

  let quantity = parseInt(quantityDisplay.textContent);

  // Зміна кількості
  minusBtn.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      quantityDisplay.textContent = quantity;
    }
  });

  plusBtn.addEventListener("click", () => {
    quantity++;
    quantityDisplay.textContent = quantity;
  });

  // Відображення обраного кольору
  colorInputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (input.checked) {
        currentColorText.textContent = input.value;
      }
    });
  });

  // ✅ Додавання до кошика
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      const nameFull = document.querySelector(".product-name").textContent.trim();
      const name = nameFull.split(" ").slice(0, 2).join(" ");
      const priceRaw = document.querySelector(".product-price").textContent.trim();
      const price = parseFloat(priceRaw.replace(/\s/g, ""));
      const quantity = parseInt(document.querySelector(".quantity-value").textContent);
      const colorInput = document.querySelector('input[name="color"]:checked');
      const color = colorInput ? colorInput.value : "Не вибрано";
      const image = document.querySelector(".basket img")?.getAttribute("src") || "";

      const product = {
        id: Date.now(),
        name,
        price,
        quantity,
        color,
        image,
      };

      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.href = "basket.html";
    });
  }

  // ✅ Додавання до обраного
  if (addToFavoriteBtn) {
    addToFavoriteBtn.addEventListener("click", () => {
      const fullName = document.querySelector('.product-name').textContent.trim();
      const shortName = fullName.split(" ").slice(0, 2).join(" ");
      const rawPrice = document.querySelector('.product-price').textContent.trim();
      const price = rawPrice.replace(/\s/g, '');
      const colorInput = document.querySelector('input[name="color"]:checked');
      const color = colorInput ? colorInput.value : 'Не вибрано';
      const image = document.querySelector('.product-main-image img')?.getAttribute('src') || '';

      const today = new Date();
      const months = ["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"];
      const formattedDate = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;

      const favoriteItem = {
        name: shortName,
        color,
        price,
        date: formattedDate,
        image
      };

      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      favorites.push(favoriteItem);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      window.location.href = "favorites.html";
    });
  }
});

window.addEventListener('DOMContentLoaded', () => {
  // Слайдер відгуків
  const slidesContainer = document.getElementById('slides-container');
  const prevButton = document.getElementById('prev-btn');
  const nextButton = document.getElementById('next-btn');
  let currentSlide = 0;
  function showSlide(index) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const total = slides.length;
    if (index >= total) currentSlide = 0;
    else if (index < 0) currentSlide = total - 1;
    else currentSlide = index;
    slidesContainer.style.transform = `translateX(${-currentSlide * 100}%)`;
  }

    if (slidesContainer) {
    function showSlide(index) {
      const slides = document.querySelectorAll('.testimonial-slide');
      const total  = slides.length;

      if (index >= total)      currentSlide = 0;
      else if (index < 0)      currentSlide = total - 1;
      else                     currentSlide = index;

      // Виправлена рядкова інтерполяція без зайвої дужки чи крапки-зап’ятої всередині шаблону
      slidesContainer.style.transform = `translateX(${-currentSlide * 100}%)`;
    }

    prevButton?.addEventListener('click', () => showSlide(currentSlide - 1));
    nextButton?.addEventListener('click', () => showSlide(currentSlide + 1));
    showSlide(currentSlide);
  }
  
  prevButton?.addEventListener('click', () => showSlide(currentSlide - 1));
  nextButton?.addEventListener('click', () => showSlide(currentSlide + 1));
  showSlide(currentSlide);

  // Таби
  document.querySelectorAll('.tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });

  // Рейтинг зірками
  const stars = document.querySelectorAll('#star-rating span');
  const ratingInput = document.getElementById('rating');
  let selectedStars = 0;
  function updateStars() {
    stars.forEach(star => {
      const val = Number(star.dataset.value);
      star.textContent = val <= selectedStars ? '★' : '☆';
      star.classList.toggle('active', val <= selectedStars);
    });
  }
  stars.forEach(star => {
    star.addEventListener('mouseover', () => {
      const hoverVal = Number(star.dataset.value);
      stars.forEach(s => s.textContent = Number(s.dataset.value) <= hoverVal ? '★' : '☆');
    });
    star.addEventListener('mouseout', updateStars);
    star.addEventListener('click', () => {
      selectedStars = Number(star.dataset.value);
      ratingInput.value = selectedStars;
      updateStars();
    });
  });

  // Відправка форми
  const form = document.getElementById('review-form');
  const status = document.getElementById('status');
  const productId = document.getElementById('productId').value;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    status.textContent = 'Надсилання...';
    const data = {
      productId,
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      rating: selectedStars,
      message: form.message.value.trim()
    };
    if (!data.name || !data.email || !data.message || data.rating < 1) {
      alert('Будь ласка, заповніть всі поля та оберіть оцінку.');
      status.textContent = '';
      return;
    }
    try {
      const resp = await fetch(`/api/reviews/${productId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await resp.json();
      if (resp.ok) {
        alert('✅ Відгук успішно надіслано!');
        status.textContent = '';
        form.reset();
        selectedStars = 0;
        updateStars();
        // Додаємо новий слайд
        const slide = document.createElement('div');
        slide.classList.add('testimonial-slide');
        slide.innerHTML = `
          <p class="testimonial-quote">“${data.message}”</p>
          <div class="testimonial-author">${data.name}</div>
          <div class="testimonial-stars">${'★'.repeat(data.rating)}${'☆'.repeat(5 - data.rating)}</div>
        `;
        slidesContainer.appendChild(slide);
      } else {
        alert(`❌ Помилка: ${result.error || 'Спробуйте пізніше'}`);
        status.textContent = '';
      }
    } catch (err) {
      console.error(err);
      alert('❌ Виникла помилка при надсиланні відгуку');
      status.textContent = '';
    }
  });
});