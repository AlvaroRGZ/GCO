

export class Matrix {
  constructor() {
    console.log("---------- FUNCIONA ----------");
    this.matrix = [[1, 2],
    [3, 4]];
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
  
  probando(fileInput) {
    this.matrix = this.setMatrix(fileInput);
  }

  setMatrix(fileInput) {
    const file = fileInput[0];
    let reader = new FileReader();
    reader.readAsText(file);
    
    reader.onload = function() {
      // Guardamos el contenido por lineas en matrix
      this.matrix = String(reader.result).split('\n');        
      // Por cada fila borrar todos los espacios situados al principio y al final, y separar por espacios
      for (let i = 0; i < this.matrix.length; i++) {          
        if (this.matrix[i] == '') { 
          this.matrix.splice(i, 1); 
          continue;  
        }          
        this.matrix[i] = this.matrix[i].trim();
        this.matrix[i] = this.matrix[i].split(' ');
      }
      
      // Mediante un for convertir la matriz a números enteros, pero si detectamos el caracter '-' lo convertimos a -1
      for (let i = 0; i < this.matrix.length; i++) {
        for (let j = 0; j < this.matrix[i].length; j++) {
          if (this.matrix[i][j] == '-') { this.matrix[i][j] = -1; }
          else { this.matrix[i][j] = parseInt(this.matrix[i][j]); }
        }
      }
      console.log("M len", this.matrix.length);
      console.log("M col", this.matrix[0].length);
      return this.matrix;
    }
    /*
    // ---------
    const fs = require('fs');
    // Abre el fichero
    let file = fs.readFileSync(fileInput[0]);
    file = file.trim();
    // Splitea por saltos de línea
    let lines = file.split("\n");
    let matrixString = [];
    // Splitea por espacios
    for (let i = 0; i < lines.length; ++i)
    matrixString.push(lines[i].split(" "));
    // Cambiamos los '-' por -1
    for (let i = 0; i < matrixString.length; ++i)
    for (let j = 0; j < matrixString[i].length; ++j)
    if (matrixString[i][j] == '-')
    matrixString[i][j] = '-1';
    this.matrix = [];
    let row = [];
    // Convertimos la matriz de strings en números
    for (let i = 0; i < matrixString.length; ++i) {
      row = [];
      for (let j = 0; j < matrixString[i].length; ++j) {
        let num = Number(matrixString[i][j]);
        row.push(num);
      }
      this.matrix.push(row);
    }
    
    //_____________
    
    */
  }
}