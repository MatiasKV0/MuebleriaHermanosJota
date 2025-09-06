import { slugify, mostrarTotalCarrito } from "../script.js";

document.addEventListener("DOMContentLoaded", () => {
  mostrarTotalCarrito();
});

(async function () {
  const contenedor = document.getElementById("container");
  if (!contenedor) return;

  try {
    const resp = await fetch("../public/productos.json");
    const data = await resp.json();
    const productos = Array.isArray(data) ? data : data.productos || [];

    if (!productos.length) {
      contenedor.innerHTML = "<p>No hay productos para mostrar.</p>";
      return;
    }

    contenedor.style.display = "flex";
    contenedor.style.flexWrap = "wrap";
    contenedor.style.gap = "1rem";
    contenedor.style.justifyContent = "center";

    productos.forEach((p) => {
      const a = document.createElement("a");
      const slug = slugify(p.nombre);

      a.href = `../producto/producto.html?slug=${encodeURIComponent(slug)}`;
      a.style.display = "block";

      const img = document.createElement("img");
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
      contenedor.appendChild(a);
    });
  } catch (e) {
    contenedor.innerHTML = "<p>No se pudieron cargar los productos.</p>";
    console.error(e);
  }
})();
