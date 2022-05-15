import { of, interval, forkJoin } from 'rxjs';
import { take, delay } from 'rxjs/operators';

/**
 * El método forkJoin
 * Recibe como argumento un conjunto de Observables
 * Retona como resultado un arreglo con los últimos valores emitidos por cada uno de los Observables
 * 
 * Diferencia
 * No emite un resultado hasta que todos los Observables se hayan completado.
 * 
 * Resultado alternativo
 * Si los Observables se le pasan como objeto, el resultado es un objeto con los útlimos valores emitidos
 */

const numeros$ = of(1,2,3,4,5);
const interval$ = interval(1000).pipe(take(3));
const letras$ = of('a','b','c').pipe(delay(7000));

/*forkJoin(
    numeros$,
    interval$,
    letras$
).subscribe(console.log);*/

/*forkJoin(
    numeros$,
    interval$,
    letras$
).subscribe(response => {
    console.log('ultimo número:', response[0]);
    console.log('último intervalo:', response[1]),
    console.log('última letra:', response[2])
});*/

forkJoin({
    numero: numeros$,
    intervalo: interval$,
    letra: letras$
}).subscribe(console.log);
