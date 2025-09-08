const categoryListElement = document.getElementById("category-list");
const plantsContainer = document.getElementById("plants-container");
const cartItemsElement = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");

let cart = [];

// Load Categories

function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((result) => {
      const categories = result.categories;
      categoryListElement.innerHTML = "";

      // Add All Trees
      const allLi = document.createElement("li");
      allLi.textContent = "All Trees";
      allLi.className =
        "cursor-pointer text-gray-700 pl-2 font-sm transition category-item hover:bg-green-100 hover:text-green-800 hover:font-semibold hover:pl-3 rounded";
      allLi.addEventListener("click", () => loadAllPlants());
      categoryListElement.appendChild(allLi);

      categories.forEach((category) => {
        const li = document.createElement("li");
        li.textContent = category.category_name;
        li.className =
          "cursor-pointer text-gray-700 pl-2 py-1 rounded-md text-sm transition category-item hover:bg-green-100 hover:text-green-700";

        li.addEventListener("click", () => {
          loadPlantsByCategory(category.id);
        });

        categoryListElement.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Error loading categories:", error);
      categoryListElement.innerHTML =
        '<li class="text-red-500">Failed to load categories</li>';
    });
}

// Load All Plants
function loadAllPlants() {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((result) => {
      const plants = result.plants;
      renderPlants(plants);
    })
    .catch((error) => {
      console.error("Error loading all plants:", error);
      plantsContainer.innerHTML =
        '<p class="text-red-500">Failed to load all plants</p>';
    });
}

// Load Category
function loadPlantsByCategory(categoryId) {
  fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then((res) => res.json())
    .then((result) => {
      const plants = result.plants;
      renderPlants(plants);
    })
    .catch((error) => {
      console.error("Error loading plants:", error);
      plantsContainer.innerHTML =
        '<p class="text-red-500">Failed to load plants</p>';
    });
}

// Plant Cards
function renderPlants(plants) {
  plantsContainer.innerHTML = "";

  if (!plants || plants.length === 0) {
    plantsContainer.innerHTML = `<p class="text-center text-red-500 col-span-2">No plants found</p>`;
    return;
  }

  plants.forEach((plant) => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-lg shadow hover:shadow-lg transition";

    card.innerHTML = `
      <img src="${plant.image}" alt="${
      plant.name
    }" class="w-full h-40 object-cover rounded mb-3">
      <div class="px-3 py-2">
        <h3 class="text-lg font-semibold mb-1">${plant.name}</h3>
        <p class="text-gray-600 text-sm mb-2">${plant.description}</p>
        <div class="flex justify-between items-center mb-2">
  <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">${
    plant.category || "Fruit Tree"
  }</span>
  <span class="text-green-700 font-bold text-sm">৳${plant.price}</span>
</div>
        <button class="w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 mb-2"
          onclick="addToCart('${plant.name}', ${
      plant.price
    })">Add to Cart</button>
      </div>
    `;

    plantsContainer.appendChild(card);
  });
}
// Add to Cart

function addToCart(name, price) {
  cart.push({ name, price });
  updateCartUI();
  alert(` Added to cart: ${name}`);
}

// Update Cart UI
function updateCartUI() {
  cartItemsElement.innerHTML = "";

  if (cart.length === 0) {
    cartItemsElement.innerHTML = "<li>No items in cart</li>";
    cartTotalElement.textContent = "0";
    return;
  }

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.className = "bg-[#dcfce7] px-3 py-2 rounded text-sm text-green-900";
    li.textContent = `${item.name} - ${item.price}৳`;
    cartItemsElement.appendChild(li);
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotalElement.textContent = total;
}

// Call functions on load
loadCategories();
loadAllPlants();
