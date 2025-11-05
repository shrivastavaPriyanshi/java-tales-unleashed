document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const msg = document.getElementById("msg");
  const button = form.querySelector("button");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.textContent = "";
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
      msg.textContent = "Please fill all fields.";
      return;
    }

    button.disabled = true;
    button.style.opacity = 0.7;

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        msg.style.color = "#c8f7c5";
        msg.textContent = "🎉 Registration successful! Redirecting...";
        setTimeout(() => {
          window.location.href = "login.html";
        }, 1500);
      } else {
        msg.style.color = "#ffb3b3";
        msg.textContent = data.message || "Registration failed.";
      }
    } catch (err) {
      console.error(err);
      msg.textContent = "Server error. Please try again later.";
    } finally {
      button.disabled = false;
      button.style.opacity = 1;
    }
  });
});
