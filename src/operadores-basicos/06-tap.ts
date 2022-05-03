import { range } from 'rxjs';
import { tap, map } from 'rxjs/operators';

const numeros$ = range(1, 5);

numeros$.pipe(
    // El operador tap sirve para ejecutar acciones secundarias (quizá actualizar el valor de una propiedad o variable, así como una llamada a una API, etc.) en un cierto punto del flujo de información
    // Otro uso que se le dá, es para depurar como se va transformando la info
    // Internamente toma el valor actual, y no la transforma solo la deja pasar tal cual como llegó al siguiente operador
    tap(val => {
        console.log('antes del map', val);
        // Este return no sirve de nada
        return 100;
    }),
    map(val => val * 100),
    tap({
        next: val => console.log('después del map', val),
        complete: () => console.log('Se terminó todo')
    })
).subscribe(val => console.log('subs', val));