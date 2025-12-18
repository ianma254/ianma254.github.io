// === Firebase Config ===
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// === UI Elements ===
const loginBtn = document.getElementById("loginBtn");
const statusText = document.getElementById("statusText");

loginBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    animateStatus("Fill all fields 🌠", "error");
    return;
  }

  animateStatus("Connecting to the universe...", "loading");

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      animateStatus("Welcome back ✨", "success");
      setTimeout(() => {
        window.location.href = "home.html";
      }, 1200);
    })
    .catch(err => {
      animateStatus(err.message, "error");
    });
});

// === Animated Status Text ===
function animateStatus(text, type) {
  statusText.textContent = text;
  statusText.className = "status " + type;
}

