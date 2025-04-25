const loginBtn = document.getElementById("loginBtn");
const username = document.getElementById("username");
const password = document.getElementById("password");
const form = document.getElementById("loginForm");

loginBtn.addEventListener("mouseenter", () => {
  if (!username.value || !password.value) {
    const offsetX = Math.random() * 200 - 100;
    const offsetY = Math.random() * 100 - 50;
    loginBtn.style.position = "absolute";
    loginBtn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Always allow login
  window.location.href = "home.html"; // Will create this page next
});
