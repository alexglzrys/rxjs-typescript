
import { from } from 'rxjs';
import { scan, reduce, map } from 'rxjs/operators';

const numeros = [1,2,3,4,5];

const funcionAcumulador = (acumulador, valor_actual) => acumulador + valor_actual;

console.log('--- Reduce ---')
// Reduce
from(numeros).pipe(
    reduce(funcionAcumulador, 0)
).subscribe(console.log);

/**
 * El operador Scan es una alternativa a Reducer,
 * con la diferencia que scan devuelve el valor acumulado por cada elemento que entra en el flujo de información, es decir, no se espera hasta que todos los elementos hayan entrado para emitir un solo resultado final.
 */

console.log('--- Scan ---')
// Scan
from (numeros).pipe(
    scan(funcionAcumulador, 0)
).subscribe(console.log)


interface Usuario {
    id?: string;
    autenticado?: boolean;
    token?: string;
    edad?: number;
}

const user: Usuario[] = [
    { id: 'alex', autenticado: false, token: null },
    { id: 'alex', autenticado: true, token: 'ABC' },
    { id: 'alex', autenticado: true, token: 'abc-update' },
];

const state$ = from(user).pipe(
    scan((acc, curr) => {
        return {...acc, ...curr}
    }, { edad: 33 })
);

const id$ = state$.pipe(
    map((state: Usuario) => state.id)
).subscribe(console.log)