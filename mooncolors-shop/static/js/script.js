document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
});

async function cargarProductos() {
    try {
        // Hacemos la llamada a tu API local
        const respuesta = await fetch('https://mooncolors-shop.onrender.com/api/articulos');
        const articulos = await respuesta.json();

        // Buscamos el contenedor en el HTML
        const contenedor = document.getElementById('contenedor-productos');
        contenedor.innerHTML = ''; // Limpiamos por si acaso

        // Bucle para inyectar cada artículo
        articulos.forEach(articulo => {
            const tarjetaHTML = `
                <div class="producto-card">
                    <img src="${articulo.imagen_url}" alt="${articulo.titulo}">
                    <h3>${articulo.titulo}</h3>
                    <p>${articulo.descripcion}</p>
                    <p class="precio-tag">${articulo.precio} €</p>
                </div>
            `;
            // Añadimos la tarjeta al contenedor
            contenedor.innerHTML += tarjetaHTML;
        });

    } catch (error) {
        console.error("Error al cargar los productos:", error);
        document.getElementById('contenedor-productos').innerHTML = '<p>Error cargando la tienda.</p>';
    }
}

async function cargarPortada() {
    try{
        const respuesta = await fetch('https://mooncolors-shop.onrender.com/api/portada')
        const datos = await respuesta.json()

        const contenedor_imagen = document.getElementById('contenedor-imagen-portada')
        contenedor_imagen.style.backgroundImage = `url('${datos.imagen_url}')`

        console.log("Datos recibidos de la API:", datos);
        console.log("URL de la imagen:", datos.imagen_url);
    }

    catch (error){
        console.error("Error cargando la imagen de portada:", error)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarPortada();
    cargarProductos();
});

