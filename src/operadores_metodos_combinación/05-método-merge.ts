import { fromEvent, merge } from 'rxjs';
import { pluck } from 'rxjs/operators';

/**
 * Método merge
 * 
 * Recibe un conjunto de Observables como argumento
 * Combina el resultado de las emisiones de cada observable de forma simultanea,
 * es decir, no espera hasta que el primer observable se complete, sino que está atento a las emisiones
 * de cada uno para ir combinandolas en el resultado final
 * 
 * merge emite un resultado final, hasta que todos sus Observables se hayan completado
 * 
 * El operador merge esta obsoleto, por tanto se recomienda hacer uso de los operadores mergeMap, mergeAll
 */

const keyup$ = fromEvent(document, 'keyup');
const click$ = fromEvent(document, 'click');

/**
 * El orden de las emisiones es con base al primer Observable que emita el evento
 * Si ambos emiten un evento al mismo tiempo, el orden es con base a como están declarados en el método (primero va el keyup, y después el click)
 */
merge(
    keyup$.pipe(pluck('type')), 
    click$.pipe(pluck('type'))
).subscribe(console.log);


