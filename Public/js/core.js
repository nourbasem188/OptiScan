// دوال OptiScan الخاصة
function getAuthToken() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please login first! 🕶️");
        window.location.href = "login.html";
        return null;
    }
    return token;
}

function updateCartBadge(count) {
    const badge = document.getElementById('cart-count');
    if (badge) badge.innerText = count || 0;
    localStorage.setItem('cartCount', count); // حفظ العدد في localStorage
}

function updateGlobalCartCount() {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch('/cart/ShowCart', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    })
        .then(res => res.json())
        .then(data => {
            // بنشوف الـ ID بتاع العداد في الـ Navbar عندك اسمه إيه (غالباً badge أو cart-count)
            const cartBadge = document.getElementById('cart-count');
            if (data && data.cart && data.cart.products) {
            // التعديل السحري هنا:
            // بنلف على كل منتج ونجمع الـ quantity بتاعته
            const totalQuantity = data.cart.products.reduce((sum, item) => {
                return sum + (item.quantity || 0);
            }, 0);

            // نبعت المجموع الفعلي للـ Badge
            updateCartBadge(totalQuantity); 
        }
        })
        .catch(err => console.error("Error updating cart count:", err));
}

// نادى الدالة دي أول ما الصفحة تفتح
document.addEventListener('DOMContentLoaded', updateGlobalCartCount);

function checkUserLogin() {
    const user = JSON.parse(localStorage.getItem('user'));
    const userNameElement = document.getElementById('nav-user-name');
    if (user && userNameElement) {
        userNameElement.innerText = `Welcome, ${user.name}`;
    }
}

function handleApiError(err) {
    console.error("API Error:", err);
    if (err.message === "Unauthorized") {
        alert("Session expired. Please login again!");
        window.location.href = "login.html";
    }
}

// تنفيذ الدوال فوراً وليس في DOMContentLoaded
// لأن الملف قد يُحمل بعد حدوث الـ event
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        refreshCartCount();
        checkUserLogin();
    });
} else {
    // الـ DOM جاهز بالفعل
    refreshCartCount();
    checkUserLogin();
}