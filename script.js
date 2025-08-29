fetch('public/productos.json')
    .then(response => response.json())
    .then(data => {
    const destacadosContainer = document.querySelector('.destacados-content');

    data.productos.slice(0,3).forEach(producto => {
        const link = document.createElement('a');
        link.href = '#';

        const img = document.createElement('img');

        img.src = producto.imagen;
        img.alt = producto.nombre;

        link.appendChild(img);
        destacadosContainer.appendChild(link);
    });
    })
    .catch(error => console.error('Error cargando productos:', error));