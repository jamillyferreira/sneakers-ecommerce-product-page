// MOBILE MENU
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const menuMobile = document.getElementById("nav-menu");
const overlay = document.getElementById("overlay");

// IMAGE GALLERY
const thumbnails = document.querySelectorAll(".thumb-pic");
const mainImage = document.getElementById("main-image");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

// SHOPPING CART
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const countCart = document.getElementById("count-cart");
const cartEmpty = document.querySelector(".cart__empty");
const cartItems = document.querySelector(".cart__container-items");
const cartDeleteBtn = document.getElementById("cart-delete");

const decreaseBtn = document.getElementById("decrease-qty");
const increaseBtn = document.getElementById("increase-qty");
const quantityValue = document.getElementById("quantity-value");
const addToCartBtn = document.getElementById("add-to-cart");

// LIGHTBOX
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close-btn");
const lightboxOverlay = document.getElementById("lightbox-overlay");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
const lightboxThumbs = document.querySelectorAll(
  ".lightbox__thumbnails .thumb"
);

// VARIAVIES DE ESTADO
let currentImageIndex = 0;
let quantity = 0;
let cartQuantity = 0;

// Funções do Menu mobile
const toggleMenu = () => {
  menuMobile.classList.toggle("active");
  overlay.classList.add("active");
  menuBtn.setAttribute("aria-expanded", "true");
};

const closeMenu = () => {
  menuMobile.classList.remove("active");
  overlay.classList.remove("active");
  menuBtn.setAttribute("aria-expanded", "false");
};

// Funções da Galeria
const updateImage = (index) => {
  thumbnails.forEach((thumb) => thumb.classList.remove("active"));
  thumbnails[index].classList.add("active");

  const newImageSrc = thumbnails[index].getAttribute("data-main");
  mainImage.src = newImageSrc.replace("-thumbnail", "");

  currentImageIndex = index;
};

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    updateImage(index);
  });
});

const handleClickNextBtn = () => {
  const nextIndex = (currentImageIndex + 1) % thumbnails.length;
  updateImage(nextIndex);
};

const handleClickPrevBtn = () => {
  const prevIndex =
    currentImageIndex === 0 ? thumbnails.length - 1 : currentImageIndex - 1;
  updateImage(prevIndex);
};

// Funções do Lightbox
const updateLightboxImage = (index) => {
  const newImageSrc = thumbnails[index].getAttribute("data-main");
  lightboxImage.src = newImageSrc.replace("-thumbnail", "");

  lightboxThumbs.forEach((thumb) => thumb.classList.remove("active"));
  lightboxThumbs[index].classList.add("active");
  currentImageIndex = index;
};

const openLightbox = (index = currentImageIndex) => {
  if (window.innerWidth >= 768) {
    updateLightboxImage(index);
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }
};

const closeLightbox = () => {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
};

// Navegacao dentro do lightbox
lightboxNext.addEventListener("click", () => {
  const nextIndex = (currentImageIndex + 1) % thumbnails.length;
  updateLightboxImage(nextIndex);
});

lightboxPrev.addEventListener("click", () => {
  const prevIndex =
    currentImageIndex === 0 ? thumbnails.length - 1 : currentImageIndex - 1;
  updateLightboxImage(prevIndex);
});

// Thumbnails do Lightbox
lightboxThumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    updateLightboxImage(index);
  });
});

// Funções do Carrinho
const openCart = () => {
  cartModal.classList.toggle("active");
};

const updateQuantity = (newQuantity) => {
  quantity = Math.max(0, newQuantity);
  quantityValue.textContent = quantity;
};

// Função que atualiza o contador do carrinho
const updateCartCount = () => {
  if (cartQuantity > 0) {
    countCart.textContent = cartQuantity;
    countCart.classList.add("active");
  } else {
    countCart.classList.remove("active");
  }
};

// Função que atualiza o estado do carrinho (vazio ou com items)
const updateCartState = () => {
  if (cartQuantity > 0) {
    cartEmpty.classList.remove("active");
    cartItems.classList.add("active");

    const countElement = document.querySelector(".count");
    const totalElement = document.querySelector(".total-amount");

    if (countElement) countElement.textContent = cartQuantity;
    if (totalElement)
      totalElement.textContent = `$${(125 * cartQuantity).toFixed(2)}`;
  } else {
    cartEmpty.classList.add("active");
    cartItems.classList.remove("active");
  }

  updateCartCount();
};

const addToCart = () => {
  if (quantity === 0) return;
  cartQuantity = quantity;
  updateCartState();
};

const clearCart = () => {
  cartQuantity = 0;
  updateCartState();
  updateQuantity(0);

  setTimeout(() => {
    cartModal.classList.remove("active");
  }, 700);
};

// ========== EVENT LISTENERS ==========
// Menu mobile
menuBtn.addEventListener("click", toggleMenu);
closeBtn.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

// Gallery
nextBtn.addEventListener("click", handleClickNextBtn);
prevBtn.addEventListener("click", handleClickPrevBtn);

mainImage.addEventListener("click", () => openLightbox(currentImageIndex));
lightboxClose.addEventListener("click", closeLightbox);
lightboxOverlay.addEventListener("click", closeLightbox);

cartBtn.addEventListener("click", openCart);
addToCartBtn.addEventListener("click", addToCart);
cartDeleteBtn.addEventListener("click", clearCart);
increaseBtn.addEventListener("click", () => updateQuantity(quantity + 1));
decreaseBtn.addEventListener("click", () => updateQuantity(quantity - 1));
