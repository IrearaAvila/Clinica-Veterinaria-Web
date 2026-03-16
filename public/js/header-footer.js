document.addEventListener("DOMContentLoaded", async () => {

  const headerContainer = document.getElementById("header-container");

  if (headerContainer) {

    const response = await fetch("/components/header.html");
    const headerHTML = await response.text();

    headerContainer.innerHTML = headerHTML;

    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {

      logoutBtn.addEventListener("click", async () => {

        await fetch("/api/auth/logout", {
          method: "POST"
        });

        window.location.href = "/login.html";

      });

    }

  }

  const footerContainer = document.getElementById("footer-container");

  if (footerContainer) {

    const response = await fetch("/components/footer.html");
    const footerHTML = await response.text();

    footerContainer.innerHTML = footerHTML;

  }

});