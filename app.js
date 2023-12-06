const menu = [
  {
    id: 1,
    title: "buttermilk pancakes",
    category: "breakfast",
    price: 15.99,
    img: "./images/item-1.jpeg",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    id: 2,
    title: "diner double",
    category: "lunch",
    price: 13.99,
    img: "./images/item-2.jpeg",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
  },
  {
    id: 3,
    title: "godzilla milkshake",
    category: "shakes",
    price: 6.99,
    img: "./images/item-3.jpeg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
  },
  {
    id: 4,
    title: "country delight",
    category: "breakfast",
    price: 20.99,
    img: "./images/item-4.jpeg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
  },
  {
    id: 5,
    title: "egg attack",
    category: "lunch",
    price: 22.99,
    img: "./images/item-5.jpeg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    id: 6,
    title: "oreo dream",
    category: "shakes",
    price: 18.99,
    img: "./images/item-6.jpeg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
  },
  {
    id: 7,
    title: "bacon overflow",
    category: "breakfast",
    price: 8.99,
    img: "./images/item-7.jpeg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
  },
  {
    id: 8,
    title: "american classic",
    category: "lunch",
    price: 12.99,
    img: "./images/item-8.jpeg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
  },
  {
    id: 9,
    title: "quarantine buddy",
    category: "shakes",
    price: 16.99,
    img: "./images/item-9.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
  {
    id: 10,
    title: "steak dinner",
    category: "dinner",
    price: 16.99,
    img: "./images/item-10.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
];

const sectionCenter = document.querySelector(".section-center");
const container = document.querySelector(".btn-container");
let cartContainer = document.querySelector("#cart");

if (!cartContainer) {
  // Utwórz kontener koszyka, jeśli nie istnieje
  cartContainer = document.createElement("section");
  cartContainer.id = "cart";
  container.parentNode.insertBefore(cartContainer, container.nextSibling);
}

// Tworzymy pusty koszyk
const cart = [];

window.addEventListener("DOMContentLoaded", function () {
  displayMenuItems(menu);

  // Dodaj przyciski kategorii
  const categories = menu.reduce(function (values, item) {
    if (!values.includes(item.category)) {
      values.push(item.category);
    }
    return values;
  }, ["all"]);

  const categoryBtns = categories.map(function (category) {
    return `<button type="button" class="filter-btn" data-id="${category}">${category}</button>`;
  }).join("");

  container.innerHTML = categoryBtns;

  // Dodaj obsługę przycisków kategorii
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const category = e.currentTarget.dataset.id;
      const menuCategory = menu.filter(function (menuItem) {
        return category === "all" || menuItem.category === category;
      });

      displayMenuItems(menuCategory);
    });
  });

  // Dodaj przycisk "Koszyk"
  const cartBtn = document.createElement('button');
  cartBtn.type = "button";
  cartBtn.classList.add("filter-btn");
  cartBtn.dataset.id = "cart";
  cartBtn.textContent = "cart";
  cartBtn.addEventListener("click", function () {
    toggleCartDisplay();
  });
  container.appendChild(cartBtn);

  // Dodaj obsługę przycisków "Dodaj do koszyka"
  sectionCenter.addEventListener("click", function (e) {
    if (e.target.classList.contains("add-to-cart-btn")) {
      const productId = parseInt(e.target.dataset.id);
      const product = menu.find(item => item.id === productId);

      if (product) {
        addToCart(product);
        updateCartDisplay();
      }
    }
  });
});

// Funkcja dodawania produktu do koszyka
function addToCart(product) {
  const productCopy = { ...product }; 
  cart.push(productCopy);
}

// Funkcja aktualizująca wyświetlanie koszyka
function updateCartDisplay() {
  if (cartContainer) {
    cartContainer.innerHTML = "";
    cart.forEach(item => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("menu-item");
      cartItem.innerHTML = `
        <img src=${item.img} class="photo" alt=${item.title}>
        <div class="item-info">
          <header>
            <h4>${item.title}</h4>
            <h4 class="price">${item.price}</h4>
          </header>
          <p class="item-text">${item.desc}</p>
        </div>
      `;
      cartContainer.appendChild(cartItem);
    });

    // Wyświetl liczbę produktów w koszyku i łączną cenę
    const cartCount = document.createElement("p");
    const totalPrice = cart.reduce((total, item) => total + item.price, 0).toFixed(2);
    cartCount.textContent = `Number of products in cart: ${cart.length} Price: ${totalPrice}`;
    cartContainer.appendChild(cartCount);
  }
}

// Funkcja wyświetlająca produkty w sekcji
function displayMenuItems(menuItems) {
  let displayMenu = menuItems.map(function (item) {
    return `
      <article class="menu-item">
        <img src=${item.img} class="photo" alt=${item.title}>
        <div class="item-info">
          <header>
            <h4>${item.title}</h4>
            <h4 class="price">${item.price}</h4>
          </header>
          <p class="item-text">${item.desc}</p>
          <button class="add-to-cart-btn" data-id="${item.id}">Add to Cart</button>
        </div>
      </article>
    `;
  }).join('');
  sectionCenter.innerHTML = displayMenu;
}

// Funkcja wyświetlająca/ukrywająca koszyk
function toggleCartDisplay() {
  if (cartContainer.style.display === "" || cartContainer.style.display === "none") {
    updateCartDisplay();
    cartContainer.style.display = "block";
  } else {
    cartContainer.style.display = "none";
  }
}


// Funkcja aktualizująca łączną cenę
function updateTotalPrice() {
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  console.log("Łączna cena produktów w koszyku: ", totalPrice.toFixed(2));
  return totalPrice.toFixed(2);
}
