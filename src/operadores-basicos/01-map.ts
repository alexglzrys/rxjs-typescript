import { fromEvent, range } from 'rxjs';
import { map } from 'rxjs/operators'

range(1, 5).pipe(
    // Colocar los filtros u operadores para transformar el flujo de información emitido por el Observable

    // Operador map permite mapear (transformar) la información entrante
    // Entra un número y regresa ese mismo número transformado
    map<number, number>(val => val * 10)
).subscribe(console.log);


const keyup$ = fromEvent<KeyboardEvent>(document, 'keyup');

keyup$.pipe(
    // Filtrar toda la información del evento, y solo retornar el code
    map(event => event.code)
).subscribe(code => console.log('map', code));

