'use strict'


// Mostrar mensaje de error desde el parámetro URL
const errorMessageElement = document.getElementById('errorMessage');
const params = new URLSearchParams(window.location.search);
const errorMessage = params.get('error');
errorMessageElement.textContent = errorMessage || 'Error desconocido';


// Botón para volver al inicio
document.getElementById('backButton').addEventListener('click', () => {
  window.location.href = 'index.html';
});
