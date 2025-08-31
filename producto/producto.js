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

  const nombre = document.getElementById("p-nombre");
  const img = document.getElementById("p-img");
  const desc = document.getElementById("p-descripcion");
  const precio = document.getElementById("p-precio");
  const attrs = document.getElementById("p-atributos");
  const btnCarrito = document.getElementById("carrito");

  if (!slug) {
    nombre.textContent = "Producto no especificado";
    return;
  }

  try {
    const resp = await fetch("/public/productos.json");
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    const productos = Array.isArray(data) ? data : data.productos || [];

    const p = productos.find((x) => slugify(x.nombre) === slug);
    if (!p) {
      nombre.textContent = "Producto no encontrado";
      return;
    }

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

    btnCarrito.addEventListener("click", () => {
      const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
      carrito.push({ slug, nombre: p.nombre, qty: 1 });
      localStorage.setItem("carrito", JSON.stringify(carrito));
      btnCarrito.textContent = "Agregado";
      btnCarrito.disabled = true;
    });
  } catch (e) {
    console.error("Error cargando producto:", e);
    nombre.textContent = "Error cargando el producto";
  }
})();
