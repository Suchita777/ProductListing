import './style.css';

document.querySelector('#app').innerHTML = `
  
`;


const productList = document.getElementById("product-list");

let allProducts = [];
let filteredProducts = [];
let wishlist = [];
let productsToDisplay = 10;
let currentProducts = 0;
let loading = false;


// Fetch products from the API
async function fetchProducts() {
    try {
    //   loading = true;
    //   loadingSpinner.style.display = "block";
      const response = await fetch("https://fakestoreapi.com/products");
      const products = await response.json();
      allProducts = products;
      filteredProducts = products;
      displayProducts();
    } catch (error) {
    //   errorMessage.textContent =
    //     "Failed to load products. Please try again later.";
    } finally {
    //   loading = false;
    //   loadingSpinner.style.display = "none";
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
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p class="price"><strong>$${product.price}</strong></p>
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
  
    attachWishlistListeners();
}
  
// Initial load
fetchProducts();