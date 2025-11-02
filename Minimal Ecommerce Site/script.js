document.addEventListener("DOMContentLoaded", () => {

    const products = [
        { id: 1, name: "Military Style", price: 2499, img: "./Assets/1.webp" },
        { id: 2, name: "Olive Green BagPack", price: 4999, img: "./Assets/2.webp" },
        { id: 3, name: "Vintage Leather", price: 1299, img: "./Assets/3.webp" },
        { id: 4, name: "Urban Edge BagPack", price: 699, img: "./Assets/4.webp" },
        { id: 5, name: "Vintage Leather", price: 399, img: "./Assets/5.webp" },
        { id: 6, name: "Glitter Glam Bag", price: 799, img: "./Assets/6.webp" },
        { id: 7, name: "Midnight Marble", price: 1299, img: "./Assets/7.webp" },
        { id: 8, name: "Rose Maverick", price: 1799, img: "./Assets/8.webp" },
        { id: 9, name: "Olive Adventurer", price: 999, img: "./Assets/9.webp" },
    ];

    const grid = document.getElementById("product-grid");
    const cartBtn = document.querySelector(".cart");
    const cartPanel = document.getElementById("cart-panel");
    const closeCart = document.getElementById("close-cart");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");
    let cart = {};

    function renderProducts() {
        grid.innerHTML = "";
        products.forEach((p) => {
            const div = document.createElement("div");
            div.className = "card";
            div.innerHTML = `
                <img src="${p.img}" alt="${p.name}" loading="lazy">
                <h3>${p.name}</h3>
                <div class="price">₹${p.price}</div>
                <button class="add-btn" data-id="${p.id}">Add to Cart</button>
            `;
            grid.appendChild(div);
        });
    }

    function updateCart() {
        const items = Object.values(cart);
        cartCount.textContent = items.reduce((sum, i) => sum + i.qty, 0);
        cartItems.innerHTML = items.length
            ? items
                .map(
                    (i) =>
                        `<div class="cart-item">
                        <strong>${i.name}</strong> x ${i.qty} = ₹${i.price * i.qty}
                    </div>`
                )
                .join("")
            : "<p>No items in cart</p>";
        const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
        cartTotal.textContent = total.toFixed(2);
    }

    grid.addEventListener("click", (e) => {
        const btn = e.target.closest(".add-btn");
        if (!btn) return;
        const id = parseInt(btn.dataset.id);
        const product = products.find((p) => p.id === id);
        if (!cart[id]) cart[id] = { ...product, qty: 0 };
        cart[id].qty++;
        updateCart();
    });

    cartBtn.addEventListener("click", () => {
        cartPanel.classList.toggle("open");
    });

    closeCart.addEventListener("click", () => {
        cartPanel.classList.remove("open");
    });

    document.getElementById("year").textContent = new Date().getFullYear();

    renderProducts();
    updateCart();


    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 80) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });


    // --- Footer fade-in on scroll ---
    const footer = document.querySelector("footer");

    window.addEventListener("scroll", () => {
        const footerTop = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (footerTop < windowHeight - 100) {
            footer.classList.add("visible");
        }
    });

    // --- Scroll to Top Button ---
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("visible");
        } else {
            scrollTopBtn.classList.remove("visible");
        }
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    // --- Search Bar Toggle + Live Filter ---
    const searchBtn = document.getElementById("search-btn");
    const searchBox = document.querySelector(".search-box");
    const searchInput = document.getElementById("search-input");
    const productGrid = document.getElementById("product-grid");

    if (searchBtn && searchBox && searchInput) {
        searchBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // prevent closing instantly
            searchBox.classList.toggle("active");
            searchInput.focus();
            console.log("🔍 Search button clicked"); // debug log
        });

        document.addEventListener("click", (e) => {
            if (!searchBox.contains(e.target)) {
                searchBox.classList.remove("active");
            }
        });

        searchInput.addEventListener("input", (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = products.filter(p => p.name.toLowerCase().includes(term));

            productGrid.innerHTML = "";
            filtered.forEach(p => {
                const div = document.createElement("div");
                div.className = "card";
                div.innerHTML = `
                    <img src="${p.img}" alt="${p.name}">
                    <h3>${p.name}</h3>
                    <div class="price">₹${p.price}</div>
                    <button class="add-btn" data-id="${p.id}">Add to Cart</button>
                `;
                productGrid.appendChild(div);
            });
        });
        }   else {
                console.error("Search elements not found in DOM");
            }
});
