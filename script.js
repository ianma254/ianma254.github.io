// === 1. Firebase Configuration ===
// Replace with your actual Firebase project config
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

// === 2. Login ===
document.getElementById("loginBtn")?.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password")?.value;

  if (!email || !password) return alert("Please fill in all fields.");

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "home.html";
    })
    .catch(err => {
      alert("Login failed: " + err.message);
    });
});

// === 3. Logout ===
document.getElementById("logoutBtn")?.addEventListener("click", () => {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
});

// === 4. Post Submission ===
document.getElementById("submitPostBtn")?.addEventListener("click", (e) => {
  e.preventDefault();
  const postText = document.getElementById("postText")?.value;

  const user = auth.currentUser;
  if (!user) return alert("Please log in to post.");

  db.collection("posts").add({
    userId: user.uid,
    text: postText,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
    .then(() => {
      alert("Post submitted!");
      document.getElementById("postText").value = "";
      loadPosts(); // Optional: reload posts after submitting
    })
    .catch(err => {
      alert("Failed to post: " + err.message);
    });
});

// === 5. Load Posts on Home Page ===
function loadPosts() {
  const postsContainer = document.getElementById("posts");
  if (!postsContainer) return;

  db.collection("posts").orderBy("timestamp", "desc").get()
    .then(snapshot => {
      postsContainer.innerHTML = "";
      snapshot.forEach(doc => {
        const data = doc.data();
        const postDiv = document.createElement("div");
        postDiv.className = "post";
        postDiv.textContent = data.text;
        postsContainer.appendChild(postDiv);
      });
    });
}

// Auto-load posts if on home.html
if (window.location.pathname.includes("home.html")) {
  auth.onAuthStateChanged(user => {
    if (!user) {
      window.location.href = "login.html";
    } else {
      loadPosts();
    }
  });
}

// === 6. Redirect unauthorized users from protected pages ===
const protectedPages = ["home.html", "messages.html", "profile.html"];
if (protectedPages.some(page => window.location.pathname.includes(page))) {
  auth.onAuthStateChanged(user => {
    if (!user) {
      window.location.href = "login.html";
    }
  });
}

// === 7. Redirect logged-in users away from login page ===
if (window.location.pathname.includes("login.html")) {
  auth.onAuthStateChanged(user => {
    if (user) {
      window.location.href = "home.html";
    }
  });
}
