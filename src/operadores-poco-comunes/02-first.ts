import { fromEvent } from "rxjs";
import { take, first, tap, map } from 'rxjs/operators';

interface PointerCoords {
    clientX: number;
    clientY: number;
}

const click$ = fromEvent<PointerEvent>(document, 'click');

/**
 * El operador first toma siempre el primer valor del flujo de información y finaliza la suscripción
 * Si se le pasa una función, el operador first termina la suscripción hasta que la condición se cumpla.
 * 
 * Una alternativa a esto es usar take(1), pero first es más flexible si deseamos terminar la suscripcipion con base en una condición.
 */

click$.pipe(
    // take(1),
    // first(),
    tap(() => console.log('tap')),
    // Del evento solo me interesa las coordenadas del cliente (x, y), y devolver esos dos valores al siguiente operador (PointerCoords) 
    map<PointerEvent, PointerCoords>(({clientX, clientY}) => ({clientX, clientY})),
    // La suscripción se completa o termina cuando el usuario haga click en la coordenada Y del navegador con valor superior o igual a 150px
    first(event => event.clientY >= 150)
).subscribe({
    next: (val) => console.log('next:', val),
    complete: () => console.log('complete')
})