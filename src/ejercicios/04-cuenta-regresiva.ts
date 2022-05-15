import { interval } from 'rxjs';
import { startWith, map, take, endWith } from 'rxjs/operators';

/**
 * Ejercicio: Realizar una cuenta regresiva
 * empezando de 7
 */

// Salida esperada ===
// 7
// 6
// 5
// 4
// 3
// 2
// 1
// 0

(() =>{

    const inicio = 7;
    const countdown$ = interval(700).pipe(
        // Tomar los primeros 7 valores
        take(inicio),
        // Mapear el valor actual de forma que parezca a una cuenta regresiva (valor mayor - actual)
        map(val => inicio - val ),
        // Finalizar emitiendo el valor cero en la secuencia
        endWith(0)     
    );
    

    // No tocar esta línea ==================
    countdown$.subscribe( console.log ); // =
    // ======================================


})();

		