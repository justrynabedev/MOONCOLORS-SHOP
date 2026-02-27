// Este mensaje DEBE salir en la consola en cuanto cargues la página
console.log("El archivo JS ha sido cargado con éxito.");

document.addEventListener("DOMContentLoaded", () => {
    const opcion1 = document.getElementById("opcion1");
    const contenido = document.getElementById("contenido");

    if (opcion1) {
        console.log("Botón 'opcion1' encontrado en el HTML.");

        opcion1.addEventListener("click", function(event) {
            event.preventDefault(); // Evita que el navegador abra la URL del JSON directamente
            console.log("Has hecho clic en el botón.");

            fetch("http://127.0.0.1:5000/opcion1")
                .then(res => res.json())
                .then(data => {
                    console.log("Datos recibidos:", data);
                    console.log("¿Qué hay en la variable contenido?:", contenido); // Esto debe mostrar el div en la consola

                    if (contenido) {
                        contenido.innerHTML = `<p>${data.mensaje}</p>`;
                    } else {
                        console.error("No se encuentra el div 'contenido' para escribir.");
                    }
})
                .catch(err => console.error("Error en el fetch:", err));
        });
    } else {
        console.error("ERROR: No se encontró ningún elemento con ID 'opcion1'.");
    }
});