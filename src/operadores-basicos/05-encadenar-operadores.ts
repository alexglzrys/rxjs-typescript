import { fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/**
 * Los operadores de Rxjs se pueden encadenar.
 * Es importante entender que el flujo de información fluye de arriba hacia abajo, por tanto, el orden en como aparece cada operador es importante para obtener la data deseada 
 */

fromEvent<KeyboardEvent>(document, 'keyup').pipe(
    // Del objeto con información del evento, solo me interesa trabajr con el code (código de tecla)
    map(event => event.code),
    // Del code, solo me interesa el enter
    filter(code => code === 'Enter')
).subscribe(console.log);