// Todo lo que se importe directamente de 'rxjs', significa que es algo para crear Observables

import { of } from 'rxjs';

// Crear un Observable con la función of de RxJS (convierte el argumento en una secuencia de Observables de forma asíncrona)
// const obs$ = of(1,2,3,4,5,6);

// Crear un Observable a partir de un listado de varios tipos
const obs$ = of(1, [2,3], true, 'hola mundo', {a: 'alex', b: 'gonzález'}, function() {}, Promise.resolve(true));

// Un Observable tambien puede ser considerado como una operación sincrona
console.log('Inicio');

// Subscripción al Observable
obs$.subscribe({
    next: (val) => console.log(val),
    error: (err) => console.warn(err),
    complete: () => console.log('Proceso terminado')
});

console.log('Fin');