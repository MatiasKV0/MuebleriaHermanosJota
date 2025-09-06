import { slugify } from "../script.js";

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = JSON.parse(localStorage.getItem("total")) || 0;
let productos = [];
let sugerencias = [];
const contenedorSugerencias = document.getElementById("products-container");
const contenedorCarrito = document.getElementById("cart-items");
const cotizacion = document.getElementsByClassName("cart-summary");
const btnCotizar = document.getElementById("cotizar");

document.addEventListener("DOMContentLoaded", async () => {
  await cargarProductos();
  mostrarSugerencias();
  btnCotizar.addEventListener("click", (e) => {
    e.preventDefault();
    cotizarProductos();
  });
});

async function cargarProductos() {
  const response = await fetch("../public/productos.json");
  const data = await response.json();
  productos = data.productos || [];
  const li = Math.floor(Math.random() * (productos.length - 3));
  sugerencias = productos.slice(li, li + 3);
  filtrarProductos(productos);
}

function filtrarProductos(productos) {
  const precioTotal = calcularPrecioTotal(carrito, productos);
  
  productos = carrito
    .map((item) => {
      let producto = productos.find((p) => p.id === item.id);
      if (!producto) return null;
      return {
        ...producto,
        qty: item.qty,
      };
    })
    .filter(Boolean);

  mostrarCarrito(productos, precioTotal);
}

// Carrito de compras
function mostrarCarrito(carrito) {
  if (!carrito || carrito.length === 0) {
    mostrarMensaje("El carrito está vacío");
    cotizacion[0].classList.add("none");
    return;
  }

  cotizacion[0].classList.remove("none");
  contenedorCarrito.innerHTML = "";

  carrito.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.dataset.id = item.id;

    const slug = slugify(item.nombre);

const precioTotal = item.precio * item.qty;

div.innerHTML = `
  <img src="../${item.imagen}" alt="${item.nombre}" class="item-image"/>
  <a class="item-details" href="../producto/producto.html?slug=${encodeURIComponent(
    slug
  )}">
    <h3 class="item-name">${item.nombre}</h3>
    <p class="item-description">${item.descripcion}</p>
  </a>
  <div class="item-price">
    <p class="price-unit">$${item.precio.toLocaleString()} c/u</p>
    <p class="price-total">$${precioTotal.toLocaleString()}</p>
  </div>
  <div class="item-actions">
    <div class="quantity-controls">
      <button class="quantity-btn minus">-</button>
      <div>${item.qty}</div>
      <button class="quantity-btn plus">+</button>
    </div>
    <button class="remove-btn">Eliminar</button>
  </div>
`;

    // eventos
    div
      .querySelector(".minus")
      .addEventListener("click", () => cambiarCantidad(item.id, -1));
    div
      .querySelector(".plus")
      .addEventListener("click", () => cambiarCantidad(item.id, 1));
    div
      .querySelector(".remove-btn")
      .addEventListener("click", () => eliminarDelCarrito(item.id));

    contenedorCarrito.appendChild(div);
  });
}

// Cambiar cantidad de un producto en el carrito
function cambiarCantidad(id, delta) {
  const item = carrito.find((p) => p.id === id);
  if (item) {
    const precioItem = item.precio || 0;
    item.qty += delta;
    total += delta * precioItem;
    if (item.qty < 1) {
      item.qty = 1;
      total -= delta * precioItem;
    }
    localStorage.setItem("total", JSON.stringify(total));
    localStorage.setItem("carrito", JSON.stringify(carrito));
    filtrarProductos(productos);
  } else {
    console.error("Producto no encontrado en el carrito");
  }
}

// Eliminar un producto del carrito
function eliminarDelCarrito(id) {
  const item = carrito.find((p) => p.id === id);
  if (item) {
    total -= (item.precio || 0) * item.qty;
  }
  carrito = carrito.filter((p) => p.id !== id);
  localStorage.setItem("total", JSON.stringify(total));
  localStorage.setItem("carrito", JSON.stringify(carrito));
  filtrarProductos(productos);
}

// Mostrar productos sugeridos
function mostrarSugerencias() {
  if (!sugerencias || sugerencias.length === 0) {
    return;
  }

  contenedorSugerencias.innerHTML = "";
  sugerencias.forEach((item) => {
    const link = document.createElement("a");
    const slug = slugify(item.nombre);
    link.classList.add("product-card");
    link.href = `../producto/producto.html?slug=${encodeURIComponent(slug)}`;
    link.innerHTML = `
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
    contenedorSugerencias.appendChild(link);
  });
}

function cotizarProductos() {
  const precioTotal = calcularPrecioTotal(carrito, productos);
  
  // Limpiar el carrito
  carrito = [];
  localStorage.removeItem("carrito");
  localStorage.removeItem("total");
  
  cotizacion[0].classList.add("none");
  
  // Mostrar el precio total calculado
  mostrarMensaje(`Total a pagar: $${precioTotal.toLocaleString()}, Gracias por su compra`);
}

//mostrar mensaje
function mostrarMensaje(mensaje) {
  contenedorCarrito.innerHTML = `<h2>${mensaje}</h2>`;
}

function calcularPrecioTotal(carrito, productos) {
  let precioTotal = 0;
  carrito.forEach(item => {
    const producto = productos.find(p => p.id === item.id);
    if (producto && producto.precio) {
      precioTotal += producto.precio * item.qty;
    }
  });
  return precioTotal;
}
