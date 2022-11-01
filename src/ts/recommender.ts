// Tipos de netricas
enum Metric { euclidean, cosine, pearson };

// Tipos de predicciones
enum Prediction { simple, meanDifference };

// Clase recomendador
class Recommender {
    // Matriz de similitud
    private simMatrix: number[][] = [];

    // Constructor
    constructor(private matrix: number[][], private prediction: Prediction, private metric: Metric) {}

    // Media
    avg(arr: number[]): number
    {
        return arr.reduce((a, b) => a + b, 0) / arr.length;
    }

    // Similitud entre dos usuarios
    sim(user1: number, user2: number): number
    {
        if(this.metric == Metric.euclidean) 
            return this.euclidean(user1, user2);
        else if (this.metric == Metric.pearson)
            return this.pearson(user1, user2);
        else
            return this.cosine(user1, user2);
    }

    // Calcula la matriz de similitud
    setSimMatrix() {
        for(let i: number = 0; i < this.matrix.length; i++) 
        {
            let row: number[] = [];
            for(let j = 0; j < this.matrix.length; j++)
                row.push(this.sim(i, j));
            this.simMatrix.push(row);
        }
    }

    // Correlación de Pearson
    pearson(user1: number, user2: number): number
    {
        // Falta código
        return 0;
    }

    // Distancia Euclídea
    euclidean(user1: number, user2: number): number
    {
        let user1Array: number[] = this.matrix[user1];
        let user2Array: number[] = this.matrix[user2];
        let sum: number = 0;

        for(let i: number = 0; i < user1Array.length; ++i)
            if(user1Array[i] >= 0 && user2Array[i] >= 0)
                sum += Math.pow(user1Array[i] - user2Array[i], 2);
        
        return Math.sqrt(sum);
    }

    // Distancia Coseno
    cosine(user1: number, user2: number): number
    {
        let user1Array: number[] = this.matrix[user1];
        let user2Array: number[] = this.matrix[user2];

        // Sumatorio del numerador
        let sum1: number = 0;

        // Sumatorios del denominador
        let sum2: number = 0;
        let sum3: number = 0;

        for(let i: number = 0; i < user1Array.length; i++) 
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
    closerNeighbors(user: number, item: number): number[][]
    {
        let neighbors: number[][] = [];

        // Se guarda el número de usuario y la similitud que tiene
        for(let i: number = 0; i < this.matrix.length; i++)
            if(i != user && this.matrix[i][item] >= 0)
                neighbors.push([i, this.simMatrix[user][i]]);

        // Se ordena segun la similitud
        if(this.metric == Metric.pearson || this.metric == Metric.cosine)
            neighbors.sort(function(a, b) { return b[1] - a[1]; });  
        else
            neighbors.sort(function(a, b) { return a[1] - b[1]; });  

        return neighbors;
    }

    simple(user: number, item: number): number
    {
        let neighbors: number[][] = this.closerNeighbors(user, item);
        let sum1: number = 0;
        let sum2: number = 0;

        for(let i: number = 0; i < neighbors.length; i++) 
        {
            sum1 += neighbors[i][1] * this.matrix[neighbors[i][0]][item];
            sum2 += Math.abs(neighbors[i][1]);    
        }

        return sum1 / sum2;
    }

    //
    diffToAvg(user: number, item: number): number
    {
        // Falta código
        return 0;
    }

    predict(user: number, item: number): number
    {
        if(this.prediction == Prediction.simple)
            return this.simple(user, item);
        else
            return this.diffToAvg(user, item);
    }

    transformMatrix(): number[][]
    {
        let completeMatrix: number[][] = [];

        // Creamos la matrix de similitud
        this.setSimMatrix();

        // Compiamos la matriz en completeMatrix
        // No lo hacemos con el operador '=' porque se copia por referencia
        for(let i: number = 0; i < this.matrix.length; i++) 
            completeMatrix[i] = this.matrix[i].slice();

        // Completamos la matriz resultante
        for(let i: number = 0; i < this.matrix.length; i++) 
        {
            for(let j: number = 0; j < this.matrix[i].length; j++) 
            {
                if(this.matrix[i][j] == -1)
                    completeMatrix[i][j] = this.predict(i, j);
                else 
                    completeMatrix[i][j] = this.matrix[i][j];
            }
        }

        return completeMatrix;
    }
}

function fileToMatrix(fileName: string): number[][]
{
    let fs = require('fs');

    // Abre el fichero
    let file = fs.readFileSync('./inputs/' + fileName, "utf8");
    file = file.trim();

    // Splitea por saltos de línea
    let lines = file.split("\n");
    let matrixString: string[][] = [];

    // Splitea por espacios
    for(let i = 0; i < lines.length; ++i)
        matrixString.push(lines[i].split(" "));

    // Cambiamos los '-' por -1
    for(let i = 0; i < matrixString.length; ++i)
        for(let j = 0; j < matrixString[i].length; ++j)
            if(matrixString[i][j] == '-')
                matrixString[i][j] = '-1';

    let matrix: number[][] = [];
    let row: number[] = [];

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

let fileName: string = process.argv[2];
// Falla
//let prediction: Prediction = Prediction[Number(process.argv[3])];
//let metric: Metric = Metric[process.argv[4]];
let prediction: Prediction;
let metric: Metric
if(Number(process.argv[3]) == 0)
    prediction = Prediction.simple;
else
    prediction = Prediction.meanDifference;

if(Number(process.argv[4]) == 0)
    metric = Metric.euclidean;
else if(Number(process.argv[4]) == 1)
    metric = Metric.cosine;
else
    metric = Metric.pearson;

let matrix: number[][] = fileToMatrix(fileName);

let recommender = new Recommender(matrix, prediction, metric);
console.log(recommender.transformMatrix());
