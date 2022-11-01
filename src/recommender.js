const { title } = require('process');

// Clase recomendador
class Recommender {
    // Constructor
    constructor(matrix, prediction, metric, numNeighbors = 3)
    {
        this.simMatrix = [];
        this.matrix = matrix;
        this.prediction = prediction;
        this.metric = metric;
        this.completeMatrix = []
        this.numberNeighbors = numNeighbors;
    }

    // Media
    avg(arr)
    {
        let sum = 0;
        let length = 0;
        for(let i = 0; i < arr.length; ++i)
            if(arr[i] >=0)
            {
                sum += arr[i];
                length++;
            }

        return sum / length;
    }

    // Similitud entre dos usuarios
    sim(user1, user2)
    {
        if(this.metric === 0) 
            return this.euclidean(user1, user2);
        else if (this.metric === 1)
            return this.pearson(user1, user2);
        else
            return this.cosine(user1, user2);
    }

    // Calcula la matriz de similitud
    setSimMatrix() {
        for(let i = 0; i < this.matrix.length; i++){
            let row = [];
            for(let j = 0; j < this.matrix.length; j++)
                row.push(this.sim(i, j).toFixed(2));
            this.simMatrix.push(row);
        }
    }

    showMatrix(matriz, title) {
        console.log(" ----------", title, " ----------");
        for(let i = 0; i < matriz.length; i++){
            for(let j = 0; j < matriz[i].length; j++){
                process.stdout.write(String(matriz[i][j]) + "\t");
            }
        console.log();
        }
        console.log(" --------------------------------");
    }

    // Correlación de Pearson
    pearson(user1, user2) 
    {
        let user1Array = this.matrix[user1];
        let user2Array = this.matrix[user2];
        let avg1 = this.avg(user1Array);
        let avg2 = this.avg(user2Array);
        let sum1 = 0;
        let sum2 = 0;
        let sum3 = 0;

        for(let i = 0; i < user1Array.length; ++i)
        {
            if(user1Array[i] >= 0 && user2Array[i] >= 0)
            {
                sum1 += (user1Array[i] - avg1) * (user2Array[i] - avg2);
                sum2 += Math.pow(user1Array[i] - avg1, 2);
                sum3 += Math.pow(user2Array[i] - avg2, 2);
            }
        }

        let corr = sum1 / (Math.sqrt(sum2) * Math.sqrt(sum3));
        
        if(corr < 0)
          corr = (corr + 1) / 2;

        return corr;
    }

    // Distancia Euclídea
    euclidean(user1, user2) 
    {
        let user1Array = this.matrix[user1];
        let user2Array = this.matrix[user2];
        let sum = 0;

        for(let i = 0; i < user1Array.length; ++i)
            if(user1Array[i] >= 0 && user2Array[i] >= 0)
                sum += Math.pow(user1Array[i] - user2Array[i], 2);
        
        return Math.sqrt(sum);
    }

    // Distancia Coseno
    cosine(user1, user2)
    {
        let user1Array = this.matrix[user1];
        let user2Array = this.matrix[user2];

        // Sumatorio del numerador
        let sum1 = 0;

        // Sumatorios del denominador
        let sum2 = 0;
        let sum3 = 0;

        for(let i = 0; i < user1Array.length; i++) 
        {
            if(user1Array[i] >= 0 && user2Array[i] >= 0) 
            {
                sum1 += (user1Array[i]) * (user2Array[i]);
                sum2 += Math.pow(user1Array[i], 2);
                sum3 += Math.pow(user2Array[i], 2);
            }
        }

        return sum1 / (Math.sqrt(sum2) * Math.sqrt(sum3));
    }

    // Vecinos mas cercanos
    closerNeighbors(user, item)
    {
        let neighbors = [];

        // Se guarda el número de usuario y la similitud que tiene
        for(let i = 0; i < this.matrix.length; i++)
            if(i != user && this.matrix[i][item] >= 0)
                neighbors.push([i, this.simMatrix[user][i]]);

        // Se ordena segun la similitud
        if(this.metric === 1 || this.metric === 2)
            neighbors.sort(function(a, b) { return b[1] - a[1]; });  
        else
            neighbors.sort(function(a, b) { return a[1] - b[1]; });  

        return neighbors;
    }

