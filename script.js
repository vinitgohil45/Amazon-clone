// Product database for Quick View Modals
const productDetails = {
    "box1": {
        id: "box1",
        title: "Deals in PCs & Accessories",
        price: "499.99",
        rating: "4.8 ★★★★☆ (2,450 reviews)",
        image: "pc-img.jpg",
        description: "Upgrade your workspace with premium high-performance desktop computers, monitors, mechanical keyboards, and gaming accessories. Fast performance meets reliability."
    },
    "box2": {
        id: "box2",
        title: "Toys & Games under $25",
        price: "19.99",
        rating: "4.7 ★★★★☆ (1,890 reviews)",
        image: "toy.jpg",
        description: "Explore top-rated board games, action figures, educational toys, and creative play kits. Fun and engagement for kids of all ages at budget-friendly prices."
    },
    "box3": {
        id: "box3",
        title: "Shop Deals in Shoes",
        price: "89.95",
        rating: "4.9 ★★★★★ (4,120 reviews)",
        image: "Nike-Louis-Vuitton-2.webp",
        description: "Step into style with limited edition designer athletic shoes and casual sneakers. Offers ultimate comfort, breathability, and premium aesthetic appeal."
    },
    "box4": {
        id: "box4",
        title: "Gift Ideas in Men's Wrist Watches",
        price: "124.50",
        rating: "4.6 ★★★★☆ (980 reviews)",
        image: "watch.jpg",
        description: "Classic analog and digital timepieces crafted with leather straps, water resistance, and luxury design. The perfect gift for formal wear or daily sophistication."
    },
    "box5": {
        id: "box5",
        title: "Premium Apparel & Clothes",
        price: "34.99",
        rating: "4.4 ★★★★☆ (3,110 reviews)",
        image: "box1_image.jpg",
        description: "Comfortable and stylish daily wear collection. Made from premium quality breathable cotton, perfect for casual outings and seasonal comfort."
    },
    "box6": {
        id: "box6",
        title: "Advanced Dental Kits",
        price: "29.99",
        rating: "4.5 ★★★★☆ (1,560 reviews)",
        image: "box2_image.jpg",
        description: "Complete professional dental hygiene set with sonic toothbrushes, charcoal flossing tools, and plaque removal kits. Keep your smile bright and healthy."
    },
    "box7": {
        id: "box7",
        title: "Modern Home Décor",
        price: "45.00",
        rating: "4.7 ★★★★☆ (2,300 reviews)",
        image: "home.jpg",
        description: "Elegant modern home styling pieces, cozy throw pillows, artistic lamps, and organizers. Bring a warm, contemporary vibe to any living room or bedroom."
    },
    "box8": {
        id: "box8",
        title: "New Mobile Launch in 2024",
        price: "799.00",
        rating: "4.8 ★★★★☆ (850 reviews)",
        image: "phone",
        description: "Experience the next generation with our latest smartphone. Features an ultra-clear high refresh rate screen, long-lasting battery, and advanced AI triple camera."
    },
    "box9": {
        id: "box9",
        title: "Gaming Accessories Pack",
        price: "69.99",
        rating: "4.6 ★★★★☆ (1,150 reviews)",
        image: "gaming",
        description: "Immersive pro gaming bundle including a RGB-lit mouse, responsive headset, and durable tracking mousepad. Get the competitive edge today."
    },
    "box10": {
        id: "box10",
        title: "Fantastic Finds for Home",
        price: "15.99",
        rating: "4.3 ★★★★☆ (670 reviews)",
        image: "box3_image.jpg",
        description: "Discover functional kitchen organizers, aesthetic wall art, and practical storage solutions designed to simplify your home routine."
    },
    "box11": {
        id: "box11",
        title: "Best in Beauty Products",
        price: "24.95",
        rating: "4.7 ★★★★☆ (3,400 reviews)",
        image: "box5_image.jpg",
        description: "Organic skin care oils, premium cosmetics, and makeup blends crafted from clean ingredients. Rejuvenate your skin and highlight your natural glow."
    },
    "box12": {
        id: "box12",
        title: "Best Sellers in Cell Phones Accessories",
        price: "12.99",
        rating: "4.5 ★★★★☆ (5,210 reviews)",
        image: "mobile accessories.jpg",
        description: "Keep your devices safe and powered up with durable shockproof phone cases, fast wireless chargers, and anti-glare screen protectors."
    }
};

// Search suggestions list
const searchSuggestionsList = [
    "deals in pcs",
    "toys under $25",
    "shoes and sneakers",
    "wrist watches",
    "cloths and apparel",
    "dental kits",
    "home decor",
    "gaming accessories",
    "beauty products",
    "mobile accessories",
    "cell phones"
];

