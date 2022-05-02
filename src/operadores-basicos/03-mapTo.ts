import { fromEvent } from 'rxjs';
import { mapTo } from 'rxjs/operators'

const keyup$ = fromEvent<KeyboardEvent>(document, 'keyup');

keyup$.pipe(
    // El operador mapTo permite transformar el flujo de información de entrada en una salida estandar (idéntica para cada elemento), la salida puede ser un valor primitivo, objeto, etc.
    
    mapTo('hola mundo rxjs')
).subscribe(code => console.log('mapTo', code));

