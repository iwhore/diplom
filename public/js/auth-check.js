document.addEventListener("DOMContentLoaded", function () {
    const user = localStorage.getItem("userName");
  
    if (user) {
      const authLinks = document.getElementById("auth-links");
      if (authLinks) {
        const newLink = document.createElement("div");
        newLink.className = "icon-link";
        newLink.innerHTML = `
          <a href="./personalinfo.html">
            <img src="./images/icon-user.svg" alt="Особистий кабінет" />
          </a>
        `;
        authLinks.replaceWith(newLink);
      }
    }
  });