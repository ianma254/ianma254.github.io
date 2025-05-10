let currentUser = '';

function login() {
  const username = document.getElementById('usernameInput').value.trim();
  if (username === '') {
    alert('Please enter your name.');
    return;
  }
  currentUser = username;
  document.getElementById('loginSection').classList.add('hidden');
  document.getElementById('mainApp').classList.remove('hidden');
}

function postTweet() {
  const tweetText = document.getElementById('tweetInput').value.trim();
  if (tweetText === '') {
    alert('Write something!');
    return;
  }

  const tweet = document.createElement('div');
  tweet.className = 'tweet';
  tweet.innerHTML = `
    <strong>@${currentUser}</strong><br/>
    <p>${tweetText}</p>
    <button onclick="likeTweet(this)">Like</button>
    <span>0</span>
  `;
  document.getElementById('feed').prepend(tweet);
  document.getElementById('tweetInput').value = '';
}

function likeTweet(btn) {
  const span = btn.nextElementSibling;
  let count = parseInt(span.innerText);
  count += 1;
  span.innerText = count;
}
