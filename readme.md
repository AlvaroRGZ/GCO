# Sistemas de recomendación. Métodos de Filtrado Colaborativo

## Autores
* Sandro Jesús Socas Méndez  | alu0101208770@ull.edu.es
* José Orlando Nina Orellana | alu0101322308@ull.edu.es
* Álvaro Rodríguez Gómez     | alu0101362953@ull.edu.es

## Índice 
* [Introducción](#id1)
* [Directorios](#id2)
* [Instrucciones](#id3)
* [Descripción del código](#id4)

<a name="id1"></a>
## 1. Introducción 

Implementación de un sistema de recomendación siguiendo el sistema de filtrado colaborativo. 

La práctica la hemos llevado a cabo utilizando el lenguaje **Javascript**, implementanndo un programa que recoge los parámetros por línea de comandos y muestra los resultados 
obtenidos por consola. El código nos servirá como base para en un futuro desplegar una interfaz gráfica con HTML.

<a name="id2"></a>
## 2. Directorios

* [/ejemplos](https://github.com/AlvaroRGZ/GCO/tree/main/ejemplos): Directorio que contiene una serie de ejemplos de matrices de utilidad para usar en el sistema recomendador
  * [utility-matrix-5-10-1.txt](https://github.com/AlvaroRGZ/GCO/tree/main/ejemplos/utility-matrix-5-10-1.txt): Ejemplo de matriz de 5x10
  * [utility-matrix-10-25-2.txt](https://github.com/AlvaroRGZ/GCO/tree/main/ejemplos/utility-matrix-10-25-2.txt): Ejemplo de matriz de 10x25 
  * [utility-matrix-25-100-3.txt](https://github.com/AlvaroRGZ/GCO/tree/main/ejemplos/utility-matrix-25-100-3.txt): Ejemplo de matriz de 25x100
  * [utility-matrix-50-250-4.txt](https://github.com/AlvaroRGZ/GCO/tree/main/ejemplos/utility-matrix-50-250-4.txt): Ejemplo de matriz de 50x250
  * [utility-matrix-100-1000-5.txt](https://github.com/AlvaroRGZ/GCO/tree/main/ejemplos/utility-matrix-100-1000-5.txt): Ejemplo de matriz de 100x1000

* [/src](https://github.com/AlvaroRGZ/GCO/tree/main/src): Directorio que contiene el código creado para llevar a cabo el sistema de recomendación
  * [recommender.js](https://github.com/AlvaroRGZ/GCO/tree/main/src/recommender.js): Contiene la clase **Recommender**. Esta clase almacena los datos obtenidos recogidos del fichero y los que se le pasan como parámetros por línea de comandos y realiza los cálculos correspondientes para obtener: la matriz de utilidad con las predicciones, la matriz de similitud, los vecinos más optimos para cada item de algún usuario, y los cálculos realizados en las predicciones.

<a name="id3"></a>
## 3. Instrucciones 

Para utilizar el sistema recomendador debe seguir los siguientes pasos: 

1. Descargar el contenido de este [repositorio](https://github.com/AlvaroRGZ/GCO)
2. Abrir una terminal que disponga de node.js y situarse en el directorio del proyecto
3. Ejecutar el comando **node recomendador/src/console.js <matriz_de_prueba> <predicción> <métrica> <numero_vecinos>** 
* Donde: 
  * **<matriz_de_prueba>**: Nombre del fichero que contiene la matriz de prueba
  * **<predicción>**: Número que corresponde al tipo de predicción --> (0) Predicción simple | (1) Diferencia con la media 
  * **<métrica>**: Número que corresponde al tipo de métrica --> (0) Pearson | (1) Distancia Euclídea | (2) Distancia Coseno
  * **<numero_vecinos>**: Corresponde al número de vecinos, que como mínimo es 3


<a name="id4"></a>
## 4. Descripción del código

La totalidad del código de esta práctica lo desarrollamos en el fichero [recommender.js](https://github.com/AlvaroRGZ/GCO/tree/main/src/recommender.js). Este fichero contiene la clase Recommender, dicha clase almacena los datos obtenidos al leer el fichero de entrada y realiza los cálculos correspondientes para obtener: la matriz de utilidad con las predicciones, la matriz de similitud, los vecinos más optimos para cada item de algún usuario, y los cálculos realizados en las predicciones.

### **Constructor**

El constructor por defecto de la clase es el siguiente:

```Javascript
constructor(matrix, prediction, metric, numNeighbors = 3)
    {
        this.simMatrix = [];
        this.matrix = matrix;
        this.prediction = prediction;
        this.metric = metric;
        this.completeMatrix = []
        this.numberNeighbors = numNeighbors;
    }
```

A los valores de los atributos se les asignará el valor de los parámetros que el usuario le pase por línea de comandos.

* `this.simMatrix`: Matriz de similitud entre los usuarios. Basada en la métrica empleada
* `this.matrix`: Matriz de utilidad que contiene un -1 en aquellos items que no han sido calificados.
* `this.prediction`: Almacena el tipo de predicción a utilizar
* `this.metric`: Almacena el tipo de métrica a utilizar
* `this.completeMatrix`: Matriz de utilidad que contiene los resultados de los cálculos de predicciones realizados en aquellos items sin calificación.
* `this.numberNeighbors`: Almacena el número de vecinos

### **Métodos de la clase**
* ```setSimMatrix()```: Calcula la matriz de similitud
* ```showMatrix(matriz, title)```: Imprime la matriz
* ```fileToMatrix(fileName)```: Función que se encarga de cargar una matrix a partir de un fichero. Para la gestión de ficheros usaremos fs. Abriremos
el fichero y leeremos el contenido y lo guardaremos en la varibale file. Divideremos el contenido por saltos de línea con el médoto split, este duevulve un array. A su vez  diviremos este array por espacios y obtendremos la matrix. Por último cambiamos los guiones por -1.
* ```fill()```: Este método es el principal, se encarga de rellenar los guiones que existen en la matriz. A su vez muestra todo el proceso de
calculo. Muetra por pantalla la matriz original y la matriz de similitud. Creamos una copia de la matriz original llamada
completeMatrix, esta será la matriz resultante del proceso. Despues recorremos todo la matriz buscando los -1 y en  estas posiciones realizamos la predicción y la guardamos. Por último mostramos los vecinos usados para las predicciones y la matriz final completa.
 
### **Seleccionadores**
Debido a que el usuario puede elegir las métricas o predicciones a usar creamos dos métodos para cumplir con estas funciones.

* ```sim(user1, user2)```: Redirecciona a la métrica elegida, indicando los dos indices de los usuarios a analizar.
* ```predict(user, item)```: Redirecciona al tipo de predicción elegido, indicando los índices del usuario y el item a analizar.


### **Media de un usuario** 
```Javascript
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
```
* ``` avg(arr)```: Realizamos la media de los items de un usuario en la matriz de utilidad. Cabe destacar que aquellos items que no estén calificados, los obviaremos


### **Métricas de similitud** 
A continuación se mostrarán las distintas métricas que podemos emplear:

* Correlación de Pearson: 
```Javascript
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
```
Recibimos los dos índices de los usuarios a analizar. En el resultado obtenemos un índice que puede utilizarse para medir el grado de relación de dos variables, siempre y cuando ambas sean cuantitativas y continuas. Para ello, en primer lugar debemos de calcular la media de cada uno de los usuarios recibidos con el método avg(arr). A continuación realizamos un bucle for que recorrerá la matriz de utilidad, teniendo en cuenta que las calificaciones que vayamos a emplear para la fórmula, deben haber sido calificadas por ambos usuarios previamente. 

* Distancia Euclídea: 
```Javascript
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
```
Entre dos puntos p y q se define como la longitud del segmento que une ambos puntos. Puede generalizarse para un espacio Euclídeo n-dimensional. Realizamos un bucle for que recorrerá la matriz de utilidad, teniendo en cuenta que las calificaciones que vayamos a emplear para la fórmula, deben haber sido calificadas por ambos usuarios previamente.

* Distancia Coseno: 
```Javascript
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
```
Si dos vectores tienen exactamente la misma orientación (el ángulo que forman es 0) su coseno toma el valor de 1, si son perpendiculares su coseno es 0 y si tienen orientaciones opuestas su coseno es de -1. Realizamos un bucle for que recorrerá la matriz de utilidad, teniendo en cuenta que las calificaciones que vayamos a emplear para la fórmula, deben haber sido calificadas por ambos usuarios previamente. 

* Calcular vecinos más cercanos: 
```Javascript
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
```
Este método permite calcular los vecinos más cercanos de un usuario en función de la métrica de similitud. Esté método nos será útil a la hora de realizar los cálculos de predicciones, ya que necesitamos estos vecinos para los cálculos. Primero calculamos todos los vecinos posibles de 'user' descartando aquellos que tengan un item sin calificar en la misma posición que 'user'. Luego ordenamos los vecinos por similitud. Finalmente guardamos esos vecinos en nuestro array de vecinos y lo retornamos.

* Predicción simple:
```Javascript
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
```

Permite calcular el valor desconocido de predicción simple utilizando las puntuaciones asignadas a los ítems i de los usuarios v más parecidos. 

* Predicción basada en la diferencia con la media:
```Javascript
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
```

Permite calcular el valor desconocido de predicción basada en la diferencia con la media, utilizando las puntuaciones asignadas a los ítems i de los usuarios v más parecidos.
