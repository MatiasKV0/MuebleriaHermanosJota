const cantidadInput = document.getElementById("cantidad");
const btnCarrito = document.getElementById("carrito");

document.addEventListener("DOMContentLoaded", () => {
  initProducto();
  document.addEventListener("input", inputControl);
});

function qs(param) {
  return new URLSearchParams(location.search).get(param);
}

function slugify(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}


function inputControl(e) {
  cantidadInput.addEventListener("input", () => {
    const min = parseInt(cantidadInput.min);
    const max = parseInt(cantidadInput.max);
    let value = parseInt(cantidadInput.value);

    if (isNaN(value)) {
      cantidadInput.value = min; 
    } else if (value < min) {
      cantidadInput.value = min;
    } else if (value > max) {
      cantidadInput.value = max;
    }
  });
}

// Cargar productos desde JSON
async function fetchProductos() {
  const resp = await fetch("../public/productos.json");
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  const data = await resp.json();
  return data.productos || [];
}

// Buscar producto por slug
function findProducto(productos, slug) {
  return productos.find(p => slugify(p.nombre) === slug);
}

// Renderizar información del producto
function renderProducto(p) {
  const nombre = document.getElementById("p-nombre");
  const img = document.getElementById("p-img");
  const desc = document.getElementById("p-descripcion");
  const attrs = document.getElementById("p-atributos");

  document.title = `${p.nombre} — Hermanos Jota`;
  nombre.textContent = p.nombre;
  img.src = `/${p.imagen}`;
  img.alt = p.nombre;
  desc.textContent = p.descripcion || "";

  attrs.innerHTML = "";
  if (p.atributos && typeof p.atributos === "object") {
    Object.entries(p.atributos).forEach(([k, v]) => {
      const dt = document.createElement("dt");
      dt.textContent = (k[0].toUpperCase() + k.slice(1)).replace(/_/g, " ");
      const dd = document.createElement("dd");
      dd.textContent = v;
      attrs.appendChild(dt);
      attrs.appendChild(dd);
    });
  }
}

// Configurar botón del carrito
function setupCarritoButton(p) {
  btnCarrito.addEventListener("click", () => {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    let total = JSON.parse(localStorage.getItem("total") || 0);
    total += parseInt(cantidadInput.value);
    localStorage.setItem("total", JSON.stringify(total));
    if( carrito.find(item => item.id === p.id)){
      carrito.map(item => {
        if(item.id === p.id) item.qty += parseInt(cantidadInput.value);
      });
    }else{
      carrito.push({ id: p.id, qty: parseInt(cantidadInput.value)});
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    btnCarrito.textContent = "Agregando...";
    btnCarrito.disabled = true;
    gotoCarrito();
  });
}

function gotoCarrito() {
  setTimeout(() => {
    window.location.href = "../carrito/carrito.html";
  }, 1000);
}

// Inicialización
async function initProducto() {
  const slug = qs("slug");
  const nombre = document.getElementById("p-nombre");

  if (!slug) {
    nombre.textContent = "Producto no especificado";
    return;
  }

  try {
    const productos = await fetchProductos();
    const p = findProducto(productos, slug);

    if (!p) {
      nombre.textContent = "Producto no encontrado";
      return;
    }

    renderProducto(p);
    setupCarritoButton(p);
  } catch (e) {
    console.error("Error cargando producto:", e);
    nombre.textContent = "Error cargando el producto";
  }
}
