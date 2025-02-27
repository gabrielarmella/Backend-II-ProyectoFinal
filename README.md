

# Comision 70340 Proyecto Final 

## Descripción

Este proyecto es una aplicación de comercio electrónico desarrollada con Node.js y Express. La aplicación incluye funcionalidades como autenticación de usuarios, gestión de productos y carritos de compra, y comunicación en tiempo real mediante WebSockets. A continuación se describen algunos de los componentes principales del proyecto:

Autenticación de Usuarios: Utiliza Passport.js para la autenticación de usuarios con estrategias locales y JWT. Los usuarios pueden registrarse, iniciar sesión y acceder a sus perfiles.
Gestión de Productos: Permite la creación, actualización, eliminación y visualización de productos. Los productos se almacenan en una base de datos MongoDB.
Carritos de Compra: Los usuarios pueden añadir productos a sus carritos, actualizar las cantidades y eliminar productos. Los carritos también se almacenan en MongoDB.
WebSockets: Utiliza Socket.io para la comunicación en tiempo real, permitiendo la actualización dinámica de la lista de productos en la interfaz de usuario.
Vistas: Utiliza Handlebars como motor de plantillas para renderizar las vistas del lado del servidor.
Middleware: Incluye middlewares para la validación de datos y la gestión de sesiones.
El proyecto está estructurado en diferentes carpetas para organizar el código de manera modular y mantener una separación clara de responsabilidades.

```javascript
