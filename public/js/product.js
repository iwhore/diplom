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
      const image = document.querySelector(".product-main-image img")?.getAttribute("src") || "";

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