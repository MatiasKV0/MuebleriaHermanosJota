# E-commerce Mueblería Hermanos Jota

## Integrantes del equipo
- Arturo Toranzos
- Lucas Rotelli
- Matias Nicolas Villan
- Santiago Ribecca

## Descripción del Proyecto
Este proyecto corresponde a la primera fase de desarrollo de un sitio web de e-commerce para la **Mueblería Hermanos Jota**, un taller familiar con más de 30 años de tradición en la fabricación de muebles de madera de autor.  

El objetivo de esta fase fue construir la **fachada completa del sitio web** y la **experiencia interactiva del cliente** utilizando únicamente tecnologías del lado del cliente (HTML, CSS y JavaScript), sin conexión a backend. Toda la información de los productos se gestiona localmente con JavaScript y se simula la carga asíncrona de datos.

El sitio web permite al usuario:
- Explorar el catálogo de productos.
- Visualizar los detalles de cada producto.
- Añadir productos a un carrito simulado con contador dinámico.
- Contactar a la mueblería mediante un formulario validado en el lado del cliente.

## Páginas Implementadas
1. **Inicio (`index.html`)**  
   - Header con logo y navegación.  
   - Hero Banner principal con imagen llamativa.  
   - Sección de productos destacados cargados dinámicamente.  
   - Footer con información de contacto.

2. **Catálogo de Productos (`productos.html`)**  
   - Grilla de tarjetas con todos los productos.  
   - Cada producto enlaza a su página de detalle.

3. **Detalle de Producto (`producto.html`)**  
   - Información completa del producto: imagen, descripción, detalles de fabricación y precio.  
   - Botón “Añadir al Carrito” que actualiza el contador en el header.  

4. **Contacto (`contacto.html`)**  
   - Formulario con campos: Nombre, Email y Mensaje.  
   - Validación de los campos en el lado del cliente.  
   - Mensaje de éxito tras el envío mediante manipulación del DOM.
  
5. **Carrito (`carrito.html`)**  
   - Listado de los productos agregados al carrito.  
   - Posibilidad de eliminar productos del carrito.

## Funcionalidades Transversales
- **Carrito Simulado:**  
  El header cuenta con un ícono de carrito que incrementa su contador al añadir productos.  
- **Carga Dinámica de Productos:**  
  Los productos se cargan desde un archivo JSON utilizando `fetch` y se renderizan dinámicamente manipulando el DOM.
- **Interactividad:**  
  Toda la interacción del usuario se maneja mediante `addEventListener`.  
- **Simulación de carga asíncrona:**  
  Uso de `setTimeout` y Promises para simular la obtención de datos de forma asíncrona.  

## Tecnologías Utilizadas
- **HTML5** – Estructura semántica del sitio.  
- **CSS3** – Diseño responsivo Mobile-First, Flexbox para maquetación, estilos externos.  
- **JavaScript** – Manipulación del DOM, lógica de carrito, carga dinámica de productos, validación de formularios.  
- **Git & GitHub** – Control de versiones y colaboración en equipo.  

## Enlaces
- **Repositorio GitHub:** [[URL del repositorio]](https://github.com/MatiasKV0/MuebleriaHermanosJota)  
- **Sitio Web Desplegado:** [[URL del sitio] ](https://matiaskv0.github.io/MuebleriaHermanosJota/) 

---

Este proyecto constituye la base para futuras fases, donde se integrará un backend y se ampliará la funcionalidad del e-commerce.
