// Product database for Quick View Modals
const productDetails = {
    "box1": {
        title: "Deals in PCs & Accessories",
        price: "$499.99",
        rating: "4.8 ★★★★☆ (2,450 reviews)",
        image: "pc-img.jpg",
        description: "Upgrade your workspace with premium high-performance desktop computers, monitors, mechanical keyboards, and gaming accessories. Fast performance meets reliability."
    },
    "box2": {
        title: "Toys & Games under $25",
        price: "$19.99",
        rating: "4.7 ★★★★☆ (1,890 reviews)",
        image: "toy.jpg",
        description: "Explore top-rated board games, action figures, educational toys, and creative play kits. Fun and engagement for kids of all ages at budget-friendly prices."
    },
    "box3": {
        title: "Shop Deals in Shoes",
        price: "$89.95",
        rating: "4.9 ★★★★★ (4,120 reviews)",
        image: "Nike-Louis-Vuitton-2.webp",
        description: "Step into style with limited edition designer athletic shoes and casual sneakers. Offers ultimate comfort, breathability, and premium aesthetic appeal."
    },
    "box4": {
        title: "Gift Ideas in Men's Wrist Watches",
        price: "$124.50",
        rating: "4.6 ★★★★☆ (980 reviews)",
        image: "watch.jpg",
        description: "Classic analog and digital timepieces crafted with leather straps, water resistance, and luxury design. The perfect gift for formal wear or daily sophistication."
    },
    "box5": {
        title: "Premium Apparel & Clothes",
        price: "$34.99",
        rating: "4.4 ★★★★☆ (3,110 reviews)",
        image: "box1_image.jpg",
        description: "Comfortable and stylish daily wear collection. Made from premium quality breathable cotton, perfect for casual outings and seasonal comfort."
    },
    "box6": {
        title: "Advanced Dental Kits",
        price: "$29.99",
        rating: "4.5 ★★★★☆ (1,560 reviews)",
        image: "box2_image.jpg",
        description: "Complete professional dental hygiene set with sonic toothbrushes, charcoal flossing tools, and plaque removal kits. Keep your smile bright and healthy."
    },
    "box7": {
        title: "Modern Home Décor",
        price: "$45.00",
        rating: "4.7 ★★★★☆ (2,300 reviews)",
        image: "home.jpg",
        description: "Elegant modern home styling pieces, cozy throw pillows, artistic lamps, and organizers. Bring a warm, contemporary vibe to any living room or bedroom."
    },
    "box8": {
        title: "New Mobile Launch in 2024",
        price: "$799.00",
        rating: "4.8 ★★★★☆ (850 reviews)",
        image: "phone",
        description: "Experience the next generation with our latest smartphone. Features an ultra-clear high refresh rate screen, long-lasting battery, and advanced AI triple camera."
    },
    "box9": {
        title: "Gaming Accessories Pack",
        price: "$69.99",
        rating: "4.6 ★★★★☆ (1,150 reviews)",
        image: "gaming",
        description: "Immersive pro gaming bundle including a RGB-lit mouse, responsive headset, and durable tracking mousepad. Get the competitive edge today."
    },
    "box10": {
        title: "Fantastic Finds for Home",
        price: "$15.99",
        rating: "4.3 ★★★★☆ (670 reviews)",
        image: "box3_image.jpg",
        description: "Discover functional kitchen organizers, aesthetic wall art, and practical storage solutions designed to simplify your home routine."
    },
    "box11": {
        title: "Best in Beauty Products",
        price: "$24.95",
        rating: "4.7 ★★★★☆ (3,400 reviews)",
        image: "box5_image.jpg",
        description: "Organic skin care oils, premium cosmetics, and makeup blends crafted from clean ingredients. Rejuvenate your skin and highlight your natural glow."
    },
    "box12": {
        title: "Best Sellers in Cell Phones Accessories",
        price: "$12.99",
        rating: "4.5 ★★★★☆ (5,210 reviews)",
        image: "mobile accessories.jpg",
        description: "Keep your devices safe and powered up with durable shockproof phone cases, fast wireless chargers, and anti-glare screen protectors."
    }
};

