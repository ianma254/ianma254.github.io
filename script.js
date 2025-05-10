// === Firebase Configuration ===
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
const db = firebase.firestore();

// === Global Button Event Handlers ===
window.addEventListener('DOMContentLoaded', () => {

  // Login Button
  document.getElementById("loginBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("email")?.value;
    const password = document.getElementById("password")?.value;

    if (!email || !password) return alert("Please fill in all fields.");

    auth.signInWithEmailAndPassword(email, password)
      .then(() => window.location.href = "home.html")
      .catch(err => alert("Login failed: " + err.message));
  });

  // Logout Button
  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    auth.signOut().then(() => window.location.href = "login.html");
  });

  // Submit Post Button
  document.getElementById("submitPostBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    const postText = document.getElementById("postText")?.value;
    const user = auth.currentUser;
    if (!user) return alert("Please log in to post.");

    db.collection("posts").add({
      userId: user.uid,
      text: postText,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      alert("Post submitted!");
      document.getElementById("postText").value = "";
      loadPosts();
    }).catch(err => alert("Failed to post: " + err.message));
  });

  // Send Message Button
  document.getElementById("sendMsgBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    const msg = document.getElementById("messageText")?.value;
    const user = auth.currentUser;
    if (!user) return alert("Login required.");

    db.collection("messages").add({
      userId: user.uid,
      message: msg,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      alert("Message sent!");
      document.getElementById("messageText").value = "";
      loadMessages();
    }).catch(err => alert("Failed to send message."));
  });

  // Home Navigation Buttons
  document.querySelectorAll(".goHomeBtn").forEach(btn => {
    btn.addEventListener("click", () => window.location.href = "home.html");
  });

  // Load posts or messages based on current page
  const pathname = window.location.pathname;
  if (pathname.includes("home.html")) {
    auth.onAuthStateChanged(user => {
      if (!user) return window.location.href = "login.html";
      loadPosts();
    });
  }

  if (pathname.includes("messages.html")) {
    auth.onAuthStateChanged(user => {
      if (!user) return window.location.href = "login.html";
      loadMessages();
    });
  }

  // Redirect if logged in on login page
  if (pathname.includes("login.html")) {
    auth.onAuthStateChanged(user => {
      if (user) window.location.href = "home.html";
    });
  }
});

// === Load Posts ===
function loadPosts() {
  const container = document.getElementById("posts");
  if (!container) return;
  db.collection("posts").orderBy("timestamp", "desc").get()
    .then(snapshot => {
      container.innerHTML = "";
      snapshot.forEach(doc => {
        const div = document.createElement("div");
        div.className = "post";
        div.textContent = doc.data().text;
        container.appendChild(div);
      });
    });
}

// === Load Messages ===
function loadMessages() {
  const container = document.getElementById("messages");
  if (!container) return;
  db.collection("messages").orderBy("timestamp", "desc").get()
    .then(snapshot => {
      container.innerHTML = "";
      snapshot.forEach(doc => {
        const div = document.createElement("div");
        div.className = "message";
        div.textContent = doc.data().message;
        container.appendChild(div);
      });
    });
}
