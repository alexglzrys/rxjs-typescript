import { concat, interval, of } from 'rxjs';
import { take } from 'rxjs/operators';
/**
 * Función concat
 * 
 * Recibe un conjunto de Observables como argumento, tambien puede recibiur iterables o arreglos
 * Espera a que el primer observable se complete, para iniciar con el segundo observable
 * y así sucesivamente.
 * Si alguno de los observables jamás se completa, no pasa al siguiente, espera hasta que en algun punto del tiempo termine
 * 
 * Existe un operador concat, pero este está deprecado.
 * */

const interval$ = interval(1000);

concat(
    // Primero se debe completar este Observable para continuar con los demás
    interval$.pipe(take(3)),
    // Espera a que se termine este Observable para continuar
    interval$.pipe(take(5)),
    // y así sucesivamente
    of(1),
    ['a','b','c','d','e']
).subscribe(console.log)

// Al final genera una única emisión con los valores de cada Observable combinados
