document.addEventListener("DOMContentLoaded", function () {
    // 🔵 Login Form Handler
    document.getElementById("loginForm")?.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        console.log("Sending Login Request...", { email, password });

        try {
            const response = await fetch("http://localhost:5012/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            console.log("Login Response received:", response);

            const data = await response.json();
            console.log("Login Response Data:", data);

            if (!response.ok) throw new Error(data.msg || "Login Failed");

            localStorage.setItem("token", data.token);
            alert("Login Successful!");
            window.location.href = "dashboard.html";
        } catch (error) {
            console.error("Login Error:", error);
            alert(error.message);
        }
    });

    // 🔵 Register Form Handler
    document.getElementById("registerForm")?.addEventListener("submit", async function (event) {
        event.preventDefault();

        const username = document.querySelector("input[name='username']").value;
        const email = document.querySelector("input[name='email']").value;
        const password = document.querySelector("input[name='password']").value;
        const confirmPassword = document.querySelector("input[name='confirmPassword']").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        console.log("Sending Registration Request...", { username, email });

        try {
            const response = await fetch("http://localhost:5012/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: username, email, password })
            });

            console.log("Register Response received:", response);

            const data = await response.json();
            console.log("Register Response Data:", data);

            if (!response.ok) throw new Error(data.msg || "Registration failed");

            alert("Registration Successful! Please login.");
            window.location.href = "login.html";
        } catch (error) {
            console.error("Register Error:", error);
            alert(error.message);
        }
    });
});
