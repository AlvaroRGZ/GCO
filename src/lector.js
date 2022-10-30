
class Matrix {
  constructor() {
    this.matrix = [];
  }

  showMatrix() {
    console.log("---------- SHOW MATRIX ----------");
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[i].length; j++) {
          if (this.matrix[i][j] == -1) { console.log('-')}
          else { console.log(this.matrix[i][j]); }
      }
    }
    console.log("---------------------------------");
  }
  
  setMatrix(fileInput) {
    const file = fileInput[0];
    let reader = new FileReader();
    let matrix = [];
    reader.readAsText(file);
  
    reader.onload = function() {
        
        // Guardamos el contenido por lineas en matrix
        matrix = String(reader.result).split('\n');
        
        // Por cada fila borrar todos los espacios situados al principio y al final, y separar por espacios
        for (let i = 0; i < matrix.length; i++) {
          
          if (matrix[i] == '') { 
            matrix.splice(i, 1); 
            continue;  
          }
          
          matrix[i] = matrix[i].trim();
          matrix[i] = matrix[i].split(' ');
          
        }
        
        // Mediante un for convertir la matriz a números enteros, pero si detectamos el caracter '-' lo convertimos a -1
        for (let i = 0; i < matrix.length; i++) {
          for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == '-') { matrix[i][j] = -1; }
            else { matrix[i][j] = parseInt(matrix[i][j]); }
          }
        }
        console.log("M len", matrix.length);
        console.log("M col", matrix[0].length);
        this.matrix = matrix;
      }
    }
  }
  
const matrix = new Matrix();

const fileSelector = document.getElementById('fichero');
fileSelector.addEventListener('change', (event) => {
  matrix.setMatrix(event.target.files);
  
});

const botonCalcular = document.getElementById('calcular');
botonCalcular.addEventListener('click', (event) => {
  matrix.showMatrix();
});




