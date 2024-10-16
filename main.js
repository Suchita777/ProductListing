import './style.css';

const productList = document.getElementById("product-list");
const loadMoreButton = document.getElementById("load-more");
const searchBar = document.getElementById("search-bar");
const categoryFilter = document.querySelectorAll('.category__option');
const sortSelect = document.getElementById("sort-products");
const loadingSpinner = document.getElementById("loading-spinner");
const shimmerContainer = document.getElementById("shimmer-container");
const errorMessage = document.getElementById("error-message");

let allProducts = [];
let filteredProducts = [];
let productsToDisplay = 10;
let currentProducts = 0;

// Fetch products from the API
async function fetchProducts() {
  try {
    shimmerContainer.style.display = "grid";
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    allProducts = products;
    filteredProducts = products;
    setTimeout(() => {
      displayProducts();
      shimmerContainer.style.display = "none";
      productList.style.display = "grid";
    }, 1000);
    
  } catch (error) {
    errorMessage.textContent =
      "Failed to load products. Please try again later.";
  }
}

// Display products on the page
function displayProducts() {
  productList.innerHTML = "";
  const productsToShow = filteredProducts.slice(
    0,
    currentProducts + productsToDisplay
  );

  productsToShow.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product");
    productCard.innerHTML = `
      <div class="product__image">
          <img src="${product.image}" alt="${product.title}">
      </div>
      <div class="product__description">
          <p class="product_title">${product.title}</p>
          <p class="price">$${product.price}</p>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" id="heart" width="20" height="20" x="0" y="0" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>

      </div>
    `;
    productList.appendChild(productCard);
  });

  currentProducts = productsToShow.length;

  // Hide the load more button if all products are displayed
  if (currentProducts >= filteredProducts.length) {
    loadMoreButton.style.display = "none";
  } else {
    loadMoreButton.style.display = "block";
  }
}

// Load more products when the button is clicked
loadMoreButton.addEventListener("click", () => {
  shimmerContainer.style.display = "grid";
  productList.style.display = "none";
  setTimeout(() => {
      displayProducts();
      shimmerContainer.style.display = "none";
      productList.style.display = "grid";
  }, 1000); 
});

// Filter products by category and search term
function filterAndSearchProducts() {
  const selectedCategories = Array.from(categoryFilter)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);
  const searchTerm = searchBar.value.toLowerCase();

  filteredProducts = allProducts.filter((product) => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesSearch = product.title.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  currentProducts = 0;
  displayProducts();
}

// Sort products by price
sortSelect.addEventListener("change", () => {
  const sortOption = sortSelect.value;

  if (sortOption === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  currentProducts = 0;
  displayProducts();
});

// Search products and filter them by category
searchBar.addEventListener("input", filterAndSearchProducts);
categoryFilter.forEach(category => {
  category.addEventListener('change', filterAndSearchProducts);
});

// Initial load
fetchProducts();