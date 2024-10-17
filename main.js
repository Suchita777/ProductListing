const productList = document.getElementById("product-list");
const loadMoreButton = document.getElementById("load-more");
const searchBar = document.getElementById("search-bar");
const categoryFilter = document.querySelectorAll('.category__option');
const sortSelect = document.getElementById("sort-products");
const shimmerContainer = document.getElementById("shimmer-container");
const errorMessage = document.getElementById("error-message");
const hamburger = document.querySelector('.hamburger');
const filters = document.querySelector('.filters');
const sort = document.querySelector(".sort");
const filter = document.querySelector(".filter");

let allProducts = [];
let filteredProducts = [];
let productsToDisplay = 10;
let currentProducts = 0;

const toggleActiveClass = (element) => element.classList.toggle('active');

hamburger.addEventListener('click', () => {
    toggleActiveClass(hamburger);
    toggleActiveClass(filters);
});

filter.addEventListener('click', () => {
    toggleActiveClass(hamburger);
    toggleActiveClass(filters);
});

function showShimmerEffect(){
  shimmerContainer.style.display = "grid";
  productList.style.display = "none";
}

function hideShimmerEffect(){
  shimmerContainer.style.display = "none";
  productList.style.display = "grid";
}

// Fetch products from the API
const fetchProducts = async () => {
  try {
    showShimmerEffect();
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    allProducts = filteredProducts = products;   
    setTimeout(() => {
      displayProducts();
      hideShimmerEffect();
    }, 1000);
  } catch (error) {
    hideShimmerEffect();
    errorMessage.textContent = "Failed to load products. Please try again later.";
  }
};

// Display products on the page
const displayProducts = () => {
  productList.innerHTML = "";
  const productsToShow = filteredProducts.slice(0, currentProducts + productsToDisplay);

  if (productsToShow.length > 0){
    productsToShow.forEach(({ image, title, price }) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product");
      productCard.innerHTML = `
        <div class="product__image">
            <img src="${image}" alt="${title}">
        </div>
        <div class="product__description">
            <p class="product_title">${title}</p>
            <p class="price">$${price}</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" id="heart" width="20" height="20" x="0" y="0" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
        </div>
      `;
      productList.appendChild(productCard);
    });
  } else {
    errorMessage.innerHTML = `
      <p>No products to display.</p>      
    `;
  }

  currentProducts = productsToShow.length;

  // Hide the load more button if all products are displayed
  loadMoreButton.style.display = currentProducts >= filteredProducts.length ? "none" : "block";

  document.getElementById("products-result-count").textContent = currentProducts;
};

// Load more products when the button is clicked
loadMoreButton.addEventListener("click", () => {
  showShimmerEffect(); 
  setTimeout(() => {
    displayProducts();
    hideShimmerEffect();
  }, 1000);
});

// Filter products by category and search term
const filterAndSearchProducts = () => {
  const selectedCategories = [...categoryFilter]
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  const searchTerm = searchBar.value.toLowerCase();

  filteredProducts = allProducts.filter(({ category, title }) => 
    (!selectedCategories.length || selectedCategories.includes(category)) &&
    title.toLowerCase().includes(searchTerm)
  );

  currentProducts = 0;
  displayProducts();
};

// Sort products by price
sortSelect.addEventListener("change", () => {
  const sortOption = sortSelect.value;

  filteredProducts.sort((a, b) => sortOption === "price-low" ? a.price - b.price : b.price - a.price);

  currentProducts = 0;
  displayProducts();
});

// Sort products in mobile view
sort.addEventListener('click', () => {
  toggleActiveClass(sort);
  const isActive = sort.classList.contains('active');
  
  filteredProducts.sort((a, b) => isActive ? a.price - b.price : b.price - a.price);
  
  currentProducts = 0;
  displayProducts();
});

// Search products and filter them by category
searchBar.addEventListener("input", filterAndSearchProducts);
categoryFilter.forEach(category => category.addEventListener('change', filterAndSearchProducts));

// Initial load
fetchProducts();