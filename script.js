const destacadosContainer = document.querySelector(".destacados-content");
const path = window.location.pathname;
let productos = [];

document.addEventListener("DOMContentLoaded", async () => {
  if (path.includes("index.html") || path === "/") {
    productos = await buscarProductos();
    mostrarSugerencias(destacadosContainer);
    mostrarTotalCarrito();
  }
});

async function buscarProductos() {
  try {
    const response = await fetch("public/productos.json");
    const data = await response.json();
    return data.productos;
  } catch (error) {
    console.error("Error cargando productos:", error);
    return [];
  }
}

export function mostrarSugerencias(contenedor) {
  if (!productos || productos.length === 0) return;

  contenedor.innerHTML = "";

  productos.slice(0, 3).forEach((producto) => {
    const link = document.createElement("a");
    link.href =
      "producto/producto.html?slug=" +
      encodeURIComponent(slugify(producto.nombre));

    const img = document.createElement("img");
    img.src = producto.imagen;
    img.alt = producto.nombre;

    link.appendChild(img);
    contenedor.appendChild(link);
  });
}

export function mostrarTotalCarrito() {
  const totalCarrito = document.getElementById("carrito-total");
  const total = JSON.parse(localStorage.getItem("total")) || 0;
  if (total > 0 && total < 100) {
    totalCarrito.style.display = "flex";
    totalCarrito.textContent = `${total}`;
  }
  if (total >= 100) {
    totalCarrito.style.display = "flex";
    totalCarrito.textContent = "+99";
    totalCarrito.style.padding = "1px";
  }
  return;
}

export function slugify(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
