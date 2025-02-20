document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Evita el envío del formulario por defecto

      // Aquí puedes agregar la lógica para enviar el formulario usando fetch o XMLHttpRequest
      // y manejar la respuesta del servidor.

      // Simulación de una respuesta exitosa del servidor
      setTimeout(function() {
        window.location.href = '/products'; // Redirige a la página de productos
      }, 1000); // Simula un retraso de 1 segundo
    });
  }

  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Evita el envío del formulario por defecto

      // Aquí puedes agregar la lógica para enviar el formulario usando fetch o XMLHttpRequest
      // y manejar la respuesta del servidor.

      // Simulación de una respuesta exitosa del servidor
      setTimeout(function() {
        window.location.href = '/products'; // Redirige a la página de productos
      }, 1000); // Simula un retraso de 1 segundo
    });
  }
});