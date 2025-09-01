const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const menuMobile = document.getElementById("nav-menu");
const overlay = document.getElementById("overlay");

const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const countCart = document.getElementById("count-cart");

const cartEmpty = document.querySelector(".cart__empty");
const cartItems = document.querySelector(".cart__container-items");
const cartDeleteBtn = document.getElementById("cart-delete");

const thumbnails = document.querySelectorAll(".thumb-pic");
const mainImage = document.getElementById("main-image");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

const decreaseBtn = document.getElementById("decrease-qty");
const increaseBtn = document.getElementById("increase-qty");
const quantityValue = document.getElementById("quantity-value");
const addToCart = document.getElementById("add-to-cart");

let currentImageIndex = 0;

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

nextBtn.addEventListener("click", handleClickNextBtn);
prevBtn.addEventListener("click", handleClickPrevBtn);

// Variáveis do Carrinho
let quantity = 0;
let cartQuantity = 0;

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

increaseBtn.addEventListener("click", () => updateQuantity(quantity + 1));
decreaseBtn.addEventListener("click", () => updateQuantity(quantity - 1));

addToCart.addEventListener("click", () => {
  if (quantity === 0) return;

  cartQuantity = quantity;
  console.log(
    `Adicionado ${quantity} itens. Total no carrinho: ${cartQuantity}`
  );
  updateCartState();
});

if (cartDeleteBtn) {
  cartDeleteBtn.addEventListener("click", () => {
    cartQuantity = 0;
    updateCartState();
    updateQuantity(0);
  });
}

cartBtn.addEventListener("click", () => {
  cartModal.classList.toggle("active");
});

menuBtn.addEventListener("click", () => {
  menuMobile.classList.toggle("active");
  overlay.classList.add("active");
  menuBtn.setAttribute("aria-expanded", "true");
});

closeBtn.addEventListener("click", () => {
  menuMobile.classList.remove("active");
  overlay.classList.remove("active");
  menuBtn.setAttribute("aria-expanded", "false");
});

overlay.addEventListener("click", () => {
  menuMobile.classList.remove("active");
  overlay.classList.remove("active");
  menuBtn.setAttribute("aria-expanded", "false");
});
