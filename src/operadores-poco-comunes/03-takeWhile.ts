import { fromEvent } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

const click$ = fromEvent<PointerEvent>(document, 'click');

/**
 * El operador takeWhile permite tomar valores mientras la condicón se cumpla
 * Cuando la conción no se cumple. takeWhile termina o completa la suscripción.
 * 
 * Si se pasa un segundo parámetro al operador takeWhile con el valor de true, se incluye en los resultados el valor que provocó que se completara la suscripción
 */

click$.pipe(
    // Solo me interesa del evento las propiedades X, Y
    map(({x, y}) => ({x, y})),
    // Tomo cualquier valor para Y que sea menor o igual a 150
    // Como se considera la inclusión (true), takeWhile emitirá el valor que provoco que finalizará la sucripción
    takeWhile(({y}) => y <= 150, true)
).subscribe({
    next: (val) => console.log('next', val),
    complete: () => console.log('complete')
});