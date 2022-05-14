import { fromEvent, interval } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';

const click$    = fromEvent<PointerEvent>(document, 'click');
const interval$ = interval(1000);

click$.pipe(
    /**
     * Por cada click, se genera una fuente de información secundaria
     * En pocas palabras, tendremos muchos Observables que emitiran valores cada segundo de forma simultanea
     */
    
    // mergeMap(click => interval$)



    /**
     * Por cada click, se genera una fuente de información secundaria
     * Sin embargo, solo tendremos un solo Observable que emite valores cada segundo
     * Ya que switchMap cancela la suscripción anterior si recibe un nuevo valor de entrada
     */
    switchMap(click => interval$)
).subscribe(console.log);
