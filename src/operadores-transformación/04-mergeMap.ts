import { of, interval, fromEvent } from 'rxjs';
import { mergeMap, take, map, takeUntil } from 'rxjs/operators';

const letras$ = of('a', 'b', 'c');

letras$.pipe(
    /**
     * El operador mergeMap
     * Es otro operador de aplanamiento que se suscribe automáticamente a cualquier Observable
     * que se emita durante el flujo de información
     * No dejará pasar la data al siguiente operador, hasta que todos los Observables se hayan completado
     */
    mergeMap(letra => interval(1000).pipe(
        // Por cada letra en el Observable original, se genera otro Observable del tipo inteval
        // La data de la fuente original con la fuente secundaria se mapean y dan como resualtado una concatenación
        map(num => `Fuente original ${letra} - Fuente secundaria ${num}`),
        take(5)
    ))
).subscribe({
    next: (val) => console.log('next:', val),
    complete: () => console.log('complete')
})

const mouseup$ = fromEvent(document, 'mouseup');
const mousedown$ = fromEvent(document, 'mousedown');

mousedown$.pipe(
    // Necesitamos saber cuanto tiempo pasa entre haber apretado el botón del mouse y haberlo soltado
    mergeMap(event => interval().pipe(
        // Completa la suscripción hasta que se emite el evento mouseUp
        takeUntil(mouseup$)
    ))
).subscribe(seg => console.log(`Tiempo estimado ${seg} milisegundos`))