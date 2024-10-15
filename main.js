import './style.css';

document.querySelector('#app').innerHTML = `
  <header>
      <nav class="navbar">
          <div class="logo">
              <a href="#">
                  <img src="/icons/Venia.png" alt="logo" />
              </a>
          </div>
          <ul class="nav-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">Women</a></li>
              <li><a href="#">Men</a></li>
              <li><a href="#">Smart Gear</a></li>
              <li><a href="#">Accessories</a></li>
          </ul>
          <div class="cart">
              <a href="#">
                  <img src="/icons/cart.svg" alt="Cart Icon" />
                  <span class="cart-count">10</span>
              </a>
          </div>
      </nav>
  </header>
`;
