# MOONCOLORS-SHOP
- Deploy: https://mooncolors-shop.onrender.com/


# Mooncolor's Shop - Full Stack E-commerce

Este proyecto es una aplicación web completa (Full Stack) diseñada para gestionar y visualizar una galería y tienda de arte digital. La arquitectura se basa en la separación total del **Backend (API REST)** y el **Frontend**, utilizando servicios en la nube para garantizar la escalabilidad y disponibilidad.

## Arquitectura del Sistema

La aplicación utiliza el stack **MERN/Python** adaptado, con la siguiente distribución:

1. **Frontend**: HTML5, CSS3 (Grid & Flexbox) y JavaScript Vanilla (Asíncrono).
2. **Backend**: Python con **Flask** (Framework ligero para la API).
3. **Base de Datos**: **MongoDB Atlas** (Base de Datos NoSQL en la nube).
4. **Almacenamiento de Imágenes**: **Amazon S3 (AWS)**.
5. **Despliegue**: **Render** (Plataforma PaaS).

---

## Explicación de los Componentes

### 1. Backend & API REST (Flask)

El núcleo de la aplicación es una API que gestiona la comunicación con la base de datos.

* **Endpoints**: Se han creado rutas específicas (`/api/articulos` y `/api/portada`) que retornan datos en formato **JSON**.
* **Lógica de Negocio**: Se implementó una función de selección aleatoria (`random.choice`) para la imagen del Hero, permitiendo que la portada cambie dinámicamente en cada carga.
* **Seguridad**: Uso de **CORS** para permitir peticiones desde el navegador y variables de entorno (`python-dotenv`) para proteger las credenciales de la base de datos.

### 2. Base de Datos (MongoDB Atlas)

Se optó por una base de datos **NoSQL** por su flexibilidad con los documentos.

* Cada documento representa un "Artículo" con campos para el título, descripción, precio, URL de imagen y un campo booleano `portada`.
* Se utiliza el método `.get()` en Python para asegurar la integridad de los datos (valores por defecto) y evitar errores si falta algún campo en la colección.

### 3. Almacenamiento en la Nube (AWS S3)

En lugar de almacenar las imágenes localmente (lo que ralentizaría el servidor), se utiliza **Amazon S3**.

* Las imágenes se sirven mediante URLs seguras con permisos de lectura pública.
* Esto mejora la velocidad de carga (CDN-like) y permite que el servidor de Render se mantenga ligero.

### 4. Frontend Dinámico (JavaScript)

El frontend no es estático; se construye en tiempo de ejecución:

* **Fetch API**: Se realizan llamadas asíncronas al cargar el DOM (`DOMContentLoaded`) para obtener los datos.
* **Manipulación del DOM**: JavaScript recorre el JSON recibido y crea dinámicamente las tarjetas de producto, inyectando el HTML y los estilos necesarios.
* **Hero Dinámico**: Se utiliza la propiedad `style.backgroundImage` para aplicar la URL de la portada seleccionada por el backend directamente al CSS.

---

## Despliegue y Configuración

El proyecto está configurado para despliegue continuo:

* **Procfile**: Archivo de configuración para **Gunicorn**, el servidor HTTP WSGI para producción.
* **Requirements.txt**: Lista detallada de dependencias necesarias para recrear el entorno.
* **Root Directory**: Configuración específica en Render para manejar la jerarquía de carpetas del repositorio.



