# Catálogo de Productos

## Descripción

Aplicación web interactiva que permite visualizar, explorar y gestionar productos desde la API de [DummyJSON](https://dummyjson.com/products).

## Tecnologías

- Angular 17+
- TypeScript
- RxJS
- SCSS/CSS puro
- LocalStorage para persistencia

## Funcionalidades

### Catálogo
- Listado de productos con imágenes
- Carrusel de imágenes por producto
- Búsqueda por texto
- Filtro por categoría
- Ordenamiento por precio y rating
- Paginación

### Detalle de Producto
- Información completa (descripción, dimensiones)
- Galería de imágenes
- Opiniones de usuarios
- Selector de cantidad

### Carrito de Compras
- Sidebar flotante
- Agregar/eliminar productos
- Modificar cantidades
- Persistencia en localStorage
- Notificaciones visuales

## Instalación

```bash
# Clonar repositorio
git clone https://github.com/geovanygs5/catalogo-de-productos

# Instalar dependencias
npm install

# Ejecutar en desarrollo
ng serve -o