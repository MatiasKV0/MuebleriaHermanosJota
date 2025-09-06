// lista de productos
let productos = [];


fetch("../public/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data.productos;
        mostrarCarrito():
    })
    .catch(error => console.error("Error al cargar productos", error));

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id == idProducto);
    if (producto) {
        const itemEnCarrito = carrito.find(item => item.id == idProducto);
        if (itemEnCarrito) {
            itemEnCarrito += 1;
        } else {
            carrito.push({
                id: idProducto,
                nombre: producto.nombre
                imagen: producto.imagen,
                precio: producto.precio || 0,
                cantidad: 1
            });
        }
        localStorage.setItem ("carrito", JSON.stringify(carrito));
        mostrarCarrito();
        alert(`${producto.nombre} agregado al carrito.`);
    } else {
        consolole.error("Producto no encontrado")
    }
}