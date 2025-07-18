lconst products = [
  { name: "Chocolate Cake", price: 400, emoji: "🍫", color: "#8B4513" },
  { name: "Cupcake Delight", price: 80, emoji: "🧁", color: "#FF69B4" },
  { name: "Strawberry Tart", price: 150, emoji: "🍓", color: "#FF6B6B" },
  { name: "Blueberry Muffin", price: 100, emoji: "🫐", color: "#6A5ACD" },
  { name: "Butter Croissant", price: 70, emoji: "🥐", color: "#DEB887" },
  { name: "Cinnamon Roll", price: 90, emoji: "🌀", color: "#D2691E" },
  { name: "Cheesecake Slice", price: 120, emoji: "🍰", color: "#FFFACD" },
  { name: "Donut Box", price: 250, emoji: "🍩", color: "#FFB6C1" },
  { name: "Brownie Bites", price: 110, emoji: "🟫", color: "#8B4513" },
  { name: "Vanilla Cream Cake", price: 450, emoji: "🎂", color: "#F5F5DC" },
  { name: "Fruit Danish", price: 95, emoji: "🥧", color: "#FFA500" },
  { name: "Macaron Box", price: 300, emoji: "🍪", color: "#DA70D6" },
  { name: "Red Velvet Cake", price: 500, emoji: "❤️", color: "#DC143C" },
  { name: "Almond Biscotti", price: 130, emoji: "🥜", color: "#F4A460" },
  { name: "Chocolate Éclair", price: 105, emoji: "🍫", color: "#8B4513" }
];

let cart = [];
let cartVisible = false;
let userInfo = {};

function login() {
  const name = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  if (!name || !email) {
    alert("Please enter all details");
    return;
  }
  
  // Store user info for later use
  userInfo = { name, email };
  
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("mainApp").style.display = "block";
  loadProducts();
}

function loadProducts() {
  const container = document.getElementById("productContainer");
  products.forEach((product, index) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <div class="product-image" style="background: linear-gradient(45deg, ${product.color}, #ffd93d);">
        ${product.emoji}
      </div>
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button class="btn" onclick="addToCart(${index})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(index) {
  cart.push(products[index]);
  updateCartCount();
  showNotification("Item added to cart!");
}

function updateCartCount() {
  document.getElementById("cartCount").textContent = cart.length;
}

function toggleCart() {
  const section = document.getElementById("cartSection");
  cartVisible = !cartVisible;
  
  if (cartVisible) {
    showCart();
    section.style.display = "block";
  } else {
    section.style.display = "none";
  }
}

function showCart() {
  const cartItemsDiv = document.getElementById("cartItems");
  const total = document.getElementById("totalAmount");
  cartItemsDiv.innerHTML = "";
  let totalAmt = 0;
  
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty</p>";
    total.textContent = "0";
    return;
  }
  
  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <span>${item.emoji} ${item.name}</span>
      <span>₹${item.price} <button onclick="removeFromCart(${index})" style="background: #dc3545; color: white; border: none; padding: 2px 6px; border-radius: 3px; cursor: pointer;">×</button></span>
    `;
    cartItemsDiv.appendChild(itemDiv);
    totalAmt += item.price;
  });
  
  total.textContent = totalAmt;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  showCart();
}

function clearCart() {
  cart = [];
  updateCartCount();
  showCart();
}

function showCheckoutForm() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  
  // Pre-fill customer details from login
  document.getElementById("customerName").value = userInfo.name;
  document.getElementById("customerEmail").value = userInfo.email;
  
  // Show order summary
  updateOrderSummary();
  
  // Hide cart and show checkout form
  document.getElementById("cartSection").style.display = "none";
  document.getElementById("checkoutForm").style.display = "block";
}

function updateOrderSummary() {
  const orderSummary = document.getElementById("orderSummary");
  const finalTotal = document.getElementById("finalTotal");
  
  orderSummary.innerHTML = "";
  let totalAmt = 0;
  
  cart.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.style.cssText = "display: flex; justify-content: space-between; margin-bottom: 8px; padding: 5px 0; border-bottom: 1px solid #eee;";
    itemDiv.innerHTML = `
      <span>${item.emoji} ${item.name}</span>
      <span>₹${item.price}</span>
    `;
    orderSummary.appendChild(itemDiv);
    totalAmt += item.price;
  });
  
  finalTotal.textContent = totalAmt;
}

function backToCart() {
  document.getElementById("checkoutForm").style.display = "none";
  document.getElementById("cartSection").style.display = "block";
}

function placeOrder() {
  // Get customer details
  const name = document.getElementById("customerName").value.trim();
  const email = document.getElementById("customerEmail").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const address = document.getElementById("customerAddress").value.trim();
  
  // Validate all fields
  if (!name || !email || !phone || !address) {
    alert("Please fill in all customer details!");
    return;
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address!");
    return;
  }
  
  // Validate phone number
  if (phone.length < 10) {
    alert("Please enter a valid phone number!");
    return;
  }
  
  // Create order confirmation
  const orderDetails = {
    customer: { name, email, phone, address },
    items: cart,
    total: document.getElementById("finalTotal").textContent,
    orderDate: new Date().toLocaleString()
  };
  
  // Show success message
  alert(`🎉 Order Placed Successfully!\n\nThank you ${name}!\n\nOrder Details:\n- Total: ₹${orderDetails.total}\n- Items: ${cart.length}\n- Delivery to: ${address}\n- Contact: ${phone}\n\nWe'll send confirmation to: ${email}\n\nEstimated delivery: 2-3 hours`);
  
  // Log order details (in real app, this would be sent to server)
  console.log("Order placed:", orderDetails);
  
  // Reset everything
  cart = [];
  updateCartCount();
  document.getElementById("checkoutForm").style.display = "none";
  cartVisible = false;
  
  // Clear form
  document.getElementById("customerPhone").value = "";
  document.getElementById("customerAddress").value = "";
  
  showNotification("Order placed successfully! 🎉");
}

function checkout() {
  showCheckoutForm();
}

function showNotification(message) {
  // Simple notification
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #28a745;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    z-index: 1000;
  `;
  document.body.appendChild(notification);
  setTimeout(() => {
    document.body.removeChild(notification);
  }, 2000);
}
  