    // Predicción simple
    simple(user, item)
    {
        let neighbors = this.closerNeighbors(user, item);
        let sum1 = 0;
        let sum2 = 0;

        for(let i = 0; i < neighbors.length; i++) 
        {
            sum1 += neighbors[i][1] * this.matrix[neighbors[i][0]][item];
            sum2 += Math.abs(neighbors[i][1]);    
        }
        process.stdout.write("Predicción del usuario u[" + (user+1) + "] con simple en el item[" + (item+1) +  "] = ");
        process.stdout.write( sum1.toFixed(2) + " / " + sum2.toFixed(2) + " = " + (sum1 / sum2).toFixed(2) + "\n");
        return sum1 / sum2;
    }

    // Predicción considerando la diferencia con la media
    diffToAvg(user, item)
    {
        let neighbors = this.closerNeighbors(user, item);
        let avgUser = this.avg(this.matrix[user]);
        let sum1 = 0;
        let sum2 = 0;

        for(let i = 0; i < neighbors.length; ++i)
        {
            sum1 += neighbors[i][1] * (this.matrix[neighbors[i][0]][item] - this.avg(this.matrix[neighbors[i][0]]));
            sum2 += Math.abs(neighbors[i][1]);
        }

        process.stdout.write("Predicción del usurio u[" + user + 1 + "] con el item " + item + ": " + avgUser.toFixed(2) + "(" + sum1.toFixed(2) + " / " + sum2.toFixed(2) + ") = " + (avgUser + (sum1 / sum2)).toFixed(2));     
        console.log();   

        return avgUser + (sum1 / sum2);
    }

    // Predicción
    predict(user, item)
    {
        if(this.prediction === 0)
            return this.simple(user, item);
        else
            return this.diffToAvg(user, item);
    }
    
    showUsedNeighbors(nNeighbors) {
      console.log(" ---------- Vecinos similares ----------");
      let actual = [];
      for (let i = 0; i < this.matrix.length; i++) {
        for (let j = 0; j < this.matrix[i].length; j++) {
          if(this.matrix[i][j] === -1){
            actual = this.closerNeighbors(i, j);
            actual = actual.slice(0, nNeighbors);
            process.stdout.write("Para calcular el item" + (j + 1) + " del usuario [u" + (i + 1) + "] se han usado los vecinos: { ");
            for (let k = 0; k < actual.length; k++){
              process.stdout.write("u" + actual[k][0] + " ");
            }
            console.log("}");
          }
        }
      }
    }


    // Rellena la matriz
    fill()
    {
        // Mostrar matriz original
        this.showMatrix(this.matrix, "Matriz original");

        // Creamos la matriz de similitud
        this.setSimMatrix();
        // Mostrar matriz de similitud
        this.showMatrix(this.simMatrix, "Matriz de similitud");

        // Compiamos la matriz en completeMatrix
        // No lo hacemos con el operador '=' porque se copia por referencia
        for(let i = 0; i < this.matrix.length; i++) 
            this.completeMatrix[i] = this.matrix[i].slice();

        // Completamos la matriz resultante
        for(let i = 0; i < this.matrix.length; i++) 
        {
            for(let j = 0; j < this.matrix[i].length; j++) 
            {
                if(this.matrix[i][j] === -1)
                    this.completeMatrix[i][j] = this.predict(i, j).toFixed(2);
                else 
                    this.completeMatrix[i][j] = this.matrix[i][j];
            }
        }

        this.showUsedNeighbors(this.numberNeighbors);
        this.showMatrix(this.completeMatrix, "Matriz completa");
    }

}

function fileToMatrix(fileName)
{
    let fs = require('fs');

    // Abre el fichero
    let file = fs.readFileSync('./recomendador/ejemplos/' + fileName, "utf8");
    file = file.trim();

    // Splitea por saltos de línea
    let lines = file.split("\n");
    let matrixString = [];

    // Splitea por espacios
    for(let i = 0; i < lines.length; ++i)
        matrixString.push(lines[i].split(" "));

    // Cambiamos los '-' por -1
    for(let i = 0; i < matrixString.length; ++i)
        for(let j = 0; j < matrixString[i].length; ++j)
            if(matrixString[i][j] === '-')
                matrixString[i][j] = '-1';

    let matrix = [];
    let row = [];

    // Convertimos la matriz de strings en números
    for(let i = 0; i < matrixString.length; ++i)
    {
        row = [];
        for(let j = 0; j < matrixString[i].length; ++j)
        {
            let num = Number(matrixString[i][j]);
            row.push(num);
        }
        matrix.push(row);
    }
    
    return matrix;
}

let fileName = process.argv[2];
let prediction = Number(process.argv[3]);
let metric = Number(process.argv[4]);
let nnei = Number(process.argv[5]);
let matrix = fileToMatrix(fileName);

let recommender = new Recommender(matrix, prediction, metric, nnei);
recommender.fill();
