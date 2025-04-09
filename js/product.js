document.querySelector('.btn-add-cart').addEventListener('click', () => {
    const name = document.querySelector('.product-name').textContent;
    const price = parseFloat(document.querySelector('.product-price').textContent);
    const quantity = parseInt(document.querySelector('.quantity-value').textContent);
    const colorInput = document.querySelector('input[name="color"]:checked');
    const color = colorInput ? colorInput.value : 'Не вибрано';
    const image = document.querySelector('.product-main-image img')?.getAttribute('src') || '';
  
    const product = {
      id: Date.now(),
      name,
      price,
      quantity,
      color,
      image
    };
  
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'basket.html';
  });