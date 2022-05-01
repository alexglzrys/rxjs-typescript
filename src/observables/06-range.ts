import { asyncScheduler, observeOn, range } from 'rxjs';

// Crear un Observable a partir de un rango de valores núméricos secuenciales emitidos por defecto de forma sincrona
// El rango comienza en 1, y se emiten 10 valores numéricos consecutivos
// const obs$ = range(1,10);

// Parte de -5, y emite 20 valores numéricos consecutivos, en este caso llegaría hasta 14 (-5,-4,3...13,14)
//const obs$ = range(-5, 20);

// Emitir valores de forma asíncrona (Por tanto inicio y fin se ejecutan primero)
const obs$ = range(-5, 20).pipe(observeOn(asyncScheduler));

console.log('--- Inicio ---');
obs$.subscribe(val => console.log(val));
console.log('--- Fin ---');