// Global State
let cart = []; // Array of cart items: { id, title, price, image, quantity }
const heroImages = ["hero_image2.jgp.jpg", "hero_image.jpg"];
let currentHeroIndex = 0;

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    setupHeroSlider();
    setupCartAndDrawer();
    setupSearchSuggestions();
    setupSearchFilter();
    setupProductModals();
    setupSmoothScroll();
    setupCarouselScroll();
});

// 1. Dynamic Hero Slider
function setupHeroSlider() {
    const heroSection = document.querySelector(".hero-section");
    if (!heroSection) return;

    // Create left and right slider buttons
    const leftBtn = document.createElement("button");
    leftBtn.className = "hero-slider-btn prev";
    leftBtn.innerHTML = '<i class="fa-solid fa-angle-left"></i>';

    const rightBtn = document.createElement("button");
    rightBtn.className = "hero-slider-btn next";
    rightBtn.innerHTML = '<i class="fa-solid fa-angle-right"></i>';

    heroSection.appendChild(leftBtn);
    heroSection.appendChild(rightBtn);

    const updateTheme = () => {
        const activeImg = heroImages[currentHeroIndex];
        if (activeImg === "hero_image2.jgp.jpg") {
            document.body.classList.add("dark-bg-theme");
        } else {
            document.body.classList.remove("dark-bg-theme");
        }
    };

    const changeHero = (direction) => {
        if (direction === "next") {
            currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;
        } else {
            currentHeroIndex = (currentHeroIndex - 1 + heroImages.length) % heroImages.length;
        }
        heroSection.style.backgroundImage = `url('${heroImages[currentHeroIndex]}')`;
        updateTheme();
    };

    leftBtn.addEventListener("click", () => changeHero("prev"));
    rightBtn.addEventListener("click", () => changeHero("next"));

    // Set initial theme
    updateTheme();

    // Auto-slide every 8 seconds
    setInterval(() => changeHero("next"), 8000);
}

// 2. Sliding Cart Drawer & State Management
function setupCartAndDrawer() {
    const navCart = document.querySelector(".nav-cart");
    const cartDrawer = document.getElementById("cart-drawer");
    const cartOverlay = document.getElementById("cart-drawer-overlay");
    const closeCartBtn = document.getElementById("close-cart-drawer");

    // Initialize HTML layout of nav cart
    if (navCart) {
        navCart.innerHTML = `
            <div class="cart-icon-wrapper">
                <span id="cart-count">0</span>
                <i class="fa-duotone fa-solid fa-cart-shopping"></i>
            </div>
            Cart
        `;
        // Open drawer on cart click
        navCart.addEventListener("click", () => {
            openCartDrawer();
        });
    }

    // Close drawer handlers
    if (closeCartBtn) {
        closeCartBtn.addEventListener("click", closeCartDrawer);
    }
    if (cartOverlay) {
        cartOverlay.addEventListener("click", closeCartDrawer);
    }

    // Add dynamically generated Toast container
    const toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    document.body.appendChild(toastContainer);

    // Global listener for card Add to Cart buttons
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-to-cart-btn")) {
            e.stopPropagation();
            const box = e.target.closest(".box");
            if (!box) return;

            let productKey = "";
            for (let i = 1; i <= 12; i++) {
                if (box.classList.contains(`box${i}`)) {
                    productKey = `box${i}`;
                    break;
                }
            }
            const data = productDetails[productKey];
            if (data) {
                addItemToCart(data.id, data.title, data.price, data.image);
            }
        }

        // Listener for carousel Add to Cart buttons
        if (e.target.classList.contains("carousel-add-btn")) {
            e.stopPropagation();
            const id = e.target.getAttribute("data-product-id");
            const name = e.target.getAttribute("data-product-name");
            const price = e.target.getAttribute("data-product-price");
            const img = e.target.getAttribute("data-product-img");
            addItemToCart(id, name, price, img);
        }
    });
}

function openCartDrawer() {
    const drawer = document.getElementById("cart-drawer");
    const overlay = document.getElementById("cart-drawer-overlay");
    if (drawer && overlay) {
        drawer.classList.add("open");
        overlay.classList.add("open");
    }
}

function closeCartDrawer() {
    const drawer = document.getElementById("cart-drawer");
    const overlay = document.getElementById("cart-drawer-overlay");
    if (drawer && overlay) {
        drawer.classList.remove("open");
        overlay.classList.remove("open");
    }
}

function addItemToCart(id, title, price, image) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, title, price: parseFloat(price), image, quantity: 1 });
    }
    
    updateCartDOM();
    showToast(`Added "${title}" to Cart! 🛒`);
    openCartDrawer();
}

