// Función que calcula la correlación de Pearson
function correlationCoefficient(X, Y, n)
{
	let sum_X = 0, sum_Y = 0, sum_XY = 0;
	let squareSum_X = 0, squareSum_Y = 0;
	
	for(let i = 0; i < n; i++)
	{
		// Sum of elements of array X.
		sum_X = sum_X + X[i];
	
		// Sum of elements of array Y.
		sum_Y = sum_Y + Y[i];
	
		// Sum of X[i] * Y[i].
		sum_XY = sum_XY + X[i] * Y[i];
	
		// Sum of square of array elements.
		squareSum_X = squareSum_X + X[i] * X[i];
		squareSum_Y = squareSum_Y + Y[i] * Y[i];
	}
	// Use formula for calculating correlation
	// coefficient.
	let corr = (n * sum_XY - sum_X * sum_Y)/
			(Math.sqrt((n * squareSum_X -
					sum_X * sum_X) *
						(n * squareSum_Y -
					sum_Y * sum_Y)));
	
	return corr;
}

// Función que calcula la media
function ArrayAvg(myArray) {
    var i = 0, summ = 0, ArrayLen = myArray.length;
    while (i < ArrayLen) {
        summ = summ + myArray[i++];
}
    return summ / ArrayLen;
}

let matrix = [ [5, 3, 4, 4, "-"],
               [3, 1, 2, 3, 3], 
               [4, 3, 4, 3, 5],
               [3, 3, 1, 5, 4], 
               [1, 5, 5, 2, 1] ];

// Copio la matriz
let original_matrix = JSON.parse(JSON.stringify(matrix));

// Busco la posición de "-"
let i, j;
for(i = 0; i < matrix.length; ++i)
{
    if(matrix[i].includes("-"))
    {
        j = matrix[i].indexOf("-");
        break;
    }
}

// Le quito la columna donde esta "-"
for(let k = 0; k < matrix.length; ++k)
{
    matrix[k].splice(j, 1);
}

// Calculo las correlaciones
let result = [];
for(let t = 0; t < matrix.length; ++t)
{
    if(t !== i)
    {
        let corre = correlationCoefficient(matrix[i], matrix[t], matrix[i].length);
        result.push([i, t, corre]);
    }
}

// Ordeno de mayor a menor correlación
result.sort(function (a, b){
    return b[2] - a[2];
});

// Se guarda el número de fila de los vecinos más proximos
let max_index_1 = result[0][1];
let max_index_2 = result[1][1];

// Se guarda los 2 coeficientes más cercanos a 1
let coe_1 = result[0][2];
let coe_2 = result[1][2];

// Medias de la fila
let avg = ArrayAvg(matrix[i]);
let avg_1 = ArrayAvg(original_matrix[max_index_1]);
let avg_2 = ArrayAvg(original_matrix[max_index_2]);

// Calculo r(v, i)
let r_1 = original_matrix[max_index_1][j];
let r_2 = original_matrix[max_index_2][j];

// Calculo la predicción 
predict = avg + ((((coe_1*(r_1 - avg_1)))+(coe_2*(r_2 - avg_2)))/(coe_1 + coe_2));

console.log(predict);