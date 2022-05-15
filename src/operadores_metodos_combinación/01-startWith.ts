import { of } from 'rxjs';
import { startWith } from 'rxjs/operators'

/**
 * Operador startWith
 * Empieza con el argumento que se le mande (envía una primera emisión), y posterior a ello combina el contenido
 * que viaja en la emisión del Observable original
 */

const numeros$ = of(1,2,3);

numeros$.pipe(
    // En este caso la emisión sería: hola 1 2 3
    startWith('hola')
).subscribe(console.log)