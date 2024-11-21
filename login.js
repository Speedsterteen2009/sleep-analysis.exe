const users = [{ username: "testuser", password: "password123" }, { username: "admin", password: "admin123" }];

document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "index.html";
  } else {
    document.getElementById("error-message").textContent = "Invalid username or password!";
  }
});
