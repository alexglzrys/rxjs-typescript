import { fromEvent, interval } from 'rxjs';
import { switchMap, concatMap, exhaustMap, take } from 'rxjs/operators';


const click$    = fromEvent<PointerEvent>(document, 'click');
const interval$ = interval(500).pipe(take(3));

click$.pipe(
    /**
     * Por cada evento de tipo click emitido.
     * Se genera un nuevo Observable del tipo Interval
     * concatMap se suscribe automáticamente a ese nuevo Observable
     * y su función será devolver el resultado concatenado de estas suscripciones secundarias
     * 
     * Nota: Los resultados los entrega en orden tal como entraron.
     * Por tanto las fuentes secundarias se colocan en cola para procesarlas conforme se vaya completando una a una
     */
    
    // concatMap(() => interval$)

    /**
     * El operador exhaustMap
     * Es otro operador de aplanamiento.
     * Su principal diferencia es que revisa si existe actualmente una fuente secundaria emitiendo valores, si es así
     * omite la entrada del nuevo valor (jamás lo procesa), caso contrario, permite la entrada 
     * y procede a ejecutar la fuente secundaria para dicho valor.
     * En pocas palabras, solo una fuente secundaria de información se puede ejecutar a la vez
     * 
     * Es muy util cuando deseamos bannerar muchas entradas basura
     * por ejemplo clicks simultaneaos cuando un formulario ya se ha enviado, pero aun se espera que responda con un resultado
     * es decir aun se esta procesando.
     * Esto evitaría el doble submit
     */
    exhaustMap(() => interval$)
).subscribe(console.log)