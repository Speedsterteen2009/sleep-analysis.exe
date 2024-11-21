document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
  
    if (username && password) {
      let users = JSON.parse(localStorage.getItem("users")) || [];
      
      const userExists = users.some(user => user.username === username);
      if (userExists) {
        document.getElementById("signup-message").textContent = "Username already exists!";
        document.getElementById("signup-message").style.color = "red";
      } else {
        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));
        document.getElementById("signup-message").textContent = "Sign-up successful! Redirecting to login...";
        document.getElementById("signup-message").style.color = "green";
  
        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      }
    } else {
      document.getElementById("signup-message").textContent = "Please fill in all fields.";
      document.getElementById("signup-message").style.color = "red";
    }
  });
  