function updateCartDOM() {
    const countBadge = document.getElementById("cart-count");
    const drawerItems = document.getElementById("cart-drawer-items");
    const subtotalEl = document.getElementById("cart-subtotal-val");

    // Calculate totals
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Update Navbar Badge
    if (countBadge) {
        countBadge.textContent = totalCount;
        countBadge.classList.remove("bump");
        void countBadge.offsetWidth; // trigger reflow
        countBadge.classList.add("bump");
    }

    // Update Subtotal text
    if (subtotalEl) {
        subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    }

    // Render items list
    if (!drawerItems) return;
    if (cart.length === 0) {
        drawerItems.innerHTML = `<p class="empty-cart-msg">Your cart is empty.</p>`;
        return;
    }

    drawerItems.innerHTML = cart.map(item => `
        <div class="cart-item-row" data-id="${item.id}">
            <div class="cart-item-img" style="background-image: url('${item.image}')"></div>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-qty-control">
                    <button class="cart-item-qty-btn minus" onclick="changeQty('${item.id}', -1)">-</button>
                    <span class="cart-item-qty-val">${item.quantity}</span>
                    <button class="cart-item-qty-btn plus" onclick="changeQty('${item.id}', 1)">+</button>
                </div>
                <button class="cart-item-remove-btn" onclick="removeFromCart('${item.id}')">Delete</button>
            </div>
        </div>
    `).join("");
}

// Global functions for inline HTML button triggers
window.changeQty = (id, amt) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.quantity += amt;
    if (item.quantity <= 0) {
        removeFromCart(id);
    } else {
        updateCartDOM();
    }
};

window.removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    updateCartDOM();
};

