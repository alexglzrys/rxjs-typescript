import { of } from 'rxjs';
import { endWith, startWith } from 'rxjs/operators';

/**
 * Operador endWidth
 * Antes de que se complete el Observable (emisión original), emite una emisión con el valor pasado como argumento,
 * Es decir combina la emisión original con un último valor
 */

const numeros$ = of(1,2,3);

numeros$.pipe(
    startWith('voy a comenzar'),
    // En este caso la emisión sería: "voy a comenzar" 1 2 3 "ya terminé"
    endWith('ya terminé')
).subscribe(console.log)