function showMenu() {
  const target = document.getElementById("burger-icon");
  target.classList.toggle("burger-open");

  const menu = document.getElementById("menu");
  menu.classList.toggle("show-menu");
}

const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  header.style.background =
    window.scrollY > 600 ? "rgba(119, 219, 237, 0.3)" : "transparent";
});