function showToast(message) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fa-solid fa-circle-check" style="color: #4caf50; margin-right: 8px;"></i>
            <span>${message}</span>
        </div>
    `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("fade-out");
        toast.addEventListener("transitionend", () => toast.remove());
    }, 2500);
}

// 3. Search Bar Auto-Suggestions Dropdown
function setupSearchSuggestions() {
    const searchInput = document.querySelector(".search-input");
    const suggestionsDropdown = document.getElementById("search-suggestions");

    if (!searchInput || !suggestionsDropdown) return;

    const positionDropdown = () => {
        const rect = searchInput.getBoundingClientRect();
        suggestionsDropdown.style.left = `${rect.left + window.scrollX}px`;
        suggestionsDropdown.style.top = `${rect.bottom + window.scrollY}px`;
        suggestionsDropdown.style.width = `${rect.width}px`;
    };

    const showSuggestions = () => {
        const query = searchInput.value.toLowerCase().trim();
        const filtered = searchSuggestionsList.filter(item => item.includes(query));

        if (filtered.length === 0) {
            suggestionsDropdown.style.display = "none";
            return;
        }

        suggestionsDropdown.innerHTML = filtered.map(item => `
            <div class="suggestion-item" data-value="${item}">
                <i class="fa-solid fa-magnifying-glass"></i>
                <span>${item}</span>
            </div>
        `).join("");

        positionDropdown();
        suggestionsDropdown.style.display = "block";
    };

    // Update positions on resize
    window.addEventListener("resize", positionDropdown);

    searchInput.addEventListener("focus", showSuggestions);
    searchInput.addEventListener("input", showSuggestions);

    // Hide dropdown on click outside
    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !suggestionsDropdown.contains(e.target)) {
            suggestionsDropdown.style.display = "none";
        }
    });

    // Suggestion selection
    suggestionsDropdown.addEventListener("click", (e) => {
        const item = e.target.closest(".suggestion-item");
        if (item) {
            const val = item.getAttribute("data-value");
            searchInput.value = val;
            suggestionsDropdown.style.display = "none";
            
            // Trigger search filter
            searchInput.dispatchEvent(new Event("input"));
        }
    });
}

// 4. Search and Filter Feature
function setupSearchFilter() {
    const searchInput = document.querySelector(".search-input");
    const searchIcon = document.querySelector(".search-icon");
    const selectElement = document.querySelector(".Search-select");

    if (!searchInput) return;

    const filterProducts = () => {
        const query = searchInput.value.toLowerCase().trim();
        const cards = document.querySelectorAll(".shop-section .box");

        let matchesFound = 0;

        cards.forEach((card) => {
            const title = card.querySelector("h2").textContent.toLowerCase();
            const matchesQuery = query === "" || title.includes(query);
            
            if (matchesQuery) {
                card.style.display = "block";
                card.style.opacity = "1";
                card.style.transform = "scale(1)";
                matchesFound++;
            } else {
                card.style.opacity = "0";
                card.style.transform = "scale(0.95)";
                setTimeout(() => {
                    if (card.style.opacity === "0") {
                        card.style.display = "none";
                    }
                }, 200);
            }
        });

        // Add feedback message if no products match
        let feedbackMessage = document.getElementById("search-feedback");
        if (matchesFound === 0) {
            if (!feedbackMessage) {
                feedbackMessage = document.createElement("div");
                feedbackMessage.id = "search-feedback";
                feedbackMessage.style.width = "100%";
                feedbackMessage.style.textAlign = "center";
                feedbackMessage.style.padding = "40px";
                feedbackMessage.style.fontSize = "1.2rem";
                feedbackMessage.style.color = "#555";
                document.querySelector(".shop-section").appendChild(feedbackMessage);
            }
            feedbackMessage.innerHTML = `No products found matching "<strong>${searchInput.value}</strong>". Try another search!`;
        } else if (feedbackMessage) {
            feedbackMessage.remove();
        }
    };

    searchInput.addEventListener("input", filterProducts);
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            filterProducts();
        }
    });
    if (searchIcon) {
        searchIcon.addEventListener("click", filterProducts);
    }
}

// 5. Product Modal (Quick View)
function setupProductModals() {
    let modal = document.getElementById("product-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "product-modal";
        modal.className = "modal";
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-body-layout">
                    <div class="modal-img-col">
                        <div id="modal-product-img"></div>
                    </div>
                    <div class="modal-info-col">
                        <h2 id="modal-product-title">Product Title</h2>
                        <div id="modal-product-rating" class="modal-rating">★★★★☆</div>
                        <div id="modal-product-price" class="modal-price">$0.00</div>
                        <p id="modal-product-desc">Product detailed description goes here...</p>
                        <button id="modal-add-to-cart-btn" class="modal-action-btn">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    const closeModal = modal.querySelector(".close-modal");
    
    closeModal.addEventListener("click", () => {
        modal.classList.remove("show");
    });
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });

    const cards = document.querySelectorAll(".shop-section .box");
    cards.forEach((card) => {
        let productKey = "";
        for (let i = 1; i <= 12; i++) {
            if (card.classList.contains(`box${i}`)) {
                productKey = `box${i}`;
                break;
            }
        }

        const data = productDetails[productKey];
        if (!data) return;

        // Append Add to Cart button to the card content if not already there
        const boxContent = card.querySelector(".box-content");
        if (boxContent && !boxContent.querySelector(".add-to-cart-btn")) {
            const btn = document.createElement("button");
            btn.className = "add-to-cart-btn";
            btn.textContent = "Add to Cart";
            boxContent.appendChild(btn);
        }

        const clickTargets = [
            card.querySelector("h2"),
            card.querySelector(".box-img"),
            card.querySelector("p")
        ];

        clickTargets.forEach(target => {
            if (target) {
                target.style.cursor = "pointer";
                target.addEventListener("click", (e) => {
                    e.preventDefault();
                    openQuickView(data);
                });
            }
        });
    });
}

function openQuickView(productData) {
    const modal = document.getElementById("product-modal");
    if (!modal) return;

    document.getElementById("modal-product-title").textContent = productData.title;
    document.getElementById("modal-product-rating").textContent = productData.rating;
    document.getElementById("modal-product-price").textContent = `$${parseFloat(productData.price).toFixed(2)}`;
    document.getElementById("modal-product-desc").textContent = productData.description;
    
    const imgEl = document.getElementById("modal-product-img");
    imgEl.style.backgroundImage = `url('${productData.image}')`;

    const modalAddBtn = document.getElementById("modal-add-to-cart-btn");
    modalAddBtn.onclick = () => {
        addItemToCart(productData.id, productData.title, productData.price, productData.image);
        modal.classList.remove("show");
    };

    modal.classList.add("show");
}

// 6. Smooth Scroll Back To Top
function setupSmoothScroll() {
    const backToTopBtn = document.querySelector(".foot-panel1");
    if (backToTopBtn) {
        backToTopBtn.style.cursor = "pointer";
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
}

// 7. Horizontal Product Carousel Control
function setupCarouselScroll() {
    const track = document.getElementById("carousel-track");
    const prevBtn = document.getElementById("carousel-prev");
    const nextBtn = document.getElementById("carousel-next");

    if (!track || !prevBtn || !nextBtn) return;

    const scrollAmount = 300;

    prevBtn.addEventListener("click", () => {
        track.scrollBy({
            left: -scrollAmount,
            behavior: "smooth"
        });
    });

    nextBtn.addEventListener("click", () => {
        track.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
        });
    });
}
