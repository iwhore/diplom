document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Збираємо дані з форми
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        alert(result.message);
        form.reset();
      } else {
        alert(result.error || "Сталася помилка");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Не вдалося з’єднатися із сервером");
    }
  });
});
