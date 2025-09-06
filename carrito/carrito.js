// lista de productos
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const contenedorSugerencias = document.getElementById("products-container");
let sugerencias = [];

document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
});

// Cargar productos desde JSON
function cargarProductos() {
  fetch("../public/productos.json")
    .then((response) => response.json())
    .then((data) => {
      let productos = data.productos || [];
      sugerencias = productos.slice(0, 3);

      // merge carrito + datos de productos
      productos = carrito.map((item) => {
        let producto = data.productos.find((p) => p.id === item.id);
        if (!producto) return null; // evitar error si falta producto
        return {
          ...producto,
          qty: item.qty,
        };
      }).filter(Boolean);

      mostrarCarrito(productos);
      mostrarSugerencias();
    })
    .catch((error) => console.error("Error al cargar productos", error));
}

// Carrito de compras
function mostrarCarrito(carrito) {
  const contenedorCarrito = document.getElementById("cart-items");
  if (!carrito || carrito.length === 0) {
    contenedorCarrito.innerHTML = "<h2>El carrito está vacío.</h2>";
    return;
  }

  contenedorCarrito.innerHTML = "";
  carrito.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.dataset.id = item.id; 
    const slug = slugify(item.nombre);

    div.innerHTML = `
      <img
        src="../${item.imagen}"
        alt="${item.nombre}"
        class="item-image"
      />
      <a class="item-details" href="../producto/producto.html?slug=${encodeURIComponent(slug)}">
        <h3 class="item-name">${item.nombre}</h3>
        <p class="item-description">${item.descripcion}</p>
      </a>
      <div class="item-actions">
        <div class="quantity-controls">
          <button class="quantity-btn" onclick="cambiarCantidad(${item.id}, -1)">-</button>
          <div>${item.qty}</div>
          <button class="quantity-btn" onclick="cambiarCantidad(${item.id}, 1)">+</button>
        </div>
        <button class="remove-btn" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
      </div>
    `;

    contenedorCarrito.appendChild(div);
  });
}

// Cambiar cantidad de un producto en el carrito
function cambiarCantidad(id, delta) {
  const item = carrito.find((p) => p.id === id);
  if (item) {
    item.qty += delta;
    if (item.qty < 1) item.qty = 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarProductos();
  } else {
    console.error("Producto no encontrado en el carrito");
  }
}; 

// Eliminar un producto del carrito
function eliminarDelCarrito(id) {
  carrito = carrito.filter((p) => p.id !== id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  cargarProductos();
}

// Mostrar productos sugeridos
function mostrarSugerencias() {
  if (!sugerencias || sugerencias.length === 0) {
    return;
  }
  
  contenedorSugerencias.innerHTML = "";
  sugerencias.forEach((item) => {
    const div = document.createElement("div");
    const slug = slugify(item.nombre);
    div.innerHTML = `
      <a class="product-card" href="../producto/producto.html?slug=${encodeURIComponent(slug)}">
        <img
          src="../${item.imagen}"
          alt="${item.nombre}"
          class="product-image"
        />
        <div class="product-info">
          <h3 class="product-name">${item.nombre}</h3>
          <p class="product-description">${item.descripcion}</p>
        </div>
      </a>
    `;
    contenedorSugerencias.appendChild(div);
  });
}

function slugify(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
