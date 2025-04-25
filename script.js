const loginBtn = document.getElementById("loginBtn");
const username = document.getElementById("username");
const password = document.getElementById("password");
const form = document.getElementById("loginForm");

loginBtn.addEventListener("mouseenter", (e) => {
  if (username.value === "" || password.value === "") {
    const parent = loginBtn.parentElement;
    loginBtn.style.position = "absolute";
    const offsetX = Math.random() * 200 - 100;
    const offsetY = Math.random() * 100 - 50;
    loginBtn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (username.value && password.value) {
    alert("Login successful! (Fake for now 😄)");
  } else {
    alert("Please fill in all fields.");
  }
});
