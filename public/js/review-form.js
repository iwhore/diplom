document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("review-form");
  const status = document.getElementById("status");
  const productIdEl = document.getElementById("productId");
  const stars = document.querySelectorAll("#star-rating span");
  const ratingInput = document.getElementById("rating");

  if (!form || !status || !productIdEl) return;

  // ——— Рейтинг зірками
  let selectedStars = 0;
  function updateStars(rating = selectedStars) {
    stars.forEach((s) => {
      const v = Number(s.dataset.value);
      s.textContent = v <= rating ? "★" : "☆";
      s.classList.toggle("active", v <= rating);
    });
  }
  stars.forEach((s) => {
    s.addEventListener("mouseover", () => updateStars(Number(s.dataset.value)));
    s.addEventListener("mouseout", () => updateStars());
    s.addEventListener("click", () => {
      selectedStars = Number(s.dataset.value);
      ratingInput.value = selectedStars;
      updateStars();
    });
  });
  updateStars();

  // ——— Сабміт форми
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "Надсилання…";
    status.className = "";

    const payload = {
      productId: productIdEl.value,
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      rating: selectedStars,
      message: form.message.value.trim(),
    };

    if (
      !payload.name ||
      !payload.email ||
      !payload.message ||
      payload.rating < 1
    ) {
      status.textContent = "Будь ласка, заповніть усі поля та оберіть оцінку.";
      status.classList.add("error");
      return setTimeout(() => location.reload(), 2000);
    }

    try {
      const res = await fetch(`/api/reviews/${payload.productId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (res.ok) {
        status.textContent = "✅ Відгук успішно надіслано!";
        status.classList.add("success");
      } else {
        status.textContent = `❌ Помилка: ${json.error || "Спробуйте пізніше"}`;
        status.classList.add("error");
      }
    } catch (err) {
      status.textContent = "❌ Помилка мережі. Спробуйте пізніше.";
      status.classList.add("error");
    } finally {
      // Через 2 секунди перезавантажуємо сторінку
      setTimeout(() => location.reload(), 2000);
    }
  });
});