// Global State
let cartCount = 0;
const heroImages = ["hero_image2.jgp.jpg", "hero_image.jpg"];
let currentHeroIndex = 0;

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    setupHeroSlider();
    setupCartAndToasts();
    setupSearchFilter();
    setupProductModals();
    setupSmoothScroll();
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

    const changeHero = (direction) => {
        if (direction === "next") {
            currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;
        } else {
            currentHeroIndex = (currentHeroIndex - 1 + heroImages.length) % heroImages.length;
        }
        heroSection.style.backgroundImage = `url('${heroImages[currentHeroIndex]}')`;
    };

    leftBtn.addEventListener("click", () => changeHero("prev"));
    rightBtn.addEventListener("click", () => changeHero("next"));

    // Auto-slide every 8 seconds
    setInterval(() => changeHero("next"), 8000);
}

// 2. Cart System and Toast Notifications
function setupCartAndToasts() {
    // Create cart count badge inside nav-cart if it doesn't exist
    const navCart = document.querySelector(".nav-cart");
    if (navCart) {
        navCart.innerHTML = `
            <div class="cart-icon-wrapper">
                <span id="cart-count">0</span>
                <i class="fa-duotone fa-solid fa-cart-shopping"></i>
            </div>
            Cart
        `;
    }

    // Create container for Toast alerts
    const toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    document.body.appendChild(toastContainer);

    // Global click listener for Add to Cart buttons
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-to-cart-btn")) {
            e.stopPropagation(); // Stop opening modal when clicking the button
            const productName = e.target.getAttribute("data-product-name") || "Product";
            addToCart(productName);
        }
    });
}

function addToCart(productName) {
    cartCount++;
    const cartCountEl = document.getElementById("cart-count");
    if (cartCountEl) {
        cartCountEl.textContent = cartCount;
        cartCountEl.classList.remove("bump");
        void cartCountEl.offsetWidth; // Trigger reflow to restart animation
        cartCountEl.classList.add("bump");
    }
    showToast(`Added "${productName}" to cart! 🛒`);
}

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

    // Fade out and remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.add("fade-out");
        toast.addEventListener("transitionend", () => toast.remove());
    }, 3000);
}

// 3. Search and Filter Feature
function setupSearchFilter() {
    const searchInput = document.querySelector(".search-input");
    const searchIcon = document.querySelector(".search-icon");
    const selectElement = document.querySelector(".Search-select");

    if (!searchInput) return;

    const filterProducts = () => {
        const query = searchInput.value.toLowerCase().trim();
        const category = selectElement ? selectElement.value : "All";
        const cards = document.querySelectorAll(".shop-section .box");

        let matchesFound = 0;

        cards.forEach((card) => {
            const title = card.querySelector("h2").textContent.toLowerCase();
            
            // Basic matching logic: check query match in card title
            const matchesQuery = query === "" || title.includes(query);
            
            if (matchesQuery) {
                card.style.display = "block";
                card.style.opacity = "1";
                card.style.transform = "scale(1)";
                matchesFound++;
            } else {
                card.style.opacity = "0";
                card.style.transform = "scale(0.95)";
                // Delay setting display to allow opacity transition to finish
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

    // Trigger on typing, pressing Enter, or clicking the search icon
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

// 4. Product Modal (Quick View)
function setupProductModals() {
    // Create modal element in HTML dynamically if not present
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
    
    // Close modal triggers
    closeModal.addEventListener("click", () => {
        modal.classList.remove("show");
    });
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });

    // Populate all product cards with an Add to Cart button and setup Quick View clicks
    const cards = document.querySelectorAll(".shop-section .box");
    cards.forEach((card) => {
        // Detect which product key this is based on its classes
        let productKey = "";
        for (let i = 1; i <= 12; i++) {
            if (card.classList.contains(`box${i}`)) {
                productKey = `box${i}`;
                break;
            }
        }

        const data = productDetails[productKey];
        if (!data) return;

        // Append Add to Cart button to the card content
        const boxContent = card.querySelector(".box-content");
        if (boxContent) {
            const btn = document.createElement("button");
            btn.className = "add-to-cart-btn";
            btn.setAttribute("data-product-name", data.title);
            btn.textContent = "Add to Cart";
            boxContent.appendChild(btn);
        }

        // Open modal when clicking the card image, heading or "See more" link
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
    document.getElementById("modal-product-price").textContent = productData.price;
    document.getElementById("modal-product-desc").textContent = productData.description;
    
    const imgEl = document.getElementById("modal-product-img");
    imgEl.style.backgroundImage = `url('${productData.image}')`;

    // Map add to cart button inside modal
    const modalAddBtn = document.getElementById("modal-add-to-cart-btn");
    modalAddBtn.onclick = () => {
        addToCart(productData.title);
        modal.classList.remove("show");
    };

    modal.classList.add("show");
}

// 5. Smooth Scroll Back To Top
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
