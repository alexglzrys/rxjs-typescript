import { fromEvent, interval } from 'rxjs';
import { switchMap, concatMap, take } from 'rxjs/operators';


const click$    = fromEvent<PointerEvent>(document, 'click');
const interval$ = interval(500).pipe(take(3));

click$.pipe(
    /**
     * No importa cuantos click se hagan en el documento.
     * Solo existirá un solo interval, ya que al emitirse un nuevo click, el interval anterior se cancelará
     */
    
    // switchMap(() => interval$)


    /**
     * El operador concatMap
     * Es otro operador de aplanamiento, este no cancela las suscripciones anteriores como lo hace switchMap
     * Procede a colocarlas en cola, y hasta que la suscripción actual se completa, procede a atender a las demás.
     * Colocando los resultados actuales, inmediatamente después a los de la suscripcion anterior
     */
    concatMap(() => interval$)
).subscribe(console.log)