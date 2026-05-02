const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch("http://localhost:3000/user/logIn", { // نفس اللينك اللي جربتيه في بوست مان
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (response.ok) {
            // حفظ التوكن والـ role في المتصفح
            localStorage.setItem("token", result.token);
            localStorage.setItem("userRole", result.role);

            // التوجيه بناءً على الصلاحية اللي راجعة من السيرفر
            if (result.role === "Admin") {
                window.location.href = "admin-dashboard.html"; // ملفك اللي في الصورة
            } else {
                window.location.href = "index.html";
            }
        } else {
            alert(result.message || "Login failed");
        }
    } catch (error) {
        console.error("Login error:", error);
    }
});
}

const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log("Signup form submitted");

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const phone = document.getElementById('phone').value;
        const age = document.getElementById('age').value;
        const gender = document.getElementById('gender').value;

        console.log("Form data:", { name, email, password, phone, age, gender });

        try {
            const response = await fetch("http://localhost:3000/user/signUp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, phone, age, gender })
            });

            console.log("Response status:", response.status);
            const result = await response.json();
            console.log("Response:", result);

            if (response.ok) {
                alert("User created successfully");
                window.location.href = "login.html";
            } else {
                alert(result.message || "Sign up failed");
            }
        } catch (error) {
            console.error("Sign up error:", error);
            alert("Sign up error: " + error.message);
        }
    });
}
