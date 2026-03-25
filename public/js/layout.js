document.addEventListener("DOMContentLoaded", () => {
    loadSidebar();
});

async function loadSidebar() {
    const container = document.getElementById("sidebar-container");

    if (!container) return;

    try {
        const res = await fetch("/components/sidebar.html");
        const html = await res.text();
        container.innerHTML = html;

        setActiveLink();

    } catch (error) {
        console.error("Error cargando sidebar:", error);
    }
}

function setActiveLink() {
    const currentPage = window.location.pathname.split("/").pop().replace(".html", "");

    const links = document.querySelectorAll(".nav-link");

    links.forEach(link => {
        if (link.dataset.page === currentPage) {
            link.classList.add("active");
        }
    });
}