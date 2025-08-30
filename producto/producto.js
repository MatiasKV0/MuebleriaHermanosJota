// home/producto/producto.js
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

(async function () {
  const slug = qs("slug");

  const nombreEl = document.getElementById("p-nombre");
  const imgEl = document.getElementById("p-img");
  const descEl = document.getElementById("p-descripcion");
  const precioEl = document.getElementById("p-precio"); // por si luego agregás precio
  const detallesEl = document.getElementById("p-detalles");
  const btnCarrito = document.getElementById("carrito");

  if (!slug) {
    nombreEl.textContent = "Producto no especificado";
    return;
  }

  try {
    // desde /home/producto al JSON: ../../public/productos.json
    const resp = await fetch("../../public/productos.json");
    const data = await resp.json();
    const productos = Array.isArray(data) ? data : data.productos || [];

    const p = productos.find((x) => slugify(x.nombre) === slug);

    if (!p) {
      nombreEl.textContent = "Producto no encontrado";
      return;
    }

    document.title = `${p.nombre} — Hermanos Jota`;
    nombreEl.textContent = p.nombre;

    // tu JSON trae "imagen": "public/img/Archivo.png"
    // desde /home/producto necesito anteponer ../../
    imgEl.src = `../../${p.imagen}`;
    imgEl.alt = p.nombre;

    descEl.textContent = p.descripcion;

    // Si más adelante agregás "precio", lo mostramos:
    if (typeof p.precio === "number") {
      precioEl.textContent = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
      }).format(p.precio);
    } else {
      precioEl.textContent = "";
    }

    // atributos → lista
    detallesEl.innerHTML = "";
    if (p.atributos && typeof p.atributos === "object") {
      Object.entries(p.atributos).forEach(([k, v]) => {
        const li = document.createElement("li");
        li.textContent = `${(k[0].toUpperCase() + k.slice(1)).replace(
          /_/g,
          " "
        )}: ${v}`;
        detallesEl.appendChild(li);
      });
    }

    // carrito básico con localStorage
    btnCarrito.addEventListener("click", () => {
      const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
      carrito.push({ slug, nombre: p.nombre, qty: 1 });
      localStorage.setItem("carrito", JSON.stringify(carrito));
      btnCarrito.textContent = "Agregado ✔";
      btnCarrito.disabled = true;
    });
  } catch (e) {
    nombreEl.textContent = "Error cargando el producto";
    console.error(e);
  }
})();
