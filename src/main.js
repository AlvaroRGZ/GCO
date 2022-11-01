
import {Matrix} from './lector.js';
console.log("EN fichero");

const matrix = new Matrix();

const fileSelector = document.getElementById('fichero');
fileSelector.addEventListener('change', (event) => {
  matrix.probando(event.target.files);
});

const botonCalcular = document.getElementById('calcular');
botonCalcular.addEventListener('click', (event) => {
  matrix.showMatrix();
});