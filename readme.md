# Sistemas de recomendación. Métodos de Filtrado Colaborativo

## Autores
* Sandro Jesús Socas Méndez  | alu0101208770@ull.edu.es
* José Orlando Nina Orellana | alu0101322308@ull.edu.es
* Álvaro Rodríguez Gómez     | alu0101362953@ull.edu.es

## Índice 
* [Introducción](#id1)
* [Directorios](#id2)
* [Instrucciones](#id3)
* [Descripción del código](#item4)

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
  * <matriz_de_prueba>: Nombre del fichero que contiene la matriz de prueba
  * <predicción>: Número que corresponde al tipo de predicción --> (0) Predicción simple | (1) Diferencia con la media 
  * <métrica>: Número que corresponde al tipo de métrica --> (0) Pearson | (1) Distancia Euclídea | (2) Distancia Coseno
  * <numero_vecinos>: Corresponde al número de vecinos, que como mínimo es 3


<a name="id4"></a>
## 4. Descripción del código




