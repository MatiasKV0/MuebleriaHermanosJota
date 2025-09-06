let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = JSON.parse(localStorage.getItem("total")) || 0;
const contenedorSugerencias = document.getElementById("products-container");
const contenedorCarrito = document.getElementById("cart-items");
const cotizacion = document.getElementsByClassName("cart-summary")
let sugerencias = [];

document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
});


function cargarProductos() {
  fetch("../public/productos.json")
    .then((response) => response.json())
    .then((data) => {
      let productos = data.productos || [];
      sugerencias = productos.slice(0, 3);

      productos = carrito.map((item) => {
        let producto = data.productos.find((p) => p.id === item.id);
        if (!producto) return null; 
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
    total += delta;
    if (item.qty < 1) {
      item.qty = 1;
      total -= delta;
    }
    localStorage.setItem("total", JSON.stringify(total));
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarProductos();
  } else {
    console.error("Producto no encontrado en el carrito");
  }
}; 

// Eliminar un producto del carrito
function eliminarDelCarrito(id) {
  total -= carrito.find(p => p.id === id)?.qty || 0;
  carrito = carrito.filter((p) => p.id !== id);
  localStorage.setItem("total", JSON.stringify(total));
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

//limpiar carrito
function cotizarProductos() {
  carrito = [];
  localStorage.removeItem("carrito");
  cotizacion[0].classList.add("none");
  mostrarMensaje("Gracias por tu interés. Nos pondremos en contacto pronto para tu cotización.");
}

//mostrar mensaje
function mostrarMensaje(mensaje) {
  contenedorCarrito.innerHTML = `<h2>${mensaje}</h2>`;
}

function slugify(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
