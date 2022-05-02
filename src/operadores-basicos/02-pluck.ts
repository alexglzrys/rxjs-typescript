import { fromEvent, range } from 'rxjs';
import { pluck } from 'rxjs/operators'

const keyup$ = fromEvent<KeyboardEvent>(document, 'keyup');

keyup$.pipe(
    // El operador pluck toma el valor de una propiedad presente en el flujo de información (la cual debe ser un objeto)
    // pluck('key')

    // El valor de la propiedad puede estar presente en un objeto anidado
    // objeto, propiedad
    pluck('target', 'baseURI')
).subscribe(code => console.log('pluck', code));

