// productos/productos.js
function slugify(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // saca acentos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // espacios y símbolos → -
    .replace(/(^-|-$)/g, ""); // recorta guiones
}

(async function () {
  const grid = document.getElementById("grid");
  if (!grid) return;

  try {
    const resp = await fetch("../public/productos.json");
    const data = await resp.json();
    // soporte para { productos: [...] } o [ ... ]
    const productos = Array.isArray(data) ? data : data.productos || [];

    if (!productos.length) {
      grid.innerHTML = "<p>No hay productos para mostrar.</p>";
      return;
    }

    // grilla básica
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(auto-fill, minmax(220px, 1fr))";
    grid.style.gap = "1rem";

    productos.forEach((p) => {
      const a = document.createElement("a");
      const slug = slugify(p.nombre);

      // producto.html está en /home/producto  (desde /productos subo uno: ..)
      a.href = `/producto/producto.html?slug=${encodeURIComponent(slug)}`;
      a.style.display = "block";

      const img = document.createElement("img");
      // tu JSON trae "imagen": "public/img/Archivo.png"
      // desde /productos necesito anteponer ../
      img.src = `../${p.imagen}`;
      img.alt = p.nombre;
      img.loading = "lazy";
      img.style.width = "100%";
      img.style.height = "auto";

      const caption = document.createElement("p");
      caption.textContent = p.nombre;
      caption.style.margin = ".5rem 0 0";

      a.appendChild(img);
      a.appendChild(caption);
      grid.appendChild(a);
    });
  } catch (e) {
    grid.innerHTML = "<p>No se pudieron cargar los productos.</p>";
    console.error(e);
  }
})();
